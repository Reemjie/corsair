import { seededRng, type Rng } from './rng';
import { BALANCE, ZONE_CONFIG } from './balance';
import { getStreakEffects, getSynergies } from './systems/streak';
import type { GameState, Ship, ActiveEvent, UpgradeId, CellType } from '../types/game';
import { generateGrid, revealAround, GRID_SIZE } from './mapGen';
import { getEquippedTitle } from './feats';
import { rollRelic } from './relics';


// ─── STREAK EFFECTS ──────────────────────────────────────────────────────────


// ─── SYNERGIES ────────────────────────────────────────────────────────────────

// ─── BUILD EVENT ─────────────────────────────────────────────────────────────
function buildEvent(type: CellType, power: number): ActiveEvent {
  switch(type) {
    case 'wreck': return { cellType: type, choices: [
      { label: 'Search it',       desc: 'Risk a trap for gold',          icon: 'search', risk: 'risky' },
      { label: 'Something lurks', desc: 'Kraken nearby — flee or fight', icon: 'lurks', risk: 'bold'  },
    ]};
    case 'pirate': return { cellType: type, choices: [
      { label: 'Fight',       desc: power >= 6 ? 'Your cannons help' : 'Dangerous but rewarding', icon: 'fight', risk: power >= 6 ? 'risky' : 'bold' },
      { label: 'Pay tribute', desc: 'Lose gold, stay safe',                                        icon: 'tribute', risk: 'safe' },
    ]};
    case 'kraken': return { cellType: type, choices: [
      { label: 'Attack', desc: 'High risk, massive reward',                   icon: 'fight', risk: 'bold'  },
      { label: 'Pact',   desc: '-20 HP, storm +6 turns. Hunter awakens!',    icon: 'pact', risk: 'risky' },
    ]};
    case 'storm': return { cellType: type, choices: [
      { label: 'Push through', desc: 'No storm turn lost, hull risk',     icon: 'push', risk: 'risky' },
      { label: 'Go around',    desc: 'Safe but storm gains 1 extra turn', icon: 'detour', risk: 'safe'  },
    ]};
    case 'treasure': return { cellType: type, choices: [
      { label: 'Take it',  desc: 'Grab the gold (+score). The Hunter grows aware (+15).', icon: 'take',  risk: 'risky' },
      { label: 'Leave it', desc: 'Slip away: Hunter −20 awareness, +restraint score.', icon: 'leave', risk: 'safe' },
    ]};
    case 'port': return { cellType: type, choices: [
      { label: 'Dock',    desc: 'Repair and upgrade', icon: 'dock', risk: 'safe' },
      { label: 'Sail on', desc: 'No time to stop',    icon: 'sail', risk: 'safe' },
    ]};
    case 'island': return { cellType: type, choices: [
      { label: 'Ancient Ritual', desc: 'Pay 100g → push the storm back +4 turns, +score.', icon: 'ritual', risk: 'safe'  },
      { label: 'Explore freely', desc: '50% chance of a free upgrade token.', icon: 'explore', risk: 'risky' },
    ]};
    case 'rocks': return { cellType: type, choices: [
      { label: 'Navigate carefully', desc: 'No damage, but the storm gains ground.', icon: 'careful', risk: 'safe'  },
      { label: 'Full speed',         desc: 'Gain distance on the storm (+1). Risk hull damage.', icon: 'speed', risk: 'risky' },
    ]};
    case 'portal': return { cellType: type, choices: [
      { label: 'Enter the portal', desc: 'Cross into the next zone', icon: 'vortex', risk: 'bold' },
      { label: 'Turn back',        desc: 'Stay in this zone',        icon: 'leave',  risk: 'safe' },
    ]};
    case 'maelstrom': return { cellType: type, choices: [
      { label: 'Enter the vortex',  desc: 'Teleport — insane risk/reward', icon: 'vortex', risk: 'bold' },
      { label: 'Fight the current', desc: 'Lose 1 storm turn, stay safe',  icon: 'dock', risk: 'safe' },
    ]};
    case 'cursed_treasure': return { cellType: type, choices: [
      { label: 'Take the gold', desc: '+300 gold but receive a curse', icon: 'cursed', risk: 'bold' },
      { label: 'Leave it',      desc: 'Walk away clean',               icon: 'leave', risk: 'safe' },
    ]};
    case 'ancient_kraken': return { cellType: type, choices: [
      { label: 'Face the Ancient', desc: 'Legendary fight — massive reward', icon: 'fight', risk: 'bold'  },
      { label: 'Offer sacrifice',  desc: '-50 gold, it lets you pass',        icon: 'sacrifice', risk: 'risky' },
    ]};
    default: return { cellType: type, choices: [
      { label: 'Continue',    desc: 'Sail on',             icon: 'sail', risk: 'safe' },
      { label: 'Look around', desc: 'Use a turn to scout', icon: '🔭', risk: 'safe' },
    ]};
  }
}

// ─── COMPUTE TITLE ───────────────────────────────────────────────────────────
function computeTitle(s: GameState): string {
  // Titre porte manuellement (feat equipe) -> priorite absolue, c'est l'identite choisie par le joueur
  const worn = getEquippedTitle();
  if (worn) return worn;
  if (s.exploits.includes('ancient'))                              return 'Legend of the Seas';
  if (s.exploits.includes('krakenlow'))                            return 'Scourge of the Abyss';
  if (s.ship.upgrades.includes('greed') && s.ship.gold > 500)     return 'Cursed Merchant';
  if (s.ship.upgrades.includes('berserker') && s.notoriety >= 8)  return 'Sea Berserker';
  if (s.ship.upgrades.includes('rider'))                           return 'Storm Dancer';
  if (s.ship.upgrades.includes('ghost'))                           return 'Ghost of the Seas';
  if (s.notoriety >= 8)                                            return 'Pirate Scourge';
  if (s.curses.length >= 2)                                        return 'Cursed Survivor';
  if (s.exploits.includes('survival'))                             return 'The Miraculed';
  if (s.exploits.includes('streak5'))                              return 'Reckless Corsair';
  if (s.exploits.includes('brokebut'))                             return 'Sea Wanderer';
  if (s.ship.upgrades.includes('explorer'))                        return 'Grand Explorer';
  if (s.score > 1000)                                              return 'Legendary Corsair';
  if (s.score > 500)                                               return 'Sea Wolf';
  return 'Corsair';
}


// ─── DAILY SEED ──────────────────────────────────────────────────────────────
export function getDailyKey(): string {
  const now = new Date();
  return `${now.getUTCFullYear()}${String(now.getUTCMonth()+1).padStart(2,'0')}${String(now.getUTCDate()).padStart(2,'0')}`;
}

export function getDailySeed(): number {
  const dateStr = getDailyKey();
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = ((hash << 5) - hash) + dateStr.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % 999999;
}

export function hasDailyBeenPlayed(): boolean {
  return localStorage.getItem(`corsair_daily_${getDailyKey()}`) === 'done';
}

export function markDailyPlayed(): void {
  localStorage.setItem(`corsair_daily_${getDailyKey()}`, 'done');
}

