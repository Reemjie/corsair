/**
 * Genere un test Cairo validant step_move contre le vrai moteur.
 *
 * Pour chaque seed : initGame, puis des deplacements AHEAD tant qu'ils sont
 * acceptes. Des qu'un evenement apparait le moteur refuse les mouvements,
 * donc la sequence s'arrete la — on valide le debut de partie sur beaucoup
 * de seeds plutot qu'une partie longue.
 *
 * Aucune duplication : le script appelle initGame et moveShip du jeu.
 *
 * Usage :
 *   cd ~/Desktop/Corsair/tortuga
 *   npx tsx dump-move.mts > ../corsair_verifier/src/move_vectors.cairo
 */

import { initGame, moveShip } from './src/game/engine';

const u32 = (n: number) => n >>> 0;

const TYPE_CODE: Record<string, number> = {
  sea: 0, storm: 1, pirate: 2, treasure: 3, port: 4, kraken: 5,
  wreck: 6, island: 7, rocks: 8, maelstrom: 9, cursed_treasure: 10,
  ancient_kraken: 11, portal: 12, fog: 13,
};

const SEEDS: number[] = [];
for (let i = 0; i < 30; i++) SEEDS.push(100000 + i * 31337);

const out: string[] = [];
out.push('// FICHIER GENERE — ne pas editer a la main.');
out.push('// Source : initGame + moveShip du jeu, via dump-move.mts');
out.push('');
out.push('#[cfg(test)]');
out.push('mod tests {');
out.push('    use corsair_verifier::state::{init_state, new_grid, SHIP_DEFAULT};');
out.push('    use corsair_verifier::move::step_move;');
out.push('');

let total = 0;
let seq = 0;

for (const seed of SEEDS) {
  let s = initGame(seed, 'default');
  const etapes: string[] = [];

  for (let n = 0; n < 12; n++) {
    const avant = s.turn;
    const apres = moveShip(s, 0, -1); // AHEAD
    if (apres.turn === avant) break; // mouvement refuse
    s = apres;

    const ev = s.event ? 1 : 0;
    const evType = s.event ? (TYPE_CODE[s.event.cellType] ?? 99) : 0;

    etapes.push(`            let ok = step_move(ref st, ref gr, 1, true);`);
    etapes.push(`            assert!(ok, "mouvement ${total} accepte");`);
    etapes.push(`            assert!(st.turn == ${s.turn}, "tour ${total}");`);
    etapes.push(`            assert!(st.rng == ${u32(s.rngState)}, "rng ${total}");`);
    etapes.push(`            assert!(st.score == ${s.score}, "score ${total}");`);
    etapes.push(`            assert!(st.ship.hull == ${s.ship.hull}, "coque ${total}");`);
    etapes.push(`            assert!(st.ship.gold == ${s.ship.gold}, "or ${total}");`);
    etapes.push(`            assert!(st.storm_distance == ${s.stormDistance}, "tempete ${total}");`);
    etapes.push(`            assert!(st.danger_streak == ${s.dangerStreak}, "serie ${total}");`);
    etapes.push(`            assert!(st.ship.x == ${s.ship.x} && st.ship.y == ${s.ship.y}, "position ${total}");`);
    etapes.push(`            assert!(st.game_over == ${s.gameOver}, "fin ${total}");`);
    if (ev === 1) {
      etapes.push(`            assert!(st.event_present, "evenement present ${total}");`);
      etapes.push(`            assert!(st.event_cell_type == ${evType}, "type d'evenement ${total}");`);
    } else {
      etapes.push(`            assert!(!st.event_present, "aucun evenement ${total}");`);
    }
    etapes.push('');
    total++;

    if (s.event || s.gameOver) break;
  }

  if (etapes.length === 0) continue;

  out.push('    #[test]');
  out.push(`    fn deplacements_seed_${seed}() {`);
  out.push(`        let mut st = init_state(${u32(seed)}, SHIP_DEFAULT);`);
  out.push(`        let mut gr = new_grid(${u32(seed)});`);
  for (const l of etapes) out.push(l);
  out.push('    }');
  out.push('');
  seq++;
}

out.push('}');

console.error(`${seq} sequences, ${total} deplacements valides`);
console.log(out.join('\n'));
