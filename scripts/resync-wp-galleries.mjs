/**
 * Resync project galleries from the original WordPress SQL dump.
 *
 * - Parses buildtree.sql to extract each portfolio-item's thumbnail + gallery IDs
 * - Reads attachment file paths and dimensions from the same SQL
 * - Filters out banner/table images (min dim < 400 or extreme aspect ratios)
 * - Copies real photos from wp-content/uploads into public/images/projects/<slug>/
 *   as photo-NN.jpg, replacing the previous photo-*.jpg + main.jpg files
 * - Rewrites projects.json with fresh featuredImage / gallery / photos arrays
 * - Leaves `plans` untouched (different pipeline)
 *
 * Idempotent: running twice produces the same result.
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = 'C:/Users/scw99/work/arkireal_homepage';
const SQL_PATH = path.join(ROOT, 'wordpress_content/buildtree.sql');
const UPLOADS_DIR = path.join(ROOT, 'wordpress_content/wordpress/wp-content/uploads');
const PROJECTS_DIR = path.join(ROOT, 'dev/arkireal_homepage/public/images/projects');
const PROJECTS_JSON = path.join(ROOT, 'dev/arkireal_homepage/data/projects.json');

const DRY_RUN = process.argv.includes('--dry');
const VERBOSE = process.argv.includes('--verbose') || DRY_RUN;

// Heuristic: treat as a photo only if both dims >= 400 and aspect ratio between 0.33 and 3.5
const MIN_DIM = 400;
const MIN_ASPECT = 0.33;
const MAX_ASPECT = 3.5;

/**
 * Per-project photo order overrides keyed by WP post_id. Applied after the
 * gallery list is resolved, before files are copied. `moveFirstToEnd: N` shifts
 * the first N items to the tail — used for projects where the WP thumbnail is
 * a top-down drone shot that visually reads as a site plan rather than a
 * photograph (e.g. 밀양 그린델발트).
 */
const PHOTO_REORDER = {
  9547: { moveFirstToEnd: 3 },
};

const sql = fs.readFileSync(SQL_PATH, 'utf8');

// --- Pass 1: attachment file paths ---
const attachments = new Map(); // id -> { file, width?, height? }
for (const m of sql.matchAll(/\((\d+),\s*(\d+),\s*'_wp_attached_file',\s*'([^']+)'\)/g)) {
  attachments.set(parseInt(m[2]), { file: m[3] });
}

