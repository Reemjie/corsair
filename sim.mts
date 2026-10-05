/**
 * Fait jouer le moteur tout seul, selon plusieurs strategies, et compare les
 * scores obtenus. Repond a la question : est-ce qu'on peut bien scorer en
 * cliquant n'importe comment ?
 *
 * Usage :
 *   cd ~/Desktop/Corsair/tortuga
 *   npx tsx sim.mts            # 500 parties par strategie
 *   npx tsx sim.mts 2000       # plus de parties
 */

(globalThis as any).localStorage = {
  getItem: () => null, setItem: () => {}, removeItem: () => {}, clear: () => {},
};

const engine: any = await import('./src/game/engine');
const {
  initGame, moveShip, resolveEvent, upgradeComponent, repairHull, leavePort,
} = engine;

const N = parseInt(process.argv[2] ?? '500');

/** Generateur independant, pour que les strategies soient comparables. */
function rnd(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}

type Strategie = {
  nom: string;
  /** Renvoie 'ahead' | 'port' | 'starboard' */
  deplacement: (r: () => number, s: any) => string;
  /** Renvoie l'index du choix d'evenement */
  choix: (r: () => number, s: any) => number;
};

const STRATEGIES: Strategie[] = [
  {
    nom: 'Tout au hasard',
    deplacement: (r) => (r() < 0.34 ? 'ahead' : r() < 0.5 ? 'port' : 'starboard'),
    choix: (r) => (r() < 0.5 ? 0 : 1),
  },
  {
    nom: 'Tout droit, toujours le choix 0',
    deplacement: () => 'ahead',
    choix: () => 0,
  },
  {
    nom: 'Tout droit, toujours fuir',
    deplacement: () => 'ahead',
    choix: () => 1,
  },
  {
    nom: 'Hasard, toujours le choix 0 (cupide)',
    deplacement: (r) => (r() < 0.34 ? 'ahead' : r() < 0.5 ? 'port' : 'starboard'),
    choix: () => 0,
  },
  {
    nom: 'Prudent : fuir si coque basse, sinon risquer',
    deplacement: (r) => (r() < 0.5 ? 'ahead' : r() < 0.5 ? 'port' : 'starboard'),
    choix: (_r, s) => (s.ship.hull <= 8 ? 1 : 0),
  },
];

function joue(strat: Strategie, seed: number): { score: number; tours: number; zone: number } {
  const r = rnd(seed ^ 0x5eed);
  let s = initGame(seed, 'default');
  let garde = 0;

  while (!s.gameOver && garde < 400) {
    garde++;
    const avant = s;

    if (s.showPort) {
      // au port : reparer si possible, ameliorer, puis repartir
      if (s.ship.hull < s.ship.maxHull - 8 && s.ship.gold >= 25
          && !s.ship.upgrades.includes('greed')) {
        s = repairHull(s, 8, 25);
      } else if (s.ship.gold >= 110) {
        s = upgradeComponent(s, r() < 0.5 ? 'hull' : 'weapon');
      } else {
        s = leavePort(s);
      }
    } else if (s.event) {
      s = resolveEvent(s, strat.choix(r, s));
    } else {
      const d = strat.deplacement(r, s);
      s = d === 'ahead' ? moveShip(s, 0, -1)
        : d === 'port' ? moveShip(s, -1, 0)
        : moveShip(s, 1, 0);
    }

    // mouvement refuse (bord de carte) : on tente autre chose
    if (s === avant) {
      s = moveShip(s, 0, -1);
      if (s === avant) s = moveShip(s, r() < 0.5 ? -1 : 1, 0);
      if (s === avant) break;
    }
  }

  return { score: s.score, tours: s.turn, zone: s.currentZone ?? 1 };
}

function stats(valeurs: number[]) {
  const t = [...valeurs].sort((a, b) => a - b);
  const p = (q: number) => t[Math.floor(t.length * q)];
  const moy = Math.round(t.reduce((a, b) => a + b, 0) / t.length);
  return { min: t[0], p25: p(0.25), median: p(0.5), p75: p(0.75), p95: p(0.95), max: t[t.length - 1], moy };
}

console.log(`\n${N} parties par strategie\n${'─'.repeat(88)}`);
console.log('strategie                                 median    moy    p95    max  tours med');
console.log('─'.repeat(88));

for (const strat of STRATEGIES) {
  const scores: number[] = [];
  const tours: number[] = [];
  for (let i = 0; i < N; i++) {
    const seed = 1 + Math.floor((i * 7919 + 104729) % 999999);
    const r = joue(strat, seed);
    scores.push(r.score);
    tours.push(r.tours);
  }
  const s = stats(scores);
  const t = stats(tours);
  console.log(
    `${strat.nom.padEnd(42)}${String(s.median).padStart(6)}` +
    `${String(s.moy).padStart(7)}${String(s.p95).padStart(7)}${String(s.max).padStart(7)}` +
    `${String(t.median).padStart(11)}`
  );
}

console.log('─'.repeat(88));
console.log('Pour comparaison : le haut du classement humain tourne autour de 4000-7000 pts.\n');
