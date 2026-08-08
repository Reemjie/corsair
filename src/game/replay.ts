// ─── REJEU D'UNE PARTIE ──────────────────────────────────────────────────
//
// Le moteur etant deterministe, rejouer initGame(seed) puis le journal
// d'actions reconstitue exactement l'etat d'une partie interrompue.
// Aucune sauvegarde d'etat n'est necessaire : le journal suffit.
//
// Les codes sont ceux ecrits par logAction() dans CorsairGame.

import {
  initGame, moveShip, resolveEvent, skipEventFn,
  upgradeComponent, rerollPort, buyUpgrade, repairHull, leavePort,
} from './engine';
import type { GameState, UpgradeId } from '../types/game';

// Ordre de UPGRADE_CODES, tel que le journal l'utilise
const UPGRADE_CODES = [
  'ghost', 'hunter', 'rider', 'greed', 'berserker', 'escape',
  'vision', 'compass', 'detector', 'power', 'armor', 'explorer', 'stormbreaker',
];

export function replayRun(seed: number, shipId: string, actions: number[]): GameState {
  let s = initGame(seed, shipId || 'default');

  for (const c of actions) {
    if (c === 0)                 s = moveShip(s, -1, 0);
    else if (c === 1)            s = moveShip(s, 0, -1);
    else if (c === 2)            s = moveShip(s, 1, 0);
    else if (c >= 10 && c < 20)  s = resolveEvent(s, c - 10);
    else if (c === 20)           s = skipEventFn(s);
    else if (c === 30)           s = upgradeComponent(s, 'hull');
    else if (c === 31)           s = upgradeComponent(s, 'weapon');
    else if (c === 32)           s = upgradeComponent(s, 'nav');
    else if (c === 40)           s = rerollPort(s);
    else if (c >= 50 && c < 60)  s = buyUpgrade(s, UPGRADE_CODES[c - 50] as UpgradeId);
    else if (c === 60)           s = repairHull(s, 8, 25);
    else if (c === 61)           s = repairHull(s, s.ship.maxHull, 55);
    else if (c === 70)           s = leavePort(s);
  }

  return s;
}
