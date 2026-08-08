/**
 * Genere un test Cairo pour les seuils et plages de stepCellEvent.
 *
 * On ne duplique pas la logique de branchement (testee cote Cairo) : on fige
 * uniquement les primitives de hasard qu'elle utilise, aux valeurs exactes du
 * jeu.
 *
 * Usage :
 *   cd ~/Desktop/Corsair/tortuga
 *   npx tsx dump-cellevent.mts > ../corsair_verifier/src/cell_event_vectors.cairo
 */

import { seededRng } from './src/game/rng';

const u32 = (n: number) => n >>> 0;

const SEEDS = [744758, 252489, 525657, 98289, 1, 999999, 438785];

// seuils utilises par stepCellEvent, en centiemes
const SEUILS: [number, number][] = [
  [5, 100],   // ghost krakenChance 0.05
  [8, 100],   // vents favorables
  [18, 100],  // coque qui grince
  [22, 100],  // indice tresor
  [26, 100],  // debris flottants
  [29, 100],  // brume
  [15, 100],  // eliteChance
  [30, 100],  // hybride pirate/tempete
];

// plages de rng.int utilisees
const PLAGES: [number, number][] = [
  [1, 3],    // bonus vents favorables
  [5, 20],   // or des debris
  [10, 30],  // or des pirates fuyants
  [15, 35],  // or du Storm Rider
];

const out: string[] = [];
out.push('// FICHIER GENERE — ne pas editer a la main.');
out.push('// Source : seuils et plages de stepCellEvent, via dump-cellevent.mts');
out.push('');
out.push('#[cfg(test)]');
out.push('mod tests {');
out.push('    use corsair_verifier::rng::{rng_int, rng_below};');
out.push('');

out.push('    #[test]');
out.push('    fn seuils_identiques_au_moteur_js() {');
let n = 0;
for (const [num, den] of SEUILS) {
  for (const seed of SEEDS) {
    const rng = seededRng(seed);
    const hit = rng.next() < num / den;
    const after = u32(rng.getState());
    out.push(`        let (s, touche) = rng_below(${u32(seed)}, ${num}, ${den});`);
    out.push(`        assert!(touche == ${hit}, "seuil ${num}/${den} cas ${n}");`);
    out.push(`        assert!(s == ${after}, "etat ${num}/${den} cas ${n}");`);
    n++;
  }
  out.push('');
}
out.push('    }');
out.push('');

out.push('    #[test]');
out.push('    fn plages_identiques_au_moteur_js() {');
let m = 0;
for (const [min, max] of PLAGES) {
  for (const seed of SEEDS) {
    const rng = seededRng(seed);
    let s = seed;
    for (let step = 0; step < 5; step++) {
      const v = rng.int(min, max);
      const after = u32(rng.getState());
      out.push(`        let (s, v) = rng_int(${u32(s)}, ${min}, ${max});`);
      out.push(`        assert!(v == ${v}, "plage ${min}-${max} cas ${m}");`);
      out.push(`        assert!(s == ${after}, "etat plage ${min}-${max} cas ${m}");`);
      s = after;
      m++;
    }
  }
  out.push('');
}
out.push('    }');
out.push('}');

console.error(`${n} seuils, ${m} tirages de plage`);
console.log(out.join('\n'));
