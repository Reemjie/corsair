/** Painted ocean tile under sea cells — Gemini Tideborn texture test. */

const OCEAN_TILE = `${import.meta.env.BASE_URL}sea/ocean-tile.jpg`;

/** How many world cells one texture repeat covers (lower = more zoomed-in waves). */
const CELLS_PER_TILE = 4;

const ZONE_SEA = {
  1: {
    base: '#1a5a6e',
    veil: 'rgba(8, 40, 52, 0.05)',
    sheen: 'rgba(180, 220, 230, 0.08)',
  },
  2: {
    base: '#164860',
    veil: 'rgba(6, 32, 48, 0.14)',
    sheen: 'rgba(150, 190, 210, 0.07)',
  },
  3: {
    base: '#123848',
    veil: 'rgba(4, 20, 36, 0.22)',
    sheen: 'rgba(120, 160, 190, 0.06)',
  },
} as const;

function hashPair(x: number, y: number) {
  return Math.abs((x * 73856093) ^ (y * 19349663)) % 1000;
}

type Props = {
  zone: number;
  x: number;
  y: number;
  /** Cell pixel size — keeps the texture continuous across the grid. */
  cellSize: number;
  quiet?: boolean;
};

export default function SeaTile({ zone, x, y, cellSize, quiet }: Props) {
  const z = ZONE_SEA[zone as 1 | 2 | 3] ?? ZONE_SEA[1];
  const h = hashPair(x, y);
  const tilePx = Math.max(1, cellSize * CELLS_PER_TILE);
  // Continuous UVs so adjacent cells stitch into one ocean surface
  const posX = -x * cellSize;
  const posY = -y * cellSize;

  return (
    <div
      aria-hidden
      className={quiet ? undefined : 'sea-tile'}
      style={{
        position: 'absolute',
        inset: 0,
        borderRadius: 5,
        pointerEvents: 'none',
        overflow: 'hidden',
        backgroundColor: z.base,
        backgroundImage: `url(${OCEAN_TILE})`,
        backgroundSize: `${tilePx}px ${tilePx}px`,
        backgroundPosition: `${posX}px ${posY}px`,
        boxShadow: quiet
          ? 'inset 0 -5px 10px rgba(8,30,40,0.4)'
          : 'inset 0 1px 0 rgba(220,240,245,0.12), inset 0 -7px 12px rgba(8,28,38,0.45)',
        animationDelay: quiet ? undefined : `${(h % 50) / 10}s`,
      }}
    >
      {/* Zone depth veil */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: z.veil,
        }}
      />
      {/* Soft top sheen for readability */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: '40%',
          background: `linear-gradient(180deg, ${z.sheen} 0%, transparent 100%)`,
        }}
      />
    </div>
  );
}

export function seaBaseColor(zone: number): string {
  return (ZONE_SEA[zone as 1 | 2 | 3] ?? ZONE_SEA[1]).base;
}
