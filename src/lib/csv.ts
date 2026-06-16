// Minimal CSV parser (handles quoted fields, commas, escaped quotes) for the
// flat weapon-list bulk path. Nested data (platforms/countries) should use JSON.

export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let field = '';
  let row: string[] = [];
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else inQuotes = false;
      } else field += c;
    } else if (c === '"') inQuotes = true;
    else if (c === ',') {
      row.push(field);
      field = '';
    } else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(field);
      field = '';
      if (row.some((f) => f.trim() !== '')) rows.push(row);
      row = [];
    } else field += c;
  }
  if (field !== '' || row.length) {
    row.push(field);
    if (row.some((f) => f.trim() !== '')) rows.push(row);
  }
  return rows;
}

const NUMERIC_FIELDS = new Set([
  'introduced',
  'range_km',
  'speed_mach',
  'warhead_kg',
  'penetration_mm',
  'rof_rpm',
  'caliber_mm',
]);

/**
 * Parse a flat weapons CSV into weapon-shaped objects. Header row required.
 * `guidance` is pipe-separated (e.g. "active-radar|inertial").
 */
export function csvToWeapons(text: string): unknown[] {
  const rows = parseCsv(text);
  if (rows.length < 2) return [];
  const header = rows[0].map((h) => h.trim());
  return rows.slice(1).map((cols) => {
    const obj: Record<string, unknown> = {};
    header.forEach((key, i) => {
      const v = (cols[i] ?? '').trim();
      if (v === '') return;
      if (NUMERIC_FIELDS.has(key)) obj[key] = Number(v);
      else if (key === 'guidance') obj[key] = v.split('|').map((g) => g.trim()).filter(Boolean);
      else obj[key] = v;
    });
    return obj;
  });
}
