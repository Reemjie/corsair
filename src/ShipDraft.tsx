import { motion } from 'framer-motion';
import type { ShipDef } from './game/ships';
import { Icon } from './Icon';

export default function ShipDraft({
  offers,
  onPick,
}: {
  offers: ShipDef[];
  onPick: (shipId: string) => void;
}) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      style={{ position: 'fixed', inset: 0, zIndex: 280, background: 'rgba(3,6,12,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <motion.div initial={{ scale: 0.94, y: 12 }} animate={{ scale: 1, y: 0 }}
        style={{ width: '100%', maxWidth: 520, borderRadius: 16, border: '2px solid rgba(200,160,48,0.45)', background: 'linear-gradient(160deg, rgba(24,18,6,0.98), rgba(8,12,20,0.98))', padding: '22px 18px' }}>
        <div style={{ fontFamily: "'Pirata One', cursive", fontSize: 26, color: '#d4a531', letterSpacing: 2, textAlign: 'center', marginBottom: 4 }}>
          <Icon name="ship" size={26} style={{ marginRight: 8 }} />CHOOSE YOUR VESSEL
        </div>
        <div style={{ fontFamily: "'Cinzel', serif", fontSize: 11, color: 'rgba(255,255,255,0.45)', letterSpacing: 2, textAlign: 'center', marginBottom: 16 }}>
          THREE DRAWN · PICK ONE FOR THIS VOYAGE
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {offers.map(sh => (
            <motion.button key={sh.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={() => onPick(sh.id)}
              style={{ textAlign: 'left', padding: '14px 16px', borderRadius: 12, cursor: 'pointer', border: '1px solid rgba(200,160,48,0.4)', background: 'rgba(200,160,48,0.07)', color: 'inherit' }}>
              <div style={{ fontFamily: "'Pirata One', cursive", fontSize: 18, color: '#eedd88', letterSpacing: 1 }}>{sh.name}</div>
              <div style={{ fontFamily: "'IM Fell English', cursive", fontSize: 13, color: 'rgba(255,255,255,0.55)', fontStyle: 'italic', margin: '2px 0 8px' }}>{sh.tagline}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 12px' }}>
                {sh.perks.map(p => <span key={p} style={{ fontSize: 11, color: '#66cc88', fontFamily: "'Cinzel', serif" }}>+ {p}</span>)}
                {sh.drawbacks.map(d => <span key={d} style={{ fontSize: 11, color: '#ee6655', fontFamily: "'Cinzel', serif" }}>− {d}</span>)}
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
