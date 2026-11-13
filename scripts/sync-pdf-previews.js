/**
 * Utility script to scan all PDFs in public/documentos-pdf/
 * and generate high-resolution WebP previews in the exact same folder.
 *
 * Runs automatically or via `node scripts/sync-pdf-previews.js`.
 */

const fs = require('fs');
const path = require('path');
const { createCanvas } = require('@napi-rs/canvas');
const sharp = require('sharp');

async function processPdfFile(pdfPath) {
  const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');
  const pdfStats = fs.statSync(pdfPath);
  const dir = path.dirname(pdfPath);
  const ext = path.extname(pdfPath);
  const base = path.basename(pdfPath, ext);

  const p1Path = path.join(dir, `${base}-p1.webp`);
  if (fs.existsSync(p1Path)) {
    const p1Stats = fs.statSync(p1Path);
    if (p1Stats.mtimeMs >= pdfStats.mtimeMs) {
      console.log(`[sync-pdf] Up to date: ${path.relative('.', p1Path)}`);
      return;
    }
  }

  console.log(`[sync-pdf] Rendering: ${path.relative('.', pdfPath)} ...`);
  const buf = fs.readFileSync(pdfPath);
  const pdf = await pdfjs.getDocument({ data: new Uint8Array(buf) }).promise;

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const vp = page.getViewport({ scale: 2.0 });
    const canvas = createCanvas(Math.round(vp.width), Math.round(vp.height));
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    await page.render({ canvasContext: ctx, viewport: vp }).promise;

    const pngBuf = canvas.toBuffer('image/png');
    const outWebpPath = path.join(dir, `${base}-p${i}.webp`);
    await sharp(pngBuf).webp({ quality: 90 }).toFile(outWebpPath);
    console.log(`  -> Created ${path.relative('.', outWebpPath)}`);
  }
}

async function scanDirectory(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await scanDirectory(fullPath);
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.pdf')) {
      await processPdfFile(fullPath);
    }
  }
}

async function main() {
  const targetDir = path.resolve('public', 'documentos-pdf');
  console.log(`Scanning PDFs in: ${targetDir}`);
  await scanDirectory(targetDir);
  console.log('[sync-pdf] All PDF previews synchronized successfully!');
}

main().catch(console.error);

