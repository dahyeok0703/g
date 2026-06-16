// Number / unit formatters for the HUD readouts.

const KO_UNITS: [number, string][] = [
  [1e12, '조'],
  [1e8, '억'],
  [1e4, '만'],
];

/** Compact Korean number (e.g. 842000000000 → "8,420억"). */
export function koNumber(n?: number): string {
  if (n == null) return '—';
  if (n === 0) return '0';
  for (const [unit, label] of KO_UNITS) {
    if (Math.abs(n) >= unit) {
      const v = n / unit;
      return `${v >= 100 ? Math.round(v).toLocaleString() : v.toFixed(1)}${label}`;
    }
  }
  return n.toLocaleString();
}

/** USD budget → compact "$842.0B". */
export function usd(n?: number): string {
  if (n == null) return '—';
  if (n >= 1e9) return `$${(n / 1e9).toFixed(1)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(0)}M`;
  return `$${n.toLocaleString()}`;
}

export function intl(n?: number): string {
  return n == null ? '—' : n.toLocaleString();
}

export function km(n?: number): string {
  return n == null ? '—' : `${n.toLocaleString()} km`;
}
