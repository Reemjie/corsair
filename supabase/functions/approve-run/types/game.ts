export type CellType = 'fog' | 'sea' | 'storm' | 'pirate' | 'treasure' | 'port' | 'kraken' | 'wreck' | 'island' | 'rocks' | 'maelstrom' | 'cursed_treasure' | 'ancient_kraken' | 'portal';
export type CurseId = 'kraken_curse' | 'cursed_treasure' | 'ancient_curse';
export type ExploitId = 'survival' | 'streak5' | 'krakenlow' | 'brokebut' | 'ancient' | 'legendary';

export type UpgradeId = 'ghost' | 'hunter' | 'rider' | 'greed' | 'berserker' | 'escape' | 'vision' | 'compass' | 'detector' | 'power' | 'armor' | 'explorer' | 'stormbreaker';

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

export interface ShipLevels {
  hull: 0 | 1 | 2;   // 0=N1, 1=N2, 2=N3
  weapon: 0 | 1 | 2;
  nav: 0 | 1 | 2;
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
  levels: ShipLevels;
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
  curses: CurseId[];
  relics: string[];
  exploits: ExploitId[];
  lowestHull: number;
  shipType?: string;
  runTitle: string;
  treasuresFound: number;
  portsVisited: number;
  piratesFought: number;
  krakenKilled: boolean;
  ancientKrakenKilled: boolean;
  hunterAttacksSurvived: number;
  maelstromSurvived: boolean;
  comboTurn: number;
  stormDistanceMin: number;
  cursedTreasureTaken: boolean;
  currentZone: number;
  zoneEntryTurn: number;
  portalSpawned: boolean;
  portalHint: string | null;
  zone: number;
  portUpgrades: UpgradeId[];
  maxedComponents: number;
  hunter: { x: number; y: number; active: boolean; mode: 'tracking' | 'stalking' | 'frenzy' | 'searching'; searchTurns: number; frenzyTurns: number; awareness: number; skipTurn?: boolean; lastMoveDir?: 'h' | 'v' | null } | null;
  hunterTarget: { x: number; y: number } | null;
  hunterTargetHistory: { x: number; y: number }[];
  scoreBreakdown: { movement: number; combat: number; treasure: number; streaks: number; achievements: number; other: number };
}
