import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { initGame, moveShip, resolveEvent, repairHull } from '../game/engine';
import type { GameState } from '../types/game';

const TUTORIAL_SEED = 100456;

type TutAction = 'ahead' | 'choice0' | 'choice1' | 'repair' | 'done';

type TutStep = {
  id: string;
  title: string;
  bubble: string;
  action: TutAction;
  actionLabel: string;
};

const STEPS: TutStep[] = [
  {
    id: 'move1',
    title: '⚓ Welcome, Captain!',
    bubble: 'You are a lone corsair fleeing a deadly storm. The storm advances from the south every turn — never stop moving. Press AHEAD to sail north.',
    action: 'ahead',
    actionLabel: '↑ AHEAD',
  },
  {
    id: 'storm',
    title: '⛈ The Storm Counter',
    bubble: 'See the STORM counter on the left? It just dropped from 18 to 17. Every move it advances. If it reaches you — you die instantly. Press AHEAD.',
    action: 'ahead',
    actionLabel: '↑ AHEAD',
  },
  {
    id: 'pre_pirate',
    title: '🗺 Something Ahead...',
    bubble: 'Your vision reveals cells around you. There are pirates on the next cell! Press AHEAD to engage — bold choices reward more.',
    action: 'ahead',
    actionLabel: '↑ AHEAD — Engage!',
  },
  {
    id: 'pirate_fight',
    title: '🏴‍☠️ Pirates Attack!',
    bubble: 'Pirates! You have two choices. FIGHT takes damage but earns gold and notoriety. PAY TRIBUTE loses gold but stays safe. For now — choose FIGHT.',
    action: 'choice0',
    actionLabel: '⚔️ FIGHT',
  },
  {
    id: 'combo',
    title: '🔥 Combo Multiplier',
    bubble: 'You fought and survived! Every danger you chain increases your score multiplier x1→x2→x3. Safe cells reduce it. Chain dangers for massive scores. Press AHEAD.',
    action: 'ahead',
    actionLabel: '↑ AHEAD',
  },
  {
    id: 'pre_port',
    title: '⚓ Port in Sight!',
    bubble: 'A port is one cell ahead! Ports let you repair your hull and buy upgrades — your lifeline. Press AHEAD to reach it.',
    action: 'ahead',
    actionLabel: '↑ AHEAD — To Port!',
  },
  {
    id: 'port_choice',
    title: '🏴 Enter the Port',
    bubble: 'You reached port! Choose DOCK to enter and access repairs and upgrades. Never sail past a port with low hull.',
    action: 'choice0',
    actionLabel: '⚓ DOCK',
  },
  {
    id: 'repair',
    title: '🔧 Repair Your Hull',
    bubble: 'At port you can repair hull and buy upgrades. Repair your hull now — press the RUM BARREL button to restore 8 HP.',
    action: 'repair',
    actionLabel: '🍺 RUM BARREL',
  },
  {
    id: 'done',
    title: '🎓 You Are Ready!',
    bubble: 'Well done, Captain! You know the basics: move forward, face dangers for combo multipliers, visit ports, and never let the storm catch you. Good luck!',
    action: 'done',
    actionLabel: '⚓ START FOR REAL',
  },
];

interface Props {
  onDone: () => void;
  onHome: () => void;
}

