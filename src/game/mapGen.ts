import type { Cell, CellType } from '../types/game';

const SIZE = 12;

function seededRng(seed: number) {
  let s = seed;
  return () => { s = (s * 1664525 + 1013904223) & 0xffffffff; return (s >>> 0) / 0xffffffff; };
}

// Poids par zone : early (bas), mid, late (haut)
function getWeights(y: number, upgrades: string[] = []): { type: CellType; w: number }[] {
  const zone = y >= 5 ? 'early' : y >= 3 ? 'mid' : 'late';
  const greedPenalty = upgrades.includes('greed') ? 0.3 : 1;
  if (zone === 'early') return [
    { type: 'sea', w: 35 }, { type: 'storm', w: 8 }, { type: 'pirate', w: 10 },
    { type: 'treasure', w: 14 }, { type: 'port', w: Math.floor(10 * greedPenalty) }, { type: 'kraken', w: 1 },
    { type: 'wreck', w: 10 }, { type: 'island', w: 10 }, { type: 'rocks', w: 2 },
  ];
  if (zone === 'mid') return [
    { type: 'sea', w: 24 }, { type: 'storm', w: 13 }, { type: 'pirate', w: 15 },
    { type: 'treasure', w: 11 }, { type: 'port', w: Math.floor(9 * greedPenalty) }, { type: 'kraken', w: 3 },
    { type: 'wreck', w: 10 }, { type: 'island', w: 8 }, { type: 'rocks', w: 6 },
    { type: 'maelstrom', w: 2 }, { type: 'cursed_treasure', w: 2 },
  ];
  // late
  return [
    { type: 'sea', w: 13 }, { type: 'storm', w: 16 }, { type: 'pirate', w: 18 },
    { type: 'treasure', w: 12 }, { type: 'port', w: 3 }, { type: 'kraken', w: 7 },
    { type: 'wreck', w: 7 }, { type: 'island', w: 5 }, { type: 'rocks', w: 7 },
    { type: 'maelstrom', w: 3 }, { type: 'cursed_treasure', w: 3 }, { type: 'ancient_kraken', w: 2 },
  ];
}

export function generateGrid(seed: number, upgrades: string[] = []): Cell[][] {
  const rng = seededRng(seed);
  const grid: Cell[][] = [];
  for (let y = 0; y < SIZE; y++) {
    grid[y] = [];
    const weights = getWeights(y, upgrades);
    const total = weights.reduce((s, w) => s + w.w, 0);
    for (let x = 0; x < SIZE; x++) {
      let r = rng() * total, type: CellType = 'sea';
      for (const w of weights) { r -= w.w; if (r <= 0) { type = w.type; break; } }
      const value = type === 'treasure' ? Math.floor(rng() * 80 + 20)
        : type === 'pirate' ? Math.floor(rng() * 6 + 2)
        : type === 'kraken' ? 15 : 0;
      grid[y][x] = { type, revealed: false, visited: false, stormed: false, value };
    }
  }
  // Start safe
  const cx = Math.floor(SIZE/2), cy = SIZE-1;
  grid[cy][cx] = { type: 'sea', revealed: true, visited: true, stormed: false, value: 0 };
  grid[cy][cx-1] = { type: 'sea', revealed: true, visited: false, stormed: false, value: 0 };
  grid[cy][cx+1] = { type: 'sea', revealed: true, visited: false, stormed: false, value: 0 };
  grid[cy-1][cx] = { type: 'sea', revealed: true, visited: false, stormed: false, value: 0 };
  return grid;
}

export function revealAround(grid: Cell[][], x: number, y: number, vision: number): Cell[][] {
  const g = grid.map(r => r.map(c => ({ ...c })));
  for (let dy = -vision; dy <= vision; dy++) {
    for (let dx = -vision; dx <= vision; dx++) {
      const nx = x+dx, ny = y+dy;
      if (nx>=0&&nx<SIZE&&ny>=0&&ny<SIZE) g[ny][nx].revealed = true;
    }
  }
  return g;
}

export const GRID_SIZE = SIZE;

export function generateTutorialGrid(): ReturnType<typeof generateGrid> {
  const EMPTY = (): Cell => ({ type: 'sea' as CellType, revealed: false, visited: false, stormed: false, value: 0 });
  const CELL = (type: CellType): Cell => ({ type, revealed: false, visited: false, stormed: false, value: 0 });
  
  const grid: Cell[][] = Array.from({ length: GRID_SIZE }, () =>
    Array.from({ length: GRID_SIZE }, () => EMPTY())
  );
  
  const cx = Math.floor(GRID_SIZE / 2);
  const cy = GRID_SIZE - 2; // 10
  
  // Step 1+2: two sea cells ahead
  grid[cy-1][cx] = CELL('sea');
  grid[cy-1][cx-1] = CELL('sea');
  grid[cy-1][cx+1] = CELL('sea');
  
  grid[cy-2][cx] = CELL('sea');
  grid[cy-2][cx-1] = CELL('sea');
  grid[cy-2][cx+1] = CELL('sea');
  
  // Step 3: pirates directly ahead
  grid[cy-3][cx] = CELL('pirate');
  grid[cy-3][cx-1] = CELL('sea');
  grid[cy-3][cx+1] = CELL('sea');
  
  // Step 4: port to the right after pirates
  grid[cy-4][cx] = CELL('sea');
  grid[cy-4][cx-1] = CELL('sea');
  grid[cy-4][cx+1] = CELL('port');
  
  // Beyond
  grid[cy-5][cx] = CELL('sea');
  grid[cy-5][cx-1] = CELL('sea');
  grid[cy-5][cx+1] = CELL('sea');
  
  return grid;
}
