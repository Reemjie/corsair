import { BALANCE } from '../balance';

export function getStreakEffects(streak: number) {
  return {
    goldBonus:       streak >= BALANCE.streak.goldBonusAt    ? BALANCE.streak.goldBonus    : 1,
    hunterAggro:     streak >= BALANCE.streak.hunterAggroAt,
    stormAggro:      streak >= BALANCE.streak.stormAggroAt   ? BALANCE.streak.stormAggroBonus : 0,
    eliteChance:     streak >= BALANCE.streak.eliteAt        ? BALANCE.streak.eliteChance   : 0,
    curseChance:     streak >= BALANCE.streak.curseAt        ? BALANCE.streak.curseChance   : 0,
    rareEventChance: streak >= BALANCE.streak.rareAt         ? BALANCE.streak.rareChance    : 0,
  };
}

export function getSynergies(ship: { upgrades: string[]; levels: { hull: number; weapon: number; nav: number }; gold: number }) {
  const has = (id: string) => ship.upgrades.includes(id);
  return {
    berserkerCrit: has('berserker') && ship.levels.weapon >= 2,
    ghostVision:   has('ghost')     && ship.levels.nav    >= 1,
    stormHeal:     has('rider')     && ship.levels.hull   >= 2,
    greedFrenzy:   has('greed')     && ship.gold          >= BALANCE.greed.frenzyGold,
  };
}

/** Incoming hull loss — Berserker pays the tax advertised in the shop. */
export function scaleIncomingDamage(upgrades: string[], dmg: number): number {
  if (dmg <= 0) return 0;
  if (!upgrades.includes('berserker')) return dmg;
  return dmg * (BALANCE.berserker?.damageTakenMult ?? 2);
}

/** Weapon level → base power, then Berserker ×2, plus small ship bonuses. */
export function powerFromWeaponLevel(
  weaponLevel: 0 | 1 | 2,
  upgrades: string[],
  extras: { corsair?: boolean } = {},
): number {
  let power = weaponLevel === 0 ? BALANCE.ship.startPower
    : weaponLevel === 1 ? BALANCE.ship.weapon2Power
    : BALANCE.ship.weapon3Power;
  if (extras.corsair) power += 1;
  if (upgrades.includes('berserker')) power *= 2;
  return power;
}
