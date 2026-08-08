/**
 * Genere un test Cairo pour l'etat initial.
 *
 * Aucune duplication ici : le script appelle directement initGame() du jeu.
 *
 * Usage :
 *   cd ~/Desktop/Corsair/tortuga
 *   npx tsx dump-state.mts > ../corsair_verifier/src/state_vectors.cairo
 */

import { initGame } from './src/game/engine';

const u32 = (n: number) => n >>> 0;

const SHIPS: [string, number][] = [
  ['default', 0], ['merchant', 1], ['specter', 2], ['breakwater', 3],
];
const SEEDS = [1, 744758, 252489, 525657];

const out: string[] = [];
out.push('// FICHIER GENERE — ne pas editer a la main.');
out.push('// Source : initGame() du jeu, via dump-state.mts');
out.push('');
out.push('#[cfg(test)]');
out.push('mod tests {');
out.push('    use corsair_verifier::state::{init_state, new_grid, cell_index};');
out.push('');

// —— champs scalaires ——
out.push('    #[test]');
out.push('    fn etat_initial_identique_au_moteur_js() {');
for (const [nom, code] of SHIPS) {
  for (const seed of SEEDS) {
    const g = initGame(seed, nom);
    out.push(`        // ${nom}, seed ${seed}`);
    out.push(`        let s = init_state(${u32(seed)}, ${code});`);
    out.push(`        assert!(s.ship.hull == ${g.ship.hull}, "coque ${nom} ${seed}");`);
    out.push(`        assert!(s.ship.max_hull == ${g.ship.maxHull}, "coque max ${nom} ${seed}");`);
    out.push(`        assert!(s.ship.gold == ${g.ship.gold}, "or ${nom} ${seed}");`);
    out.push(`        assert!(s.ship.power == ${g.ship.power}, "puissance ${nom} ${seed}");`);
    out.push(`        assert!(s.ship.vision == ${g.ship.vision}, "vision ${nom} ${seed}");`);
    out.push(`        assert!(s.ship.x == ${g.ship.x} && s.ship.y == ${g.ship.y}, "position ${nom} ${seed}");`);
    out.push(`        assert!(s.storm_distance == ${g.stormDistance}, "tempete ${nom} ${seed}");`);
    out.push(`        assert!(s.lowest_hull == ${g.lowestHull}, "coque min ${nom} ${seed}");`);
    out.push(`        assert!(s.rng == ${u32(g.rngState)}, "rng ${nom} ${seed}");`);
    out.push(`        assert!(s.current_zone == ${g.currentZone}, "zone ${nom} ${seed}");`);
    out.push('');
  }
}
out.push('    }');
out.push('');

// —— grille initiale (types, visited, revealed) ——
out.push('    #[test]');
out.push('    fn grille_initiale_identique_au_moteur_js() {');
for (const seed of [744758, 525657]) {
  const g = initGame(seed, 'default');
  out.push(`        // seed ${seed}`);
  out.push(`        let mut grille = new_grid(${u32(seed)});`);
  for (let y = 0; y < 12; y++) {
    for (let x = 0; x < 12; x++) {
      const c = g.grid[y][x];
      const rev = c.revealed ? 1 : 0;
      const vis = c.visited ? 1 : 0;
      // on ne verifie les drapeaux que la ou ils sont poses, pour limiter
      // la taille du test ; les types sont deja couverts par mapgen_vectors
      if (rev === 1 || vis === 1) {
        out.push(`        assert!(grille.revealed.get(cell_index(${x}, ${y})) == ${rev}, "revele ${x},${y} seed ${seed}");`);
        out.push(`        assert!(grille.visited.get(cell_index(${x}, ${y})) == ${vis}, "visite ${x},${y} seed ${seed}");`);
      }
    }
  }
  out.push('');
}
out.push('    }');
out.push('}');

console.error('vecteurs d\'etat initial generes');
console.log(out.join('\n'));