// ─── INIT ────────────────────────────────────────────────────────────────────
export function initGame(seed?: number, shipId: string = 'default'): GameState {
  const s = seed ?? (Date.now() % 999999);
  const cx = Math.floor(GRID_SIZE / 2), cy = GRID_SIZE - 1;
  const ship: Ship = { x: cx, y: cy, hull: BALANCE.ship.startHull, maxHull: BALANCE.ship.startHull, gold: BALANCE.ship.startGold, power: BALANCE.ship.startPower, vision: BALANCE.ship.startVision, upgrades: [], levels: { hull: 0, weapon: 0, nav: 0 } };
  // Modificateurs de navire (le Daily force 'default' en amont pour l'equite)
  if (shipId === 'merchant')   { ship.gold += 80; ship.maxHull -= 5; ship.hull -= 5; }
  if (shipId === 'specter')    { ship.vision += 1; }
  if (shipId === 'breakwater') { ship.vision = Math.max(1, ship.vision - 1); ship.gold = Math.max(0, ship.gold - 25); }
  const stormStart = BALANCE.storm.initial + (shipId === 'breakwater' ? 3 : 0);
  const grid = revealAround(generateGrid(s, []), cx, cy, 1);
  return {
    grid, ship, event: null,
    turn: 0, score: 0, depth: 0,
    seed: s, rngState: s, shipType: shipId,
    log: 'The sea calls, Captain.',
    gameOver: false, showPort: false,
    stormDistance: stormStart,
    upgradeToken: false, escapeUsed: false,
    dangerStreak: 0, scoreMultiplier: 1, notoriety: 0,
    curses: [], exploits: [], lowestHull: 20,
    treasuresFound: 0, portsVisited: 0, piratesFought: 0,
    krakenKilled: false, ancientKrakenKilled: false,
    hunterAttacksSurvived: 0, maelstromSurvived: false,
    comboTurn: 999, stormDistanceMin: 99, cursedTreasureTaken: false,
    currentZone: 1, zoneEntryTurn: 0, portalSpawned: false, portalHint: null,
    runTitle: 'Corsaire', relics: [], hunter: null, hunterTarget: null, hunterTargetHistory: [],
    scoreBreakdown: { movement: 0, combat: 0, treasure: 0, streaks: 0, achievements: 0, other: 0 },
    zone: 1, portUpgrades: [], maxedComponents: 0,
  };
}

// ─── PIPELINE STEPS ──────────────────────────────────────────────────────────

type MoveContext = {
  state:         GameState;
  ship:          Ship;
  grid:          GameState['grid'];
  nx:            number;
  ny:            number;
  turn:          number;
  depth:         number;
  score:         number;
  stormDistance: number;
  gameOver:      boolean;
  log:           string;
  event:         ActiveEvent | null;
  showPort:      boolean;
  hunter:        GameState['hunter'];
  scoreBreakdown: GameState['scoreBreakdown'];
  rng:           Rng;
  zoneLabel:     'early' | 'mid' | 'late';
  dangerStreak:  number;
  scoreMultiplier: number;
};

function stepMovement(state: GameState, dx: number, dy: number, rng: Rng): MoveContext | null {
  const nx = state.ship.x + dx, ny = state.ship.y + dy;
  if (nx < 0 || nx >= GRID_SIZE || ny < 0 || ny >= GRID_SIZE) return null;

  const zoneLabel: 'early' | 'mid' | 'late' =
    ny >= Math.floor(GRID_SIZE * 0.7) ? 'early' :
    ny >= Math.floor(GRID_SIZE * 0.4) ? 'mid' : 'late';

  let ship = { ...state.ship, x: nx, y: ny };
  // Storm Rider constant dmg (applied before everything)
  const riderInterval = state.ship.levels.hull >= 2 ? 3 : 2;
  if (ship.upgrades.includes('rider') && (state.turn + 1) % riderInterval === 0) ship.hull = Math.max(1, ship.hull - 1);

  const fx = getStreakEffects(state.dangerStreak);
  const hunterSurge = state.ship.upgrades.includes('hunter') ? BALANCE.storm.hunterSurgeBonus : 0;
  const greedCorruption = state.ship.upgrades.includes('greed')
    ? Math.floor(state.ship.gold / BALANCE.greed.corruptionStep)
    : 0;
  const greedStormBonus = greedCorruption * BALANCE.greed.corruptionStormBonus;
  const streakStormBonus = fx.stormAggro;
  // Tempête plus agressive si joueur a passé la ligne 8 (mid zone)
  const midPenalty = ny <= Math.floor(GRID_SIZE * 0.6) && ny > Math.floor(GRID_SIZE * 0.3) ? 0.05 : 0;
  const rawSurgeChance = (zoneLabel === 'early' ? BALANCE.storm.surgeEarly : zoneLabel === 'mid' ? BALANCE.storm.surgeMid : BALANCE.storm.surgeLate) + hunterSurge + midPenalty + streakStormBonus + greedStormBonus;
  const zoneStormMult = ZONE_CONFIG[state.currentZone ?? 1]?.stormMultiplier ?? 1.0;
  const surgeChance = Math.min(BALANCE.storm.maxSurge, rawSurgeChance * zoneStormMult);
  const surge = rng.next() < surgeChance ? 2 : rng.next() < 0.15 ? 0 : 1;
  const stormDistance = Math.max(0, state.stormDistance - surge - (state.ship.upgrades.includes('greed') && state.turn % 3 === 0 ? 1 : 0));

  let grid = revealAround(state.grid, nx, ny, ship.vision);

  let moveLog = surge === 2 ? 'Storm surge!' : '';
  if (ship.levels.nav >= 2) {
    const previewCells: string[] = [];
    for (let dy = -2; dy <= 2; dy++) {
      for (let dx = -2; dx <= 2; dx++) {
        const px = nx + dx, py = ny + dy;
        if (px >= 0 && px < GRID_SIZE && py >= 0 && py < GRID_SIZE) {
          const c = grid[py][px];
          if (c.revealed && !c.visited && ['pirate','kraken','storm','ancient_kraken','maelstrom'].includes(c.type)) {
            previewCells.push(c.type);
          }
        }
      }
    }
    if (previewCells.length > 0) moveLog += (moveLog ? ' ' : '') + `Navigator detects: ${[...new Set(previewCells)].join(', ')}.`;
  }
  let hunterSpawnLog = '';
  const zoneHunterSpawn = ZONE_CONFIG[state.currentZone ?? 1]?.hunterSpawnTurn ?? BALANCE.hunter.spawnTurn;
  if (state.turn + 1 - (state.zoneEntryTurn ?? 0) === zoneHunterSpawn && !state.hunter) {
    hunterSpawnLog = 'Something surfaces from the deep... It has found your trail.';
  }
  const finalMoveLog = [moveLog, hunterSpawnLog].filter(Boolean).join(' ');

  const cellType = grid[ny]?.[nx]?.type ?? 'sea';
  const dangerTypes = ['pirate','kraken','storm','rocks','wreck','maelstrom','ancient_kraken','cursed_treasure','island'];
  const isSeaCell = !dangerTypes.includes(cellType) && cellType !== 'port' && cellType !== 'treasure';
  const newStreak = isSeaCell ? Math.max(0, state.dangerStreak - 1) : state.dangerStreak;
  const newMultiplier = newStreak >= 3 ? 3 : newStreak >= 2 ? 2 : 1;

  return {
    state, ship, grid, nx, ny,
    turn: state.turn + 1, depth: state.depth + 1,
    score: state.score + 5,
    scoreBreakdown: { ...state.scoreBreakdown, movement: (state.scoreBreakdown?.movement ?? 0) + 5 },
    stormDistance,
    gameOver: false, log: finalMoveLog,
    event: null, showPort: false,
    hunter: state.hunter,
    rng, zoneLabel,
    dangerStreak: newStreak,
    scoreMultiplier: newMultiplier,
  };
}

function stepStorm(ctx: MoveContext): MoveContext {
  const { stormDistance } = ctx;
  const stormFrontY = stormDistance <= 0 ? -1 : GRID_SIZE + 2 - Math.floor((10 - stormDistance) / 3);
  ctx.grid = ctx.grid.map((row, sy) =>
    row.map(cell => sy >= stormFrontY ? { ...cell, stormed: true, revealed: true } : cell)
  );
  const landedOnPortal = ctx.grid[ctx.ny][ctx.nx].type === 'portal';
  if (ctx.grid[ctx.ny][ctx.nx].stormed && !ctx.ship.upgrades.includes('rider') && !landedOnPortal) {
    ctx.gameOver = true;
    ctx.log = 'The storm engulfs your ship. There is no escape.';
  }
  if (stormDistance <= 0 && !landedOnPortal) {
    ctx.gameOver = true;
    ctx.log = 'The storm consumes your ship...';
  }
  return ctx;
}

