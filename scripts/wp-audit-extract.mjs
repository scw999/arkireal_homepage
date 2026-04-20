/**
 * Extract WordPress portfolio post thumbnail mappings and find drawing/plan files.
 * Writes results to wp-audit.json.
 *
 * Strategy: Parse wp_posts and wp_postmeta line by line. Each row in the SQL dump
 * is on its own line as a tuple like "(id, ..., post_type, ...),"
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';
import { createReadStream } from 'fs';
import { createInterface } from 'readline';

const SQL_PATH = 'C:/Users/scw99/work/arkireal_homepage/wordpress_content/buildtree.sql';
const PROJECTS_PATH = 'C:/Users/scw99/work/arkireal_homepage/dev/arkireal_homepage/data/projects.json';
const UPLOADS_ROOT = 'C:/Users/scw99/work/arkireal_homepage/wordpress_content/wordpress/wp-content/uploads';
const OUTPUT_PATH = 'C:/Users/scw99/work/arkireal_homepage/dev/arkireal_homepage/scripts/wp-audit.json';

const projects = JSON.parse(readFileSync(PROJECTS_PATH, 'utf-8'));
const projectIds = new Set(projects.map(p => p.id));

const posts = new Map(); // id -> {title, slug, type, parent, mimeType, guid}
const postmeta = new Map(); // post_id -> Map<meta_key, meta_value>

const WANTED_META_KEYS = new Set(['_thumbnail_id', '_wp_attached_file', 'qodef_portfolio_list_image', 'qodef_portfolio_media']);

// ── Parse SQL line by line ──
async function parseSql() {
  const rl = createInterface({
    input: createReadStream(SQL_PATH, 'utf-8'),
    crlfDelay: Infinity
  });

  let currentTable = null; // 'wp_posts' or 'wp_postmeta' or null

  for await (const line of rl) {
    // Detect which table we're inserting into
    if (line.startsWith('INSERT INTO `wp_posts`')) {
      currentTable = 'wp_posts';
    } else if (line.startsWith('INSERT INTO `wp_postmeta`')) {
      currentTable = 'wp_postmeta';
    } else if (line.startsWith('INSERT INTO') || line.startsWith('CREATE TABLE') || line.startsWith('--')) {
      currentTable = null;
    }

    // Parse tuple lines (start with "(")
    const trimmed = line.trim();
    if (!trimmed.startsWith('(')) continue;
    if (!currentTable) continue;

    if (currentTable === 'wp_posts') {
      parsePostLine(trimmed);
    } else if (currentTable === 'wp_postmeta') {
      parseMetaLine(trimmed);
    }
  }
}

function parsePostLine(line) {
  // Each line is a tuple like: (ID, author, date, date_gmt, content, title, excerpt, status, ...)
  // We need: ID(0), post_title(5), post_name(11), post_parent(17), guid(18), post_type(20), post_mime_type(21)
  const result = parseTuple(line, 0);
  if (!result) return;
  const f = result.fields;
  if (f.length < 21) return;

  const id = parseInt(f[0]);
  const postType = f[20];

  if (postType === 'portfolio-item' || postType === 'attachment') {
    posts.set(id, {
      title: f[5],
      slug: f[11],
      type: postType,
      parent: parseInt(f[17]),
      mimeType: f[21] || '',
      guid: f[18]
    });
  }
}

function parseMetaLine(line) {
  // Each line: (meta_id, post_id, meta_key, meta_value)
  const result = parseTuple(line, 0);
  if (!result) return;
  const f = result.fields;
  if (f.length < 4) return;

  const postId = parseInt(f[1]);
  const metaKey = f[2];
  const metaValue = f[3];

  if (WANTED_META_KEYS.has(metaKey)) {
    if (!postmeta.has(postId)) postmeta.set(postId, new Map());
    postmeta.get(postId).set(metaKey, metaValue);
  }
}

function parseTuple(str, startIdx) {
  if (str[startIdx] !== '(') return null;

  const fields = [];
  let i = startIdx + 1;
  let currentField = '';
  let inString = false;
  let depth = 0;

  while (i < str.length) {
    const ch = str[i];

    if (inString) {
      if (ch === '\\') {
        currentField += str[i + 1] || '';
        i += 2;
        continue;
      }
      if (ch === "'") {
        if (str[i + 1] === "'") {
          currentField += "'";
          i += 2;
          continue;
        }
        inString = false;
        i++;
        continue;
      }
      currentField += ch;
      i++;
      continue;
    }

    if (ch === "'") {
      inString = true;
      i++;
      continue;
    }

    if (ch === '(') {
      depth++;
      currentField += ch;
      i++;
      continue;
    }

    if (ch === ')') {
      if (depth > 0) {
        depth--;
        currentField += ch;
        i++;
        continue;
      }
      fields.push(currentField.trim());
      return { fields, end: i + 1 };
    }

    if (ch === ',' && depth === 0) {
      fields.push(currentField.trim());
      currentField = '';
      i++;
      continue;
    }

    currentField += ch;
    i++;
  }

  return null;
}

// ── Scan uploads ──
const PLAN_PATTERNS = ['평면', '도면', '입면', '단면', '배치', '면적'];

function walkDir(dir) {
  const results = [];
  try {
    const entries = readdirSync(dir);
    for (const entry of entries) {
      const full = join(dir, entry);
      try {
        const stat = statSync(full);
        if (stat.isDirectory()) {
          results.push(...walkDir(full));
        } else if (/\.(jpe?g|png|gif|webp|pdf|tif)$/i.test(entry)) {
          results.push(full);
        }
      } catch (_) {}
    }
  } catch (_) {}
  return results;
}

// ── Main ──
async function main() {
  console.log('Parsing SQL...');
  await parseSql();

  const portfolioPosts = [...posts.values()].filter(p => p.type === 'portfolio-item');
  const attachmentPosts = [...posts.values()].filter(p => p.type === 'attachment');
  console.log(`Found ${portfolioPosts.length} portfolio-item posts`);
  console.log(`Found ${attachmentPosts.length} attachment posts`);
  console.log(`Found ${postmeta.size} posts with relevant meta`);

  console.log('Scanning uploads directory...');
  const allUploads = walkDir(UPLOADS_ROOT);
  console.log(`Found ${allUploads.length} image files in uploads`);

  const uploadsIndex = new Map();
  for (const f of allUploads) {
    const rel = relative(UPLOADS_ROOT, f).replace(/\\/g, '/');
    uploadsIndex.set(rel, f);
  }

  // ── Build the audit result ──
  const result = {};

  for (const project of projects) {
    const pid = project.id;
    const entry = {
      title: project.title,
      slug: project.slug,
      wp_post_found: false,
      wp_title: null,
      wp_thumbnail_id: null,
      wp_thumbnail_file: null,
      wp_thumbnail_exists_in_uploads: false,
      wp_list_image_id: null,
      wp_list_image_file: null,
      current_featuredImage: project.featuredImage || null,
      thumbnail_matches: null,
      drawing_files: [],
      wp_attachment_count: 0,
      wp_attachments: []
    };

    const wpPost = posts.get(pid);
    if (wpPost) {
      entry.wp_post_found = true;
      entry.wp_title = wpPost.title;

      const meta = postmeta.get(pid);
      if (meta) {
        if (meta.has('_thumbnail_id')) {
          const thumbId = parseInt(meta.get('_thumbnail_id'));
          entry.wp_thumbnail_id = thumbId;

          const thumbMeta = postmeta.get(thumbId);
          if (thumbMeta && thumbMeta.has('_wp_attached_file')) {
            entry.wp_thumbnail_file = thumbMeta.get('_wp_attached_file');
          } else {
            const thumbPost = posts.get(thumbId);
            if (thumbPost && thumbPost.guid) {
              const m = thumbPost.guid.match(/uploads\/(.+)/);
              if (m) entry.wp_thumbnail_file = m[1];
            }
          }

          if (entry.wp_thumbnail_file) {
            entry.wp_thumbnail_exists_in_uploads = uploadsIndex.has(entry.wp_thumbnail_file);
          }
        }

        if (meta.has('qodef_portfolio_list_image')) {
          const listImgId = parseInt(meta.get('qodef_portfolio_list_image'));
          entry.wp_list_image_id = listImgId;
          const listMeta = postmeta.get(listImgId);
          if (listMeta && listMeta.has('_wp_attached_file')) {
            entry.wp_list_image_file = listMeta.get('_wp_attached_file');
          } else {
            const listPost = posts.get(listImgId);
            if (listPost && listPost.guid) {
              const m = listPost.guid.match(/uploads\/(.+)/);
              if (m) entry.wp_list_image_file = m[1];
            }
          }
        }
      }
    }

    // Find all attachments whose parent is this post
    const relatedAttachments = [...posts.entries()]
      .filter(([, p]) => p.type === 'attachment' && p.parent === pid)
      .map(([id, p]) => {
        const meta = postmeta.get(id);
        const file = meta?.get('_wp_attached_file') || null;
        return { id, title: p.title, file, mimeType: p.mimeType };
      });

    entry.wp_attachment_count = relatedAttachments.length;

    // Find drawing files among related attachments
    for (const att of relatedAttachments) {
      const name = (att.title + ' ' + (att.file || '')).toLowerCase();
      const isDrawing = PLAN_PATTERNS.some(pat => name.includes(pat));
      if (isDrawing) {
        entry.drawing_files.push({
          attachment_id: att.id,
          title: att.title,
          file: att.file,
          exists_in_uploads: att.file ? uploadsIndex.has(att.file) : false
        });
      }
    }

    // Also look for drawing files in uploads that might belong to this project
    // by checking attachment files in the same upload month folders
    const projectAttFiles = new Set(relatedAttachments.map(a => a.file).filter(Boolean));
    const uploadMonths = new Set();
    for (const f of projectAttFiles) {
      const parts = f.split('/');
      if (parts.length >= 2) uploadMonths.add(parts[0] + '/' + parts[1]);
    }

    // Find drawing files in uploads that are resized versions of this project's known attachments
    // (skip the noisy month-based scan that mixes other projects)
    if (projectAttFiles.size > 0) {
      // For each attachment file, find resized versions that are drawings
      const drawingOriginals = new Set(entry.drawing_files.map(d => d.file).filter(Boolean));
      const additionalDrawings = [];
      for (const origFile of projectAttFiles) {
        // Check if this file is a drawing original
        const fileName = origFile.split('/').pop();
        const isDrawing = PLAN_PATTERNS.some(pat => fileName.includes(pat));
        if (isDrawing && !drawingOriginals.has(origFile)) {
          // This is a drawing attachment not yet in drawing_files (shouldn't happen, but just in case)
          additionalDrawings.push(origFile);
        }
      }
      if (additionalDrawings.length > 0) {
        entry.additional_drawing_files = additionalDrawings;
      }
    }

    entry.wp_attachments = relatedAttachments.map(a => ({
      id: a.id,
      title: a.title,
      file: a.file
    }));

    if (entry.wp_thumbnail_file && entry.current_featuredImage) {
      entry.thumbnail_matches = false;
    }

    result[pid] = entry;
  }

  writeFileSync(OUTPUT_PATH, JSON.stringify(result, null, 2), 'utf-8');
  console.log(`\nWrote audit to ${OUTPUT_PATH}`);
  console.log(`Projects audited: ${Object.keys(result).length}`);

  // Summary
  let withThumb = 0, withListImg = 0, withDrawings = 0, missingInWp = 0, thumbExists = 0;
  for (const e of Object.values(result)) {
    if (e.wp_thumbnail_file) withThumb++;
    if (e.wp_list_image_file) withListImg++;
    if (e.drawing_files.length > 0) withDrawings++;
    if (!e.wp_post_found) missingInWp++;
    if (e.wp_thumbnail_exists_in_uploads) thumbExists++;
  }
  console.log(`With WP thumbnail: ${withThumb} (${thumbExists} exist in uploads)`);
  console.log(`With WP list image: ${withListImg}`);
  console.log(`With drawing files: ${withDrawings}`);
  console.log(`Missing in WP: ${missingInWp}`);
}

main().catch(console.error);