// --- Pass 2: attachment dimensions (from _wp_attachment_metadata serialized PHP) ---
// Pattern inside serialized blob: s:5:"width";i:NNN;s:6:"height";i:NNN;
// File bytes have the quotes escaped as \"
const reMetaDim = /\((\d+),\s*(\d+),\s*'_wp_attachment_metadata'/;
for (const line of sql.split('\n')) {
  if (!line.includes('_wp_attachment_metadata')) continue;
  const rowMatch = line.match(reMetaDim);
  if (!rowMatch) continue;
  const attId = parseInt(rowMatch[2]);
  const att = attachments.get(attId);
  if (!att) continue;
  // Find first width;i:NNN; and height;i:NNN;
  const wMatch = line.match(/width\\";i:(\d+);/);
  const hMatch = line.match(/height\\";i:(\d+);/);
  if (wMatch) att.width = parseInt(wMatch[1]);
  if (hMatch) att.height = parseInt(hMatch[1]);
}

// --- Pass 3: thumbnails ---
const thumbs = new Map();
for (const m of sql.matchAll(/\((\d+),\s*(\d+),\s*'_thumbnail_id',\s*'(\d+)'\)/g)) {
  thumbs.set(parseInt(m[2]), parseInt(m[3]));
}

// --- Pass 4: qodef_portfolio_gallery per post ---
const reGallery = /qodef_portfolio_gallery\\";s:\d+:\\"([^\\]*)\\"/g;
const galleries = new Map();
for (const line of sql.split('\n')) {
  if (!line.includes('qodef_portfolio_media')) continue;
  const idMatch = line.match(/^\(\d+,\s*(\d+),/);
  if (!idMatch) continue;
  const postId = parseInt(idMatch[1]);
  const ids = [];
  for (const mm of line.matchAll(reGallery)) {
    mm[1].split(',').forEach((x) => {
      const n = parseInt(x);
      if (!Number.isNaN(n) && !ids.includes(n)) ids.push(n);
    });
  }
  if (ids.length) galleries.set(postId, ids);
}

console.log(`[sql] attachments=${attachments.size} thumbs=${thumbs.size} galleries=${galleries.size}`);

// --- Load current projects.json ---
const projectsRaw = fs.readFileSync(PROJECTS_JSON, 'utf8');
const projects = JSON.parse(projectsRaw);

const report = [];

for (const project of projects) {
  const postId = project.id;
  const slug = project.slug;
  const thumbId = thumbs.get(postId);
  const gallery = galleries.get(postId) || [];
  const ordered = [];
  if (thumbId) ordered.push(thumbId);
  gallery.forEach((g) => {
    if (!ordered.includes(g)) ordered.push(g);
  });

  if (ordered.length === 0) {
    report.push({ slug, action: 'skip (no WP gallery)' });
    continue;
  }

  // Resolve to source files + filter
  const items = [];
  for (const aid of ordered) {
    const att = attachments.get(aid);
    if (!att || !att.file) continue;
    const src = path.join(UPLOADS_DIR, att.file);
    if (!fs.existsSync(src)) {
      if (VERBOSE) console.log(`  [miss] ${slug}: ${att.file}`);
      continue;
    }
    // Use metadata dims if available, else skip filter
    const w = att.width;
    const h = att.height;
    if (w && h) {
      if (Math.min(w, h) < MIN_DIM) continue;
      const aspect = w / h;
      if (aspect < MIN_ASPECT || aspect > MAX_ASPECT) continue;
    }
    items.push({ aid, src, file: att.file, w, h });
  }

  if (items.length === 0) {
    report.push({ slug, action: 'skip (no usable images)' });
    continue;
  }

  // Apply per-project photo reorder overrides (see PHOTO_REORDER above)
  const reorderCfg = PHOTO_REORDER[postId];
  if (reorderCfg?.moveFirstToEnd) {
    const n = Math.min(reorderCfg.moveFirstToEnd, items.length - 1);
    const head = items.splice(0, n);
    items.push(...head);
  }

  // Prepare target directory
  const destDir = path.join(PROJECTS_DIR, slug);
  if (!DRY_RUN) fs.mkdirSync(destDir, { recursive: true });

  // Clean old photo-*.jpg and main.jpg in destDir (keep plans, matterport, etc.)
  if (!DRY_RUN && fs.existsSync(destDir)) {
    for (const name of fs.readdirSync(destDir)) {
      if (/^main\.(jpe?g|png|webp)$/i.test(name) || /^photo-\d+\.(jpe?g|png|webp)$/i.test(name)) {
        fs.unlinkSync(path.join(destDir, name));
      }
    }
  }

  // Copy all items as photo-NN.jpg in WP order
  const newPhotos = [];
  items.forEach((item, i) => {
    const ext = path.extname(item.file) || '.jpg';
    const targetName = `photo-${String(i + 1).padStart(2, '0')}${ext}`;
    const targetPath = path.join(destDir, targetName);
    if (!DRY_RUN) fs.copyFileSync(item.src, targetPath);
    const relSrc = `/images/projects/${slug}/${targetName}`;
    newPhotos.push({
      relSrc,
      w: item.w || 1600,
      h: item.h || 1067,
    });
  });

  // Featured = first item after any reorder. When a reorder override is in
  // play we ignore the WP thumbnail because that's precisely the image we
  // wanted to demote. Otherwise prefer the thumbnail.
  let featuredIdx = 0;
  if (!reorderCfg && thumbId) {
    const i = items.findIndex((it) => it.aid === thumbId);
    if (i >= 0) featuredIdx = i;
  }
  if (!DRY_RUN) {
    fs.copyFileSync(items[featuredIdx].src, path.join(destDir, 'main.jpg'));
  }
  const featuredImage = `/images/projects/${slug}/main.jpg`;

  // Rewrite project fields
  project.featuredImage = featuredImage;
  project.gallery = newPhotos.map((p) => p.relSrc);
  project.photos = newPhotos.map((p) => ({
    src: p.relSrc,
    w: p.w,
    h: p.h,
    orientation: p.w > p.h ? 'landscape' : p.w < p.h ? 'portrait' : 'square',
  }));

  report.push({
    slug,
    action: 'synced',
    wp_source: ordered.length,
    kept: items.length,
    skipped: ordered.length - items.length,
  });
}

// Write updated projects.json
if (!DRY_RUN) {
  fs.writeFileSync(PROJECTS_JSON, JSON.stringify(projects, null, 2) + '\n', 'utf8');
}

console.log();
console.log('slug'.padEnd(52) + ' | action   | wp | kept | skipped');
console.log('-'.repeat(52 + 42));
for (const r of report) {
  if (r.action === 'synced') {
    console.log(
      r.slug.padEnd(52) +
        ' | synced   | ' +
        String(r.wp_source).padEnd(3) +
        '| ' +
        String(r.kept).padEnd(5) +
        '| ' +
        String(r.skipped),
    );
  } else {
    console.log(r.slug.padEnd(52) + ' | ' + r.action);
  }
}
console.log();
console.log(DRY_RUN ? '[dry run — no files written]' : '[done — files written]');
