import type { GameState } from '../../types/game';
import { BALANCE } from '../balance';
import type { Rng } from '../rng';

type KrakenResult = {
  ship: GameState['ship'];
  score: number;
  curses: GameState['curses'];
  log: string;
  stormDistance?: number;
  hunter?: GameState['hunter'];
};

export function resolveKrakenFight(
  ship: GameState['ship'],
  rng: Rng,
  scoreMultiplier: number,
  curses: GameState['curses'],
): KrakenResult {
  const d = Math.max(BALANCE.combat.krakenDmgFloor, rng.int(BALANCE.combat.krakenDmgMin, BALANCE.combat.krakenDmgMax) - ship.power);
  return {
    ship: { ...ship, hull: ship.hull - d, vision: Math.max(1, ship.vision - 1) },
    score: BALANCE.combat.krakenScore * scoreMultiplier,
    curses: [...curses, 'kraken_curse'],
    log: `The sea runs black with ink. The Kraken sinks into the abyss. -${d} hull. Your eyes... feel different. +${BALANCE.combat.krakenScore * scoreMultiplier} pts.`,
  };
}

export function resolveKrakenPact(
  ship: GameState['ship'],
  stormDistance: number,
  hunter: GameState['hunter'],
  hasRider: boolean,
  score: number,
  GRID_SIZE: number,
): KrakenResult {
  const riderBonus = hasRider ? 200 : 0;
  const newHunter = hunter
    ? { ...hunter, active: true, mode: 'tracking' as const, searchTurns: 0, frenzyTurns: 0 }
    : { x: ship.x > GRID_SIZE / 2 ? 0 : GRID_SIZE - 1, y: 0, active: true, mode: 'tracking' as const, searchTurns: 0, frenzyTurns: 0, awareness: 0 };
  return {
    ship: { ...ship, hull: Math.max(1, ship.hull - BALANCE.port.krakenPactHull) },
    score: score + riderBonus,
    curses: [],
    log: `You offer your blood to the deep. The storm holds back... but something stirs in the dark. -${BALANCE.port.krakenPactHull} hull.${riderBonus > 0 ? ' +200pts' : ''}`,
    stormDistance: stormDistance + BALANCE.port.krakenPactStorm,
    hunter: newHunter,
  };
}
