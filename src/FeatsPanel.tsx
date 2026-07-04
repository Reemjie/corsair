import { motion } from 'framer-motion';
import { FEATS, getUnlockedFeats, getEquippedTitle, setEquippedTitle } from './game/feats';
import { useState } from 'react';

export default function FeatsPanel({ onClose }: { onClose: () => void }) {
  const unlocked = new Set(getUnlockedFeats());
  const [equipped, setEquipped] = useState<string | null>(getEquippedTitle());
  const count = FEATS.filter(f => unlocked.has(f.id)).length;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      style={{ position:'fixed', inset:0, zIndex:300, background:'rgba(3,6,12,0.88)', display:'flex', alignItems:'center', justifyContent:'center', padding:16 }}>
      <motion.div initial={{ scale:0.94, y:12 }} animate={{ scale:1, y:0 }}
        onClick={e => e.stopPropagation()}
        style={{ width:'100%', maxWidth:560, maxHeight:'86vh', overflowY:'auto', borderRadius:18, border:'2px solid rgba(200,160,48,0.45)', background:'linear-gradient(160deg, rgba(24,18,6,0.98), rgba(8,12,20,0.98))', padding:'22px 20px calc(20px + env(safe-area-inset-bottom))' }}>

        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:6 }}>
          <div style={{ fontFamily:"'Pirata One', cursive", fontSize:28, color:'#d4a531', letterSpacing:3 }}>⚜ FEATS</div>
          <button onClick={onClose} style={{ background:'none', border:'none', color:'rgba(255,255,255,0.5)', fontSize:22, cursor:'pointer' }}>✕</button>
        </div>
        <div style={{ fontFamily:"'Cinzel', serif", fontSize:12, color:'rgba(136,221,255,0.75)', letterSpacing:2, marginBottom:16 }}>
          {count} / {FEATS.length} UNLOCKED · each feat grants a captain title
        </div>

        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          {FEATS.map(f => {
            const isUn = unlocked.has(f.id);
            const isEq = equipped === f.title;
            return (
              <div key={f.id} style={{ display:'flex', alignItems:'center', gap:14, padding:'12px 14px', borderRadius:12, border: isUn ? '1px solid rgba(200,160,48,0.5)' : '1px solid rgba(255,255,255,0.08)', background: isUn ? 'rgba(200,160,48,0.08)' : 'rgba(255,255,255,0.02)', opacity: isUn ? 1 : 0.55 }}>
                <div style={{ fontSize:26, width:34, textAlign:'center', filter: isUn ? 'none' : 'grayscale(1)' }}>{isUn ? f.icon : '🔒'}</div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontFamily:"'Pirata One', cursive", fontSize:17, color: isUn ? '#eedd88' : 'rgba(255,255,255,0.55)', letterSpacing:1 }}>{f.name}</div>
                  <div style={{ fontFamily:"'IM Fell English', cursive", fontSize:12.5, color:'rgba(255,255,255,0.55)', lineHeight:1.35 }}>{f.desc}</div>
                  <div style={{ fontFamily:"'Cinzel', serif", fontSize:10.5, letterSpacing:1.5, marginTop:3, color: isUn ? 'rgba(238,221,68,0.8)' : 'rgba(255,255,255,0.3)' }}>
                    TITLE: {f.title}
                  </div>
                </div>
                {isUn && (
                  <button onClick={() => { const next = isEq ? null : f.title; setEquippedTitle(next); setEquipped(next); }}
                    style={{ padding:'7px 12px', borderRadius:9, cursor:'pointer', whiteSpace:'nowrap', fontFamily:"'Cinzel', serif", fontSize:10, letterSpacing:1, border: isEq ? '1px solid rgba(238,221,68,0.8)' : '1px solid rgba(200,160,48,0.4)', background: isEq ? 'rgba(238,221,68,0.15)' : 'rgba(200,160,48,0.08)', color: isEq ? '#eedd44' : 'rgba(200,160,48,0.85)' }}>
                    {isEq ? '★ WORN' : 'WEAR'}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
