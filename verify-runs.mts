/**
 * Verificateur de runs Corsair — MODE OBSERVATION
 *
 * Rejoue chaque partie depuis son seed + son log de coups, avec le meme moteur
 * que le client, et compare le score obtenu au score declare.
 * Il ne rejette rien : il marque simplement verified = true / false.
 *
 * Usage :
 *   cd ~/Desktop/Corsair/tortuga
 *   SUPABASE_SERVICE_KEY="ta_cle_service" npx tsx verify-runs.mts
 *
 * La cle service se trouve dans Supabase > Settings > API > service_role.
 * NE JAMAIS la commiter ni la mettre dans le code du jeu.
 */

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://eyahboeaekejmcgknsty.supabase.co';
const SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

if (!SERVICE_KEY) {
  console.error('❌ SUPABASE_SERVICE_KEY manquante.');
  console.error('   Usage : SUPABASE_SERVICE_KEY="..." npx tsx verify-runs.mts');
  process.exit(1);
}

// Le moteur lit localStorage (titre equipe). On le neutralise AVANT de l'importer.
(globalThis as any).localStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
  clear: () => {},
};

const engine: any = await import('./src/game/engine');
const {
  initGame, moveShip, resolveEvent, skipEventFn,
  upgradeComponent, rerollPort, buyUpgrade, repairHull, leavePort,
} = engine;

// Doit rester synchronise avec UPGRADE_CODES dans CorsairGame.tsx
const UPGRADE_CODES = [
  'ghost', 'hunter', 'rider', 'greed', 'berserker', 'escape', 'vision',
  'compass', 'detector', 'power', 'armor', 'explorer', 'stormbreaker',
];

function replay(seed: number, shipId: string, actions: number[]) {
  let s = initGame(seed, shipId || 'default');
  const unknown: number[] = [];

  for (const c of actions) {
    if (c === 0)                    s = moveShip(s, -1, 0);
    else if (c === 1)               s = moveShip(s, 0, -1);
    else if (c === 2)               s = moveShip(s, 1, 0);
    else if (c >= 10 && c < 20)     s = resolveEvent(s, c - 10);
    else if (c === 20)              s = skipEventFn(s);
    else if (c === 30)              s = upgradeComponent(s, 'hull');
    else if (c === 31)              s = upgradeComponent(s, 'weapon');
    else if (c === 32)              s = upgradeComponent(s, 'nav');
    else if (c === 40)              s = rerollPort(s);
    else if (c >= 50 && c < 60)     s = buyUpgrade(s, UPGRADE_CODES[c - 50]);
    else if (c === 60)              s = repairHull(s, 8, 25);
    else if (c === 61)              s = repairHull(s, s.ship.maxHull, 55);
    else if (c === 70)              s = leavePort(s);
    else                            unknown.push(c);
  }

  return { state: s, unknown };
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

const { data: runs, error } = await supabase
  .from('corsair_run_logs')
  .select('*')
  .is('verified', null)
  .order('created_at', { ascending: false })
  .limit(50);

if (error) {
  console.error('❌ Lecture impossible :', error.message);
  process.exit(1);
}

if (!runs || runs.length === 0) {
  console.log('Rien a verifier.');
  process.exit(0);
}

console.log(`\n${runs.length} run(s) a verifier\n${'─'.repeat(60)}`);

let okCount = 0, mismatchCount = 0, crashCount = 0;

for (const r of runs) {
  const short = String(r.run_id).slice(0, 8);
  let verified = false;
  let replayScore: number | null = null;

  try {
    const { state, unknown } = replay(r.seed, r.ship_id, r.actions ?? []);
    replayScore = state.score;
    verified = replayScore === r.final_score;

    if (unknown.length > 0) {
      console.log(`⚠️  ${short}  codes inconnus dans le log : ${[...new Set(unknown)].join(', ')}`);
    }

    if (verified) {
      okCount++;
      console.log(`✅ ${short}  ${r.final_score} pts  (${r.final_turn} tours, ${(r.actions ?? []).length} actions)`);
    } else {
      mismatchCount++;
      const delta = (replayScore ?? 0) - r.final_score;
      console.log(`❌ ${short}  declare ${r.final_score} · rejoue ${replayScore} · ecart ${delta > 0 ? '+' : ''}${delta}`);
    }
  } catch (e: any) {
    crashCount++;
    console.log(`💥 ${short}  rejeu impossible : ${e?.message ?? e}`);
  }

  await supabase
    .from('corsair_run_logs')
    .update({ verified, replay_score: replayScore, verified_at: new Date().toISOString() })
    .eq('run_id', r.run_id);
}

console.log(`${'─'.repeat(60)}`);
console.log(`✅ ${okCount} conformes · ❌ ${mismatchCount} ecarts · 💥 ${crashCount} erreurs\n`);
