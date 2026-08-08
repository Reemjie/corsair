/**
 * Genere un test Cairo a partir des valeurs REELLES produites par le moteur JS.
 *
 * Le principe : on ne compare pas deux implementations "a l'oeil", on fige la
 * sortie du generateur du jeu dans un test Cairo. Si le portage devie d'un seul
 * tirage, le test echoue et pointe le pas exact.
 *
 * Usage :
 *   cd ~/Desktop/Corsair/tortuga
 *   npx tsx dump-rng.mts > ~/Desktop/Corsair/corsair_verifier/src/rng_vectors.cairo
 */

import { seededRng } from './src/game/rng';

const SEEDS = [1, 744758, 252489, 98289, 525657, 999998];
const STEPS = 60;

const u32 = (n: number) => n >>> 0;

const out: string[] = [];
out.push('// FICHIER GENERE — ne pas editer a la main.');
out.push('// Source : src/game/rng.ts du jeu, via dump-rng.mts');
out.push('');
out.push('#[cfg(test)]');
out.push('mod tests {');
out.push('    use corsair_verifier::rng::{next_state, rng_int};');
out.push('');

// ── Suites d'etats ────────────────────────────────────────────────
out.push('    #[test]');
out.push('    fn etats_identiques_au_moteur_js() {');
for (const seed of SEEDS) {
  const rng = seededRng(seed);
  out.push(`        // seed ${seed}`);
  out.push(`        let mut s: u64 = ${u32(seed)};`);
  for (let i = 0; i < STEPS; i++) {
    rng.next();
    out.push(`        s = next_state(s); assert!(s == ${u32(rng.getState())}, "seed ${seed} pas ${i + 1}");`);
  }
  out.push('');
}
out.push('    }');
out.push('');

// ── Suites d'entiers ──────────────────────────────────────────────
out.push('    #[test]');
out.push('    fn entiers_identiques_au_moteur_js() {');
const RANGES: [number, number][] = [[40, 100], [0, 2], [1, 6], [10, 999]];
for (const seed of SEEDS.slice(0, 3)) {
  for (const [min, max] of RANGES) {
    const rng = seededRng(seed);
    out.push(`        // seed ${seed}, plage ${min}..${max}`);
    out.push(`        let mut s: u64 = ${u32(seed)};`);
    for (let i = 0; i < 20; i++) {
      const v = rng.int(min, max);
      out.push(`        let (ns, v) = rng_int(s, ${min}, ${max}); s = ns; assert!(v == ${v}, "seed ${seed} plage ${min}-${max} tirage ${i + 1}");`);
    }
    out.push('');
  }
}
out.push('    }');
out.push('}');

console.log(out.join('\n'));