// ─── PORTAL ──────────────────────────────────────────────────────────────────
function stepPortal(ctx: MoveContext): MoveContext {
  const { turn } = ctx;
  // Pas de portail en zone finale
  if (ctx.state.currentZone >= 3) return ctx;

  const eligible = turn - (ctx.state.zoneEntryTurn ?? 0) >= ((ctx.state.relics ?? []).includes('bone_compass') ? 9 : 12);

  // 1) SPAWN — une seule fois, après le délai d'éligibilité (35% / tour, garanti après 6 tours d'attente)
  const pity = eligible && (turn - (ctx.state.zoneEntryTurn ?? 0)) >= 18;
  if (!ctx.state.portalSpawned && eligible && (ctx.rng.next() < 0.35 || pity)) {
    // Atteignable = "pas derriere" : le bateau ne recule jamais, mais peut combiner
    // montees et pas lateraux librement -> toute case y <= ny est accessible.
    // (L'ancien critere |dx| <= dy excluait a tort les cases laterales, et un
    // joueur arrive en haut de carte n'avait plus AUCUN candidat -> soft-lock.)
    const collect = (minDist: number) => {
      const list: {x: number, y: number}[] = [];
      for (let y = 0; y < GRID_SIZE - 2; y++) {
        for (let x = 1; x < GRID_SIZE - 1; x++) {
          const cell = ctx.grid[y][x];
          const notBehind = y <= ctx.ny;
          const notOnShip = !(x === ctx.nx && y === ctx.ny);
          const dist = Math.abs(x - ctx.nx) + (ctx.ny - y);
          if (cell.type === 'sea' && !cell.visited && !cell.stormed && notBehind && notOnShip && dist >= minDist) {
            list.push({x, y});
          }
        }
      }
      return list;
    };
    let candidates = collect(3);
    if (candidates.length === 0) candidates = collect(1); // joueur en haut de carte : accepter les cases proches
    if (candidates.length > 0) {
      const idx = Math.floor(ctx.rng.next() * candidates.length);
      const {x, y} = candidates[idx];
      ctx.grid = ctx.grid.map((row, ry) => row.map((cell, rx) =>
        rx === x && ry === y ? { ...cell, type: 'portal' as CellType } : cell
      ));
      ctx.state = { ...ctx.state, portalSpawned: true };
      const msg = ZONE_CONFIG[ctx.state.currentZone]?.portalMessage;
      if (msg) ctx.log = (ctx.log ? ctx.log + ' ' : '') + msg;
    }
  }

  // 2) HINTS — chaque tour TANT que le portail existe et n'est pas atteint
  //    (lit ctx.grid, pas un flag de state périmé)
  if (ctx.state.portalSpawned) {
    let portalPos: {x: number, y: number} | null = null;
    for (let y = 0; y < GRID_SIZE && !portalPos; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        if (ctx.grid[y][x].type === 'portal') { portalPos = {x, y}; break; }
      }
    }
    if (portalPos) {
      const dist = Math.abs(portalPos.x - ctx.nx) + Math.abs(portalPos.y - ctx.ny);
      let hint: string | null = null;
      if (dist <= 2)      hint = 'Reality itself seems distorted nearby...';
      else if (dist <= 5) hint = 'A faint blue glow pulses through the fog.';
      else if (dist <= 9) hint = 'The water vibrates strangely.';
      else                hint = 'A distant pull tugs at your compass.';
      ctx.state = { ...ctx.state, portalHint: hint };
    } else {
      // portail consommé (zone changée) -> nettoyage
      ctx.state = { ...ctx.state, portalHint: null };
    }
  }

  return ctx;
}

// ─── HUNTER AWARENESS ────────────────────────────────────────────────────────
function updateHunterAwareness(ctx: MoveContext): number {
  const before = ctx.hunter?.awareness ?? 0;
  let a = before;
  const ship = ctx.ship;
  const h = ctx.hunter!;
  const dist = Math.abs(h.x - ctx.nx) + Math.abs(h.y - ctx.ny);

  // Passive awareness gain per turn (slow build)
  a += 1;

  // Frenzy burns awareness fast
  if (ctx.hunter?.mode === 'frenzy') a -= 8;

  // Closer = faster awareness
  if (dist <= 3) a += 3;
  else if (dist <= 6) a += 1;

  // Danger streak
  if (ctx.state.dangerStreak >= 3) a += 2;

  // Greed
  if (ship.upgrades.includes('greed')) a += Math.floor(ship.gold / 400);

  // Awareness falls
  const cell = ctx.grid[ctx.ny]?.[ctx.nx];
  if (cell?.type === 'storm') a -= 10;
  if (cell?.type === 'port') { a -= 15; if ((ctx.state.relics ?? []).includes('ghost_anchor')) a -= 20; }

  // The Specter voit plus loin, mais se fait reperer 50% plus vite.
  if (ctx.state.shipType === 'specter' && a > before) {
    a = before + (a - before) * 1.5;
  }
  return Math.max(0, Math.min(100, a));
}

function updateHunterMode(h: NonNullable<MoveContext['hunter']>, awareness: number, dirChanged: boolean): NonNullable<MoveContext['hunter']> {
  let { mode, searchTurns, frenzyTurns } = h;

  // SEARCHING — player changed direction sharply
  if (dirChanged && mode === 'tracking') {
    return { ...h, mode: 'searching', searchTurns: 2, frenzyTurns: 0 };
  }
  if (mode === 'searching') {
    searchTurns = Math.max(0, searchTurns - 1);
    if (searchTurns === 0) mode = 'tracking';
    return { ...h, mode, searchTurns };
  }

  // FRENZY — high awareness
  if (awareness >= 80 && mode !== 'frenzy') {
    return { ...h, mode: 'frenzy', frenzyTurns: 2, searchTurns: 0 };
  }
  if (mode === 'frenzy') {
    frenzyTurns = Math.max(0, frenzyTurns - 1);
    if (frenzyTurns === 0) mode = awareness >= 50 ? 'stalking' : 'tracking';
    return { ...h, mode, frenzyTurns };
  }

  // STALKING — medium awareness
  if (awareness >= 50 && mode === 'tracking') {
    return { ...h, mode: 'stalking' };
  }
  if (awareness < 50 && mode === 'stalking') {
    return { ...h, mode: 'tracking' };
  }

  return { ...h, mode, searchTurns, frenzyTurns };
}

function moveHunter(
  h: NonNullable<MoveContext['hunter']>,
  target: {x:number,y:number},
  predicted: {x:number,y:number},
  nx: number, ny: number, rng: Rng
): NonNullable<MoveContext['hunter']> {
  const moves = h.mode === 'frenzy' ? 2 : 1;

  if (h.mode === 'searching') {
    const wx = Math.floor(rng.next() * 3) - 1;
    const wy = Math.floor(rng.next() * 3) - 1;
    return { ...h, x: Math.max(0, Math.min(GRID_SIZE-1, h.x + wx)), y: Math.max(0, Math.min(GRID_SIZE-1, h.y + wy)) };
  }

  // Destination selon le mode :
  //  - frenzy   : position EXACTE du joueur (acharnement)
  //  - stalking : position PRÉDITE (coupe la route au joueur)
  //  - tracking : dernière position connue, avec retard (laggy)
  const tx = h.mode === 'frenzy' ? nx : h.mode === 'stalking' ? predicted.x : target.x;
  const ty = h.mode === 'frenzy' ? ny : h.mode === 'stalking' ? predicted.y : target.y;

  let hx = h.x, hy = h.y;
  for (let i = 0; i < moves; i++) {
    const distX = Math.abs(tx - hx);
    const distY = Math.abs(ty - hy);
    if (distX === 0 && distY === 0) break;
    const moveX = distX > distY || (distX === distY && rng.next() < 0.5);
    if (moveX) {
      hx = Math.max(0, Math.min(GRID_SIZE-1, hx + (tx > hx ? 1 : -1)));
    } else {
      hy = Math.max(0, Math.min(GRID_SIZE-1, hy + (ty > hy ? 1 : -1)));
    }
  }

  return { ...h, x: hx, y: hy };
}

