import type { GameState } from '../../types/game';
import { BALANCE } from '../balance';
import type { Rng } from '../rng';

type PirateResult = {
  ship: GameState['ship'];
  score: number;
  notoriety: number;
  log: string;
};

export function resolvePirateFight(
  ship: GameState['ship'],
  rng: Rng,
  notoriety: number,
  scoreMultiplier: number,
  isGreed: boolean,
  hullPassive: number,
  minCombatDmg: number,
  goldBonus: number,
  hasCrit: boolean,
): PirateResult {
  const rawD = Math.max(0, rng.int(BALANCE.combat.pirateDmgMin, BALANCE.combat.pirateDmgMax) - ship.power - hullPassive);
  const d = Math.max(minCombatDmg, rawD);
  const g = rng.int(BALANCE.combat.pirateGoldMin, BALANCE.combat.pirateGoldMax) + Math.floor(notoriety / 3);
  const greedBonus = isGreed ? 1.5 : 1;
  const goldGain = Math.floor(g * greedBonus * goldBonus);
  const goldCap = ship.gold >= 300 ? 0.6 : ship.gold >= 200 ? 0.8 : 1;
  const goldFinal = Math.floor(goldGain * goldCap);
  const capMsg = goldCap < 1 ? ' (hold full — gold lost at sea)' : '';
  const critMult = hasCrit ? BALANCE.combat.berserkerCritMult : 1;
  const score = (goldFinal + 35) * scoreMultiplier * critMult;

  return {
    ship: { ...ship, hull: ship.hull - d, gold: ship.gold + goldFinal },
    score,
    notoriety: Math.min(10, notoriety + 2),
    log: `Pirates defeated! -${d} hull, +${goldFinal} gold.${hasCrit ? ' ⚡ CRITICAL HIT!' : ''}${capMsg}${scoreMultiplier > 1 ? ` [x${scoreMultiplier}]` : ''}`,
  };
}

export function resolvePirateTribute(
  ship: GameState['ship'],
  rng: Rng,
  notoriety: number,
): PirateResult {
  const cost = rng.int(15, 35) + Math.floor(notoriety * 2);
  return {
    ship: { ...ship, gold: Math.max(0, ship.gold - cost) },
    score: 0,
    notoriety: Math.max(0, notoriety - 1),
    log: `You toss the gold overboard. The pirates let you pass in silence. -${cost} gold.`,
  };
}
