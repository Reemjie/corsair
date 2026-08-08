/**
 * Genere un test Cairo validant apply_action sur des parties COMPLETES.
 *
 * Pour chaque seed, une partie est jouee de bout en bout avec le vrai moteur,
 * pilotee par une politique deterministe (independante du hasard du jeu).
 * Chaque action est journalisee avec son code, et l'etat est fige apres coup.
 *
 * Les parties longues font enfin intervenir le Hunter (tour 12) et le portail.
 *
 * Usage :
 *   cd ~/Desktop/Corsair/tortuga
 *   npx tsx dump-run.mts > ../corsair_verifier/src/run_vectors.cairo
 */

// A la mort du joueur, le moteur calcule le titre de run et lit localStorage.
// On le neutralise AVANT d'importer le module (les imports statiques sont
// hisses en tete de fichier, d'ou l'import dynamique).
(globalThis as any).localStorage = {
  getItem: () => null, setItem: () => {}, removeItem: () => {}, clear: () => {},
};

const engine: any = await import('./src/game/engine');
const {
  initGame, moveShip, resolveEvent,
  upgradeComponent, buyUpgrade, repairHull, leavePort,
} = engine;

const u32 = (n: number) => n >>> 0;

const TYPE_CODE: Record<string, number> = {
  sea: 0, storm: 1, pirate: 2, treasure: 3, port: 4, kraken: 5,
  wreck: 6, island: 7, rocks: 8, maelstrom: 9, cursed_treasure: 10,
  ancient_kraken: 11, portal: 12, fog: 13,
};

// ordre de UPGRADE_CODES, tel que le log l'utilise
const UPGRADE_CODES = ['ghost', 'hunter', 'rider', 'greed', 'berserker', 'escape'];

/** Petit generateur independant, pour varier la politique sans toucher au jeu. */
function politique(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}

const SEEDS: number[] = [];
for (let i = 0; i < 12; i++) SEEDS.push(200000 + i * 61879);

const out: string[] = [];
out.push('// FICHIER GENERE — ne pas editer a la main.');
out.push('// Source : parties completes jouees avec le moteur, via dump-run.mts');
out.push('');
out.push('#[cfg(test)]');
out.push('mod tests {');
out.push('    use corsair_verifier::state::{init_state, new_grid, SHIP_DEFAULT};');
out.push('    use corsair_verifier::action::apply_action;');
out.push('');

let sequences = 0;
let actionsTotal = 0;

for (const seed of SEEDS) {
  let s = initGame(seed, 'default');
  const p = politique(seed ^ 0x5eed);
  const lignes: string[] = [];
  let n = 0;

  while (!s.gameOver && n < 90) {
    let code: number;
    let apres = s;

    if (s.showPort) {
      const r = p();
      if (r < 0.25 && s.ship.gold >= 25 && !s.ship.upgrades.includes('greed')) {
        code = 60;
        apres = repairHull(s, 8, 25);
      } else if (r < 0.45 && s.ship.gold >= 50) {
        code = 32; // navigation
        apres = upgradeComponent(s, 'nav');
      } else if (r < 0.6 && s.ship.gold >= 50) {
        code = 30; // coque
        apres = upgradeComponent(s, 'hull');
      } else if (r < 0.72 && s.portUpgrades.length > 0) {
        const id = s.portUpgrades[0] as string;
        const idx = UPGRADE_CODES.indexOf(id);
        if (idx < 0) { code = 70; apres = leavePort(s); }
        else { code = 50 + idx; apres = buyUpgrade(s, id as any); }
      } else {
        code = 70;
        apres = leavePort(s);
      }
    } else if (s.event) {
      const choix = p() < 0.6 ? 0 : 1;
      code = 10 + choix;
      apres = resolveEvent(s, choix);
    } else {
      const r = p();
      if (r < 0.6) { code = 1; apres = moveShip(s, 0, -1); }
      else if (r < 0.8) { code = 0; apres = moveShip(s, -1, 0); }
      else { code = 2; apres = moveShip(s, 1, 0); }
    }

    // action refusee par le moteur : on n'enregistre rien et on tente autre chose
    if (apres === s) {
      if (s.showPort) { apres = leavePort(s); code = 70; }
      else if (s.event) { apres = resolveEvent(s, 0); code = 10; }
      else { apres = moveShip(s, 0, -1); code = 1; }
      if (apres === s) break;
    }

    s = apres;
    const ev = s.event ? 1 : 0;
    const evType = s.event ? (TYPE_CODE[s.event.cellType] ?? 99) : 0;

    lignes.push(`        assert!(apply_action(ref st, ref gr, ${code}), "action ${n} acceptee");`);
    lignes.push(`        assert!(st.rng == ${u32(s.rngState)}, "rng action ${n}");`);
    lignes.push(`        assert!(st.score == ${s.score}, "score action ${n}");`);
    lignes.push(`        assert!(st.ship.hull == ${s.ship.hull}, "coque action ${n}");`);
    lignes.push(`        assert!(st.ship.gold == ${s.ship.gold}, "or action ${n}");`);
    lignes.push(`        assert!(st.turn == ${s.turn}, "tour action ${n}");`);
    lignes.push(`        assert!(st.storm_distance == ${s.stormDistance}, "tempete action ${n}");`);
    lignes.push(`        assert!(st.danger_streak == ${s.dangerStreak}, "serie action ${n}");`);
    lignes.push(`        assert!(st.ship.x == ${s.ship.x} && st.ship.y == ${s.ship.y}, "position action ${n}");`);
    lignes.push(`        assert!(st.game_over == ${s.gameOver}, "fin action ${n}");`);
    lignes.push(`        assert!(st.event_present == ${ev === 1}, "evenement action ${n}");`);
    const h = s.hunter;
    const MODES: Record<string, number> = { tracking: 0, searching: 1, stalking: 2, frenzy: 3 };
    if (h) {
      lignes.push(`        assert!(st.hunter.present, "hunter present action ${n}");`);
      lignes.push(`        assert!(st.hunter.x == ${h.x} && st.hunter.y == ${h.y}, "hunter position action ${n}");`);
      lignes.push(`        assert!(st.hunter.mode == ${MODES[h.mode] ?? 99}, "hunter mode action ${n}");`);
      lignes.push(`        assert!(st.hunter.awareness_x2 == ${Math.round(h.awareness * 2)}, "hunter vigilance action ${n}");`);
    } else {
      lignes.push(`        assert!(!st.hunter.present, "hunter absent action ${n}");`);
    }
    if (ev === 1) {
      lignes.push(`        assert!(st.event_cell_type == ${evType}, "type evenement action ${n}");`);
    }
    lignes.push('');

    n++;
    actionsTotal++;
  }

  if (lignes.length === 0) continue;

  out.push('    #[test]');
  out.push(`    fn partie_seed_${seed}() {`);
  out.push(`        let mut st = init_state(${u32(seed)}, SHIP_DEFAULT);`);
  out.push(`        let mut gr = new_grid(${u32(seed)});`);
  for (const l of lignes) out.push(l);
  out.push('    }');
  out.push('');
  sequences++;
}

out.push('}');

console.error(`${sequences} parties, ${actionsTotal} actions`);
console.log(out.join('\n'));
