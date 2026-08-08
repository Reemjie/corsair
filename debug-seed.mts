/**
 * Rejoue une partie du harnais et affiche, action par action, le nombre de
 * tirages reellement consommes et le contexte (zone, portail, Hunter).
 *
 * Usage :
 *   cd ~/Desktop/Corsair/tortuga
 *   npx tsx debug-seed.mts 633153 34 42
 */

(globalThis as any).localStorage = {
  getItem: () => null, setItem: () => {}, removeItem: () => {}, clear: () => {},
};

const engine: any = await import('./src/game/engine');
const {
  initGame, moveShip, resolveEvent, upgradeComponent, buyUpgrade, repairHull, leavePort,
} = engine;

const SEED = parseInt(process.argv[2] ?? '633153');
const DEBUT = parseInt(process.argv[3] ?? '0');
const FIN = parseInt(process.argv[4] ?? '999');

const u32 = (n: number) => n >>> 0;
const UPGRADE_CODES = ['ghost', 'hunter', 'rider', 'greed', 'berserker', 'escape'];

/** Compte les tirages entre deux etats du generateur (borne a 40). */
function tirages(avant: number, apres: number): number {
  let s = u32(avant);
  const cible = u32(apres);
  if (s === cible) return 0;
  for (let i = 1; i <= 40; i++) {
    s = u32((s * 1664525 + 1013904223) & 0xffffffff);
    if (s === cible) return i;
  }
  return -1;
}

function politique(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}

let s = initGame(SEED, 'default');
const p = politique(SEED ^ 0x5eed);
let n = 0;

console.log('  #  code  tirages | tour zone entree portail | hunter                 | tempete coque score');
console.log('─'.repeat(110));

while (!s.gameOver && n < 90) {
  (globalThis as any).__RNG_TRACE = (n === DEBUT);
  (globalThis as any).__RNG_LOG = [];
  let code: number;
  let apres = s;

  if (s.showPort) {
    const r = p();
    if (r < 0.25 && s.ship.gold >= 25 && !s.ship.upgrades.includes('greed')) {
      code = 60; apres = repairHull(s, 8, 25);
    } else if (r < 0.45 && s.ship.gold >= 50) {
      code = 32; apres = upgradeComponent(s, 'nav');
    } else if (r < 0.6 && s.ship.gold >= 50) {
      code = 30; apres = upgradeComponent(s, 'hull');
    } else if (r < 0.72 && s.portUpgrades.length > 0) {
      const id = s.portUpgrades[0] as string;
      const idx = UPGRADE_CODES.indexOf(id);
      if (idx < 0) { code = 70; apres = leavePort(s); }
      else { code = 50 + idx; apres = buyUpgrade(s, id as any); }
    } else {
      code = 70; apres = leavePort(s);
    }
  } else if (s.event) {
    const choix = p() < 0.6 ? 0 : 1;
    code = 10 + choix; apres = resolveEvent(s, choix);
  } else {
    const r = p();
    if (r < 0.6) { code = 1; apres = moveShip(s, 0, -1); }
    else if (r < 0.8) { code = 0; apres = moveShip(s, -1, 0); }
    else { code = 2; apres = moveShip(s, 1, 0); }
  }

  if (apres === s) {
    if (s.showPort) { apres = leavePort(s); code = 70; }
    else if (s.event) { apres = resolveEvent(s, 0); code = 10; }
    else { apres = moveShip(s, 0, -1); code = 1; }
    if (apres === s) break;
  }

  const g: any = globalThis as any;
  const avantRng = s.rngState;
  const avantCible = s.hunterTarget;
  const avantHist = (s.hunterTargetHistory ?? []).map((h: any) => `(${h.x},${h.y})`).join(' ');
  const avantSkip = s.hunter?.skipTurn ? 1 : 0;
  const avantMode = s.hunter?.mode ?? '-';
  const avantPos = s.hunter ? `(${s.hunter.x},${s.hunter.y})` : '-';
  s = apres;
  const d = tirages(avantRng, s.rngState);

  if (n === DEBUT) {
    console.log(`\n  origine des ${d} tirages de l'action ${n} :`);
    for (const t of (g.__RNG_LOG ?? [])) console.log(`    ${t}`);
    console.log('');
  }
  if (n >= DEBUT && n <= FIN) {
    console.log(
      `     avant : hunter ${avantPos} ${avantMode} skip${avantSkip} | cible ` +
      `${avantCible ? `(${avantCible.x},${avantCible.y})` : '-'} | historique ${avantHist}`
    );
    const h = s.hunter;
    const hTxt = h
      ? `${h.mode.padEnd(9)} (${h.x},${h.y}) aw${String(Math.round(h.awareness)).padStart(3)} skip${h.skipTurn ? 1 : 0}`
      : 'absent';
    console.log(
      `${String(n).padStart(3)}  ${String(code).padStart(4)}  ${String(d).padStart(7)} | ` +
      `${String(s.turn).padStart(4)} ${String(s.currentZone).padStart(4)} ${String(s.zoneEntryTurn).padStart(6)} ` +
      `${s.portalSpawned ? 'pose   ' : 'absent '} | ${hTxt.padEnd(22)} | ` +
      `${String(s.stormDistance).padStart(7)} ${String(s.ship.hull).padStart(5)} ${String(s.score).padStart(5)}`
    );
  }

  n++;
}

console.log('─'.repeat(110));
console.log(`fin : ${s.gameOver ? 'mort' : 'en cours'} · ${n} actions · score ${s.score}`);
