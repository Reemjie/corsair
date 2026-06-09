import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STEPS = [
  {
    id: 'stats',
    title: '⚓ Your Stats',
    content: 'HULL = your hit points. Reach 0 and you sink. GOLD = used to repair and buy upgrades at port. POWER = reduces combat damage. VISION = radius of cells revealed around you each turn.',
    position: 'bottom',
    highlight: 'topbar',
  },
  {
    id: 'storm',
    title: '⛈ The Storm',
    content: 'The storm advances from the south every turn. This counter shows how many turns before it reaches you. If it catches up — you die. Always keep an eye on it.',
    position: 'right',
    highlight: 'storm',
  },
  {
    id: 'movement',
    title: '🧭 Movement',
    content: 'You can move PORT (left), AHEAD (forward) or STARBOARD (right). You cannot go back. Every move advances the storm and earns you +5 pts.',
    position: 'top',
    highlight: 'actionbar',
  },
  {
    id: 'map',
    title: '🗺 The Map',
    content: 'A 12×12 fog-covered grid. Early zone (bottom) = calm, frequent ports. Mid zone = pirates and storms. Late zone (top) = pure chaos with legendary encounters.',
    position: 'center',
    highlight: 'map',
  },
  {
    id: 'events',
    title: '⚔️ Events',
    content: 'Every hidden cell can trigger an event: pirates, kraken, storm, treasure, port... You always get 2 choices. BOLD choices are risky but reward far more.',
    position: 'center',
    highlight: 'none',
  },
  {
    id: 'combo',
    title: '🔥 Combo System',
    content: 'Each chained danger (pirates, kraken, rocks...) increases your multiplier x1 → x2 → x3. Safe cells reduce it by 1. Fleeing or paying tribute drops it by 2. A x3 combo triples all your rewards!',
    position: 'center',
    highlight: 'none',
  },
  {
    id: 'hunter',
    title: '🐙 The Hunter',
    content: 'At turn 8, something spawns on the map and begins hunting you. Watch the HUNTER panel on the left — it shows its mode (TRACKING → STALKING → ENRAGED) and awareness %. Storms and ports reduce its awareness. When ENRAGED it moves twice per turn. Keep moving forward.',
    position: 'center',
    highlight: 'none',
  },
  {
    id: 'port',
    title: '⚓ The Port',
    content: 'Ports are your lifeline. Repair your hull (Rum Barrel +8 hull / Full Repair) and browse upgrades. Always visit before your hull gets too low.',
    position: 'center',
    highlight: 'none',
  },
  {
    id: 'upgrades',
    title: '🛠 Upgrades & Abilities',
    content: 'At port you can upgrade 3 ship components (Hull, Weapon, Nav) up to level 3. You can also equip up to 2 special abilities (Ghost Ship, Storm Rider...). They define your playstyle.',
    position: 'center',
    highlight: 'none',
  },
];

interface TutorialProps {
  onDone: () => void;
}

export default function Tutorial({ onDone }: TutorialProps) {
  const [step, setStep] = useState(0);
  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;

  const next = () => {
    if (isLast) { localStorage.setItem('corsair_tutorial_done', '1'); onDone(); }
    else setStep(s => s + 1);
  };

  const skip = () => { localStorage.setItem('corsair_tutorial_done', '1'); onDone(); };

  const getOverlayStyle = () => {
    switch (current.highlight) {
      case 'topbar':    return { top: 0, left: 0, right: 0, height: 100 };
      case 'storm':     return { top: 100, left: 0, width: 260, bottom: 60 };
      case 'actionbar': return { bottom: 0, left: 0, right: 0, height: 60 };
      default:          return null;
    }
  };

  const tooltipPos = (): React.CSSProperties => {
    switch (current.position) {
      case 'bottom': return { top: 110, left: '50%', transform: 'translateX(-50%)' };
      case 'right':  return { top: '30%', left: 270 };
      case 'top':    return { bottom: 80, left: '50%', transform: 'translateX(-50%)' };
      default:       return { top: '50%', left: '50%', marginLeft: '-290px', marginTop: '-160px' };
    }
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100, pointerEvents: 'none' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.15)', pointerEvents: 'auto' }} onClick={next} />
      {getOverlayStyle() && (
        <div style={{ position: 'absolute', ...getOverlayStyle()!, boxShadow: '0 0 0 9999px rgba(0,0,0,0.45)', border: '2px solid rgba(200,160,48,0.6)', borderRadius: 8, pointerEvents: 'none', zIndex: 101 }} />
      )}
      <AnimatePresence mode="wait">
        <motion.div key={step}
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
          style={{ position: 'absolute', ...tooltipPos(), background: 'linear-gradient(135deg, #0a1422, #060e18)', border: '1px solid rgba(200,160,48,0.5)', borderRadius: 16, padding: '32px 36px', maxWidth: 580, width: '90vw', pointerEvents: 'auto', zIndex: 102, boxShadow: '0 8px 40px rgba(0,0,0,0.8)' }}>
          <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
            {STEPS.map((_, i) => (
              <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= step ? '#c8a030' : 'rgba(255,255,255,0.1)', transition: 'background 0.3s' }} />
            ))}
          </div>
          <div style={{ fontSize: 24, color: '#c8a030', fontFamily: "'Pirata One', cursive", marginBottom: 14, letterSpacing: 1 }}>{current.title}</div>
          <div style={{ fontSize: 20, color: 'rgba(255,255,255,0.85)', fontFamily: "'Cinzel', serif", lineHeight: 1.8, marginBottom: 24 }}>{current.content}</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button onClick={skip} style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.25)', fontSize: 13, cursor: 'pointer', fontFamily: "'Cinzel', serif", letterSpacing: 1 }}>SKIP</button>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={next}
              style={{ padding: '10px 24px', borderRadius: 10, border: '1px solid rgba(200,160,48,0.5)', background: 'rgba(200,160,48,0.15)', color: '#c8a030', fontSize: 15, cursor: 'pointer', fontFamily: "'Pirata One', cursive", letterSpacing: 2 }}>
              {isLast ? '⚓ SET SAIL' : 'NEXT →'}
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
