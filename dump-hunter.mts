/**
 * Genere un test Cairo pour les deux points ou le Hunter consomme du hasard.
 *
 * Usage :
 *   cd ~/Desktop/Corsair/tortuga
 *   npx tsx dump-hunter.mts > ../corsair_verifier/src/hunter_vectors.cairo
 */

import { seededRng } from './src/game/rng';

const u32 = (n: number) => n >>> 0;
const GRID_SIZE = 12;

const SEEDS = [744758, 252489, 525657, 98289, 1, 999999];

const out: string[] = [];
out.push('// FICHIER GENERE — ne pas editer a la main.');
out.push('// Source : moveHunter du jeu + rng, via dump-hunter.mts');
out.push('');
out.push('#[cfg(test)]');
out.push('mod tests {');
out.push('    use corsair_verifier::hunter::{searching_walk, coin_flip};');
out.push('');

// —— marche aleatoire du mode searching ——
// JS : const wx = Math.floor(rng.next() * 3) - 1; idem wy
out.push('    #[test]');
out.push('    fn marche_searching_identique_au_moteur_js() {');
let n = 0;
for (const seed of SEEDS) {
  for (const [hx, hy] of [[0, 0], [5, 5], [11, 11], [0, 11], [11, 0]]) {
    const rng = seededRng(seed);
    const wx = Math.floor(rng.next() * 3) - 1;
    const wy = Math.floor(rng.next() * 3) - 1;
    const nx = Math.max(0, Math.min(GRID_SIZE - 1, hx + wx));
    const ny = Math.max(0, Math.min(GRID_SIZE - 1, hy + wy));
    const after = u32(rng.getState());
    out.push(`        let (s, x, y) = searching_walk(${u32(seed)}, ${hx}, ${hy});`);
    out.push(`        assert!(x == ${nx} && y == ${ny}, "position cas ${n}");`);
    out.push(`        assert!(s == ${after}, "etat cas ${n}");`);
    n++;
  }
  out.push('');
}
out.push('    }');
out.push('');

// —— departage a pile ou face ——
// JS : rng.next() < 0.5
out.push('    #[test]');
out.push('    fn departage_identique_au_moteur_js() {');
let m = 0;
for (const seed of SEEDS) {
  const rng = seededRng(seed);
  let s = seed;
  for (let step = 0; step < 20; step++) {
    const heads = rng.next() < 0.5;
    const after = u32(rng.getState());
    out.push(`        let (s, pile) = coin_flip(${u32(s)});`);
    out.push(`        assert!(pile == ${heads}, "departage cas ${m}");`);
    out.push(`        assert!(s == ${after}, "etat cas ${m}");`);
    s = after;
    m++;
  }
  out.push('');
}
out.push('    }');
out.push('}');

console.error(`${n} marches, ${m} departages`);
console.log(out.join('\n'));
