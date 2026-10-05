/**
 * Est-ce que donner un gain de temps a la fuite rend les choix situationnels ?
 *
 * On compare la strategie bete (toujours le risque) a des strategies qui
 * decident selon l'etat : fuir quand la tempete serre, encaisser quand on a
 * de la marge.
 *
 * Usage :
 *   cd ~/Desktop/Corsair/tortuga
 *   npx tsx sim5.mts          # 400 parties par strategie et par reglage
 */

(globalThis as any).localStorage = {
  getItem: () => null, setItem: () => {}, removeItem: () => {}, clear: () => {},
};

const engine: any = await import('./src/game/engine');
const balance: any = await import('./src/game/balance');
const { initGame, moveShip, resolveEvent, upgradeComponent, repairHull, leavePort } = engine;
const { BALANCE } = balance;

const N = parseInt(process.argv[2] ?? '400');

function rnd(seed: number) {
  let s = seed;
  return () => { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff; };
}

type Strat = { nom: string; dep: (r: () => number) => string; choix: (r: () => number, s: any) => number };

const STRATS: Strat[] = [
  { nom: 'BETE', dep: () => 'ahead', choix: () => 0 },

  { nom: 'fuyard', dep: () => 'ahead', choix: () => 1 },

  // Fuit quand la tempete serre, encaisse quand elle est loin.
  { nom: 'horloger', dep: (r) => (r() < 0.5 ? 'ahead' : r() < 0.5 ? 'port' : 'starboard'),
    choix: (_r, s) => (s.stormDistance <= 8 ? 1 : 0) },

  // Fuit si la tempete serre OU si la coque ne suit plus.
  { nom: 'prudent+', dep: (r) => (r() < 0.5 ? 'ahead' : r() < 0.5 ? 'port' : 'starboard'),
    choix: (_r, s) => (s.stormDistance <= 7 || s.ship.hull <= 8 ? 1 : 0) },

  // Encaisse tant qu'il a de la marge sur les deux tableaux, fuit sinon.
  { nom: 'opportuniste', dep: (r) => (r() < 0.5 ? 'ahead' : r() < 0.5 ? 'port' : 'starboard'),
    choix: (_r, s) => {
      const t = s.event?.cellType;
      const gros = t === 'kraken' || t === 'ancient_kraken' || t === 'maelstrom';
      if (s.stormDistance <= 6) return 1;
      if (gros && s.ship.hull <= 14) return 1;
      if (s.ship.hull <= 7) return 1;
      return 0;
    } },
];

function joue(strat: Strat, seed: number): { score: number; tours: number } {
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
      s = resolveEvent(s, strat.choix(r, s));
    } else {
      const d = strat.dep(r);
      s = d === 'ahead' ? moveShip(s, 0, -1) : d === 'port' ? moveShip(s, -1, 0) : moveShip(s, 1, 0);
    }
    if (s === avant) {
      s = moveShip(s, 0, -1);
      if (s === avant) s = moveShip(s, r() < 0.5 ? -1 : 1, 0);
      if (s === avant) break;
    }
  }
  return { score: s.score, tours: s.turn };
}

const mediane = (v: number[]) => { const t = [...v].sort((a, b) => a - b); return t[Math.floor(t.length / 2)]; };
const moy = (v: number[]) => Math.round(v.reduce((a, b) => a + b, 0) / v.length);

const REGLAGES: [number, number][] = [
  [0, 2],   // historique
  [1, 2], [2, 2], [3, 2], [4, 2],
  [2, 1], [3, 1], [3, 0], [4, 0],
];

console.log(`\n${N} parties par strategie et par reglage`);
console.log('gain = distance gagnee en fuyant · pen = serie perdue en fuyant\n');
console.log('gain pen' + STRATS.map(s => s.nom.padStart(14)).join('') + '   tours BETE   verdict');
console.log('─'.repeat(9 + 14 * STRATS.length + 24));

for (const [gain, pen] of REGLAGES) {
  (BALANCE.streak as any).fleeStormGain = gain;
  BALANCE.streak.fleePenalty = pen;

  const med: number[] = [];
  let toursBete = 0;
  for (const strat of STRATS) {
    const scores: number[] = [];
    const tours: number[] = [];
    for (let i = 0; i < N; i++) {
      const seed = 1 + ((i * 7919 + 104729) % 999999);
      const res = joue(strat, seed);
      scores.push(res.score); tours.push(res.tours);
    }
    med.push(mediane(scores));
    if (strat.nom === 'BETE') toursBete = moy(tours);
  }

  const bete = med[0];
  const meilleur = Math.max(...med.slice(1));
  const gagnant = STRATS[med.indexOf(meilleur)].nom;
  const verdict = bete >= meilleur ? 'bete gagne'
    : meilleur > bete * 1.15 ? `>>> ${gagnant.toUpperCase()} DOMINE`
    : `${gagnant} devant`;

  console.log(
    `${String(gain).padStart(4)} ${String(pen).padStart(3)}` +
    med.map(m => String(m).padStart(14)).join('') +
    String(toursBete).padStart(12) + '   ' + verdict
  );
}

(BALANCE.streak as any).fleeStormGain = 0;
BALANCE.streak.fleePenalty = 2;

console.log('─'.repeat(9 + 14 * STRATS.length + 24));
console.log('On cherche un reglage ou une strategie SITUATIONNELLE bat la bete,');
console.log('sans que le jeu devienne une simple course a la fuite (« fuyard »).\n');
