import { motion } from 'framer-motion';
import { FEATS, getUnlockedFeats, getEquippedTitle, setEquippedTitle } from './game/feats';
import { getCaptainStats, zoneLabel } from './game/progress';
import { useState } from 'react';
import { Icon } from './Icon';

export default function FeatsPanel({ onClose }: { onClose: () => void }) {
  const unlocked = new Set(getUnlockedFeats());
  const [equipped, setEquipped] = useState<string | null>(getEquippedTitle());
  const count = FEATS.filter(f => unlocked.has(f.id)).length;
  const stats = getCaptainStats();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      style={{ position:'fixed', inset:0, zIndex:300, background:'rgba(3,6,12,0.88)', display:'flex', alignItems:'center', justifyContent:'center', padding:16 }}>
      <motion.div initial={{ scale:0.94, y:12 }} animate={{ scale:1, y:0 }}
        onClick={e => e.stopPropagation()}
        style={{ width:'100%', maxWidth:560, maxHeight:'86vh', overflowY:'auto', borderRadius:18, border:'2px solid rgba(200,160,48,0.45)', background:'linear-gradient(160deg, rgba(24,18,6,0.98), rgba(8,12,20,0.98))', padding:'22px 20px calc(20px + env(safe-area-inset-bottom))' }}>

        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:6 }}>
          <div style={{ fontFamily:"'Pirata One', cursive", fontSize:28, color:'#d4a531', letterSpacing:3 }}><Icon name="fleurdelys" size={30} style={{ marginRight:10 }} />FEATS</div>
          <button onClick={onClose} style={{ background:'none', border:'none', color:'rgba(255,255,255,0.5)', fontSize:22, cursor:'pointer' }}>✕</button>
        </div>
        <div style={{ fontFamily:"'Cinzel', serif", fontSize:12, color:'rgba(136,221,255,0.75)', letterSpacing:2, marginBottom:6 }}>
          {count} / {FEATS.length} UNLOCKED
        </div>

        {(stats.runsPlayed > 0 || stats.bestScore > 0) && (
          <div style={{
            display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:8,
            marginBottom:12, padding:'10px 12px', borderRadius:10,
            border:'1px solid rgba(136,221,255,0.22)', background:'rgba(8,18,28,0.55)',
          }}>
            {[
              { label: 'VOYAGES', val: String(stats.runsPlayed), color: '#88ddff' },
              { label: 'BEST', val: stats.bestScore > 0 ? stats.bestScore.toLocaleString() : '—', color: '#eedd44' },
              { label: 'TURNS', val: stats.bestTurn > 0 ? String(stats.bestTurn) : '—', color: 'rgba(255,255,255,0.75)' },
              { label: 'REACH', val: stats.bestZone > 0 ? zoneLabel(stats.bestZone).replace(/^The /, '') : '—', color: stats.bestZone >= 3 ? '#ee6688' : stats.bestZone >= 2 ? '#cc88ff' : '#66bb88' },
            ].map(c => (
              <div key={c.label} style={{ textAlign:'center' }}>
                <div style={{ fontFamily:"'Cinzel', serif", fontSize:8, letterSpacing:1, color:'rgba(255,255,255,0.35)', marginBottom:2 }}>{c.label}</div>
                <div style={{ fontFamily:"'Cinzel', serif", fontSize:14, fontWeight:700, color:c.color }}>{c.val}</div>
              </div>
            ))}
          </div>
        )}

        <div style={{ fontFamily:"'IM Fell English', cursive", fontSize:13, color:'rgba(255,255,255,0.6)', marginBottom:14, lineHeight:1.45 }}>
          Wear a title to sail under it — it appears on the leaderboard, in your shared runs and on-chain. {equipped ? <span style={{ color:'#eedd44' }}>Currently: {equipped}</span> : <span style={{ opacity:0.6 }}>No title worn.</span>}
        </div>

        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          {FEATS.map(f => {
            const isUn = unlocked.has(f.id);
            const isEq = equipped === f.title;
            return (
              <div key={f.id} style={{ display:'flex', alignItems:'center', gap:14, padding:'12px 14px', borderRadius:12, border: isUn ? '1px solid rgba(200,160,48,0.5)' : '1px solid rgba(255,255,255,0.08)', background: isUn ? 'rgba(200,160,48,0.08)' : 'rgba(255,255,255,0.02)', opacity: isUn ? 1 : 0.55 }}>
                <div style={{ width:34, textAlign:'center', filter: isUn ? 'none' : 'grayscale(1)', opacity: isUn ? 1 : 0.5 }}>{isUn ? <Icon name={f.icon as any} size={28}/> : <span style={{fontSize:22}}>🔒</span>}</div>
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
