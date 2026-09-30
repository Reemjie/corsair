// ─── RELICS ──────────────────────────────────────────────────────────
// Objets uniques trouves dans les epaves. Chacun modifie une regle pour
// le reste de la run. Effets appliques dans engine.ts via hasRelic().

export interface RelicDef {
  id: string;
  name: string;
  icon: string;      // nom d'icone gravee (Icon.tsx) ou emoji
  rarity: 'common' | 'rare' | 'legendary';
  desc: string;      // description joueur
}

export const RELICS: RelicDef[] = [
  // — Communes —
  { id: 'bone_compass', name: 'Bone Compass', icon: 'compass', rarity: 'common',
    desc: 'The portal reveals itself sooner. Spot your escape earlier.' },
  { id: 'weighted_net', name: 'Weighted Net', icon: 'treasure', rarity: 'common',
    desc: 'Wrecks and treasures yield +50% more gold.' },
  { id: 'cracked_spyglass', name: 'Cracked Spyglass', icon: 'spyglass', rarity: 'common',
    desc: '+1 vision. See one tile further in every direction.' },

  // — Rares —
  { id: 'kraken_eye', name: 'Eye of the Kraken', icon: 'eye', rarity: 'rare',
    desc: "See the Hunter's predicted moves at all times, even while tracking." },
  { id: 'ghost_anchor', name: 'Ghost Anchor', icon: 'anchor', rarity: 'rare',
    desc: 'Passing a port drops the Hunter\'s awareness by an extra 20.' },
  { id: 'storm_heart', name: 'Heart of the Storm', icon: 'storm', rarity: 'rare',
    desc: 'Kraken Pacts cost only 10 HP instead of 20.' },

  // — Legendaires —
  { id: 'gold_tooth', name: 'Gold Tooth', icon: 'skull', rarity: 'legendary',
    desc: 'Pirates pay YOU tribute — but your growing notoriety draws the Hunter.' },
  { id: 'black_flag', name: 'Black Flag', icon: 'flag', rarity: 'legendary',
    desc: 'The Hunter takes one extra zone to appear — but strikes harder.' },
];

// Poids de tirage par rarete (commune plus frequente)
const RARITY_WEIGHT: Record<string, number> = { common: 6, rare: 3, legendary: 1 };

export function getRelicDef(id: string): RelicDef | undefined {
  return RELICS.find(r => r.id === id);
}

// Tire une relique non encore possedee, ponderee par rarete. rng() = [0,1).
export function rollRelic(owned: string[], rng: () => number): RelicDef | null {
  const pool = RELICS.filter(r => !owned.includes(r.id));
  if (pool.length === 0) return null;
  const weighted: RelicDef[] = [];
  for (const r of pool) {
    const w = RARITY_WEIGHT[r.rarity] ?? 1;
    for (let i = 0; i < w; i++) weighted.push(r);
  }
  return weighted[Math.floor(rng() * weighted.length)];
}