function emitHunterFeedback(ctx: MoveContext, h: NonNullable<MoveContext['hunter']>, prevMode: string): void {
  const dist = Math.abs(h.x - ctx.nx) + Math.abs(h.y - ctx.ny);
  if (h.mode === 'frenzy' && prevMode !== 'frenzy') {
    ctx.log = (ctx.log ? ctx.log + ' ' : '') + 'Something snaps. It knows exactly where you are.';
  } else if (h.mode === 'stalking' && prevMode !== 'stalking') {
    ctx.log = (ctx.log ? ctx.log + ' ' : '') + 'It changes course. It seems to predict you.';
  } else if (h.mode === 'searching') {
    ctx.log = (ctx.log ? ctx.log + ' ' : '') + 'You lose it in the fog...';
  } else if (dist <= 2 && ctx.rng.next() < 0.4) {
    const logs = ['The sea goes silent.','Something massive shifts beneath the fog.','You hear wood cracking behind you.','The water darkens.','A foul smell rises from the deep.'];
    ctx.log = (ctx.log ? ctx.log + ' ' : '') + logs[Math.floor(ctx.rng.next() * logs.length)];
  }
}

function stepHunter(ctx: MoveContext): MoveContext {
  const { nx, ny, turn } = ctx;
  let h = ctx.hunter;

  // Spawn
  const zoneSpawnTurn = (ZONE_CONFIG[ctx.state.currentZone ?? 1]?.hunterSpawnTurn ?? BALANCE.hunter.spawnTurn) + ((ctx.state.relics ?? []).includes('black_flag') ? 6 : 0);
  if (turn - (ctx.state.zoneEntryTurn ?? 0) === zoneSpawnTurn && !h) {
    h = { x: nx < GRID_SIZE / 2 ? GRID_SIZE - 1 : 0, y: 0, active: true, mode: 'tracking' as const, searchTurns: 0, frenzyTurns: 0, awareness: 0, skipTurn: false };


  } else if (h && h.active) {
    const awareness = updateHunterAwareness(ctx);


    const prevPos = ctx.state.hunterTarget;
    const history = ctx.state.hunterTargetHistory ?? [];

    // Direction du joueur CE tour-ci
    const dx = nx - (prevPos?.x ?? nx);
    const dy = ny - (prevPos?.y ?? ny);
    const currentDir = dx !== 0 ? 'h' : dy !== 0 ? 'v' : null;

    // Direction PRÉCÉDENTE du joueur (deux dernières positions connues)
    const prevPlayerDir = history.length >= 2
      ? (history[history.length - 1].x !== history[history.length - 2].x ? 'h'
         : history[history.length - 1].y !== history[history.length - 2].y ? 'v' : null)
      : null;

    // SEARCHING se déclenche quand le JOUEUR change brusquement d'axe (joueur vs joueur)
    const dirChanged = !!(prevPlayerDir && currentDir && prevPlayerDir !== currentDir);
    const prevMode = h.mode;

    h = { ...updateHunterMode(h, awareness, dirChanged), awareness };

    // Cibles selon le mode
    const target = history.length >= 2 ? history[history.length - 2] : (prevPos ?? { x: nx, y: ny });
    const predicted = {
      x: Math.max(0, Math.min(GRID_SIZE - 1, nx + dx)),
      y: Math.max(0, Math.min(GRID_SIZE - 1, ny + dy)),
    };

    // Tracking = un tour sur deux ; stalking/frenzy = chaque tour.
    // AGGRO (le hunter ne saute plus de tour) : streak >= 3 ("Hunter becomes aggressive — moves every turn")
    // ou Cursed Greed a 800g+ ("Hunter doubles speed") — promesses du HowToPlay desormais implementees.
    const streakAggro = getStreakEffects(ctx.state.dangerStreak).hunterAggro;
    const greedAggro = ctx.ship.upgrades.includes('greed')
      && Math.floor(ctx.ship.gold / BALANCE.greed.corruptionStep) >= BALANCE.greed.corruptionHunterAt;
    const shouldSkip = h.mode === 'tracking' && (h.skipTurn ?? false) && !streakAggro && !greedAggro;
    if (!shouldSkip) {
      h = moveHunter(h, target, predicted, nx, ny, ctx.rng);
    }
    h = { ...h, skipTurn: h.mode === 'tracking' ? !(h.skipTurn ?? false) : false, lastMoveDir: currentDir };

    emitHunterFeedback(ctx, h, prevMode);
  }

  if (h && h.active && h.x === nx && h.y === ny) {
    const dmg = Math.max(BALANCE.hunter.minDamage, BALANCE.hunter.baseDamage - ctx.ship.power) + ((ctx.state.relics ?? []).includes('black_flag') ? 2 : 0);
    ctx.ship = { ...ctx.ship, hull: Math.max(0, ctx.ship.hull - dmg) };
    ctx.log += ` It surfaces without warning. Tentacles rake the hull. -${dmg}.`;
    if (ctx.ship.hull <= 0) ctx.gameOver = true;
    else ctx.state = { ...ctx.state, hunterAttacksSurvived: (ctx.state.hunterAttacksSurvived ?? 0) + 1 };
  }

  ctx.hunter = h;

  return ctx;
}

function stepCellEvent(ctx: MoveContext): MoveContext {
  if (ctx.gameOver) return ctx;
  const { nx, ny, ship, rng, zoneLabel } = ctx;
  const cell = ctx.grid[ny][nx];

  if (cell.type === 'sea') {
    // Ghost: kraken attracted on sea cells
    if (ship.upgrades.includes('ghost') && ny <= Math.floor(GRID_SIZE * 0.6) && rng.next() < BALANCE.ghost.krakenChance) {
      ctx.event = buildEvent('kraken', ship.power);
      ctx.log = 'The Ghost Ship attracts the deep...' + (ctx.log ? ' ' + ctx.log : '');
      return ctx;
    }
    // Micro events
    const roll = rng.next();
    if (roll < 0.08) {
      const b = rng.int(1, 3);
      ctx.score += b * 10;
      ctx.scoreBreakdown = { ...ctx.scoreBreakdown, other: ctx.scoreBreakdown.other + b * 10 };
      ctx.log = `Favorable winds! +${b * 10} pts` + (ctx.log ? ' ' + ctx.log : '');
    } else if (roll < 0.18) {
      const d = zoneLabel === 'early' ? 1 : 2;
      ctx.ship = { ...ship, hull: Math.max(1, ship.hull - d) };
      ctx.log = `Hull creaks. -${d} hull.` + (ctx.log ? ' ' + ctx.log : '');
    } else if (roll < 0.22) {
      ctx.log = 'The water shimmers... treasure nearby.' + (ctx.log ? ' ' + ctx.log : '');
    } else if (roll < 0.26) {
      const g = rng.int(5, 20);
      ctx.ship = { ...ship, gold: ship.gold + g };
      ctx.log = `Floating debris! Salvaged ${g} gold.` + (ctx.log ? ' ' + ctx.log : '');
    } else if (roll < 0.29) {
      ctx.log = 'Thick fog rolls in.' + (ctx.log ? ' ' + ctx.log : '');
    } else {
      ctx.log = 'Calm waters...' + (ctx.log ? ' ' + ctx.log : '');
    }
    return ctx;
  }

  if (cell.visited) {
    ctx.log = 'Calm waters...' + (ctx.log ? ' ' + ctx.log : '');
    return ctx;
  }

  // Ghost ship
  if (ship.upgrades.includes('ghost') && cell.type === 'pirate') {
    if (ctx.state.notoriety >= 6) {
      const g = rng.int(10, 30);
      ctx.ship = { ...ctx.ship, gold: ctx.ship.gold + g };
      ctx.log = `Pirates flee! +${g}g` + (ctx.log ? ' ' + ctx.log : '');
    } else {
      ctx.log = 'Ghost Ship unseen.' + (ctx.log ? ' ' + ctx.log : '');
    }
    return ctx;
  }

  // Storm Rider — embrace the storm
  if (ship.upgrades.includes('rider') && cell.type === 'storm') {
    const syn = getSynergies(ctx.ship);
    const goldStorm = rng.int(15, 35);
    const scoreStorm = 50 * ctx.state.scoreMultiplier;
    const heal = syn.stormHeal ? Math.min(2, ctx.ship.maxHull - ctx.ship.hull) : 0;
    ctx.ship = { ...ctx.ship, hull: Math.max(1, ctx.ship.hull - 2 + heal), gold: ctx.ship.gold + goldStorm };
    ctx.score += scoreStorm;
    ctx.scoreBreakdown = { ...ctx.scoreBreakdown, combat: ctx.scoreBreakdown.combat + scoreStorm };
    ctx.log = `Storm Rider surfs the tempest! ${heal > 0 ? `+${heal} hull (synergy!), ` : '-2 hull, '}+${goldStorm}g, +${scoreStorm}pts.` + (ctx.log ? ' ' + ctx.log : '');
    return ctx;
  }

  // Elite event at streak 4+
  const efx = getStreakEffects(ctx.state.dangerStreak);
  if (efx.eliteChance > 0 && cell.type === 'pirate' && rng.next() < efx.eliteChance) {
    ctx.event = { cellType: 'ancient_kraken' as CellType, choices: [
      { label: 'Face the Elite', desc: 'Legendary fight — massive reward', icon: 'fight', risk: 'bold' as const },
      { label: 'Offer sacrifice', desc: '-50 gold, it lets you pass', icon: 'sacrifice', risk: 'risky' as const },
    ]};
    ctx.log = '💀 An elite emerges from the depths!' + (ctx.log ? ' ' + ctx.log : '');
    return ctx;
  }

  // Hybrid event mid/late
  if (cell.type === 'pirate' && ny <= Math.floor(GRID_SIZE * 0.4) && rng.next() < 0.3) {
    ctx.event = { cellType: 'pirate' as CellType, choices: [
      { label: 'Fight in the storm', desc: 'Extra dmg but double loot',    icon: 'push', risk: 'bold' as const },
      { label: 'Use storm as cover', desc: 'Escape but lose 1 storm turn', icon: 'cover', risk: 'risky' as const },
    ]};
    ctx.log = 'Pirates attack under the storm!' + (ctx.log ? ' ' + ctx.log : '');
    return ctx;
  }

  ctx.event = buildEvent(cell.type, ctx.ship.power);
  return ctx;
}

