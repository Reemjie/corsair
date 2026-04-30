import type { GameState, Ship, ActiveEvent, UpgradeId, CellType } from '../types/game';
import { generateGrid, revealAround, GRID_SIZE } from './mapGen';

// ─── RNG ─────────────────────────────────────────────────────────────────────
function seededRng(seed: number) {
  let s = seed;
  return {
    next: () => { s = (s * 1664525 + 1013904223) & 0xffffffff; return (s >>> 0) / 0xffffffff; },
    int:  (min: number, max: number) => { s = (s * 1664525 + 1013904223) & 0xffffffff; return Math.floor(((s >>> 0) / 0xffffffff) * (max - min + 1)) + min; },
    getState: () => s,
  };
}
type Rng = ReturnType<typeof seededRng>;

// ─── BUILD EVENT ─────────────────────────────────────────────────────────────
function buildEvent(type: CellType, power: number): ActiveEvent {
  switch(type) {
    case 'wreck': return { cellType: type, choices: [
      { label: 'Search it',       desc: 'Risk a trap for gold',          icon: '🔍', risk: 'risky' },
      { label: 'Something lurks', desc: 'Kraken nearby — flee or fight', icon: '🐙', risk: 'bold'  },
    ]};
    case 'pirate': return { cellType: type, choices: [
      { label: 'Fight',       desc: power >= 6 ? 'Your cannons help' : 'Dangerous but rewarding', icon: '⚔️', risk: power >= 6 ? 'risky' : 'bold' },
      { label: 'Pay tribute', desc: 'Lose gold, stay safe',                                        icon: '💰', risk: 'safe' },
    ]};
    case 'kraken': return { cellType: type, choices: [
      { label: 'Attack', desc: 'High risk, massive reward',                   icon: '⚔️', risk: 'bold'  },
      { label: 'Pact',   desc: '-20 HP, storm +5 turns. Hunter awakens!',    icon: '🤝', risk: 'risky' },
    ]};
    case 'storm': return { cellType: type, choices: [
      { label: 'Push through', desc: 'No storm turn lost, hull risk',     icon: '⚡', risk: 'risky' },
      { label: 'Go around',    desc: 'Safe but storm gains 1 extra turn', icon: '↩️', risk: 'safe'  },
    ]};
    case 'treasure': return { cellType: type, choices: [
      { label: 'Take it',  desc: 'Claim the gold!',     icon: '✦',  risk: 'safe' },
      { label: 'Leave it', desc: 'Sometimes cursed...', icon: '🚫', risk: 'safe' },
    ]};
    case 'port': return { cellType: type, choices: [
      { label: 'Dock',    desc: 'Repair and upgrade', icon: '⚓', risk: 'safe' },
      { label: 'Sail on', desc: 'No time to stop',    icon: '⛵', risk: 'safe' },
    ]};
    case 'island': return { cellType: type, choices: [
      { label: 'Ancient Ritual', desc: 'Offer 100 gold → storm +3 turns', icon: '🗿', risk: 'safe'  },
      { label: 'Explore freely', desc: 'Might find upgrade token',         icon: '🏝', risk: 'risky' },
    ]};
    case 'rocks': return { cellType: type, choices: [
      { label: 'Navigate carefully', desc: 'Slow but safe',    icon: '🐢', risk: 'safe'  },
      { label: 'Full speed',         desc: 'Risk hull damage', icon: '💨', risk: 'risky' },
    ]};
    case 'maelstrom': return { cellType: type, choices: [
      { label: 'Enter the vortex',  desc: 'Teleport — insane risk/reward', icon: '🌀', risk: 'bold' },
      { label: 'Fight the current', desc: 'Lose 1 storm turn, stay safe',  icon: '⚓', risk: 'safe' },
    ]};
    case 'cursed_treasure': return { cellType: type, choices: [
      { label: 'Take the gold', desc: '+300 gold but receive a curse', icon: '💀', risk: 'bold' },
      { label: 'Leave it',      desc: 'Walk away clean',               icon: '🚫', risk: 'safe' },
    ]};
    case 'ancient_kraken': return { cellType: type, choices: [
      { label: 'Face the Ancient', desc: 'Legendary fight — massive reward', icon: '⚔️', risk: 'bold'  },
      { label: 'Offer sacrifice',  desc: '-50 gold, it lets you pass',        icon: '🩸', risk: 'risky' },
    ]};
    default: return { cellType: type, choices: [
      { label: 'Continue',    desc: 'Sail on',             icon: '⛵', risk: 'safe' },
      { label: 'Look around', desc: 'Use a turn to scout', icon: '🔭', risk: 'safe' },
    ]};
  }
}