export default function TutorialGame({ onDone, onHome }: Props) {
  const [s, setS] = useState<GameState>(() => initGame(TUTORIAL_SEED));
  const [stepIdx, setStepIdx] = useState(0);

  const step = STEPS[Math.min(stepIdx, STEPS.length - 1)];
  const stormPct = Math.min(100, (1 - s.stormDistance / 18) * 100);
  const hullColor = s.ship.hull <= 5 ? '#ee4444' : s.ship.hull <= 10 ? '#ee8844' : '#44cc88';

  const next = () => setStepIdx(i => i + 1);

  const handleAction = () => {
    if (step.action === 'ahead') {
      setS(prev => moveShip(prev, 0, -1));
      next();
    } else if (step.action === 'choice0') {
      setS(prev => resolveEvent(prev, 0));
      next();
    } else if (step.action === 'repair') {
      setS(prev => repairHull(prev, 8, 25));
      next();
    } else if (step.action === 'done') {
      localStorage.setItem('corsair_tutorial_done', '1');
      onDone();
    }
  };

  const ICONS: Record<string, string> = {
    sea: '🌊', pirate: '⚔️', port: '🏴', treasure: '💰', storm: '⛈',
    kraken: '🐙', island: '🏝', wreck: '💀', rocks: '🪨', maelstrom: '🌀',
    cursed_treasure: '💀', ancient_kraken: '🐙',
  };

  return (
    <div style={{ height: '100vh', width: '100vw', background: '#080f18', color: '#e8e0d0', fontFamily: "'Pirata One', cursive", display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative',
      boxShadow: s.stormDistance <= 2 ? 'inset 0 0 80px rgba(220,30,30,0.6)' : s.stormDistance <= 4 ? 'inset 0 0 50px rgba(220,100,30,0.3)' : 'none' }}>

      {/* TOP BAR */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 28px', background: 'rgba(0,0,0,0.5)', borderBottom: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>
        <div style={{ fontSize: 24, color: '#c8a030', letterSpacing: 4 }}>⚓ TUTORIAL</div>
        <div style={{ display: 'flex', gap: 28 }}>
          {[
            { label: 'HULL', val: `${s.ship.hull}/${s.ship.maxHull}`, color: hullColor },
            { label: 'GOLD', val: s.ship.gold, color: '#eedd44' },
            { label: 'POWER', val: s.ship.power, color: '#ee8844' },
            { label: 'SCORE', val: s.score, color: '#c8a030' },
          ].map(st => (
            <div key={st.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', letterSpacing: 2, fontFamily: "'Cinzel', serif" }}>{st.label}</div>
              <div style={{ fontSize: 20, color: st.color, fontFamily: "'Cinzel', serif", fontWeight: 700 }}>{st.val}</div>
            </div>
          ))}
        </div>
        <button onClick={onHome} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.3)', fontSize: 12, cursor: 'pointer', borderRadius: 8, padding: '6px 14px', fontFamily: "'Cinzel', serif", letterSpacing: 2 }}>QUIT</button>
      </div>

      {/* MAIN */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

        {/* LEFT — Storm */}
        <div style={{ width: 200, padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: 10, borderRight: '1px solid rgba(255,255,255,0.05)', flexShrink: 0 }}>
          <div style={{ background: stormPct > 70 ? 'rgba(180,30,30,0.2)' : 'rgba(255,255,255,0.03)', border: `1px solid ${stormPct > 70 ? 'rgba(220,50,50,0.5)' : 'rgba(255,255,255,0.08)'}`, borderRadius: 10, padding: '12px 10px' }}>
            <div style={{ fontSize: 13, color: stormPct > 70 ? '#ee4444' : 'rgba(255,255,255,0.3)', letterSpacing: 2, marginBottom: 6 }}>⛈ STORM</div>
            <div style={{ fontSize: 32, color: stormPct > 70 ? '#ee4444' : '#e8e0d0', fontFamily: "'Cinzel', serif", fontWeight: 700 }}>{s.stormDistance}</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginBottom: 8 }}>turns until impact</div>
            <div style={{ height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 2 }}>
              <div style={{ height: '100%', width: `${stormPct}%`, background: stormPct > 70 ? '#ee4444' : '#c8a030', borderRadius: 2, transition: 'width 0.3s' }} />
            </div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: '10px' }}>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', letterSpacing: 2, marginBottom: 6 }}>COMBO</div>
            <div style={{ fontSize: 28, color: s.scoreMultiplier >= 3 ? '#ee4444' : s.scoreMultiplier >= 2 ? '#eedd44' : '#e8e0d0', fontFamily: "'Cinzel', serif", fontWeight: 700 }}>×{s.scoreMultiplier}</div>
          </div>
        </div>

        {/* MAP */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 3, width: '100%', maxWidth: 700, aspectRatio: '1' }}>
            {s.grid.map((row, y) => row.map((cell, x) => {
              const isShip = x === s.ship.x && y === s.ship.y;
              const bg = isShip ? 'rgba(200,160,48,0.3)' :
                !cell.revealed ? '#0a1520' :
                cell.type === 'sea' ? '#0d2035' :
                cell.type === 'pirate' ? '#3a1010' :
                cell.type === 'port' ? '#0a2a1a' :
                cell.type === 'treasure' ? '#2a2000' :
                cell.type === 'storm' ? '#1a0a2a' :
                cell.type === 'kraken' ? '#1a0030' :
                cell.type === 'island' ? '#0a1a08' : '#1a1a1a';
              return (
                <div key={`${x}-${y}`} style={{ aspectRatio: '1', background: bg, borderRadius: 4, border: isShip ? '2px solid #c8a030' : '1px solid rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>
                  {isShip ? '⚓' : cell.revealed && cell.type !== 'sea' ? (ICONS[cell.type] || '') : ''}
                </div>
              );
            }))}
          </div>
        </div>

        {/* RIGHT — placeholder */}
        <div style={{ width: 200, borderLeft: '1px solid rgba(255,255,255,0.05)', flexShrink: 0 }} />
      </div>

      {/* PORT UI */}
      {s.showPort && step.action === 'repair' && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 20 }}>
          <div style={{ background: 'linear-gradient(135deg,#0a1422,#060e18)', border: '1px solid rgba(200,160,48,0.4)', borderRadius: 16, padding: '32px', maxWidth: 420, width: '90%' }}>
            <div style={{ fontSize: 22, color: '#c8a030', marginBottom: 20, fontFamily: "'Pirata One', cursive", letterSpacing: 3 }}>⚓ PORT</div>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', fontFamily: "'Cinzel', serif", marginBottom: 16 }}>Hull: {s.ship.hull}/{s.ship.maxHull}</div>
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={handleAction}
              style={{ width: '100%', padding: '14px', borderRadius: 10, border: '1px solid rgba(200,160,48,0.5)', background: 'rgba(200,160,48,0.1)', color: '#c8a030', fontSize: 16, cursor: 'pointer', fontFamily: "'Pirata One', cursive", letterSpacing: 2, marginBottom: 8 }}>
              🍺 RUM BARREL — +8 hull (25g)
            </motion.button>
          </div>
        </div>
      )}

      {/* TUTORIAL BUBBLE */}
      <AnimatePresence mode="wait">
        <motion.div key={stepIdx}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
          style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg,#0a1422,#060e18)', border: '2px solid rgba(200,160,48,0.6)', borderRadius: 16, padding: '22px 28px', maxWidth: 560, width: '90%', zIndex: 30, boxShadow: '0 8px 40px rgba(0,0,0,0.9)' }}>
          {/* Progress */}
          <div style={{ display: 'flex', gap: 5, marginBottom: 14 }}>
            {STEPS.filter(st => st.id !== 'done').map((_, i) => (
              <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i < stepIdx ? '#c8a030' : i === stepIdx ? 'rgba(200,160,48,0.5)' : 'rgba(255,255,255,0.1)', transition: 'background 0.3s' }} />
            ))}
          </div>
          <div style={{ fontSize: 19, color: '#c8a030', fontFamily: "'Pirata One', cursive", marginBottom: 10, letterSpacing: 1 }}>{step.title}</div>
          <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.9)', fontFamily: "'Cinzel', serif", lineHeight: 1.75, marginBottom: 18 }}>{step.bubble}</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button onClick={onHome} style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.2)', fontSize: 12, cursor: 'pointer', fontFamily: "'Cinzel', serif", letterSpacing: 1 }}>QUIT TUTORIAL</button>
            {step.action !== 'repair' && (
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleAction}
                style={{ padding: '11px 28px', borderRadius: 10, border: '1px solid rgba(200,160,48,0.6)', background: 'rgba(200,160,48,0.15)', color: '#c8a030', fontSize: 15, cursor: 'pointer', fontFamily: "'Pirata One', cursive", letterSpacing: 2 }}>
                {step.actionLabel}
              </motion.button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
