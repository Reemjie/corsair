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
    perks: ['Balanced stats'], drawbacks: [],
    unlockFeat: null, unlockLabel: '',
  },
  {
    id: 'merchant', name: 'The Merchant', tagline: 'Buy your way through the storm.',
    perks: ['+80 starting gold', 'Pirate tributes cost half'],
    drawbacks: ['-5 max hull'],
    unlockFeat: 'gold_hoarder', unlockLabel: 'Unlock: feat “Gold Hoarder”',
  },
  {
    id: 'specter', name: 'The Specter', tagline: 'See everything. Be seen.',
    perks: ['+1 vision (see further)'],
    drawbacks: ['The Hunter grows aware 50% faster'],
    unlockFeat: 'prey_no_more', unlockLabel: 'Unlock: feat “Prey No More”',
  },
  {
    id: 'breakwater', name: 'The Breakwater', tagline: 'Let the reefs break upon your hull.',
    perks: ['Immune to reef damage', 'Storm starts 3 turns further'],
    drawbacks: ['-1 vision', '-25 starting gold'],
    unlockFeat: 'storm_sea', unlockLabel: 'Unlock: feat “Into the Storm Sea”',
  },
];

export function isShipUnlocked(id: string): boolean {
  const def = SHIPS.find(s => s.id === id);
  if (!def || def.unlockFeat === null) return true;
  return getUnlockedFeats().includes(def.unlockFeat);
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
