// ─── FEATS & UNLOCKS ─────────────────────────────────────────────────
// Hauts faits persistants (localStorage). Chaque feat debloque un titre
// de capitaine. Architecture prete pour des recompenses futures (navires).

import type { GameState } from '../types/game';

export interface Feat {
  id: string;
  name: string;
  desc: string;
  icon: string;
  title: string; // titre de capitaine debloque
  check: (s: GameState) => boolean;
}

export const FEATS: Feat[] = [
  { id: 'first_voyage', icon: 'anchor', name: 'First Voyage',      title: 'Deckhand',
    desc: 'Complete your first run.',                    check: s => s.turn >= 1 },
  { id: 'sea_legs',     icon: 'wave', name: 'Sea Legs',          title: 'Sailor',
    desc: 'Survive 15 turns in a single run.',           check: s => s.turn >= 15 },
  { id: 'storm_sea',    icon: 'vortex', name: 'Into the Storm Sea', title: 'Storm Chaser',
    desc: 'Reach The Storm Sea (Zone 2).',               check: s => (s.currentZone ?? 1) >= 2 },
  { id: 'the_abyss',    icon: 'abyss', name: 'The Abyss Beckons', title: 'Abysswalker',
    desc: 'Reach The Abyss (Zone 3).',                   check: s => (s.currentZone ?? 1) >= 3 },
  { id: 'prey_no_more', icon: 'kraken', name: 'Prey No More',      title: 'Hunted',
    desc: 'Survive 2 Hunter attacks in one run.',        check: s => (s.hunterAttacksSurvived ?? 0) >= 2 },
  { id: 'gold_hoarder', icon: 'treasure', name: 'Gold Hoarder',      title: 'Merchant Prince',
    desc: 'Hold 300 gold at the end of a run.',          check: s => s.ship.gold >= 300 },
  { id: 'legend_coast', icon: 'star',  name: 'Legend of the Coast', title: 'Corsair',
    desc: 'Score 1,000 points in a single run.',         check: s => s.score >= 1000 },
  { id: 'storm_legend', icon: 'lightning', name: 'Storm Legend',      title: 'Storm Legend',
    desc: 'Score 2,000 points in a single run.',         check: s => s.score >= 2000 },
  { id: 'daredevil',    icon: 'fire', name: 'Daredevil',         title: 'Daredevil',
    desc: 'Chain 5 dangerous encounters in a row.',      check: s => (s.exploits ?? []).includes('streak5') },
  { id: 'full_rig',     icon: 'flag', name: 'Full Rig',          title: 'Dread Captain',
    desc: 'Own 2 special abilities at the same time.',   check: s => (s.ship.upgrades ?? []).length >= 2 },
];

const KEY = 'corsair_feats';
const TITLE_KEY = 'corsair_title';

export function getUnlockedFeats(): string[] {
  try { return JSON.parse(localStorage.getItem(KEY) ?? '[]'); } catch { return []; }
}

// Verifie l'etat de fin de run, persiste, renvoie les feats NOUVELLEMENT debloques.
export function checkAndUnlockFeats(s: GameState): Feat[] {
  const unlocked = new Set(getUnlockedFeats());
  const fresh: Feat[] = [];
  for (const f of FEATS) {
    if (!unlocked.has(f.id) && f.check(s)) { unlocked.add(f.id); fresh.push(f); }
  }
  if (fresh.length > 0) {
    try { localStorage.setItem(KEY, JSON.stringify([...unlocked])); } catch { /* quota */ }
  }
  return fresh;
}

export function getEquippedTitle(): string | null {
  return localStorage.getItem(TITLE_KEY);
}

export function setEquippedTitle(title: string | null) {
  if (title) localStorage.setItem(TITLE_KEY, title);
  else localStorage.removeItem(TITLE_KEY);
}
