// Deterministic seeded RNG (mulberry32) so simulations are reproducible from a
// seed (spec §4.6: "난수 시드").
export function makeRng(seed: number): () => number {
  let a = seed >>> 0 || 1;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Symmetric jitter in [1-amp, 1+amp]. */
export function jitter(rng: () => number, amp: number): number {
  return 1 + (rng() * 2 - 1) * amp;
}