function ctxToState(ctx: MoveContext): GameState {
  // Update hunter last known position AFTER hunter moves
  if (ctx.hunter?.active) {
    ctx = { ...ctx };
  }
  const { state, ship, grid, turn, depth, score, stormDistance, gameOver, log, event, showPort } = ctx;
  const hunter = ctx.hunter ?? null;
  // Marquer la case actuelle comme visitée si pas d'event
  const visitedGrid = !event ? grid.map((row, y) => row.map((cell, x) =>
    x === ship.x && y === ship.y ? { ...cell, visited: true } : cell
  )) : grid;

  const next: GameState = {
    ...state, ship, grid: visitedGrid, turn, depth, score, stormDistance, gameOver, log,
    event, showPort, hunter,
    hunterTargetHistory: [...(state.hunterTargetHistory ?? []), { x: ship.x, y: ship.y }].slice(-3),
    hunterTarget: { x: ship.x, y: ship.y }, scoreBreakdown: ctx.scoreBreakdown, rngState: ctx.rng.getState(),
    dangerStreak: ctx.dangerStreak ?? state.dangerStreak,
    scoreMultiplier: ctx.scoreMultiplier ?? state.scoreMultiplier,
    notoriety: state.notoriety,
    curses: state.curses,
    exploits: state.exploits,
    lowestHull: state.lowestHull,
    runTitle: state.runTitle,
    zone: state.zone,
    portUpgrades: state.portUpgrades,
    upgradeToken: state.upgradeToken,
    escapeUsed: state.escapeUsed,
  };
  return gameOver ? { ...next, runTitle: computeTitle(next) } : next;
}

// ─── MOVE SHIP ───────────────────────────────────────────────────────────────
export function moveShip(state: GameState, dx: number, dy: number): GameState {
  if (state.gameOver || state.showPort || state.event) return state;
  const rng = seededRng(state.rngState);

  const ctx = stepMovement(state, dx, dy, rng);
  if (!ctx) return state;

  return ctxToState(stepCellEvent(stepHunter(stepPortal(stepStorm(ctx)))));
}


// ─── POST TURN EFFECTS ───────────────────────────────────────────────────────
function applyAchievements(s: GameState): GameState {
  let { ship, score, exploits, curses, log, dangerStreak } = s;
  let sb = { ...s.scoreBreakdown };
  let changed = false;

  if (ship.hull === 1 && !exploits.includes('survival')) {
    exploits = [...exploits, 'survival']; score += 200; sb = { ...sb, achievements: sb.achievements + 200 };
    log += ' Survived at 1 HP! +200pts'; changed = true;
  }
  if (dangerStreak >= 5 && !exploits.includes('streak5')) {
    exploits = [...exploits, 'streak5']; score += 300; sb = { ...sb, streaks: sb.streaks + 300 };
    log += ' 5 dangers streak! +300pts'; changed = true;
  }
  if (ship.gold === 0 && !exploits.includes('brokebut')) {
    exploits = [...exploits, 'brokebut']; score += 150; sb = { ...sb, achievements: sb.achievements + 150 };
    log += ' Sailed penniless! +150pts'; changed = true;
  }
  return changed ? { ...s, ship, score, exploits, curses, log, scoreBreakdown: sb } : s;
}

function applyGreedCurse(s: GameState, rng: Rng): GameState {
  if (!s.ship.upgrades.includes('greed')) return s;
  let { ship, curses, log } = s;
  const cfx = getStreakEffects(s.dangerStreak);

  if (ship.gold >= BALANCE.greed.curseThreshold && cfx.curseChance > 0 && rng.next() < cfx.curseChance && curses.length < 3) {
    const newCurse = rng.next() < 0.5 ? 'kraken_curse' : 'cursed_treasure';
    if (!curses.includes(newCurse)) {
      curses = [...curses, newCurse];
      if (newCurse === 'kraken_curse') { ship = { ...ship, vision: Math.max(1, ship.vision - 1) }; log += ' The sea blinds you. -1 vision.'; }
      else { ship = { ...ship, gold: Math.floor(ship.gold * 0.8) }; log += ' Cursed waters drain your gold. -20%.'; }
    }
  }
  return { ...s, ship, curses, log };
}

function applyDeathCheck(s: GameState): GameState {
  if (s.ship.hull <= 0) return { ...s, gameOver: true, runTitle: computeTitle(s) };
  return s;
}

function applyPostTurnEffects(state: GameState, rng: Rng): GameState {
  let s = { ...state, ship: { ...state.ship, hull: Math.max(0, state.ship.hull) } };
  s = applyAchievements(s);
  s = applyGreedCurse(s, rng);
  s = applyDeathCheck(s);
  if (s.gameOver) s = { ...s, runTitle: computeTitle(s) };
  return s;
}

