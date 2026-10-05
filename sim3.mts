/**
 * D'ou viennent les points ? Repartition par categorie, position au moment de
 * la mort, et duree des parties, pour chaque strategie.
 *
 * Usage :
 *   cd ~/Desktop/Corsair/tortuga
 *   npx tsx sim3.mts          # 400 parties par strategie
 *   npx tsx sim3.mts 1000
 */

(globalThis as any).localStorage = {
  getItem: () => null, setItem: () => {}, removeItem: () => {}, clear: () => {},
};

const engine: any = await import('./src/game/engine');
const { initGame, moveShip, resolveEvent, upgradeComponent, repairHull, leavePort } = engine;

const N = parseInt(process.argv[2] ?? '400');

function rnd(seed: number) {
  let s = seed;
  return () => { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff; };
}

type Strat = { nom: string; dep: (r: () => number) => string; choix: (r: () => number, s: any) => number };

const STRATS: Strat[] = [
  { nom: 'BETE (droit + risque)', dep: () => 'ahead', choix: () => 0 },
  { nom: 'hasard', dep: (r) => (r() < 0.34 ? 'ahead' : r() < 0.5 ? 'port' : 'starboard'), choix: (r) => (r() < 0.5 ? 0 : 1) },
  { nom: 'prudent (fuir si coque<=8)', dep: (r) => (r() < 0.5 ? 'ahead' : r() < 0.5 ? 'port' : 'starboard'), choix: (_r, s) => (s.ship.hull <= 8 ? 1 : 0) },
];

type Resultat = {
  score: number; tours: number; zone: number; x: number; y: number;
  b: { movement: number; combat: number; treasure: number; streaks: number; achievements: number; other: number };
  ratioHaut: number; // part des tours passes sur les 4 rangees du haut
};

function joue(strat: Strat, seed: number): Resultat {
  const r = rnd(seed ^ 0x5eed);
  let s = initGame(seed, 'default');
  let garde = 0;
  let toursEnHaut = 0;
  let toursComptes = 0;
  let dernierTour = 0;

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
    if (s.turn !== dernierTour) {
      dernierTour = s.turn;
      toursComptes++;
      if (s.ship.y <= 3) toursEnHaut++;
    }
  }

  const b = s.scoreBreakdown ?? { movement: 0, combat: 0, treasure: 0, streaks: 0, achievements: 0, other: 0 };
  return {
    score: s.score, tours: s.turn, zone: s.currentZone ?? 1,
    x: s.ship.x, y: s.ship.y, b,
    ratioHaut: toursComptes > 0 ? toursEnHaut / toursComptes : 0,
  };
}

const moy = (v: number[]) => Math.round(v.reduce((a, b) => a + b, 0) / v.length);
const moy1 = (v: number[]) => Math.round((v.reduce((a, b) => a + b, 0) / v.length) * 10) / 10;

for (const strat of STRATS) {
  const res: Resultat[] = [];
  for (let i = 0; i < N; i++) {
    const seed = 1 + ((i * 7919 + 104729) % 999999);
    res.push(joue(strat, seed));
  }

  const score = moy(res.map(r => r.score));
  console.log(`\n${'═'.repeat(60)}`);
  console.log(`${strat.nom}  —  score moyen ${score}`);
  console.log('═'.repeat(60));

  const cats: [string, number][] = [
    ['mouvement', moy(res.map(r => r.b.movement))],
    ['combat', moy(res.map(r => r.b.combat))],
    ['tresor', moy(res.map(r => r.b.treasure))],
    ['series', moy(res.map(r => r.b.streaks))],
    ['hauts faits', moy(res.map(r => r.b.achievements))],
    ['autre', moy(res.map(r => r.b.other))],
  ];
  const total = cats.reduce((a, [, v]) => a + v, 0) || 1;
  for (const [nom, v] of cats) {
    const pct = Math.round((v / total) * 100);
    const barre = '█'.repeat(Math.round(pct / 2));
    console.log(`  ${nom.padEnd(13)}${String(v).padStart(6)}  ${String(pct).padStart(3)}%  ${barre}`);
  }

  console.log(`  ${'─'.repeat(50)}`);
  console.log(`  tours moyens        ${moy1(res.map(r => r.tours))}`);
  console.log(`  zone atteinte       ${moy1(res.map(r => r.zone))}`);
  console.log(`  rangee a la mort    ${moy1(res.map(r => r.y))}   (0 = haut de carte, 11 = depart)`);
  console.log(`  temps passe en haut ${Math.round(moy1(res.map(r => r.ratioHaut * 100)))}%  (rangees 0 a 3)`);
}

console.log(`\n${'═'.repeat(60)}`);
console.log('Si la strategie BETE passe l essentiel de son temps en haut de');
console.log('carte et y prend tout son score, le probleme est geographique :');
console.log('les rangees hautes sont un spot de farm, pas une zone de danger.\n');
