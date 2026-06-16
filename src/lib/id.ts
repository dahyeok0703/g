/** Slugify a name into a stable-ish id, with a custom prefix + short suffix. */
export function customId(prefix: string, name: string): string {
  const slug = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9가-힣]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 24);
  const suffix = Math.random().toString(36).slice(2, 6);
  return `${prefix}-${slug || 'item'}-${suffix}`;
}