// ─── RESOLVE EVENT ───────────────────────────────────────────────────────────
export function resolveEvent(state: GameState, choiceIdx: number): GameState {
  if (!state.event) return state;
  const rng = seededRng(state.rngState);
  const { cellType } = state.event;

  const isGreed    = state.ship.upgrades.includes('greed');

  let ship          = { ...state.ship };
  let score         = state.score;
  let showPort      = false;
  let upgradeToken  = state.upgradeToken;
  let log           = '';
  let gameOver      = false;
  let stormDistance = state.stormDistance;
  let relics        = state.relics ?? [];
  const hasRelicLocal = (id: string) => relics.includes(id);
  const hullLevel = state.ship.levels.hull;
  const envDmgReduction = hullLevel >= 2 ? 3 : hullLevel >= 1 ? 2 : 0;
  const hullPassive = hullLevel >= 2 && ship.hull > Math.floor(ship.maxHull * 0.5) ? 1 : 0;
  const weaponLevel = state.ship.levels.weapon;
  const minCombatDmg = weaponLevel >= 1 ? 2 : 0; // dégâts minimum garantis

  const dangerTypes   = ['pirate','kraken','storm','rocks','wreck','maelstrom','ancient_kraken'];
  const isDangerCell = dangerTypes.includes(cellType);

  const tookRisk =
    (cellType === 'pirate'        && choiceIdx === 0) ||
    (cellType === 'kraken'        && choiceIdx === 0) ||
    (cellType === 'storm'         && choiceIdx === 0) ||
    (cellType === 'wreck'         && choiceIdx === 0) ||
    (cellType === 'maelstrom'     && choiceIdx === 0) ||
    (cellType === 'ancient_kraken'&& choiceIdx === 0) ||
    (cellType === 'rocks'         && choiceIdx === 1);

  const escapedDanger = isDangerCell && choiceIdx === 1;

  let dangerStreak = tookRisk
    ? state.dangerStreak + 1
    : escapedDanger
      ? Math.max(0, state.dangerStreak - 2)
      : Math.max(0, state.dangerStreak - 1);
  let scoreMultiplier = dangerStreak >= 3 ? 3 : dangerStreak >= 2 ? 2 : 1;
  let notoriety    = state.notoriety;
  let curses       = [...state.curses];
  let exploits     = [...state.exploits];
  let lowestHull   = state.lowestHull;
  let portUpgrades = state.portUpgrades;
  let hunter       = state.hunter;

  const grid = state.grid.map((row, y) => row.map((cell, x) =>
    x === ship.x && y === ship.y
      ? { ...cell, visited: true, type: (cell.type === 'treasure' || cell.type === 'port') ? 'sea' as CellType : cell.type }
      : cell
  ));

  let sb = { ...state.scoreBreakdown };
  const done = (overrides: Partial<GameState> = {}): GameState => {
    ship.hull = Math.max(0, ship.hull);
    if (ship.hull <= 0) gameOver = true;
    lowestHull = Math.min(lowestHull, ship.hull);
    if (ship.hull === 1 && !exploits.includes('survival'))  { exploits.push('survival');  score += 200; sb = { ...sb, achievements: sb.achievements + 200 }; log += ' Survived at 1 HP! +200pts'; }
    // Greed corruption
    if (ship.upgrades.includes('greed')) {
      if (ship.gold >= 800 && state.hunter?.active) {
        // Hunter speed doubled — moves every turn instead of every other
        hunter = { ...state.hunter!, active: true, mode: 'frenzy' as const, frenzyTurns: 3, searchTurns: 0, awareness: Math.min(100, (state.hunter?.awareness ?? 0) + 40) };
        log += ' Your greed drives the Hunter into a frenzy!';
      } else if (ship.gold >= 600 && rng.next() < 0.15) {
        curses.push('cursed_treasure');
        ship.vision = Math.max(1, ship.vision - 1);
        log += ' Cursed by wealth. -1 vision.';
      }
    }
    if (dangerStreak >= 5 && !exploits.includes('streak5')) { exploits.push('streak5');   score += 300; sb = { ...sb, streaks: sb.streaks + 300 }; log += ' 5 dangers streak! +300pts'; }

    if (cellType === 'kraken' && choiceIdx === 0 && ship.hull <= 5 && !exploits.includes('krakenlow')) { exploits.push('krakenlow'); score += 500; sb = { ...sb, achievements: sb.achievements + 500 }; log += ' Kraken slain at deaths door! +500pts'; }
    if (ship.gold === 0 && !exploits.includes('brokebut'))  { exploits.push('brokebut');  score += 150; sb = { ...sb, achievements: sb.achievements + 150 }; log += ' Sailed penniless! +150pts'; }
    const result: GameState = {
      ...state, grid, ship, event: null, log, score, showPort, upgradeToken, gameOver,
      rngState: rng.getState(), dangerStreak, scoreMultiplier, notoriety, curses,
      exploits, lowestHull, hunter, zone: state.zone, portUpgrades,
      runTitle: state.runTitle, stormDistance, relics, scoreBreakdown: sb, ...overrides,
    };
    return applyPostTurnEffects(result, rng);
  };

  if (cellType === 'wreck') {
    if (choiceIdx === 0) {
      // 35% : une relique dort dans l'epave (si toutes ne sont pas deja trouvees)
      const foundRelic = rng.next() < 0.35 ? rollRelic(state.relics ?? [], () => rng.next()) : null;
      if (foundRelic) {
        relics = [...(state.relics ?? []), foundRelic.id];
        if (foundRelic.id === 'cracked_spyglass') ship.vision += 1;
        score += 30; sb = { ...sb, treasure: sb.treasure + 30 };
        log = `Among the wreckage, something gleams. You found a relic: ${foundRelic.name}! ${foundRelic.desc}`;
      }
      else if (rng.next() < 0.6) { let g = rng.int(40,100); if (hasRelicLocal('weighted_net')) g = Math.round(g*1.5); ship.gold += g; score += g; sb = { ...sb, treasure: sb.treasure + g }; log = `The wreck yields its secrets. Waterlogged gold, but gold nonetheless. +${g} gold.`; }
      else if (state.shipType === 'breakwater') { log = `Full speed! The reinforced prow of the Breakwater shatters the reef. Not a scratch.`; }
      else { const d = Math.max(1, rng.int(6,12)); ship.hull -= d; log = `A hidden trap springs from the darkness. The explosion rocks your hull. -${d} hull.`; }
    } else {
      const d = Math.max(1, rng.int(8,15) - ship.power);
      const g = rng.int(50,120);
      if (rng.next() < 0.5) { ship.hull -= d; const goldGain = isGreed ? g*2 : g; ship.gold += goldGain; score += goldGain * scoreMultiplier; sb = { ...sb, combat: sb.combat + goldGain * scoreMultiplier }; log = `Something ancient lurks in the hull. You fight it back. -${d} hull, +${goldGain} gold.`; }
      else { ship.hull -= d; log = `It drags you under before you can react. -${d} hull. You barely escape.`; }
    }
    return done();
  }

  if (choiceIdx === 0) {
    switch(cellType) {
      case 'pirate': {
        const fx = getStreakEffects(dangerStreak);
        const rawD = Math.max(0, rng.int(3,10) - ship.power - hullPassive);
        const d = Math.max(minCombatDmg, rawD);
        const g = rng.int(20,60) + Math.floor(notoriety/3);
        const greedBonus = isGreed ? 1.5 : 1;
        const goldGain = Math.floor(g * greedBonus * fx.goldBonus);
        const goldCap = ship.gold >= 300 ? 0.6 : ship.gold >= 200 ? 0.8 : 1;
        const goldFinal = Math.floor(goldGain * goldCap);
        const capMsg = goldCap < 1 ? ' (hold full — gold lost at sea)' : '';
        const syn = getSynergies(ship);
        const crit = syn.berserkerCrit && rng.next() < BALANCE.combat.berserkerCritChance;
        ship.hull -= d;
        ship.gold += goldFinal;
        state = { ...state, piratesFought: (state.piratesFought ?? 0) + 1 };
        const combatGain = Math.floor((goldFinal + 35) * scoreMultiplier * (crit ? BALANCE.combat.berserkerCritMult : 1));
        score += combatGain;
        sb = { ...sb, combat: sb.combat + combatGain };
        notoriety = Math.min(10, notoriety + 2);
        log = `Pirates defeated! -${d} hull, +${goldFinal} gold.${crit ? ' CRITICAL HIT!' : ''}${capMsg}${scoreMultiplier > 1 ? ` [x${scoreMultiplier}]` : ''}`;
        break;
      }
      case 'kraken': {
        const d = Math.max(2, rng.int(8,15) - ship.power);
        ship.hull -= d; score += 150 * scoreMultiplier;
        sb = { ...sb, combat: sb.combat + 150 * scoreMultiplier };
        ship.vision = Math.max(1, ship.vision - 1);
        curses.push('kraken_curse');
        state = { ...state, krakenKilled: true };
        log = `The sea runs black with ink. The Kraken sinks into the abyss. -${d} hull. Your eyes... feel different. +${150*scoreMultiplier} pts.`;
        break;
      }
      case 'storm': {
        if (rng.next() < 0.6) log = 'Your crew holds the mast. You burst through the storm unscathed.';
        else { const d = Math.max(1, rng.int(4,8) - envDmgReduction); ship.hull -= d; log = `Lightning splits the deck. The hull groans under the pressure. -${d} hull.`; }
        break;
      }
      case 'treasure': {
        const navLvl2 = state.ship.levels.nav;
const rawG = navLvl2 >= 2 ? Math.floor(rng.int(30,90)*0.7) : rng.int(30,90);
        const treasureCap = ship.gold >= 300 ? 0.6 : ship.gold >= 200 ? 0.8 : 1;
        const g = Math.floor(rawG * treasureCap);
        const bonus = state.ship.upgrades.includes('hunter') && scoreMultiplier >= 3 ? 2 : 1;
        const total = Math.floor(g * bonus);
        ship.gold += total; const treasureGain = total * scoreMultiplier; score += treasureGain;
        state = { ...state, treasuresFound: (state.treasuresFound ?? 0) + 1 };
        sb = { ...sb, treasure: sb.treasure + treasureGain };
        // "Riches draw danger" — la description le promettait, on l'applique enfin :
        notoriety += 1;
        if (hunter?.active) hunter = { ...hunter, awareness: Math.min(100, (hunter.awareness ?? 0) + 15) };
        log = bonus > 1 ? `The chest overflows with cursed riches! +${total} gold! JACKPOT! ${scoreMultiplier > 1 ? `[x${scoreMultiplier}]` : ''}` : scoreMultiplier > 1 ? `Ancient gold spills from the chest... +${total} gold! [x${scoreMultiplier}]` : `The chest reveals its fortune. +${total} gold.${hunter?.active ? ' The Hunter stirs.' : ''}`;
        break;
      }
      case 'port': {
        if (state.ship.upgrades.includes('ghost')) {
          log = 'The Ghost Ship cannot dock — you are a phantom to this port.';
          break;
        }
        state = { ...state, portsVisited: (state.portsVisited ?? 0) + 1 };
        showPort = true;
        const all = ['ghost','rider','greed','berserker','hunter','escape'];
        const avail = all.filter(u => !ship.upgrades.includes(u as UpgradeId));
        portUpgrades = ([...avail].sort(() => rng.next() - 0.5).slice(0, 2)) as UpgradeId[];
        log = 'Welcome to port, Captain!';
        break;
      }
      case 'island': {
        if (ship.gold >= BALANCE.port.islandRitualCost) {
          ship.gold -= BALANCE.port.islandRitualCost;
          const ritualScore = 120 * scoreMultiplier;
          score += ritualScore;
          sb = { ...sb, achievements: sb.achievements + ritualScore };
          log = `The old stones drink your gold. A cold wind sweeps the storm back. +${BALANCE.port.islandRitualBonus} turns, +${ritualScore} pts.`;
          return done({ stormDistance: stormDistance + BALANCE.port.islandRitualBonus });
        }
        else log = 'Not enough gold. (need 100g)';
        break;
      }
      case 'rocks': { log = 'You navigate carefully through the reef. The hull holds.'; break; }
      case 'portal': {
        const nextZone = (state.currentZone ?? 1) + 1;
        const zoneConfig = ZONE_CONFIG[nextZone];
        if (!zoneConfig) { log = 'The rift collapses. There is nowhere left to go.'; break; }
        // Carte deterministe par (seed, zone) -> Daily equitable, flux RNG principal intact
        const newGridRaw = generateGrid(state.seed * 31 + nextZone * 100003, []);
        const ncx = Math.floor(GRID_SIZE / 2), ncy = GRID_SIZE - 1;
        ship.x = ncx; ship.y = ncy;
        const newGrid = revealAround(newGridRaw, ncx, ncy, ship.vision);
        const zoneBonus = nextZone === 2 ? 100 : nextZone === 3 ? 300 : 0;
        score += zoneBonus;
        sb = { ...sb, achievements: sb.achievements + zoneBonus };
        log = `${zoneConfig.transitionText.join(' ')} You have entered ${zoneConfig.name}. +${zoneBonus} pts.`;
        return done({
          currentZone: nextZone,
          zone: nextZone,
          zoneEntryTurn: state.turn,
          portalSpawned: false,
          portalHint: null,
          grid: newGrid,
          stormDistance: BALANCE.storm.initial,
          hunter: null,
          hunterTarget: null,
          hunterTargetHistory: [],
        });
      }
      case 'maelstrom': {
        const mx = rng.int(0, GRID_SIZE-1), my = rng.int(0, GRID_SIZE-1);
        const tGrid = revealAround(grid, mx, my, ship.vision);
        ship.x = mx; ship.y = my;
        const tScore = rng.next() < 0.5 ? 200 : 0;
        const tDmg   = rng.next() < 0.5 ? rng.int(5,15) : 0;
        ship.hull -= tDmg;
        if (tScore > 0) { ship.gold += 50; score += tScore; sb = { ...sb, other: sb.other + tScore }; }
        log = tScore > 0 ? `The vortex spits you out on the far side of the sea. Fortune favors the mad. +50g +200pts.` : `The world spins. When it stops, you are somewhere else entirely. -${tDmg} hull.`;
        state = { ...state, maelstromSurvived: true };
        return done({ grid: tGrid });
      }
      case 'cursed_treasure': {
        ship.gold += 300; score += 300 * scoreMultiplier;
        sb = { ...sb, treasure: sb.treasure + 300 * scoreMultiplier };
        ship.vision = Math.max(1, ship.vision - 1);
        curses.push('cursed_treasure');
        state = { ...state, cursedTreasureTaken: true };
        log = `The gold burns cold in your hands. Something watches from behind your eyes now. +300g.${scoreMultiplier > 1 ? ` [x${scoreMultiplier}]` : ''}`;
        break;
      }
      case 'ancient_kraken': {
        const d = Math.max(5, rng.int(15,25) - ship.power);
        ship.hull -= d; score += 800 * scoreMultiplier; ship.power += 3; ship.gold += 200;
        sb = { ...sb, combat: sb.combat + 800 * scoreMultiplier };
        curses.push('ancient_curse');
        state = { ...state, ancientKrakenKilled: true };
        log = `An elder god returns to the deep. The sea itself mourns. -${d} hull. +800pts +200g. You feel its power flowing into your arms.`;
        if (!exploits.includes('ancient')) { exploits.push('ancient'); score += 1000; sb = { ...sb, achievements: sb.achievements + 1000 }; log += ' LEGENDARY! +1000pts'; }
        break;
      }
      default: { log = 'You sail on.'; break; }
    }
  } else {
    switch(cellType) {
      case 'pirate': {
        if (hasRelicLocal('gold_tooth')) {
          const bounty = rng.int(20,45);
          ship.gold += bounty; score += bounty; sb = { ...sb, treasure: sb.treasure + bounty };
          notoriety += 2; // la reputation d'extorqueur se paie : le Hunter s'interesse a toi
          log = `They recognize the Gold Tooth. The pirates bow and pay YOU tribute. +${bounty} gold — but word spreads. Notoriety rises.`;
          break;
        }
        let cost = rng.int(15,35) + Math.floor(notoriety*2);
        if (state.shipType === 'merchant') cost = Math.ceil(cost / 2);
        ship.gold = Math.max(0, ship.gold - cost);
        notoriety = Math.max(0, notoriety - 1);
        log = `You toss the gold overboard. The pirates let you pass in silence. -${cost} gold.`;
        break;
      }
      case 'kraken': {
        const pactCost = hasRelicLocal('storm_heart') ? Math.floor(BALANCE.port.krakenPactHull / 2) : BALANCE.port.krakenPactHull;
        ship.hull = Math.max(1, ship.hull - pactCost);
        const riderBonus = state.ship.upgrades.includes('rider') ? 200 : 0;
        if (riderBonus > 0) { score += riderBonus; sb = { ...sb, achievements: sb.achievements + riderBonus }; }
        hunter = state.hunter
          ? { ...state.hunter, active: true, mode: 'frenzy' as const, searchTurns: 0, frenzyTurns: 3, awareness: Math.min(100, (state.hunter.awareness ?? 0) + 40) }
          : { x: ship.x > GRID_SIZE/2 ? 0 : GRID_SIZE-1, y: 0, active: true, mode: 'frenzy' as const, searchTurns: 0, frenzyTurns: 3, awareness: 80 };
        log = `You offer your blood to the deep. The storm holds back... but something stirs in the dark. -20 hull.${riderBonus > 0 ? ' +200pts' : ''}`;
        return done({ stormDistance: stormDistance + BALANCE.port.krakenPactStorm, hunter });
      }
      case 'storm':          { log = 'You change course, keeping the storm to your stern. It gains ground.';   return done({ stormDistance: Math.max(0, stormDistance - 1) }); }
      case 'portal': {
        log = 'You turn back. The portal fades.';
        return done({});
      }
      case 'maelstrom':      { log = 'You resist the vortex.'; return done({ stormDistance: Math.max(0, stormDistance - 1) }); }
      case 'treasure':       {
        // Bonus "restraint" : plus fort si le hull est bas (rester discret = survie)
        const lowHull = ship.hull <= Math.floor(ship.maxHull * 0.4);
        const restraintScore = (lowHull ? 80 : 40) * scoreMultiplier;
        score += restraintScore;
        sb = { ...sb, achievements: sb.achievements + restraintScore };
        notoriety = Math.max(0, notoriety - 2);
        if (hunter?.active) hunter = { ...hunter, awareness: Math.max(0, (hunter.awareness ?? 0) - 20) };
        dangerStreak = Math.max(0, dangerStreak - 1);
        log = `You leave the gold to the sea. You slip away unnoticed. +${restraintScore} pts${hunter?.active ? ', the Hunter loses your trail' : ''}.`;
        break;
      }
      case 'port':           { log = 'No time to stop.'; break; }
      case 'island': {
        if (rng.next() < 0.5) { upgradeToken = true; log = 'Among the ruins, a strange artifact gleams. An upgrade token is yours.'; }
        else { log = 'You explore the island but find nothing of value.'; }
        break;
      }
      case 'rocks':          {
        const d = rng.int(2, 6);
        ship.hull -= d;
        log = `Full speed through the reef! You gain ground on the storm (+1) but the hull scrapes. -${d} hull.`;
        return done({ stormDistance: Math.min(99, stormDistance + 1) });
      }
      case 'ancient_kraken': { ship.gold = Math.max(0, ship.gold - 50); log = 'You offer gold. It lets you pass.'; break; }
      case 'cursed_treasure':{ log = 'You leave the cursed gold.'; break; }
      default:               { log = 'You move on.'; break; }
    }
  }

  return done();
}

