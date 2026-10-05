/**
 * Sweep minHullForStreak with fleeStormGain fixed at 3.
 * Usage: npx tsx sim-hull.mts [N]
 */
(globalThis as any).localStorage = {
  getItem: () => null, setItem: () => {}, removeItem: () => {}, clear: () => {},
};

const engine: any = await import('./src/game/engine');
const balance: any = await import('./src/game/balance');
const { initGame, moveShip, resolveEvent, upgradeComponent, repairHull, leavePort } = engine;
const { BALANCE } = balance;

const N = parseInt(process.argv[2] ?? '200');

function rnd(seed: number) {
  let s = seed;
  return () => { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff; };
}

const STRATS: { nom: string; choix: (s: any) => number }[] = [
  { nom: 'tout risque', choix: () => 0 },
  { nom: 'tout fuir', choix: () => 1 },
  { nom: 'fuir si tempete', choix: (s) => (s.stormDistance <= 8 ? 1 : 0) },
  { nom: 'fuir si coque', choix: (s) => (s.ship.hull <= 8 ? 1 : 0) },
  { nom: 'fuir si l un ou l autre', choix: (s) => (s.stormDistance <= 8 || s.ship.hull <= 8 ? 1 : 0) },
];

function joue(choix: (s: any) => number, seed: number): number {
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
      s = moveShip(s, 0, -1);
      if (s === avant) s = moveShip(s, -1, 0);
      if (s === avant) s = moveShip(s, 1, 0);
      if (s === avant) break;
    }
    if (s === avant) break;
  }
  return s.score;
}

const mediane = (v: number[]) => { const t = [...v].sort((a, b) => a - b); return t[Math.floor(t.length / 2)]; };

const HULLS = [0, 6, 8, 10, 12];
(BALANCE.streak as any).fleeStormGain = 3;

console.log(`\n${N} parties · fleeStormGain=3 · sweep minHullForStreak\n`);
console.log('hull' + STRATS.map(s => s.nom.slice(0, 13).padStart(15)).join('') + '   gagnant');
console.log('─'.repeat(4 + 15 * STRATS.length + 28));

for (const h of HULLS) {
  (BALANCE.streak as any).minHullForStreak = h;
  const med: number[] = [];
  for (const strat of STRATS) {
    const scores: number[] = [];
    for (let i = 0; i < N; i++) {
      const seed = 1 + ((i * 7919 + 104729) % 999999);
      scores.push(joue(strat.choix, seed));
    }
    med.push(mediane(scores));
  }
  const best = Math.max(...med);
  const iBest = med.indexOf(best);
  const ecart = Math.round(((best - med[0]) / Math.max(1, med[0])) * 100);
  const gagnant = iBest === 0 ? 'tout risque' : `${STRATS[iBest].nom} (+${ecart}%)`;
  console.log(`${String(h).padStart(4)}` + med.map(m => String(m).padStart(15)).join('') + '   ' + gagnant);
}
console.log('');
