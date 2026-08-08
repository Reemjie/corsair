/**
 * Genere un test Cairo pour les offres du port.
 *
 * Duplique les six lignes de shuffleWithRng() — fonction stable depuis le
 * correctif Fisher-Yates. A resynchroniser si elle change.
 *
 * Usage :
 *   cd ~/Desktop/Corsair/tortuga
 *   npx tsx dump-port.mts > ../corsair_verifier/src/port_offers_vectors.cairo
 */

import { seededRng } from './src/game/rng';

const u32 = (n: number) => n >>> 0;

// ordre du port, tel qu'il est ecrit dans resolveEvent
const ALL = ['ghost', 'rider', 'greed', 'berserker', 'hunter', 'escape'];

function shuffleWithRng<T>(arr: T[], rng: { next: () => number }): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng.next() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const SEEDS = [744758, 252489, 525657, 98289, 1, 999999, 438785, 111361];

const out: string[] = [];
out.push('// FICHIER GENERE — ne pas editer a la main.');
out.push('// Source : shuffleWithRng + ordre du port, via dump-port.mts');
out.push('');
out.push('#[cfg(test)]');
out.push('mod tests {');
out.push('    use corsair_verifier::port_offers::port_offers;');
out.push('');
out.push('    #[test]');
out.push('    fn offres_identiques_au_moteur_js() {');

let n = 0;
// masques : de 0 (rien possede) a 63 (tout possede)
for (let mask = 0; mask < 64; mask++) {
  const avail = ALL.filter((_, i) => ((mask >> i) & 1) === 0);
  const seed = SEEDS[mask % SEEDS.length];
  const rng = seededRng(seed);
  const melange = shuffleWithRng(avail, rng);
  const after = u32(rng.getState());
  const pris = melange.slice(0, 2);

  const idx = (nom: string) => ALL.indexOf(nom);
  const a = pris.length > 0 ? idx(pris[0]) : 0;
  const b = pris.length > 1 ? idx(pris[1]) : 0;

  out.push(`        // masque ${mask} — ${avail.length} disponible(s)`);
  const va = pris.length > 0 ? 'a' : '_a';
  const vb = pris.length > 1 ? 'b' : '_b';
  out.push(`        let (s, n, ${va}, ${vb}) = port_offers(${u32(seed)}, ${mask});`);
  out.push(`        assert!(n == ${pris.length}, "nombre cas ${n}");`);
  if (pris.length > 0) out.push(`        assert!(a == ${a}, "offre 1 cas ${n}");`);
  if (pris.length > 1) out.push(`        assert!(b == ${b}, "offre 2 cas ${n}");`);
  out.push(`        assert!(s == ${after}, "etat cas ${n}");`);
  n++;
}

out.push('    }');
out.push('}');

console.error(`${n} masques couverts`);
console.log(out.join('\n'));