// ─── COMPUTE TITLE ───────────────────────────────────────────────────────────
function computeTitle(s: GameState): string {
  if (s.exploits.includes('ancient'))                              return 'Légende des Mers';
  if (s.exploits.includes('krakenlow'))                            return 'Fléau des Abysses';
  if (s.ship.upgrades.includes('greed') && s.ship.gold > 500)     return 'Marchand Maudit';
  if (s.ship.upgrades.includes('berserker') && s.notoriety >= 8)  return 'Berserker des Mers';
  if (s.ship.upgrades.includes('rider'))                           return 'Danseur de Tempête';
  if (s.ship.upgrades.includes('ghost'))                           return 'Fantôme des Mers';
  if (s.notoriety >= 8)                                            return 'Fléau des Pirates';
  if (s.curses.length >= 2)                                        return 'Survivant Maudit';
  if (s.exploits.includes('survival'))                             return 'Miraculé';
  if (s.exploits.includes('streak5'))                              return 'Corsaire Téméraire';
  if (s.exploits.includes('brokebut'))                             return 'Vagabond des Mers';
  if (s.ship.upgrades.includes('explorer'))                        return 'Grand Explorateur';
  if (s.score > 1000)                                              return 'Corsaire Légendaire';
  if (s.score > 500)                                               return 'Loup de Mer';
  return 'Corsaire';
}

