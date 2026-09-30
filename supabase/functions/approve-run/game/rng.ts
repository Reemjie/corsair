export function seededRng(seed: number) {
  let s = seed;
  return {
    next: () => { s = (s * 1664525 + 1013904223) & 0xffffffff; return (s >>> 0) / 0xffffffff; },
    int:  (min: number, max: number) => { s = (s * 1664525 + 1013904223) & 0xffffffff; return Math.floor(((s >>> 0) / 0xffffffff) * (max - min + 1)) + min; },
    getState: () => s,
  };
}

export type Rng = ReturnType<typeof seededRng>;
