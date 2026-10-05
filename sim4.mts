/**
 * Balaie le facteur de degats par zone et mesure si la strategie bete
 * decroche enfin face aux strategies qui reflechissent.
 *
 * Usage :
 *   cd ~/Desktop/Corsair/tortuga
 *   npx tsx sim4.mts          # 400 parties par strategie et par reglage
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
  { nom: 'hasard', dep: (r) => (r() < 0.34 ? 'ahead' : r() < 0.5 ? 'port' : 'starboard'), choix: (r) => (r() < 0.5 ? 0 : 1) },
  { nom: 'prudent', dep: (r) => (r() < 0.5 ? 'ahead' : r() < 0.5 ? 'port' : 'starboard'), choix: (_r, s) => (s.ship.hull <= 8 ? 1 : 0) },
  { nom: 'strategique', dep: (r) => (r() < 0.45 ? 'ahead' : r() < 0.5 ? 'port' : 'starboard'),
    // fuit les gros dangers si la coque ne suit pas, prend le reste,
    // et se montre plus prudent en remontant vers le nord
    choix: (_r, s) => {
      const t = s.event?.cellType;
      const gros = t === 'kraken' || t === 'ancient_kraken' || t === 'maelstrom';
      const nord = s.ship.y <= 3;
      if (gros && s.ship.hull <= (nord ? 18 : 12)) return 1;
      if (s.ship.hull <= (nord ? 10 : 6)) return 1;
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
  [1.0, 1.0], [1.0, 1.3], [1.0, 1.6], [1.0, 2.0],
  [1.2, 1.6], [1.2, 2.0], [1.3, 2.2], [1.5, 2.5],
];

console.log(`\n${N} parties par strategie et par reglage`);
console.log('mid/late = facteur de degats des combats en rangees 4-7 / 0-3\n');
console.log('mid  late' + STRATS.map(s => s.nom.padStart(13)).join('') + '   tours BETE   verdict');
console.log('─'.repeat(10 + 13 * STRATS.length + 24));

for (const [mid, late] of REGLAGES) {
  (BALANCE.combat as any).zoneDamageMult = { mid, late };

  const med: number[] = [];
  let toursBete = 0;
  for (const strat of STRATS) {
    const scores: number[] = [];
    const tours: number[] = [];
    for (let i = 0; i < N; i++) {
      const seed = 1 + ((i * 7919 + 104729) % 999999);
      const r = joue(strat, seed);
      scores.push(r.score); tours.push(r.tours);
    }
    med.push(mediane(scores));
    if (strat.nom === 'BETE') toursBete = moy(tours);
  }

  const bete = med[0];
  const meilleur = Math.max(...med.slice(1));
  const verdict = bete > meilleur * 1.1 ? 'bete gagne'
    : meilleur > bete * 1.1 ? '>>> REFLEXION PAYE'
    : 'egalite';

  console.log(
    `${mid.toFixed(1)}  ${late.toFixed(1)}` +
    med.map(m => String(m).padStart(13)).join('') +
    String(toursBete).padStart(12) + '   ' + verdict
  );
}

(BALANCE.combat as any).zoneDamageMult = { mid: 1.0, late: 1.0 };
console.log('─'.repeat(10 + 13 * STRATS.length + 24));
console.log('On cherche un reglage ou "strategique" bat "BETE" sans que les');
console.log('scores s effondrent pour tout le monde.\n');
