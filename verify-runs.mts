/**
 * Verificateur de runs Corsair — score + provenance du seed
 *
 * Deux controles independants :
 *   1. REJEU   — la partie est rejouee depuis son log, le score doit correspondre.
 *   2. SEED    — le seed doit venir du serveur (ou etre le seed daily du jour).
 *
 * Usage :
 *   cd ~/Desktop/Corsair/tortuga
 *   read -s "SUPABASE_SERVICE_KEY?Cle service : " && export SUPABASE_SERVICE_KEY && echo ""
 *   npx tsx verify-runs.mts
 */

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://eyahboeaekejmcgknsty.supabase.co';
const SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

// Mise en service des seeds serveur. Toute run anterieure est 'legacy' :
// on ne peut pas attester sa provenance, ce n'est pas pour autant une triche.
const SEED_SYSTEM_LIVE = new Date('2026-07-31T19:40:00Z');

if (!SERVICE_KEY) {
  console.error('❌ SUPABASE_SERVICE_KEY manquante.');
  process.exit(1);
}

// Le moteur lit localStorage (titre equipe). On le neutralise AVANT de l'importer.
(globalThis as any).localStorage = {
  getItem: () => null, setItem: () => {}, removeItem: () => {}, clear: () => {},
};

const engine: any = await import('./src/game/engine');
const {
  initGame, moveShip, resolveEvent, skipEventFn,
  upgradeComponent, rerollPort, buyUpgrade, repairHull, leavePort,
} = engine;

const UPGRADE_CODES = [
  'ghost', 'hunter', 'rider', 'greed', 'berserker', 'escape', 'vision',
  'compass', 'detector', 'power', 'armor', 'explorer', 'stormbreaker',
];

// ─── REJEU ────────────────────────────────────────────────────────────
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

// ─── SEED DAILY (meme calcul que le jeu) ──────────────────────────────
function dailySeedFor(d: Date): number {
  const key = `${d.getUTCFullYear()}${String(d.getUTCMonth() + 1).padStart(2, '0')}${String(d.getUTCDate()).padStart(2, '0')}`;
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = ((hash << 5) - hash) + key.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % 999999;
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

// ─── PROVENANCE DU SEED ───────────────────────────────────────────────
async function seedSource(r: any): Promise<'server' | 'daily' | 'legacy' | 'unknown'> {
  if (r.is_daily) {
    // Une partie commencee avant minuit UTC et finie apres porte la date du lendemain :
    // on accepte le seed du jour ou celui de la veille.
    const played = new Date(r.created_at);
    const yesterday = new Date(played.getTime() - 86_400_000);
    if (r.seed === dailySeedFor(played) || r.seed === dailySeedFor(yesterday)) return 'daily';
    return 'unknown';
  }

  const { data } = await supabase
    .from('corsair_seeds')
    .select('seed_token')
    .eq('wallet_address', r.wallet_address)
    .eq('seed', r.seed)
    .limit(1)
    .maybeSingle();

  if (data) return 'server';
  return new Date(r.created_at) < SEED_SYSTEM_LIVE ? 'legacy' : 'unknown';
}

// ─── BOUCLE ───────────────────────────────────────────────────────────
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

console.log(`\n${runs.length} run(s) a verifier\n${'─'.repeat(68)}`);

let clean = 0, scoreIssue = 0, seedIssue = 0, crashed = 0;

for (const r of runs) {
  const short = String(r.run_id).slice(0, 8);
  let scoreOk = false;
  let replayScore: number | null = null;
  let source: string = 'unknown';

  try {
    source = await seedSource(r);

    const { state, unknown } = replay(r.seed, r.ship_id, r.actions ?? []);
    replayScore = state.score;
    scoreOk = replayScore === r.final_score;

    if (unknown.length > 0) {
      console.log(`⚠️  ${short}  codes inconnus : ${[...new Set(unknown)].join(', ')}`);
    }

    const seedTag =
      source === 'server' ? 'seed serveur' :
      source === 'daily'  ? 'seed daily' :
      source === 'legacy' ? '⚠ seed anterieur au systeme' :
                            '🚩 SEED NON EMIS';

    if (scoreOk && (source === 'server' || source === 'daily')) {
      clean++;
      console.log(`✅ ${short}  ${r.final_score} pts · ${r.final_turn} tours · ${seedTag}`);
    } else if (!scoreOk) {
      scoreIssue++;
      const delta = (replayScore ?? 0) - r.final_score;
      console.log(`❌ ${short}  declare ${r.final_score} · rejoue ${replayScore} · ecart ${delta > 0 ? '+' : ''}${delta} · ${seedTag}`);
    } else {
      seedIssue++;
      console.log(`🚩 ${short}  ${r.final_score} pts · score conforme mais ${seedTag}`);
    }
  } catch (e: any) {
    crashed++;
    console.log(`💥 ${short}  rejeu impossible : ${e?.message ?? e}`);
  }

  await supabase
    .from('corsair_run_logs')
    .update({
      verified: scoreOk,
      replay_score: replayScore,
      seed_source: source,
      verified_at: new Date().toISOString(),
    })
    .eq('run_id', r.run_id);
}

console.log('─'.repeat(68));
console.log(`✅ ${clean} conformes · ❌ ${scoreIssue} ecart de score · 🚩 ${seedIssue} seed suspect · 💥 ${crashed} erreurs\n`);