// ─── BUY UPGRADE ─────────────────────────────────────────────────────────────
export function buyUpgrade(state: GameState, id: UpgradeId): GameState {
  const COSTS: Partial<Record<UpgradeId, number>> = { ghost:80, rider:90, greed:60, berserker:60, hunter:75, escape:65 };
  const cost = state.upgradeToken ? 0 : (COSTS[id] ?? 60);
  if (state.ship.gold < cost || state.ship.upgrades.includes(id)) return state;
  if (state.ship.upgrades.length >= 2) return { ...state, log: 'Max 2 special abilities!' };
  let ship = { ...state.ship, gold: state.ship.gold - cost, upgrades: [...state.ship.upgrades, id] };
  if (id === 'berserker') ship.power *= 2;
  if (id === 'ghost') {
    ship.vision = Math.min(ship.vision + 2, 4);
    const syn = getSynergies(ship);
    if (syn.ghostVision) ship.vision = Math.min(ship.vision + 1, 5);
  }

  let grid = revealAround(state.grid, ship.x, ship.y, ship.vision);
  // Treasure Hunter : révèle tous les trésors
  if (id === 'hunter' || ship.upgrades.includes('hunter')) {
    grid = grid.map(row => row.map(cell =>
      (cell.type === 'treasure' || cell.type === 'cursed_treasure') ? { ...cell, revealed: true } : cell
    ));
  }
  return { ...state, ship, grid, upgradeToken: false, log: `${id} equipped!` };
}

