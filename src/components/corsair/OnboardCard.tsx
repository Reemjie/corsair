import { motion } from 'framer-motion';
import type { OnboardTip } from '../../game/onboard';

export default function OnboardCard({ tip, isMobile, onDismiss }: { tip: OnboardTip; isMobile: boolean; onDismiss: () => void }) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
      onClick={onDismiss}
      style={{ maxWidth: 440, margin: '0 12px 10px', padding: '10px 14px', border: '1px solid rgba(200,160,48,0.35)', borderRadius: 10, background: 'rgba(12,18,28,0.82)', color: 'rgba(255,255,255,0.85)', textAlign: 'left', cursor: 'pointer', fontFamily: "'IM Fell English', cursive" }}>
      <div style={{ fontSize: 11, letterSpacing: 2, color: '#c8a030', fontFamily: "'Cinzel', serif", marginBottom: 4 }}>{tip.title}</div>
      <div style={{ fontSize: isMobile ? 13 : 15, lineHeight: 1.35 }}>{tip.text}</div>
      <div style={{ fontSize: 10, letterSpacing: 1, color: 'rgba(255,255,255,0.35)', fontFamily: "'Cinzel', serif", marginTop: 6 }}>TAP TO DISMISS</div>
    </motion.button>
  );
}
