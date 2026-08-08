/**
 * Genere un test Cairo a partir des grilles REELLES produites par le jeu.
 *
 * Usage :
 *   cd ~/Desktop/Corsair/tortuga
 *   npx tsx dump-mapgen.mts > ../corsair_verifier/src/mapgen_vectors.cairo
 */

import { generateGrid } from './src/game/mapGen';

const SEEDS = [1, 744758, 252489, 525657];

const TYPE_CODE: Record<string, number> = {
  sea: 0, storm: 1, pirate: 2, treasure: 3, port: 4, kraken: 5,
  wreck: 6, island: 7, rocks: 8, maelstrom: 9, cursed_treasure: 10,
  ancient_kraken: 11,
};

const out: string[] = [];
out.push('// FICHIER GENERE — ne pas editer a la main.');
out.push('// Source : src/game/mapGen.ts du jeu, via dump-mapgen.mts');
out.push('');
out.push('#[cfg(test)]');
out.push('mod tests {');
out.push('    use corsair_verifier::mapgen::generate_grid;');
out.push('');

for (const seed of SEEDS) {
  for (const greed of [false, true]) {
    const grid = generateGrid(seed, greed ? ['greed'] : []);
    const types: number[] = [];
    const values: number[] = [];
    for (const row of grid) {
      for (const cell of row) {
        const code = TYPE_CODE[cell.type];
        if (code === undefined) throw new Error(`type inconnu : ${cell.type}`);
        types.push(code);
        values.push(cell.value ?? 0);
      }
    }

    const fname = `grille_seed_${seed}${greed ? '_greed' : ''}`;
    out.push('    #[test]');
    out.push(`    fn ${fname}() {`);
    out.push(`        let attendus_types: Array<u8> = array![${types.map(t => `${t}`).join(', ')}];`);
    out.push(`        let attendues_valeurs: Array<u64> = array![${values.map(v => `${v}`).join(', ')}];`);
    out.push(`        let (types, valeurs) = generate_grid(${seed}, ${greed});`);
    out.push('        let mut i: u32 = 0;');
    out.push('        while i != 144 {');
    out.push(`            assert!(*types.at(i) == *attendus_types.at(i), "type case differente");`);
    out.push(`            assert!(*valeurs.at(i) == *attendues_valeurs.at(i), "valeur case differente");`);
    out.push('            i += 1;');
    out.push('        }');
    out.push('    }');
    out.push('');
  }
}

out.push('}');
console.log(out.join('\n'));
