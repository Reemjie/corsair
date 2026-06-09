import type { GameState } from '../../types/game';
import type { Rng } from '../rng';

type EventResult = { ship: GameState['ship']; log: string; stormDistance: number };

export function resolveStormFight(ship: GameState['ship'], rng: Rng, stormDistance: number, envDmgReduction: number): EventResult {
  if (rng.next() < 0.6) {
    return { ship, log: 'Your crew holds the mast. You burst through the storm unscathed.', stormDistance };
  }
  const d = Math.max(1, rng.int(4, 8) - envDmgReduction);
  return {
    ship: { ...ship, hull: ship.hull - d },
    log: `Lightning splits the deck. The hull groans under the pressure. -${d} hull.`,
    stormDistance,
  };
}

export function resolveStormFlee(stormDistance: number): EventResult & { ship: GameState['ship'] } {
  return {
    ship: {} as GameState['ship'],
    log: 'You change course, keeping the storm to your stern. It gains ground.',
    stormDistance: Math.max(0, stormDistance - 1),
  };
}
