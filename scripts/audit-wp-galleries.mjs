import fs from 'node:fs';
import path from 'node:path';

const ROOT = 'C:/Users/scw99/work/arkireal_homepage';
const SQL_PATH = path.join(ROOT, 'wordpress_content/buildtree.sql');
const UPLOADS_DIR = path.join(ROOT, 'wordpress_content/wordpress/wp-content/uploads');
const PROJECTS_JSON = path.join(ROOT, 'dev/arkireal_homepage/data/projects.json');

const sql = fs.readFileSync(SQL_PATH, 'utf8');

// 1. Attachments: id -> file path
const attachments = new Map();
for (const m of sql.matchAll(/\((\d+),\s*(\d+),\s*'_wp_attached_file',\s*'([^']+)'\)/g)) {
  attachments.set(parseInt(m[2]), m[3]);
}

// 2. Thumbnails: post_id -> attachment_id
const thumbs = new Map();
for (const m of sql.matchAll(/\((\d+),\s*(\d+),\s*'_thumbnail_id',\s*'(\d+)'\)/g)) {
  thumbs.set(parseInt(m[2]), parseInt(m[3]));
}

// 3. qodef_portfolio_media serialized — file contains literal bytes \"
// (one backslash + quote as PHP serialization delimiter inside SQL string)
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

// 4. Portfolio-item posts (id + title)
const portfolios = [];
for (const line of sql.split('\n')) {
  if (!line.includes("'portfolio-item'")) continue;
  if (!line.includes("'publish'")) continue;
  const idM = line.match(/^\((\d+),/);
  const titleM = line.match(/,\s*'([^']*)',\s*'',\s*'publish'/);
  if (!idM) continue;
  portfolios.push({ id: parseInt(idM[1]), title: titleM ? titleM[1] : '(?)' });
}

console.log('portfolios:', portfolios.length);
console.log('galleries found:', galleries.size);
console.log('attachments:', attachments.size);
console.log('thumbs:', thumbs.size);
console.log();

// 5. Filter to Korean-titled portfolios and report
const koreanOnly = portfolios.filter((p) => /[\u3131-\uD79D]/.test(p.title));
console.log('Korean portfolios:', koreanOnly.length);
console.log();

// Current projects.json for cross-check
const currentProjects = JSON.parse(fs.readFileSync(PROJECTS_JSON, 'utf8'));
const currentById = new Map(currentProjects.map((p) => [p.id, p]));

const report = [];

for (const { id, title } of koreanOnly) {
  const thumbId = thumbs.get(id);
  const gal = galleries.get(id) || [];
  const allIds = [];
  if (thumbId) allIds.push(thumbId);
  gal.forEach((g) => {
    if (!allIds.includes(g)) allIds.push(g);
  });

  const resolved = allIds.map((aid) => {
    const file = attachments.get(aid);
    if (!file) return { id: aid, file: null, exists: false };
    return { id: aid, file, exists: fs.existsSync(path.join(UPLOADS_DIR, file)) };
  });
  const missingFiles = resolved.filter((r) => !r.exists).length;
  const current = currentById.get(id);
  const currentGalleryLen = current ? current.gallery.length : 0;
  const diff = resolved.length - currentGalleryLen;

  report.push({
    id,
    title,
    wp_total: resolved.length,
    wp_missing: missingFiles,
    current_total: currentGalleryLen,
    diff,
    resolved,
  });
}

// Sort by biggest diff first (where current is most behind WP)
report.sort((a, b) => b.diff - a.diff);

console.log('id      | wp | cur | diff | missing | title');
console.log('--------+----+-----+------+---------+------');
for (const r of report) {
  console.log(
    String(r.id).padEnd(7) +
      '| ' +
      String(r.wp_total).padEnd(3) +
      '| ' +
      String(r.current_total).padEnd(4) +
      '| ' +
      (r.diff >= 0 ? '+' + r.diff : String(r.diff)).padEnd(5) +
      '| ' +
      String(r.wp_missing).padEnd(8) +
      '| ' +
      r.title,
  );
}

// Miryang deep dive
const miryang = report.find((r) => r.id === 9547);
if (miryang) {
  console.log();
  console.log('=== Miryang (9547) detail ===');
  miryang.resolved.forEach((r) => {
    console.log('  ', String(r.id).padEnd(6), r.exists ? 'OK    ' : 'MISS  ', r.file || '(no file)');
  });
}

// Write machine-readable report for programmatic use
fs.writeFileSync(
  path.join(ROOT, 'dev/arkireal_homepage/scripts/.audit-report.json'),
  JSON.stringify(report, null, 2),
  'utf8',
);
console.log('\n(wrote .audit-report.json)');
