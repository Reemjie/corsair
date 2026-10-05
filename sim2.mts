/**
 * Balaie des reglages d'equilibrage et mesure, pour chacun, si la strategie
 * bete ("tout droit, toujours le choix risque") domine encore les strategies
 * qui reflechissent.
 *
 * Usage :
 *   cd ~/Desktop/Corsair/tortuga
 *   npx tsx sim2.mts          # 400 parties par strategie et par reglage
 *   npx tsx sim2.mts 1000
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
  { nom: 'BETE (droit + risque)', dep: () => 'ahead', choix: () => 0 },
  { nom: 'hasard', dep: (r) => (r() < 0.34 ? 'ahead' : r() < 0.5 ? 'port' : 'starboard'), choix: (r) => (r() < 0.5 ? 0 : 1) },
  { nom: 'prudent (fuir si coque<=8)', dep: (r) => (r() < 0.5 ? 'ahead' : r() < 0.5 ? 'port' : 'starboard'), choix: (_r, s) => (s.ship.hull <= 8 ? 1 : 0) },
  { nom: 'capitaliste (risque puis tresor)', dep: (r) => (r() < 0.5 ? 'ahead' : r() < 0.5 ? 'port' : 'starboard'),
    // fuit les gros dangers si la coque est basse, prend tout le reste
    choix: (_r, s) => {
      const t = s.event?.cellType;
      const gros = t === 'kraken' || t === 'ancient_kraken' || t === 'maelstrom';
      if (gros && s.ship.hull <= 12) return 1;
      if (s.ship.hull <= 6) return 1;
      return 0;
    } },
];

function joue(strat: Strat, seed: number): number {
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
  return s.score;
}

const mediane = (v: number[]) => { const t = [...v].sort((a, b) => a - b); return t[Math.floor(t.length / 2)]; };

type Reglage = { nom: string; fuite: number; boost: boolean; seuil: number };

const REGLAGES: Reglage[] = [
  { nom: 'ACTUEL',                          fuite: 2, boost: true,  seuil: 0 },
  { nom: 'fuite -1',                        fuite: 1, boost: true,  seuil: 0 },
  { nom: 'pas d auto-boost',                fuite: 2, boost: false, seuil: 0 },
  { nom: 'seuil coque 8',                   fuite: 2, boost: true,  seuil: 8 },
  { nom: 'seuil coque 12',                  fuite: 2, boost: true,  seuil: 12 },
  { nom: 'fuite -1 + pas d auto-boost',     fuite: 1, boost: false, seuil: 0 },
  { nom: 'fuite -1 + seuil 8',              fuite: 1, boost: true,  seuil: 8 },
  { nom: 'pas d auto-boost + seuil 8',      fuite: 2, boost: false, seuil: 8 },
  { nom: 'les trois (fuite -1, seuil 8)',   fuite: 1, boost: false, seuil: 8 },
];

console.log(`\n${N} parties par strategie et par reglage`);
console.log('Objectif : que la strategie BETE ne domine plus.\n');
console.log('reglage'.padEnd(34) + STRATS.map(s => s.nom.slice(0, 16).padStart(17)).join('') + '    verdict');
console.log('─'.repeat(34 + 17 * STRATS.length + 12));

for (const reg of REGLAGES) {
  BALANCE.streak.fleePenalty = reg.fuite;
  BALANCE.streak.riskBoostsOwnEvent = reg.boost;
  BALANCE.streak.minHullForStreak = reg.seuil;

  const medians: number[] = [];
  for (const strat of STRATS) {
    const scores: number[] = [];
    for (let i = 0; i < N; i++) {
      const seed = 1 + ((i * 7919 + 104729) % 999999);
      scores.push(joue(strat, seed));
    }
    medians.push(mediane(scores));
  }

  const bete = medians[0];
  const meilleurAutre = Math.max(...medians.slice(1));
  const verdict = bete > meilleurAutre * 1.1 ? 'bete gagne'
    : meilleurAutre > bete * 1.1 ? 'REFLEXION PAYE'
    : 'egalite';

  console.log(reg.nom.padEnd(34) + medians.map(m => String(m).padStart(17)).join('') + '    ' + verdict);
}

// on remet les valeurs par defaut
BALANCE.streak.fleePenalty = 2;
BALANCE.streak.riskBoostsOwnEvent = true;
BALANCE.streak.minHullForStreak = 0;

console.log('─'.repeat(34 + 17 * STRATS.length + 12));
console.log('Rappel : haut du classement humain autour de 4000-7000 pts.\n');
