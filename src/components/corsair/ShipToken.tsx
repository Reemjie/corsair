import { motion } from 'framer-motion';

type Props = {
  shipId: string;
  size: number;
  lurchX?: number;
  lurchY?: number;
};

type Palette = {
  hull: string;
  hullDark: string;
  deck: string;
  sail: string;
  sailShade: string;
  trim: string;
  mast: string;
};

function palette(id: string): Palette {
  switch (id) {
    case 'merchant':
      return {
        hull: '#8B5A2B', hullDark: '#5C3A18', deck: '#C4A06A',
        sail: '#F2E6C4', sailShade: '#D9C89A', trim: '#D4A017', mast: '#3D2A18',
      };
    case 'specter':
      return {
        hull: '#6BB8D4', hullDark: '#3A7A98', deck: '#A8DCEC',
        sail: '#E0F6FF', sailShade: '#B0D8EC', trim: '#8EE0FF', mast: '#2A4A58',
      };
    case 'breakwater':
      return {
        hull: '#4A3A32', hullDark: '#2A2018', deck: '#7A6A58',
        sail: '#D0C8B8', sailShade: '#A8A090', trim: '#8A8070', mast: '#1A1410',
      };
    case 'corsair':
      return {
        hull: '#2A1814', hullDark: '#120C0A', deck: '#5A3830',
        sail: '#C42830', sailShade: '#8A1820', trim: '#E8C840', mast: '#1A1010',
      };
    default:
      return {
        hull: '#6B4428', hullDark: '#3E2818', deck: '#A87848',
        sail: '#F4EFE4', sailShade: '#D4C8B0', trim: '#C8A060', mast: '#2E2014',
      };
  }
}

/** Flat isometric ship — built to read at ~40–60px. */
export default function ShipToken({ shipId, size, lurchX = 0, lurchY = 0 }: Props) {
  const c = palette(shipId);
  const ghost = shipId === 'specter';
  const wide = shipId === 'merchant' || shipId === 'breakwater';

  return (
    <motion.div
      animate={{
        rotate: lurchX * 8,
        y: lurchY * 4,
        scale: (lurchX || lurchY) ? 1.04 : 1,
      }}
      transition={{ type: 'spring', stiffness: 220, damping: 14 }}
      style={{ lineHeight: 0, transformOrigin: '50% 70%' }}
    >
      <motion.div
        animate={{ y: [0, -2, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            display: 'block',
            filter: ghost
              ? 'drop-shadow(0 0 6px rgba(110,200,240,0.85))'
              : 'drop-shadow(0 2px 4px rgba(0,0,0,0.55)) drop-shadow(0 0 6px rgba(74,138,204,0.45))',
            opacity: ghost ? 0.88 : 1,
          }}
        >
          {/* Soft water ellipse — no pad frame */}
          <ellipse cx="32" cy="48" rx="20" ry="6" fill="rgba(40,120,160,0.35)" />

          {/* Hull (isometric diamond-ish boat) */}
          <path
            d={wide
              ? 'M32 14 L50 28 L44 46 L20 46 L14 28 Z'
              : 'M32 12 L46 28 L42 46 L22 46 L18 28 Z'}
            fill={c.hull}
          />
          {/* Hull side shade */}
          <path
            d={wide
              ? 'M32 14 L50 28 L44 46 L32 40 Z'
              : 'M32 12 L46 28 L42 46 L32 40 Z'}
            fill={c.hullDark}
            opacity="0.55"
          />
          {/* Deck */}
          <path
            d={wide
              ? 'M32 18 L44 28 L40 40 L24 40 L20 28 Z'
              : 'M32 16 L42 28 L38 40 L26 40 L22 28 Z'}
            fill={c.deck}
          />

          {/* Stern castle */}
          {(shipId === 'breakwater' || shipId === 'corsair' || shipId === 'merchant') && (
            <rect
              x={shipId === 'breakwater' ? 26 : 27}
              y="36"
              width={shipId === 'breakwater' ? 12 : 10}
              height={shipId === 'breakwater' ? 8 : 6}
              rx="1"
              fill={shipId === 'breakwater' ? c.trim : c.hullDark}
            />
          )}

          {/* Mast */}
          <rect x="31" y="8" width="2.2" height="28" rx="0.8" fill={c.mast} />

          {/* Yardarm */}
          <rect
            x={wide ? 18 : 20}
            y="14"
            width={wide ? 28 : 24}
            height="2"
            rx="1"
            fill={c.mast}
          />

          {/* Sail — clean trapezoid */}
          <path
            d={wide
              ? 'M20 16 L44 16 L40 34 L24 34 Z'
              : 'M22 16 L42 16 L38 34 L26 34 Z'}
            fill={c.sail}
          />
          <path
            d={wide
              ? 'M32 16 L44 16 L40 34 L32 34 Z'
              : 'M32 16 L42 16 L38 34 L32 34 Z'}
            fill={c.sailShade}
            opacity="0.55"
          />

          {/* Second mast for corsair / specter / breakwater */}
          {(shipId === 'corsair' || shipId === 'specter' || shipId === 'breakwater') && (
            <>
              <rect x="31" y="22" width="2" height="16" rx="0.6" fill={c.mast} transform="translate(8,4)" />
              <path d="M36 28 L48 28 L46 40 L38 40 Z" fill={c.sail} opacity="0.92" />
              <path d="M42 28 L48 28 L46 40 L42 40 Z" fill={c.sailShade} opacity="0.5" />
            </>
          )}

          {/* Merchant cargo dots */}
          {shipId === 'merchant' && (
            <>
              <rect x="26" y="34" width="4" height="4" rx="0.5" fill={c.trim} />
              <rect x="32" y="34" width="4" height="4" rx="0.5" fill={c.trim} opacity="0.85" />
            </>
          )}

          {/* Corsair gun ports */}
          {shipId === 'corsair' && (
            <>
              <circle cx="22" cy="36" r="1.4" fill="#1a1a1a" />
              <circle cx="22" cy="40" r="1.4" fill="#1a1a1a" />
              <circle cx="42" cy="36" r="1.4" fill="#1a1a1a" />
              <circle cx="42" cy="40" r="1.4" fill="#1a1a1a" />
            </>
          )}

          {/* Bow highlight */}
          <path
            d="M32 12 L36 20 L32 18 L28 20 Z"
            fill={c.trim}
            opacity="0.7"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}
