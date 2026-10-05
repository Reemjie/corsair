/**
 * Est-ce que les CHOIX comptent, une fois le deplacement neutralise ?
 *
 * Toutes les strategies avancent exactement de la meme facon — tout droit au
 * nord, comme la strategie bete. Elles ne different que par leur reponse aux
 * evenements. Si l'une gagne, les deux boutons ont un sens. Sinon, la
 * strategie de Corsair n'est pas dans les choix.
 *
 * Usage :
 *   cd ~/Desktop/Corsair/tortuga
 *   npx tsx sim6.mts          # 600 parties par strategie et par reglage
 */

(globalThis as any).localStorage = {
  getItem: () => null, setItem: () => {}, removeItem: () => {}, clear: () => {},
};

const engine: any = await import('./src/game/engine');
const balance: any = await import('./src/game/balance');
const { initGame, moveShip, resolveEvent, upgradeComponent, repairHull, leavePort } = engine;
const { BALANCE } = balance;

const N = parseInt(process.argv[2] ?? '600');

function rnd(seed: number) {
  let s = seed;
  return () => { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff; };
}

// Deplacement IDENTIQUE pour toutes : seule la reponse aux evenements change.
const STRATS: { nom: string; choix: (s: any) => number }[] = [
  { nom: 'tout risque', choix: () => 0 },
  { nom: 'tout fuir', choix: () => 1 },
  { nom: 'fuir si tempete', choix: (s) => (s.stormDistance <= 8 ? 1 : 0) },
  { nom: 'fuir si coque', choix: (s) => (s.ship.hull <= 8 ? 1 : 0) },
  { nom: 'fuir si l un ou l autre', choix: (s) => (s.stormDistance <= 8 || s.ship.hull <= 8 ? 1 : 0) },
  { nom: 'fuir les gros si faible', choix: (s) => {
      const t = s.event?.cellType;
      const gros = t === 'kraken' || t === 'ancient_kraken' || t === 'maelstrom';
      if (gros && s.ship.hull <= 14) return 1;
      if (s.ship.hull <= 6) return 1;
      return 0;
    } },
];

function joue(choix: (s: any) => number, seed: number): { score: number; tours: number } {
  const r = rnd(seed ^ 0x5eed);
  let s = initGame(seed, 'default');
  let garde = 0;
  while (!s.gameOver && garde < 400) {
    garde++;
    const avant = s;
    if (s.showPort) {
      if (s.ship.hull < s.ship.maxHull - 8 && s.ship.gold >= 25 && !s.ship.upgrades.includes('greed')) s = repairHull(s, 8, 25);
      else if (s.ship.gold >= 110) s = upgradeComponent(s, r() < 0.5 ? 'hull' : 'weapon');
      else s = leavePort(s);
    } else if (s.event) {
      s = resolveEvent(s, choix(s));
    } else {
      s = moveShip(s, 0, -1);            // toujours tout droit
      if (s === avant) s = moveShip(s, -1, 0);   // bloque en haut : de cote
      if (s === avant) s = moveShip(s, 1, 0);
      if (s === avant) break;
    }
    if (s === avant) break;
  }
  return { score: s.score, tours: s.turn };
}

const mediane = (v: number[]) => { const t = [...v].sort((a, b) => a - b); return t[Math.floor(t.length / 2)]; };
const moy = (v: number[]) => Math.round(v.reduce((a, b) => a + b, 0) / v.length);

const GAINS = [0, 1, 2, 3, 4, 6];

console.log(`\n${N} parties par strategie · deplacement identique pour toutes`);
console.log('gain = distance gagnee sur la tempete en fuyant\n');
console.log('gain' + STRATS.map(s => s.nom.slice(0, 13).padStart(15)).join('') + '   gagnant');
console.log('─'.repeat(4 + 15 * STRATS.length + 26));

for (const gain of GAINS) {
  (BALANCE.streak as any).fleeStormGain = gain;

  const med: number[] = [];
  const tou: number[] = [];
  for (const strat of STRATS) {
    const scores: number[] = [];
    const tours: number[] = [];
    for (let i = 0; i < N; i++) {
      const seed = 1 + ((i * 7919 + 104729) % 999999);
      const res = joue(strat.choix, seed);
      scores.push(res.score); tours.push(res.tours);
    }
    med.push(mediane(scores));
    tou.push(moy(tours));
  }

  const best = Math.max(...med);
  const iBest = med.indexOf(best);
  const ecart = Math.round(((best - med[0]) / med[0]) * 100);
  const gagnant = iBest === 0 ? 'tout risque' : `${STRATS[iBest].nom} (+${ecart}%)`;

  console.log(`${String(gain).padStart(4)}` + med.map(m => String(m).padStart(15)).join('') + '   ' + gagnant);
}

console.log('─'.repeat(4 + 15 * STRATS.length + 26));

// duree de vie au reglage historique, pour comprendre d'ou vient l'ecart
(BALANCE.streak as any).fleeStormGain = 0;
console.log('\nDuree de vie moyenne (gain 0) :');
for (const strat of STRATS) {
  const tours: number[] = [];
  const scores: number[] = [];
  for (let i = 0; i < N; i++) {
    const seed = 1 + ((i * 7919 + 104729) % 999999);
    const res = joue(strat.choix, seed);
    tours.push(res.tours); scores.push(res.score);
  }
  console.log(`  ${strat.nom.padEnd(26)}${String(moy(tours)).padStart(5)} tours · ${String(mediane(scores)).padStart(5)} pts`);
}

console.log('\nSi "tout risque" gagne partout, la strategie de Corsair n est pas');
console.log('dans les choix d evenement — et il faudra chercher ailleurs.\n');
