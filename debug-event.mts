/**
 * Inspecte l'etat juste AVANT une action donnee.
 *
 * Usage :
 *   npx tsx debug-event.mts <debut_run_id> <numero_action>
 *   npx tsx debug-event.mts 087d1301 36
 */

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://eyahboeaekejmcgknsty.supabase.co';
const SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
const PREFIX = process.argv[2];
const TARGET = parseInt(process.argv[3] ?? '');

if (!SERVICE_KEY)        { console.error('❌ SUPABASE_SERVICE_KEY manquante.'); process.exit(1); }
if (!PREFIX || isNaN(TARGET)) { console.error('❌ Usage : npx tsx debug-event.mts <run_id> <numero_action>'); process.exit(1); }

(globalThis as any).localStorage = {
  getItem: () => null, setItem: () => {}, removeItem: () => {}, clear: () => {},
};

const engine: any = await import('./src/game/engine');
const {
  initGame, moveShip, resolveEvent, skipEventFn,
  upgradeComponent, rerollPort, buyUpgrade, repairHull, leavePort,
} = engine;

const UPGRADE_CODES = ['ghost','hunter','rider','greed','berserker','escape','vision','compass','detector','power','armor','explorer','stormbreaker'];

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

let s = initGame(r.seed, r.ship_id || 'default');
for (let i = 0; i < TARGET; i++) s = step(s, r.actions[i]);

console.log(`\nEtat juste avant l'action #${TARGET} (code ${r.actions[TARGET]})`);
console.log('─'.repeat(60));
console.log(`tour ${s.turn} · zone ${s.currentZone ?? 1} · score ${s.score} · coque ${s.ship.hull}/${s.ship.maxHull}`);
console.log(`rngState ${s.rngState}`);
console.log(`showPort ${s.showPort} · gameOver ${s.gameOver}`);
console.log(`reliques (${(s.relics ?? []).length}/8) : ${(s.relics ?? []).join(', ') || 'aucune'}`);
console.log(`ameliorations : ${(s.ship.upgrades ?? []).join(', ') || 'aucune'}`);
console.log(`dangerStreak ${s.dangerStreak} · notoriete ${s.notoriety} · tempete ${s.stormDistance}`);

if (s.hunter) {
  console.log(`hunter : mode ${s.hunter.mode} · position (${s.hunter.x},${s.hunter.y}) · awareness ${s.hunter.awareness} · actif ${s.hunter.active}`);
} else {
  console.log('hunter : absent');
}

if (s.event) {
  console.log(`\nEVENEMENT EN COURS : ${s.event.cellType}`);
  (s.event.choices ?? []).forEach((ch: any, i: number) => {
    console.log(`  choix ${i} : ${ch.label} — ${ch.desc} (${ch.risk})`);
  });
} else {
  console.log('\nAucun evenement en cours.');
}

// Effet reel de l'action ciblee
const after = step(s, r.actions[TARGET]);
console.log('\nApres cette action :');
console.log(`  score ${s.score} → ${after.score} · coque ${s.ship.hull} → ${after.ship.hull}`);
console.log(`  rngState ${s.rngState} → ${after.rngState}`);
console.log(`  reliques : ${(after.relics ?? []).join(', ') || 'aucune'}`);
console.log(`  log : ${after.log}`);
console.log('');
