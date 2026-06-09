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
