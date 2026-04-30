// Deterministic RNG from seed
export function createRng(seed: number) {
  let state = seed;
  return {
    next(): number {
      state = (state * 1664525 + 1013904223) & 0xffffffff;
      return (state >>> 0) / 0xffffffff;
    },
    int(min: number, max: number): number {
      return Math.floor(this.next() * (max - min + 1)) + min;
    },
    pick<T>(arr: T[]): T {
      return arr[Math.floor(this.next() * arr.length)];
    },
    getState(): number { return state; },
  };
}

export type Rng = ReturnType<typeof createRng>;
