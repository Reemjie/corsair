import { BALANCE } from './balance.ts';
import { getSynergies } from './systems/streak.ts';
import type { CurseId, Ship, ShipLevels, UpgradeId } from '../types/game.ts';

/** Sources empilables → un seul rayon de vision (style longue-vue Bang). */
export function computeVision(args: {
  levels: ShipLevels;
  upgrades: UpgradeId[];
  relics: string[];
  curses: CurseId[];
  shipType?: string;
  visionBlind?: number;
}): number {
  const nav = args.levels.nav;
  let v = nav === 0 ? BALANCE.ship.startVision
    : nav === 1 ? BALANCE.ship.nav2Vision
    : BALANCE.ship.nav3Vision;

  if (args.shipType === 'specter') v += 1;
  if (args.shipType === 'breakwater') v -= 1;

  if ((args.relics ?? []).includes('cracked_spyglass')) v += 1;

  if (args.upgrades.includes('ghost')) {
    v += BALANCE.ghost.visionBonus;
    const syn = getSynergies({ upgrades: args.upgrades, levels: args.levels, gold: 0 });
    if (syn.ghostVision) v += 1;
  }

  // Malus permanents : tresor maudit (et greed qui pousse la meme curse)
  for (const c of args.curses ?? []) {
    if (c === 'cursed_treasure') v -= 1;
  }

  // Malus temporaires (kraken / aveuglement) — recuperables
  v -= Math.max(0, args.visionBlind ?? 0);

  const max = BALANCE.vision?.max ?? 4;
  return Math.max(1, Math.min(max, v));
}

export function syncShipVision(
  ship: Ship,
  extras: {
    relics: string[];
    curses: CurseId[];
    shipType?: string;
    visionBlind?: number;
  },
): Ship {
  return {
    ...ship,
    vision: computeVision({
      levels: ship.levels,
      upgrades: ship.upgrades,
      relics: extras.relics,
      curses: extras.curses,
      shipType: extras.shipType,
      visionBlind: extras.visionBlind,
    }),
  };
}

/** +1 aveuglement temporaire ; recupere 1 palier tous les blindRecoverTurns. */
export function applyVisionBlind(
  visionBlind: number,
  visionBlindRecoverIn: number,
): { visionBlind: number; visionBlindRecoverIn: number } {
  const recover = BALANCE.vision?.blindRecoverTurns ?? 5;
  const next = Math.min((BALANCE.vision?.maxBlind ?? 3), visionBlind + 1);
  return {
    visionBlind: next,
    visionBlindRecoverIn: visionBlind > 0 && visionBlindRecoverIn > 0
      ? visionBlindRecoverIn
      : recover,
  };
}

/** Tick une fois par tour de deplacement. */
export function tickVisionBlind(
  visionBlind: number,
  visionBlindRecoverIn: number,
): { visionBlind: number; visionBlindRecoverIn: number; recovered: boolean } {
  if (visionBlind <= 0) {
    return { visionBlind: 0, visionBlindRecoverIn: 0, recovered: false };
  }
  const left = visionBlindRecoverIn - 1;
  if (left > 0) {
    return { visionBlind, visionBlindRecoverIn: left, recovered: false };
  }
  const next = visionBlind - 1;
  const recover = BALANCE.vision?.blindRecoverTurns ?? 5;
  return {
    visionBlind: next,
    visionBlindRecoverIn: next > 0 ? recover : 0,
    recovered: true,
  };
}
