#!/usr/bin/env node
// Convert a flat weapons CSV into a GMDB bulk dataset JSON ({ "weapons": [...] }).
// For very large external files prepared offline. No dependencies.
//
//   node scripts/csv-to-dataset.mjs input.csv output.json
//
// CSV header (first row), guidance pipe-separated:
//   id,name,nameKo,category,role,origin,introduced,range_km,speed_mach,
//   warhead_kg,penetration_mm,rof_rpm,caliber_mm,guidance

import { readFileSync, writeFileSync } from 'node:fs';

const [, , inPath, outPath = 'dataset.json'] = process.argv;
if (!inPath) {
  console.error('usage: node scripts/csv-to-dataset.mjs <input.csv> [output.json]');
  process.exit(1);
}

const NUMERIC = new Set(['introduced', 'range_km', 'speed_mach', 'warhead_kg', 'penetration_mm', 'rof_rpm', 'caliber_mm']);

function parseCsv(text) {
  const rows = [];
  let field = '', row = [], q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"') { if (text[i + 1] === '"') { field += '"'; i++; } else q = false; }
      else field += c;
    } else if (c === '"') q = true;
    else if (c === ',') { row.push(field); field = ''; }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(field); field = '';
      if (row.some((f) => f.trim() !== '')) rows.push(row);
      row = [];
    } else field += c;
  }
  if (field !== '' || row.length) { row.push(field); if (row.some((f) => f.trim() !== '')) rows.push(row); }
  return rows;
}

const rows = parseCsv(readFileSync(inPath, 'utf8'));
const header = rows[0].map((h) => h.trim());
const weapons = rows.slice(1).map((cols) => {
  const o = {};
  header.forEach((k, i) => {
    const v = (cols[i] ?? '').trim();
    if (v === '') return;
    if (NUMERIC.has(k)) o[k] = Number(v);
    else if (k === 'guidance') o[k] = v.split('|').map((g) => g.trim()).filter(Boolean);
    else o[k] = v;
  });
  return o;
});

writeFileSync(outPath, JSON.stringify({ version: '1', weapons }, null, 2));
console.log(`✓ ${weapons.length} weapons → ${outPath}`);
