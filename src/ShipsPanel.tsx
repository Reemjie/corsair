import { motion } from 'framer-motion';
import { SHIPS, isShipUnlocked, getSelectedShip, setSelectedShip } from './game/ships';
import { useState } from 'react';

export default function ShipsPanel({ onClose }: { onClose: () => void }) {
  const [selected, setSelected] = useState<string>(getSelectedShip());

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      style={{ position:'fixed', inset:0, zIndex:300, background:'rgba(3,6,12,0.88)', display:'flex', alignItems:'center', justifyContent:'center', padding:16 }}>
      <motion.div initial={{ scale:0.94, y:12 }} animate={{ scale:1, y:0 }}
        onClick={e => e.stopPropagation()}
        style={{ width:'100%', maxWidth:560, maxHeight:'86vh', overflowY:'auto', borderRadius:18, border:'2px solid rgba(200,160,48,0.45)', background:'linear-gradient(160deg, rgba(24,18,6,0.98), rgba(8,12,20,0.98))', padding:'22px 20px calc(20px + env(safe-area-inset-bottom))' }}>

        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:6 }}>
          <div style={{ fontFamily:"'Pirata One', cursive", fontSize:28, color:'#d4a531', letterSpacing:3 }}>⛵ SHIPYARD</div>
          <button onClick={onClose} style={{ background:'none', border:'none', color:'rgba(255,255,255,0.5)', fontSize:22, cursor:'pointer' }}>✕</button>
        </div>
        <div style={{ fontFamily:"'Cinzel', serif", fontSize:12, color:'rgba(136,221,255,0.75)', letterSpacing:2, marginBottom:16 }}>
          CHOOSE YOUR VESSEL · daily tournament always uses The Wanderer
        </div>

        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          {SHIPS.map(sh => {
            const unlocked = isShipUnlocked(sh.id);
            const isSel = selected === sh.id;
            return (
              <div key={sh.id}
                onClick={() => { if (unlocked) { setSelectedShip(sh.id); setSelected(sh.id); } }}
                style={{ padding:'14px 16px', borderRadius:12, cursor: unlocked ? 'pointer' : 'default',
                  border: isSel ? '2px solid rgba(238,221,68,0.85)' : unlocked ? '1px solid rgba(200,160,48,0.4)' : '1px solid rgba(255,255,255,0.08)',
                  background: isSel ? 'rgba(238,221,68,0.12)' : unlocked ? 'rgba(200,160,48,0.06)' : 'rgba(255,255,255,0.02)',
                  opacity: unlocked ? 1 : 0.6 }}>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                  <div style={{ fontFamily:"'Pirata One', cursive", fontSize:19, color: unlocked ? '#eedd88' : 'rgba(255,255,255,0.5)', letterSpacing:1 }}>
                    {unlocked ? '' : '🔒 '}{sh.name}
                  </div>
                  {isSel && <div style={{ fontFamily:"'Cinzel', serif", fontSize:11, letterSpacing:2, color:'#eedd44' }}>★ SELECTED</div>}
                </div>
                <div style={{ fontFamily:"'IM Fell English', cursive", fontSize:13, color:'rgba(255,255,255,0.6)', fontStyle:'italic', margin:'2px 0 8px' }}>{sh.tagline}</div>
                {unlocked ? (
                  <div style={{ display:'flex', flexWrap:'wrap', gap:'4px 14px' }}>
                    {sh.perks.map(p => <span key={p} style={{ fontSize:11.5, color:'#66cc88', fontFamily:"'Cinzel', serif" }}>+ {p}</span>)}
                    {sh.drawbacks.map(d => <span key={d} style={{ fontSize:11.5, color:'#ee6655', fontFamily:"'Cinzel', serif" }}>− {d}</span>)}
                  </div>
                ) : (
                  <div style={{ fontSize:11.5, color:'rgba(238,221,68,0.7)', fontFamily:"'Cinzel', serif", letterSpacing:1 }}>{sh.unlockLabel}</div>
                )}
              </div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
