import type { GameState } from '../types/game';

const KEY = 'corsair_onboard_v1';

export type OnboardId = 'sail' | 'danger' | 'storm' | 'port' | 'hunter';

export type OnboardTip = { id: OnboardId; title: string; text: string };

function loadDone(): Set<string> {
  try {
    return new Set(JSON.parse(localStorage.getItem(KEY) ?? '[]') as string[]);
  } catch {
    return new Set();
  }
}

export function markOnboardDone(id: OnboardId): void {
  const done = loadDone();
  done.add(id);
  try {
    localStorage.setItem(KEY, JSON.stringify([...done]));
  } catch { /* ignore quota */ }
}

/** Première partie seulement : un conseil contextuel à la fois. */
export function pickOnboardTip(state: GameState): OnboardTip | null {
  const done = loadDone();
  if (!done.has('sail') && state.turn === 0 && !state.event && !state.showPort && !state.gameOver) {
    return {
      id: 'sail',
      title: 'SET SAIL',
      text: 'Move with ← ↑ → (or A / W / D). Sail north. The storm climbs from the south.',
    };
  }
  if (!done.has('danger') && state.event && state.event.choices.some(c => c.risk === 'risky' || c.risk === 'bold')) {
    return {
      id: 'danger',
      title: 'A CHOICE',
      text: 'Risky choices pay more — and can sink you. Read both options before you commit.',
    };
  }
  if (!done.has('storm') && state.turn > 0 && state.stormDistance <= 8 && !state.gameOver) {
    return {
      id: 'storm',
      title: 'THE STORM',
      text: `Only ${state.stormDistance} turns left. Islands and Kraken Pacts buy you time.`,
    };
  }
  if (!done.has('port') && state.showPort) {
    return {
      id: 'port',
      title: 'SAFE HARBOR',
      text: 'Repair, upgrade hull / cannons / navigation, then leave. Max two special abilities per run.',
    };
  }
  if (!done.has('hunter') && state.hunter?.active && !state.gameOver) {
    return {
      id: 'hunter',
      title: 'THE HUNTER',
      text: 'It tracks you. Purple tiles hint its next move. Ports and storms lower its awareness.',
    };
  }
  return null;
}
