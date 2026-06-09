import type { GameState } from '../../types/game';
import { BALANCE } from '../balance';
import { getStreakEffects } from './streak';
import type { Rng } from '../rng';

export function applyAchievements(s: GameState): GameState {
  let { score, exploits, log } = s;
  let changed = false;

  if (s.ship.hull === 1 && !exploits.includes('survival')) {
    exploits = [...exploits, 'survival']; score += 200;
    log += ' ⚡ Survived at 1 HP! +200pts'; changed = true;
  }
  if (s.dangerStreak >= 5 && !exploits.includes('streak5')) {
    exploits = [...exploits, 'streak5']; score += 300;
    log += ' ⚡ 5 dangers streak! +300pts'; changed = true;
  }
  if (s.ship.gold === 0 && !exploits.includes('brokebut')) {
    exploits = [...exploits, 'brokebut']; score += 150;
    log += ' ⚡ Sailed penniless! +150pts'; changed = true;
  }
  return changed ? { ...s, score, exploits, log } : s;
}

export function applyGreedCurse(s: GameState, rng: Rng): GameState {
  if (!s.ship.upgrades.includes('greed')) return s;
  let { ship, curses, log } = s;
  const cfx = getStreakEffects(s.dangerStreak);

  if (ship.gold >= BALANCE.greed.curseThreshold && cfx.curseChance > 0 && rng.next() < cfx.curseChance && curses.length < 3) {
    const newCurse = rng.next() < 0.5 ? 'kraken_curse' : 'cursed_treasure';
    if (!curses.includes(newCurse as any)) {
      curses = [...curses, newCurse as any];
      if (newCurse === 'kraken_curse') { ship = { ...ship, vision: Math.max(1, ship.vision - 1) }; log += ' 👁 The sea blinds you. -1 vision.'; }
      else { ship = { ...ship, gold: Math.floor(ship.gold * 0.8) }; log += ' 💸 Cursed waters drain your gold. -20%.'; }
    }
  }
  return { ...s, ship, curses, log };
}
