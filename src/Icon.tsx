// ─── ICON ────────────────────────────────────────────────────────────
// Icones gravees dorees (public/icons_ui/*.png) en remplacement des emojis.
// Usage : <Icon name="anchor" size={24} />

const BASE = import.meta.env.BASE_URL + 'icons_ui/';

// Icones disponibles (Priorite 1). D'autres seront ajoutees au fur et a mesure.
export const ICONS = ['anchor', 'flag', 'fleurdelys', 'ship', 'trophy', 'crown', 'skull', 'dice', 'treasure', 'abyss', 'wave', 'star', 'sun', 'mist', 'eye', 'compass', 'spyglass', 'fire', 'lightning', 'swords', 'storm', 'vortex', 'kraken', 'alert'] as const;
export type IconName = typeof ICONS[number];

export function Icon({ name, size = 20, style }: { name: IconName; size?: number; style?: React.CSSProperties }) {
  return (
    <img
      src={`${BASE}${name}.png`}
      width={size}
      height={size}
      alt=""
      style={{ objectFit: 'contain', verticalAlign: 'middle', display: 'inline-block', ...style }}
    />
  );
}
