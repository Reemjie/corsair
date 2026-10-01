import { motion } from 'framer-motion';

export type SharePayload = {
  score: number;
  turn: number;
  gold: number;
  runTitle: string;
  seed: number;
  deathName: string;
  isDaily: boolean;
  text: string;
};

/** Carte visuelle de fin de run — pret pour capture / partage natif. */
export default function ShareCard({
  payload,
  isMobile,
  onShare,
}: {
  payload: SharePayload;
  isMobile: boolean;
  onShare: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        width: '100%',
        maxWidth: isMobile ? '92vw' : 420,
        borderRadius: 16,
        border: '1px solid rgba(200,160,48,0.45)',
        background: 'linear-gradient(160deg, rgba(28,18,6,0.95), rgba(6,10,18,0.96))',
        boxShadow: '0 0 28px rgba(200,160,48,0.12)',
        overflow: 'hidden',
        marginBottom: 10,
      }}>
      <div style={{
        padding: isMobile ? '14px 16px 10px' : '18px 20px 12px',
        backgroundImage: `linear-gradient(to bottom, rgba(6,10,18,0.35), rgba(6,10,18,0.92)), url(${import.meta.env.BASE_URL}scenes/storm.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <div style={{ fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: 3, color: 'rgba(200,160,48,0.85)' }}>
          {payload.isDaily ? 'DAILY CHALLENGE' : 'VOYAGE LOG'}
        </div>
        <div style={{ fontFamily: "'Pirata One', cursive", fontSize: isMobile ? 26 : 32, color: '#e8d8a8', letterSpacing: 2, marginTop: 4 }}>
          {payload.runTitle}
        </div>
        <div style={{ fontFamily: "'IM Fell English', cursive", fontSize: 14, color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>
          Sunk by {payload.deathName}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, padding: '12px 16px' }}>
        {[
          { label: 'SCORE', val: payload.score.toLocaleString(), color: '#eedd44' },
          { label: 'TURNS', val: String(payload.turn), color: 'rgba(255,255,255,0.75)' },
          { label: 'GOLD', val: String(payload.gold), color: '#eedd44' },
        ].map(st => (
          <div key={st.label} style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: 2, color: 'rgba(255,255,255,0.35)' }}>{st.label}</div>
            <div style={{ fontFamily: "'Cinzel', serif", fontSize: 20, fontWeight: 700, color: st.color }}>{st.val}</div>
          </div>
        ))}
      </div>
      <div style={{ padding: '0 16px 14px', display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
        <div style={{ fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: 1, color: 'rgba(255,255,255,0.3)' }}>
          Seed {payload.seed} · playcorsair.xyz
        </div>
        <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
          onClick={onShare}
          style={{
            width: '100%', padding: '12px 18px', borderRadius: 10,
            border: '1px solid rgba(255,255,255,0.28)', background: 'rgba(0,0,0,0.45)',
            color: '#fff', cursor: 'pointer', fontSize: 16, letterSpacing: 1,
            fontFamily: "'Pirata One', cursive",
          }}>
          𝕏 SHARE THIS VOYAGE
        </motion.button>
      </div>
    </motion.div>
  );
}

export async function shareVoyage(text: string): Promise<void> {
  try {
    if (typeof navigator !== 'undefined' && navigator.share) {
      await navigator.share({ text, url: 'https://playcorsair.xyz/' });
      return;
    }
  } catch { /* user cancelled or unsupported — fall through */ }
  window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
}
