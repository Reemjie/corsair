/**
 * Golden replays — fige score + etat clef apres rejeu d'un journal.
 *
 * Usage :
 *   npx tsx test-golden.mts           # verifie (exit 1 si drift)
 *   npx tsx test-golden.mts --write   # regenerer goldens/ apres un change moteur volontaire
 */

import { mkdirSync, readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

(globalThis as any).localStorage = {
  getItem: () => null, setItem: () => {}, removeItem: () => {}, clear: () => {},
};

const { replayRun } = await import('./src/game/replay.ts') as typeof import('./src/game/replay');
const engine: any = await import('./src/game/engine.ts');
const {
  initGame, moveShip, resolveEvent,
  upgradeComponent, repairHull, leavePort, buyUpgrade,
} = engine;

const ROOT = dirname(fileURLToPath(import.meta.url));
const DIR = join(ROOT, 'goldens');
const WRITE = process.argv.includes('--write');

export type Fingerprint = {
  score: number;
  turn: number;
  hull: number;
  maxHull: number;
  gold: number;
  power: number;
  vision: number;
  upgrades: string[];
  dangerStreak: number;
  stormDistance: number;
  gameOver: boolean;
  rngState: number;
  currentZone: number;
  shipType: string;
};

type Golden = {
  id: string;
  note: string;
  seed: number;
  shipId: string;
  actions: number[];
  expect: Fingerprint;
};

function fingerprint(s: any): Fingerprint {
  return {
    score: s.score,
    turn: s.turn,
    hull: s.ship.hull,
    maxHull: s.ship.maxHull,
    gold: s.ship.gold,
    power: s.ship.power,
    vision: s.ship.vision,
    upgrades: [...(s.ship.upgrades ?? [])].sort(),
    dangerStreak: s.dangerStreak,
    stormDistance: s.stormDistance,
    gameOver: !!s.gameOver,
    rngState: s.rngState,
    currentZone: s.currentZone ?? 1,
    shipType: s.shipType ?? 'wanderer',
  };
}

type Policy = {
  /** 0 = risk, 1 = flee/safe */
  choice: (s: any) => number;
  /** Prefer ahead / port / starboard */
  prefer: 'ahead' | 'port' | 'starboard';
  /** Buy first offered special if affordable */
  buyFirst?: boolean;
};

/** Joue une politique et enregistre le journal d'actions (memes codes que CorsairGame). */
function recordRun(seed: number, shipId: string, policy: Policy, maxTurns = 80): number[] {
  const actions: number[] = [];
  let s = initGame(seed, shipId);
  let guard = 0;

  while (!s.gameOver && guard < maxTurns * 4) {
    guard++;
    const before = s;

    if (s.showPort) {
      if (policy.buyFirst && s.portUpgrades?.length && s.ship.upgrades.length < 2) {
        const id = s.portUpgrades[0];
        const codes = ['ghost', 'hunter', 'rider', 'greed', 'berserker', 'escape'];
        const idx = codes.indexOf(id);
        if (idx >= 0) {
          const next = buyUpgrade(s, id);
          if (next !== s && next.ship.upgrades.includes(id)) {
            actions.push(50 + idx);
            s = next;
            continue;
          }
        }
      }
      if (s.ship.hull < s.ship.maxHull - 4 && s.ship.gold >= 25 && !s.ship.upgrades.includes('greed')) {
        actions.push(60);
        s = repairHull(s, 8, 25);
        continue;
      }
      actions.push(70);
      s = leavePort(s);
      continue;
    }

    if (s.event) {
      const i = policy.choice(s);
      actions.push(10 + i);
      s = resolveEvent(s, i);
      continue;
    }

    const order =
      policy.prefer === 'ahead' ? ([1, 0, 2] as const)
      : policy.prefer === 'port' ? ([0, 1, 2] as const)
      : ([2, 1, 0] as const);
    let moved = false;
    for (const code of order) {
      const dx = code === 0 ? -1 : code === 2 ? 1 : 0;
      const dy = code === 1 ? -1 : 0;
      const next = moveShip(s, dx, dy);
      if (next !== s) {
        actions.push(code);
        s = next;
        moved = true;
        break;
      }
    }
    if (!moved) break;
    if (s === before) break;
  }

  return actions;
}

const SCENARIOS: { id: string; note: string; seed: number; shipId: string; policy: Policy; maxTurns?: number }[] = [
  {
    id: 'ahead-risk-42',
    note: 'Always ahead, always risk (choice 0). Baseline aggression.',
    seed: 42,
    shipId: 'wanderer',
    policy: { prefer: 'ahead', choice: () => 0 },
  },
  {
    id: 'ahead-flee-42',
    note: 'Always ahead, always flee/safe (choice 1). Baseline caution.',
    seed: 42,
    shipId: 'wanderer',
    policy: { prefer: 'ahead', choice: () => 1 },
  },
  {
    id: 'corsair-port-buy-7',
    note: 'Corsair ship: prefer ahead, risk, buy first port special when possible.',
    seed: 7,
    shipId: 'corsair',
    policy: { prefer: 'ahead', choice: () => 0, buyFirst: true },
    maxTurns: 100,
  },
];

function buildGolden(sc: typeof SCENARIOS[number]): Golden {
  const actions = recordRun(sc.seed, sc.shipId, sc.policy, sc.maxTurns ?? 80);
  const state = replayRun(sc.seed, sc.shipId, actions);
  return {
    id: sc.id,
    note: sc.note,
    seed: sc.seed,
    shipId: sc.shipId,
    actions,
    expect: fingerprint(state),
  };
}

function eq(a: Fingerprint, b: Fingerprint): string[] {
  const diffs: string[] = [];
  for (const k of Object.keys(a) as (keyof Fingerprint)[]) {
    const av = a[k];
    const bv = b[k];
    const same = Array.isArray(av) && Array.isArray(bv)
      ? JSON.stringify(av) === JSON.stringify(bv)
      : av === bv;
    if (!same) diffs.push(`${k}: got ${JSON.stringify(bv)} expected ${JSON.stringify(av)}`);
  }
  return diffs;
}

mkdirSync(DIR, { recursive: true });

if (WRITE) {
  for (const sc of SCENARIOS) {
    const g = buildGolden(sc);
    writeFileSync(join(DIR, `${g.id}.json`), JSON.stringify(g, null, 2) + '\n');
    console.log(`wrote ${g.id}  actions=${g.actions.length}  score=${g.expect.score}  turn=${g.expect.turn}`);
  }
  console.log('\nGoldens regenerated. Commit goldens/ with the engine change.');
  process.exit(0);
}

const files = readdirSync(DIR).filter(f => f.endsWith('.json')).sort();
if (files.length === 0) {
  console.error('No goldens found. Run: npx tsx test-golden.mts --write');
  process.exit(1);
}

let failed = 0;
for (const file of files) {
  const g = JSON.parse(readFileSync(join(DIR, file), 'utf8')) as Golden;
  const state = replayRun(g.seed, g.shipId, g.actions);
  const got = fingerprint(state);
  const diffs = eq(g.expect, got);
  if (diffs.length) {
    failed++;
    console.error(`\n❌ ${g.id}`);
    for (const d of diffs) console.error(`   ${d}`);
  } else {
    console.log(`✅ ${g.id}  score=${got.score}  turn=${got.turn}  actions=${g.actions.length}`);
  }
}

if (failed) {
  console.error(`\n${failed} golden(s) drifted. If intentional: npx tsx test-golden.mts --write`);
  process.exit(1);
}
console.log(`\n${files.length} golden replay(s) OK.`);
