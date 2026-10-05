// ─── SHIPS ───────────────────────────────────────────────────────────
// Navires de depart debloquables via les feats. Le navire choisi modifie
// les conditions de la run (mode normal uniquement — le Daily force 'default').

import { getUnlockedFeats } from './feats';

export interface ShipDef {
  id: string;
  name: string;
  tagline: string;
  perks: string[];   // effets positifs
  drawbacks: string[]; // contreparties
  unlockFeat: string | null; // feat requis (null = toujours dispo)
  unlockLabel: string;
}

export const SHIPS: ShipDef[] = [
  {
    id: 'default', name: 'The Wanderer', tagline: 'A balanced vessel. The sea shows no favor.',
    perks: ['Balanced stats', 'Steady Hand: +50 pts the first time you hit danger streak ×3'],
    drawbacks: [],
    unlockFeat: null, unlockLabel: '',
  },
  {
    id: 'merchant', name: 'The Merchant', tagline: 'Buy your way through the storm.',
    perks: ['+80 starting gold', 'Pirate tributes cost half', '1 free port reroll each docking'],
    drawbacks: ['-5 max hull'],
    unlockFeat: 'gold_hoarder', unlockLabel: 'Unlock: feat “Gold Hoarder”',
  },
  {
    id: 'specter', name: 'The Specter', tagline: 'See everything. Be seen.',
    perks: ['+1 vision', 'Always see the Hunter’s next step', 'Fog helps you more when it searches'],
    drawbacks: ['The Hunter grows aware 50% faster'],
    unlockFeat: 'prey_no_more', unlockLabel: 'Unlock: feat “Prey No More”',
  },
  {
    id: 'breakwater', name: 'The Breakwater', tagline: 'Let the reefs break upon your hull.',
    perks: ['Immune to reef / wreck traps', 'Storm starts 3 turns further', '−1 storm & reef scrape damage'],
    drawbacks: ['-1 vision', '-25 starting gold'],
    unlockFeat: 'storm_sea', unlockLabel: 'Unlock: feat “Into the Storm Sea”',
  },
  {
    id: 'corsair', name: 'The Corsair', tagline: 'Cannons first. Mercy never.',
    perks: ['+1 starting Power', 'Pirate victories +20 score'],
    drawbacks: ['-3 max hull'],
    unlockFeat: 'daredevil', unlockLabel: 'Unlock: feat “Daredevil”',
  },
];

export function isShipUnlocked(id: string): boolean {
  const def = SHIPS.find(s => s.id === id);
  if (!def || def.unlockFeat === null) return true;
  return getUnlockedFeats().includes(def.unlockFeat);
}

export function getUnlockedShips(): ShipDef[] {
  return SHIPS.filter(s => isShipUnlocked(s.id));
}

/** Draft UI only — pas dans le flux RNG du moteur. */
export function rollShipDraft(n = 3): ShipDef[] {
  const pool = [...getUnlockedShips()];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, Math.min(n, pool.length));
}

const KEY = 'corsair_ship';

export function getSelectedShip(): string {
  const v = localStorage.getItem(KEY);
  if (v && SHIPS.some(s => s.id === v) && isShipUnlocked(v)) return v;
  return 'default';
}

export function setSelectedShip(id: string) {
  if (SHIPS.some(s => s.id === id) && isShipUnlocked(id)) localStorage.setItem(KEY, id);
}