// ─── REPAIR ──────────────────────────────────────────────────────────────────
export function upgradeComponent(state: GameState, component: 'hull' | 'weapon' | 'nav'): GameState {
  const COSTS = { 0: 50, 1: 110 } as Record<number, number>;
  const currentLevel = state.ship.levels[component];
  if (currentLevel >= 2) return state;
  const cost = COSTS[currentLevel];
  if (state.ship.gold < cost) return state;
  // Max 2 composants niveau 3
  if (currentLevel === 1 && state.maxedComponents >= 2) return { ...state, log: 'Max 2 components at level 3!' };

  let ship = { ...state.ship, gold: state.ship.gold - cost, levels: { ...state.ship.levels, [component]: (currentLevel + 1) as 0|1|2 } };
  let maxedComponents = state.maxedComponents;

  if (component === 'hull') {
    if (currentLevel === 0) { ship.maxHull = 28; ship.hull = Math.min(ship.hull + 8, 28); }
    if (currentLevel === 1) { ship.maxHull = 38; ship.hull = Math.min(ship.hull + 10, 38); maxedComponents++; }
  }
  if (component === 'weapon') {
    if (currentLevel === 0) ship.power = 5;
    if (currentLevel === 1) { ship.power = 9; maxedComponents++; }
  }
  if (component === 'nav') {
    if (currentLevel === 0) ship.vision = 2;
    if (currentLevel === 1) { ship.vision = 3; maxedComponents++; }
  }

  const grid = revealAround(state.grid, ship.x, ship.y, ship.vision);
  return { ...state, ship, grid, maxedComponents, log: `${component} upgraded to level ${currentLevel + 2}!` };
}

export function repairHull(state: GameState, amount: number, cost: number): GameState {
  if (state.ship.upgrades.includes('greed')) return { ...state, log: 'Cursed Greed prevents repairs!' };
  if (state.ship.gold < cost) return state;
  const riderPenalty = state.ship.upgrades.includes('rider') ? 0.5 : 1;
  const healed = Math.floor(amount * riderPenalty);
  const ship = { ...state.ship, hull: Math.min(state.ship.maxHull, state.ship.hull + healed), gold: state.ship.gold - cost };
  return { ...state, ship };
}

// ─── PORT / SKIP ─────────────────────────────────────────────────────────────
export function rerollPort(state: GameState): GameState {
  if (state.ship.gold < 20) return { ...state, log: 'Not enough gold to reroll. (need 20g)' };
  const rng = seededRng(state.rngState + state.turn);
  const all = ['escape','ghost','hunter','rider','greed','berserker'];
  const avail = all.filter(u => !state.ship.upgrades.includes(u as UpgradeId));
  const portUpgrades = [...avail].sort(() => rng.next() - 0.5).slice(0, 4);
  return { ...state, ship: { ...state.ship, gold: state.ship.gold - 20 }, portUpgrades: portUpgrades as UpgradeId[], log: 'Rerolled! -20g' };
}

export function leavePort(state: GameState): GameState {
  return { ...state, showPort: false, log: 'Back to sea!' };
}

export function skipEventFn(state: GameState): GameState {
  if (state.escapeUsed || !state.event) return state;
  const grid = state.grid.map((row, y) => row.map((cell, x) =>
    x === state.ship.x && y === state.ship.y ? { ...cell, visited: true } : cell
  ));
    // Swift Sails skip count
  return { ...state, grid, event: null, escapeUsed: true, log: '⛵ Swift Sails — escaped!' };
}
