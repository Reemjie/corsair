import { BALANCE } from '../../game/balance';
import { scaleIncomingDamage } from '../../game/systems/streak';
import type { GameState } from '../../types/game';

export type HunterThreat = 'calm' | 'watch' | 'danger' | 'critical';

export function hunterManhattan(s: GameState): number {
  const h = s.hunter;
  if (!h?.active) return 99;
  return Math.abs(h.x - s.ship.x) + Math.abs(h.y - s.ship.y);
}

/** Same formula as engine stepHunter hit — display only (includes Berserker tax). */
export function hunterHitDamage(s: GameState): number {
  const black = (s.relics ?? []).includes('black_flag') ? 2 : 0;
  const raw = Math.max(BALANCE.hunter.minDamage, BALANCE.hunter.baseDamage - s.ship.power) + black;
  return scaleIncomingDamage(s.ship.upgrades, raw);
}

export function hunterModeLabel(mode: string): string {
  return mode === 'frenzy' ? 'ENRAGED'
    : mode === 'stalking' ? 'STALKING'
    : mode === 'searching' ? 'SEARCHING'
    : 'TRACKING';
}

/** Fits on the map tile badge — never truncate words. */
export function hunterModeShort(mode: string): string {
  return mode === 'frenzy' ? 'ENR'
    : mode === 'stalking' ? 'STK'
    : mode === 'searching' ? 'SRC'
    : 'TRK';
}

/** One line: what this mode does to the player. */
export function hunterModeHint(mode: string): string {
  return mode === 'frenzy' ? 'Knows where you are · strikes hard'
    : mode === 'stalking' ? 'Cuts your path · moves every turn'
    : mode === 'searching' ? 'Lost your trail · wandering'
    : 'Following your wake · every other turn';
}

export function hunterDistLabel(dist: number): string {
  if (dist <= 0) return 'ON YOU';
  if (dist === 1) return '1 CELL — NEXT HIT';
  if (dist === 2) return '2 CELLS AWAY';
  return `${dist} CELLS AWAY`;
}

export function hunterThreatLevel(s: GameState): HunterThreat {
  if (!s.hunter?.active) return 'calm';
  const dist = hunterManhattan(s);
  if (dist <= 1 || s.hunter.mode === 'frenzy') return 'critical';
  if (dist <= 3 || s.hunter.awareness >= 80) return 'danger';
  if (dist <= 5 || s.hunter.mode === 'stalking') return 'watch';
  return 'calm';
}

/** Compact banner text for map / mobile. */
export function hunterBannerText(s: GameState): string {
  if (!s.hunter?.active) return '';
  const dist = hunterManhattan(s);
  const dmg = hunterHitDamage(s);
  const mode = hunterModeLabel(s.hunter.mode);
  if (dist <= 1) return `${mode} · STRIKE ~−${dmg} hull`;
  return `${mode} · ${dist} away · hit ~−${dmg}`;
}
