// ─── SFX ─────────────────────────────────────────────────────────────
// Sons courts du jeu (public/sounds/*.wav), synchronises avec le bouton mute.

export type SfxName =
  | 'gold' | 'buy' | 'damage' | 'streak' | 'zone'
  | 'death' | 'hunter_near' | 'hunter_attack' | 'thunder';

const VOLUMES: Record<SfxName, number> = {
  gold: 0.5, buy: 0.5, damage: 0.6, streak: 0.55, zone: 0.6,
  death: 0.6, hunter_near: 0.65, hunter_attack: 0.7, thunder: 0.55,
};

const cache: Partial<Record<SfxName, HTMLAudioElement>> = {};
let muted = false;

export function setSfxMuted(m: boolean) { muted = m; }

export function sfx(name: SfxName) {
  if (muted) return;
  try {
    let a = cache[name];
    if (!a) {
      a = new Audio(import.meta.env.BASE_URL + `sounds/${name}.wav`);
      cache[name] = a;
    }
    a.volume = VOLUMES[name];
    a.currentTime = 0;
    a.play().catch(() => {});
  } catch { /* environnement sans audio */ }
}
