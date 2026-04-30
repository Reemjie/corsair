export type CellType = 'fog' | 'sea' | 'storm' | 'pirate' | 'treasure' | 'port' | 'kraken' | 'wreck' | 'island' | 'rocks' | 'maelstrom' | 'cursed_treasure' | 'ancient_kraken';
export type UpgradeId = 'vision' | 'power' | 'escape' | 'detector' | 'armor' | 'compass' | 'ghost' | 'hunter' | 'rider' | 'stormbreaker' | 'greed' | 'berserker' | 'explorer';

export interface Cell {
  type: CellType;
  revealed: boolean;
  visited: boolean;
  stormed: boolean;
  value: number;
}

export interface EventChoice {
  label: string;
  desc: string;
  icon: string;
  risk: 'safe' | 'risky' | 'bold';
}

export interface ActiveEvent {
  cellType: CellType;
  choices: [EventChoice, EventChoice];
}

export interface Ship {
  x: number;
  y: number;
  hull: number;
  maxHull: number;
  gold: number;
  power: number;
  vision: number;
  upgrades: UpgradeId[];
}

export interface GameState {
  grid: Cell[][];
  ship: Ship;
  event: ActiveEvent | null;
  turn: number;
  score: number;
  depth: number;
  seed: number;
  rngState: number;
  log: string;
  gameOver: boolean;
  showPort: boolean;
  stormDistance: number;
  upgradeToken: boolean;
  escapeUsed: boolean;
  dangerStreak: number;
  scoreMultiplier: number;
  notoriety: number;
  curses: string[];
  exploits: string[];
  lowestHull: number;
  runTitle: string;
  zone: number;
  portUpgrades: string[];
  hunter: { x: number; y: number; active: boolean } | null;
}
