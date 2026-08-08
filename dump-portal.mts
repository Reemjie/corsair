/**
 * Genere un test Cairo pour la logique de portail.
 *
 * Usage :
 *   cd ~/Desktop/Corsair/tortuga
 *   npx tsx dump-portal.mts > ../corsair_verifier/src/portal_vectors.cairo
 */

import { seededRng } from './src/game/rng';

const u32 = (n: number) => n >>> 0;

const SEEDS = [744758, 252489, 525657, 98289, 1];
const COUNTS = [1, 2, 3, 7, 12, 25, 60, 119];

const out: string[] = [];
out.push('// FICHIER GENERE — ne pas editer a la main.');
out.push('// Source : logique de stepPortal + rng du jeu, via dump-portal.mts');
out.push('');
out.push('#[cfg(test)]');
out.push('mod tests {');
out.push('    use corsair_verifier::portal::{roll_portal_spawn, pick_candidate};');
out.push('');

// —— tirage d'apparition ——
out.push('    #[test]');
out.push('    fn apparition_identique_au_moteur_js() {');
let n = 0;
for (const seed of SEEDS) {
  const rng = seededRng(seed);
  let s = seed;
  for (let step = 0; step < 25; step++) {
    // pity = false : on observe le tirage brut
    const hit = rng.next() < 0.35;
    const after = u32(rng.getState());
    out.push(`        let (s, declenche) = roll_portal_spawn(${u32(s)}, false);`);
    out.push(`        assert!(declenche == ${hit}, "apparition cas ${n}");`);
    out.push(`        assert!(s == ${after}, "etat cas ${n}");`);
    s = after;
    n++;
  }
  out.push('');
}
out.push('    }');
out.push('');

// —— choix de la case ——
out.push('    #[test]');
out.push('    fn choix_case_identique_au_moteur_js() {');
let m = 0;
for (const seed of SEEDS) {
  for (const count of COUNTS) {
    const rng = seededRng(seed);
    let s = seed;
    for (let step = 0; step < 6; step++) {
      const idx = Math.floor(rng.next() * count);
      const after = u32(rng.getState());
      out.push(`        let (s, idx) = pick_candidate(${u32(s)}, ${count});`);
      out.push(`        assert!(idx == ${idx}, "index cas ${m}");`);
      out.push(`        assert!(s == ${after}, "etat cas ${m}");`);
      s = after;
      m++;
    }
  }
}
out.push('    }');
out.push('}');

console.error(`${n} tirages d'apparition, ${m} choix de case`);
console.log(out.join('\n'));
