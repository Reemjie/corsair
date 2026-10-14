import { useState } from 'react';
import { motion } from 'framer-motion';
import { shipTopUrl } from '../../game/ships';

type Props = {
  shipId: string;
  size: number;
  lurchX?: number;
  lurchY?: number;
};

/** Map token — painted top-down sprite with SVG fallback. */
export default function ShipToken({ shipId, size, lurchX = 0, lurchY = 0 }: Props) {
  const ghost = shipId === 'specter';
  const [imgOk, setImgOk] = useState(true);
  const src = `${shipTopUrl(shipId)}?v=6`;

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
        style={{ position: 'relative', width: size, height: size }}
      >
        <div
          aria-hidden
          style={{
            position: 'absolute',
            left: '18%',
            right: '18%',
            bottom: '6%',
            height: '18%',
            borderRadius: '50%',
            background: ghost
              ? 'radial-gradient(ellipse, rgba(120,210,240,0.45) 0%, transparent 70%)'
              : 'radial-gradient(ellipse, rgba(30,80,110,0.55) 0%, rgba(180,220,240,0.15) 45%, transparent 72%)',
            pointerEvents: 'none',
          }}
        />
        {imgOk ? (
          <img
            src={src}
            alt=""
            width={size}
            height={size}
            onError={() => setImgOk(false)}
            style={{
              display: 'block',
              width: size,
              height: size,
              objectFit: 'contain',
              position: 'relative',
              zIndex: 1,
              filter: ghost
                ? 'drop-shadow(0 0 8px rgba(110,200,240,0.95)) drop-shadow(0 2px 4px rgba(0,0,0,0.35))'
                : 'drop-shadow(0 3px 5px rgba(0,0,0,0.7))',
              opacity: ghost ? 0.92 : 1,
            }}
          />
        ) : (
          <FallbackSvg shipId={shipId} size={size} ghost={ghost} />
        )}
      </motion.div>
    </motion.div>
  );
}

function FallbackSvg({ shipId, size, ghost }: { shipId: string; size: number; ghost: boolean }) {
  const sail =
    shipId === 'corsair' ? '#B01820'
    : shipId === 'specter' ? '#E8F8FF'
    : '#F0E6D0';
  const hull =
    shipId === 'corsair' ? '#2A1814'
    : shipId === 'specter' ? '#5A9BB8'
    : shipId === 'merchant' ? '#8B5A2B'
    : '#6B4428';
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" style={{ display: 'block', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.6))', opacity: ghost ? 0.9 : 1 }}>
      <ellipse cx="32" cy="50" rx="14" ry="4" fill="rgba(40,90,120,0.35)" />
      <path d="M32 10 L46 28 L42 50 L22 50 L18 28 Z" fill={hull} />
      <path d="M22 14 L42 14 L38 34 L26 34 Z" fill={sail} />
      <rect x="30.5" y="6" width="3" height="30" fill="#2E2014" />
    </svg>
  );
}
