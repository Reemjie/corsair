/**
 * Diagnostic d'une run — rejeu compare au releve de controle
 *
 * Usage :
 *   cd ~/Desktop/Corsair/tortuga
 *   npx tsx debug-run.mts <debut_du_run_id>
 *
 * Le releve porte desormais un triplet par action : score, coque, rngState.
 * Le rngState est le vrai traceur : il decroche AVANT que le score ne bouge,
 * a l'instant precis ou une execution consomme un tirage que l'autre ignore.
 */

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://eyahboeaekejmcgknsty.supabase.co';
const SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
const PREFIX = process.argv[2];

if (!SERVICE_KEY) { console.error('❌ SUPABASE_SERVICE_KEY manquante.'); process.exit(1); }
if (!PREFIX)      { console.error('❌ Usage : npx tsx debug-run.mts <debut_du_run_id>'); process.exit(1); }

(globalThis as any).localStorage = {
  getItem: () => null, setItem: () => {}, removeItem: () => {}, clear: () => {},
};

const engine: any = await import('./src/game/engine');
const {
  initGame, moveShip, resolveEvent, skipEventFn,
  upgradeComponent, rerollPort, buyUpgrade, repairHull, leavePort,
} = engine;

const UPGRADE_CODES = ['ghost','hunter','rider','greed','berserker','escape','vision','compass','detector','power','armor','explorer','stormbreaker'];

const NAMES: Record<number, string> = {
  0: 'PORT', 1: 'AHEAD', 2: 'STARBOARD', 20: 'skip',
  30: 'upgrade hull', 31: 'upgrade weapon', 32: 'upgrade nav',
  40: 'reroll', 60: 'rum barrel', 61: 'full repair', 70: 'quitter le port',
};
const name = (c: number) =>
  NAMES[c] ?? (c >= 10 && c < 20 ? `choix ${c - 10}` : c >= 50 && c < 60 ? `achat ${UPGRADE_CODES[c - 50]}` : `? (${c})`);

function step(s: any, c: number) {
  if (c === 0)                return moveShip(s, -1, 0);
  if (c === 1)                return moveShip(s, 0, -1);
  if (c === 2)                return moveShip(s, 1, 0);
  if (c >= 10 && c < 20)      return resolveEvent(s, c - 10);
  if (c === 20)               return skipEventFn(s);
  if (c === 30)               return upgradeComponent(s, 'hull');
  if (c === 31)               return upgradeComponent(s, 'weapon');
  if (c === 32)               return upgradeComponent(s, 'nav');
  if (c === 40)               return rerollPort(s);
  if (c >= 50 && c < 60)      return buyUpgrade(s, UPGRADE_CODES[c - 50]);
  if (c === 60)               return repairHull(s, 8, 25);
  if (c === 61)               return repairHull(s, s.ship.maxHull, 55);
  if (c === 70)               return leavePort(s);
  return s;
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);
const { data: runs } = await supabase.from('corsair_run_logs').select('*');
const r = (runs ?? []).find((x: any) => String(x.run_id).startsWith(PREFIX));

if (!r) { console.error(`❌ Aucune run commencant par "${PREFIX}"`); process.exit(1); }

const raw: number[] = r.checks ?? [];
const n = r.actions.length;
// triplets (score, coque, rng) si la longueur colle, sinon ancien format en paires
const stride = raw.length >= n * 3 ? 3 : raw.length >= n * 2 ? 2 : 0;

console.log(`\nRun ${r.run_id}`);
console.log(`seed ${r.seed} · navire ${r.ship_id} · daily ${r.is_daily}`);
console.log(`declare : ${r.final_score} pts en ${r.final_turn} tours · ${n} actions`);
if (stride === 0) console.log('⚠️  Pas de releve de controle sur cette run');
else if (stride === 2) console.log('ℹ️  Releve sans rngState (format precedent)');
console.log('');

if (stride === 3) {
  console.log('  #  action              tour  |  rejeu: score coque      rng  |  reel: score coque      rng');
  console.log('─'.repeat(100));
} else if (stride === 2) {
  console.log('  #  action              tour  |  rejeu: score  coque  |  reel: score  coque');
  console.log('─'.repeat(78));
} else {
  console.log('  #  action              tour  score  coque  gameOver');
  console.log('─'.repeat(56));
}

let s = initGame(r.seed, r.ship_id || 'default');
let firstDiff = -1, firstRngDiff = -1;

r.actions.forEach((c: number, i: number) => {
  s = step(s, c);
  const pad = (v: any, w: number) => String(v).padStart(w);

  if (stride === 0) {
    console.log(`${pad(i,3)}  ${name(c).padEnd(18)} ${pad(s.turn,4)} ${pad(s.score,6)} ${pad(s.ship.hull,6)}${s.gameOver ? '  ⚰️' : ''}`);
    return;
  }

  const rScore = raw[i * stride];
  const rHull  = raw[i * stride + 1];
  const rRng   = stride === 3 ? raw[i * stride + 2] : null;
  const known  = rScore !== -1 && rScore !== undefined;

  const stateDiff = known && (rScore !== s.score || rHull !== s.ship.hull);
  const rngDiff   = stride === 3 && known && rRng !== -1 && rRng !== (s.rngState ?? -1);

  if (stateDiff && firstDiff === -1) firstDiff = i;
  if (rngDiff && firstRngDiff === -1) firstRngDiff = i;

  const mark = rngDiff && !stateDiff ? '  ⟵ RNG' : stateDiff ? '  ⟵ DIVERGENCE' : '';

  if (stride === 3) {
    console.log(
      `${pad(i,3)}  ${name(c).padEnd(18)} ${pad(s.turn,4)}  | ${pad(s.score,11)} ${pad(s.ship.hull,5)} ${pad(s.rngState ?? -1,8)}  | ` +
      `${known ? `${pad(rScore,10)} ${pad(rHull,5)} ${pad(rRng,8)}` : '         -     -        -'}${mark}${s.gameOver ? '  ⚰️' : ''}`
    );
  } else {
    console.log(
      `${pad(i,3)}  ${name(c).padEnd(18)} ${pad(s.turn,4)}  | ${pad(s.score,11)} ${pad(s.ship.hull,6)}  | ` +
      `${known ? `${pad(rScore,6)} ${pad(rHull,6)}` : '     -      -'}${mark}${s.gameOver ? '  ⚰️' : ''}`
    );
  }
});

console.log('─'.repeat(stride === 3 ? 100 : stride === 2 ? 78 : 56));
console.log(`rejeu : ${s.score} pts · declare : ${r.final_score} pts · ecart ${s.score - r.final_score}`);

if (stride === 3 && firstRngDiff !== -1) {
  const c = r.actions[firstRngDiff];
  console.log(`\n🎯 Le hasard se desynchronise a l'action #${firstRngDiff} : ${name(c)} (code ${c})`);
  if (firstDiff !== -1 && firstDiff > firstRngDiff) {
    console.log(`   Le score ne bouge qu'a #${firstDiff} — la cause est bien en amont, a #${firstRngDiff}.`);
  }
  console.log(`   → cette action consomme un nombre de tirages different selon l'execution.`);
} else if (firstDiff !== -1) {
  const c = r.actions[firstDiff];
  console.log(`\n🎯 Premiere divergence a l'action #${firstDiff} : ${name(c)} (code ${c})`);
} else if (stride > 0) {
  console.log('\n✅ Aucune divergence : le rejeu suit la partie reelle action par action.');
}
console.log('');