// ─── INIT ────────────────────────────────────────────────────────────────────
export function initGame(seed?: number): GameState {
  const s = seed ?? (Date.now() % 999999);
  const cx = Math.floor(GRID_SIZE / 2), cy = GRID_SIZE - 1;
  const ship: Ship = { x: cx, y: cy, hull: 20, maxHull: 20, gold: 80, power: 2, vision: 1, upgrades: [] };
  const grid = revealAround(generateGrid(s, []), cx, cy, 1);
  return {
    grid, ship, event: null,
    turn: 0, score: 0, depth: 0,
    seed: s, rngState: s,
    log: 'The sea calls, Captain.',
    gameOver: false, showPort: false,
    stormDistance: 16,
    upgradeToken: false, escapeUsed: false,
    dangerStreak: 0, scoreMultiplier: 1, notoriety: 0,
    curses: [], exploits: [], lowestHull: 20,
    runTitle: 'Corsaire', hunter: null,
    zone: 1, portUpgrades: [],
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
  rng:           Rng;
  zoneLabel:     'early' | 'mid' | 'late';
};

function stepMovement(state: GameState, dx: number, dy: number, rng: Rng): MoveContext | null {
  const nx = state.ship.x + dx, ny = state.ship.y + dy;
  if (nx < 0 || nx >= GRID_SIZE || ny < 0 || ny >= GRID_SIZE) return null;

  const zoneLabel: 'early' | 'mid' | 'late' =
    ny >= Math.floor(GRID_SIZE * 0.7) ? 'early' :
    ny >= Math.floor(GRID_SIZE * 0.4) ? 'mid' : 'late';

  let ship = { ...state.ship, x: nx, y: ny };
  // Storm Rider constant dmg (applied before everything)
  if (ship.upgrades.includes('rider')) ship.hull = Math.max(1, ship.hull - 1);

  const surgeChance = zoneLabel === 'early' ? 0.05 : zoneLabel === 'mid' ? 0.15 : 0.25;
  const surge = rng.next() < surgeChance ? 2 : 1;
  const stormDistance = Math.max(0, state.stormDistance - surge);

  let grid = revealAround(state.grid, nx, ny, ship.vision);

  return {
    state, ship, grid, nx, ny,
    turn: state.turn + 1, depth: state.depth + 1,
    score: state.score + 5,
    stormDistance,
    gameOver: false, log: surge === 2 ? '⚡ Storm surge!' : '',
    event: null, showPort: false,
    hunter: state.hunter,
    rng, zoneLabel,
  };
}

function stepStorm(ctx: MoveContext): MoveContext {
  const { stormDistance } = ctx;
  const stormFrontY = stormDistance <= 0 ? -1 : GRID_SIZE + 2 - Math.floor((10 - stormDistance) / 3);
  ctx.grid = ctx.grid.map((row, sy) =>
    row.map(cell => sy >= stormFrontY ? { ...cell, stormed: true, revealed: true } : cell)
  );
  if (ctx.grid[ctx.ny][ctx.nx].stormed && !ctx.ship.upgrades.includes('rider')) {
    ctx.gameOver = true;
    ctx.log = 'The storm engulfs your ship!';
  }
  if (stormDistance <= 0) {
    ctx.gameOver = true;
    ctx.log = 'The storm consumes your ship...';
  }
  return ctx;
}

function stepHunter(ctx: MoveContext): MoveContext {
  const { nx, ny, turn, ship } = ctx;
  let h = ctx.hunter;

  // Spawn at turn 8
  if (turn === 8 && !h) {
    h = { x: nx < GRID_SIZE / 2 ? GRID_SIZE - 1 : 0, y: 0, active: true };
  } else if (h && h.active) {
    // Scale speed with turns: every 3 turns after turn 15, hunter moves 2 steps
    const moves = turn > 15 && turn % 3 === 0 ? 2 : 1;
    for (let i = 0; i < moves; i++) {
      const hdx: number = nx > h.x ? 1 : nx < h.x ? -1 : 0;
      const hdy: number = ny > h.y ? 1 : ny < h.y ? -1 : 0;
      h = { ...h, x: h.x + hdx, y: h.y + hdy };
    }
  }

  if (h && h.active && Math.abs(h.x - nx) <= 1 && Math.abs(h.y - ny) <= 1) {
    const dmg = Math.max(3, 8 - ship.power);
    ctx.ship = { ...ctx.ship, hull: Math.max(0, ctx.ship.hull - dmg) };
    ctx.log += ` 🐙 The Hunter strikes! -${dmg} hull.`;
    if (ctx.ship.hull <= 0) ctx.gameOver = true;
  }

  ctx.hunter = h;
  return ctx;
}

function stepCellEvent(ctx: MoveContext): MoveContext {
  if (ctx.gameOver) return ctx;
  const { nx, ny, ship, rng, zoneLabel } = ctx;
  const cell = ctx.state.grid[ny][nx];

  if (cell.type === 'sea') {
    // Micro events
    const roll = rng.next();
    if (roll < 0.08) {
      const b = rng.int(1, 3);
      ctx.score += b * 10;
      ctx.log = `Favorable winds! +${b * 10} pts` + (ctx.log ? ' ' + ctx.log : '');
    } else if (roll < 0.18) {
      const d = zoneLabel === 'early' ? 1 : 2;
      ctx.ship = { ...ship, hull: Math.max(1, ship.hull - d) };
      ctx.log = `Hull creaks. -${d} hull.` + (ctx.log ? ' ' + ctx.log : '');
    } else if (roll < 0.22) {
      ctx.log = '✦ The water shimmers... treasure nearby.' + (ctx.log ? ' ' + ctx.log : '');
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

  // Storm Rider ignores storm cells
  if (ship.upgrades.includes('rider') && cell.type === 'storm') {
    ctx.ship = { ...ctx.ship, hull: Math.max(1, ctx.ship.hull - 2) };
    ctx.log = 'Storm Rider: -2 hull.' + (ctx.log ? ' ' + ctx.log : '');
    return ctx;
  }

  // Hybrid event mid/late
  if (cell.type === 'pirate' && ny <= Math.floor(GRID_SIZE * 0.4) && rng.next() < 0.3) {
    ctx.event = { cellType: 'pirate' as CellType, choices: [
      { label: 'Fight in the storm', desc: 'Extra dmg but double loot',    icon: '⚡', risk: 'bold' as const },
      { label: 'Use storm as cover', desc: 'Escape but lose 1 storm turn', icon: '🌪', risk: 'risky' as const },
    ]};
    ctx.log = 'Pirates attack under the storm!' + (ctx.log ? ' ' + ctx.log : '');
    return ctx;
  }

  ctx.event = buildEvent(cell.type, ctx.ship.power);
  return ctx;
}

function ctxToState(ctx: MoveContext): GameState {
  const { state, ship, grid, turn, depth, score, stormDistance, gameOver, log, event, showPort, hunter } = ctx;
  const next: GameState = {
    ...state, ship, grid, turn, depth, score, stormDistance, gameOver, log,
    event, showPort, hunter, rngState: ctx.rng.getState(),
    dangerStreak: state.dangerStreak,
    scoreMultiplier: state.scoreMultiplier,
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

  return ctxToState(stepCellEvent(stepHunter(stepStorm(ctx))));
}

// ─── RESOLVE EVENT ───────────────────────────────────────────────────────────
export function resolveEvent(state: GameState, choiceIdx: number): GameState {
  if (!state.event) return state;
  const rng = seededRng(state.rngState);
  const { cellType } = state.event;

  const armor      = state.ship.upgrades.includes('armor');
  const isGreed    = state.ship.upgrades.includes('greed');
  const isExplorer = state.ship.upgrades.includes('explorer');

  let ship          = { ...state.ship };
  let score         = state.score;
  let showPort      = false;
  let upgradeToken  = state.upgradeToken;
  let log           = '';
  let gameOver      = false;
  let stormDistance = state.stormDistance;
  const dmgReduction = armor ? 3 : 0;

  const dangerTypes   = ['pirate','kraken','storm','rocks','wreck','maelstrom','ancient_kraken'];
  let dangerStreak    = dangerTypes.includes(cellType) ? state.dangerStreak + 1 : 0;
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

  const done = (overrides: Partial<GameState> = {}): GameState => {
    ship.hull = Math.max(0, ship.hull);
    if (ship.hull <= 0) gameOver = true;
    lowestHull = Math.min(lowestHull, ship.hull);
    if (ship.hull === 1 && !exploits.includes('survival'))  { exploits.push('survival');  score += 200; log += ' ⚡ Survived at 1 HP! +200pts'; }
    if (dangerStreak >= 5 && !exploits.includes('streak5')) { exploits.push('streak5');   score += 300; log += ' ⚡ 5 dangers streak! +300pts'; }
    if (cellType === 'kraken' && choiceIdx === 0 && ship.hull <= 5 && !exploits.includes('krakenlow')) { exploits.push('krakenlow'); score += 500; log += ' ⚡ Kraken slain at deaths door! +500pts'; }
    if (ship.gold === 0 && !exploits.includes('brokebut'))  { exploits.push('brokebut');  score += 150; log += ' ⚡ Sailed penniless! +150pts'; }
    const result: GameState = {
      ...state, grid, ship, event: null, log, score, showPort, upgradeToken, gameOver,
      rngState: rng.getState(), dangerStreak, scoreMultiplier, notoriety, curses,
      exploits, lowestHull, hunter, zone: state.zone, portUpgrades,
      runTitle: state.runTitle, stormDistance, ...overrides,
    };
    return gameOver ? { ...result, runTitle: computeTitle(result) } : result;
  };

  if (choiceIdx === 0) {
    switch(cellType) {
      case 'wreck': {
        if (rng.next() < 0.6) { const g = rng.int(40,100); ship.gold += g; score += g; log = `Wreck searched! +${g} gold.`; }
        else { const d = Math.max(1, rng.int(6,12) - dmgReduction); ship.hull -= d; log = `Booby-trapped! -${d} hull.`; }
        break;
      }
      case 'pirate': {
        const d = Math.max(0, rng.int(3,10) - ship.power - dmgReduction);
        const g = rng.int(20,60) + Math.floor(notoriety/3);
        const goldGain = isGreed ? g*2 : g;
        ship.hull -= d; ship.gold += goldGain;
        score += (goldGain + 35) * scoreMultiplier;
        notoriety = Math.min(10, notoriety + 2);
        log = `Pirates defeated! -${d} hull, +${goldGain} gold.${scoreMultiplier > 1 ? ` [x${scoreMultiplier}]` : ''}`;
        break;
      }
      case 'kraken': {
        const d = Math.max(3, rng.int(10,18) - ship.power - dmgReduction);
        ship.hull -= d; score += 150 * scoreMultiplier;
        ship.vision = Math.max(1, ship.vision - 1);
        curses.push('kraken');
        log = `THE KRAKEN FALLS! -${d} hull. +${150*scoreMultiplier} score! Vision cursed.`;
        break;
      }
      case 'storm': {
        if (rng.next() < 0.6) log = 'Pushed through! No damage.';
        else { const d = Math.max(1, rng.int(4,8) - dmgReduction); ship.hull -= d; log = `Storm tears the hull! -${d}.`; }
        break;
      }
      case 'treasure': {
        const g = isExplorer ? Math.floor(rng.int(30,90)/2) : rng.int(30,90);
        const bonus = state.ship.upgrades.includes('hunter') && scoreMultiplier >= 3 ? 2 : 1;
        const total = Math.floor(g * bonus);
        ship.gold += total; score += total * scoreMultiplier;
        log = `Treasure! +${total} gold!${scoreMultiplier > 1 ? ` [x${scoreMultiplier}]` : ''}${bonus > 1 ? ' JACKPOT!' : ''}`;
        break;
      }
      case 'port': {
        showPort = true;
        const all = ['vision','compass','detector','power','armor','escape','ghost','hunter','rider','stormbreaker','greed','berserker','explorer'];
        const avail = all.filter(u => !ship.upgrades.includes(u as UpgradeId));
        portUpgrades = [...avail].sort(() => rng.next() - 0.5).slice(0, 4);
        log = 'Welcome to port, Captain!';
        break;
      }
      case 'island': {
        if (ship.gold >= 100) { ship.gold -= 100; log = 'Ancient ritual! Storm +3 turns.'; return done({ stormDistance: stormDistance + 3 }); }
        else log = 'Not enough gold. (need 100g)';
        break;
      }
      case 'rocks': { log = 'Navigated carefully. Safe.'; break; }
      case 'maelstrom': {
        const mx = rng.int(0, GRID_SIZE-1), my = rng.int(0, GRID_SIZE-1);
        const tGrid = revealAround(grid, mx, my, ship.vision);
        ship.x = mx; ship.y = my;
        const tScore = rng.next() < 0.5 ? 200 : 0;
        const tDmg   = rng.next() < 0.5 ? rng.int(5,15) : 0;
        ship.hull -= tDmg;
        if (tScore > 0) { ship.gold += 50; score += tScore; }
        log = tScore > 0 ? `Maelstrom! Lucky! +50g +200pts` : `Maelstrom! -${tDmg} hull.`;
        return done({ grid: tGrid });
      }
      case 'cursed_treasure': {
        ship.gold += 300; score += 300 * scoreMultiplier;
        ship.vision = Math.max(1, ship.vision - 1);
        curses.push('cursed_treasure');
        log = `Cursed treasure! +300g. Vision cursed.${scoreMultiplier > 1 ? ` [x${scoreMultiplier}]` : ''}`;
        break;
      }
      case 'ancient_kraken': {
        const d = Math.max(5, rng.int(15,25) - ship.power - dmgReduction);
        ship.hull -= d; score += 800 * scoreMultiplier; ship.power += 3; ship.gold += 200;
        curses.push('ancient_kraken');
        log = `ANCIENT KRAKEN FALLS! -${d} hull. +800pts +200g +3 power!`;
        if (!exploits.includes('ancient')) { exploits.push('ancient'); score += 1000; log += ' ⚡ LEGENDARY! +1000pts'; }
        break;
      }
      default: { log = 'You sail on.'; break; }
    }
  } else {
    switch(cellType) {
      case 'pirate': {
        const cost = rng.int(15,35) + Math.floor(notoriety*2);
        ship.gold = Math.max(0, ship.gold - cost);
        notoriety = Math.max(0, notoriety - 1);
        log = `Paid ${cost} gold tribute. Notoriety down.`;
        break;
      }
      case 'kraken': {
        ship.hull = Math.max(1, ship.hull - 20);
        const riderBonus = state.ship.upgrades.includes('rider') ? 200 : 0;
        if (riderBonus > 0) score += riderBonus;
        hunter = state.hunter
          ? { ...state.hunter, active: true }
          : { x: ship.x > GRID_SIZE/2 ? 0 : GRID_SIZE-1, y: 0, active: true };
        log = `Pact! -20 hull, storm +5 turns. Hunter awakens!${riderBonus > 0 ? ' +200pts' : ''}`;
        return done({ stormDistance: stormDistance + 5, hunter });
      }
      case 'storm':          { log = 'Detoured. Storm +1.';   return done({ stormDistance: Math.max(0, stormDistance - 1) }); }
      case 'maelstrom':      { log = 'You resist the vortex.'; return done({ stormDistance: Math.max(0, stormDistance - 1) }); }
      case 'treasure':       { log = 'You leave the treasure.'; break; }
      case 'port':           { log = 'No time to stop.'; break; }
      case 'ancient_kraken': { ship.gold = Math.max(0, ship.gold - 50); log = 'You offer gold. It lets you pass.'; break; }
      case 'cursed_treasure':{ log = 'You leave the cursed gold.'; break; }
      default:               { log = 'You move on.'; break; }
    }
  }

  return done();
}

// ─── BUY UPGRADE ─────────────────────────────────────────────────────────────
export function buyUpgrade(state: GameState, id: UpgradeId): GameState {
  const COSTS: Record<UpgradeId, number> = { vision:60, power:80, escape:70, detector:55, armor:90, compass:65, ghost:85, hunter:75, rider:95, stormbreaker:100, greed:60, berserker:60, explorer:60 };
  const greedTax = state.ship.upgrades.includes('greed') ? 1.5 : 1;
  const cost = state.upgradeToken ? 0 : Math.floor(COSTS[id] * greedTax);
  if (state.ship.gold < cost || state.ship.upgrades.includes(id)) return state;
  let ship = { ...state.ship, gold: state.ship.gold - cost, upgrades: [...state.ship.upgrades, id] };
  if (id === 'power')     ship.power += 4;
  if (id === 'vision')    ship.vision = Math.max(ship.vision, 2);
  if (id === 'armor')     ship.maxHull += 5;
  if (id === 'berserker') ship.power *= 2;
  if (id === 'explorer')  ship.vision += 3;
  if (id === 'stormbreaker') {
    const grid = revealAround(state.grid, ship.x, ship.y, ship.vision);
    return { ...state, ship, grid, upgradeToken: false, log: 'Stormbreaker ready!', stormDistance: Math.max(state.stormDistance, 5) };
  }
  const grid = revealAround(state.grid, ship.x, ship.y, ship.vision);
  return { ...state, ship, grid, upgradeToken: false, log: `${id} equipped!` };
}

// ─── REPAIR ──────────────────────────────────────────────────────────────────
export function repairHull(state: GameState, amount: number, cost: number): GameState {
  if (state.ship.upgrades.includes('greed')) return { ...state, log: 'Cursed Greed prevents repairs!' };
  if (state.ship.gold < cost) return state;
  const riderPenalty = state.ship.upgrades.includes('rider') ? 0.5 : 1;
  const healed = Math.floor(amount * riderPenalty);
  const ship = { ...state.ship, hull: Math.min(state.ship.maxHull, state.ship.hull + healed), gold: state.ship.gold - cost };
  return { ...state, ship };
}

// ─── PORT / SKIP ─────────────────────────────────────────────────────────────
export function leavePort(state: GameState): GameState {
  return { ...state, showPort: false, log: 'Back to sea!' };
}

export function skipEventFn(state: GameState): GameState {
  if (state.escapeUsed || !state.event) return state;
  const grid = state.grid.map((row, y) => row.map((cell, x) =>
    x === state.ship.x && y === state.ship.y ? { ...cell, visited: true } : cell
  ));
  return { ...state, grid, event: null, escapeUsed: true, log: '⛵ Swift Sails — escaped!' };
}
