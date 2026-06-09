import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getLeaderboard, getDailyLeaderboard } from './supabase';
import anchorImg from './assets/anchor.png';

type Score = {
  id: string;
  wallet_address: string;
  username: string | null;
  score: number;
  run_title: string;
  turn: number;
  zone: number;
  seed: number;
  created_at: string;
};

const RANK_COLORS = ['#FFD700', '#C0C0C0', '#CD7F32'];
const RANK_ICONS = ['👑', '⚔️', '🏴‍☠️'];

type DailyScore = {
  id: string;
  wallet_address: string;
  username: string | null;
  score: number;
  date: string;
  seed: string;
  submitted_at: string;
};

const isMobile = window.innerWidth < 768;
export default function Leaderboard({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState<'all' | 'daily'>('daily');
  const [scores, setScores] = useState<Score[]>([]);
  const [dailyScores, setDailyScores] = useState<DailyScore[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    Promise.all([
      getLeaderboard(),
      getDailyLeaderboard(today),
    ]).then(([all, daily]) => {
      setScores(all as Score[]);
      setDailyScores(daily as DailyScore[]);
      setLoading(false);
    });
  }, []);

  const formatAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  const formatDate = (date: string) => new Date(date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, fontFamily: "'Pirata One', cursive" }}
      onClick={onClose}>
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        onClick={e => e.stopPropagation()}
        style={{ background: 'linear-gradient(135deg, #0a1422 0%, #060e18 100%)', border: '1px solid rgba(200,160,48,0.3)', borderRadius: 20, padding: 36, maxWidth: 700, width: '100%', maxHeight: '85vh', overflowY: 'auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <img src={anchorImg} style={{ width: 36, height: 36, objectFit: 'contain' }}/>
            <div style={{ fontSize: 26, color: '#c8a030', letterSpacing: 6 }}>LEADERBOARD</div>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.4)', fontSize: 14, cursor: 'pointer', borderRadius: 8, padding: '6px 14px', fontFamily: "'Pirata One', cursive" }}>✕ CLOSE</button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
          {(['daily', 'all'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              style={{ flex: 1, padding: '10px 0', borderRadius: 10, border: `1px solid ${tab === t ? 'rgba(200,160,48,0.6)' : 'rgba(255,255,255,0.1)'}`, background: tab === t ? 'rgba(200,160,48,0.12)' : 'transparent', color: tab === t ? '#c8a030' : 'rgba(255,255,255,0.35)', fontSize: 13, letterSpacing: 3, cursor: 'pointer', fontFamily: "'Pirata One', cursive" }}>
              {t === 'daily' ? '☀ DAILY' : '⚓ ALL TIME'}
            </button>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: 40, color: 'rgba(255,255,255,0.3)', fontFamily: "'Cinzel', serif", letterSpacing: 4 }}>
            LOADING...
          </div>
        ) : tab === 'daily' && dailyScores.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 40, color: 'rgba(255,255,255,0.3)', fontFamily: "'Cinzel', serif", letterSpacing: 4 }}>
            NO DAILY SCORES YET TODAY
          </div>
        ) : tab === 'all' && scores.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 40, color: 'rgba(255,255,255,0.3)', fontFamily: "'Cinzel', serif", letterSpacing: 4 }}>
            NO SCORES YET — BE THE FIRST!
          </div>
        ) : tab === 'daily' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {dailyScores.map((s, i) => (
              <motion.div key={s.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 16,
                  background: i < 3 ? `rgba(200,160,48,${0.08 - i * 0.02})` : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${i < 3 ? RANK_COLORS[i] + '44' : 'rgba(255,255,255,0.06)'}`,
                  borderRadius: 12, padding: isMobile ? '10px 12px' : '14px 18px',
                }}>
                <div style={{ width: 32, textAlign: 'center', fontSize: i < 3 ? 22 : 15, color: i < 3 ? RANK_COLORS[i] : 'rgba(255,255,255,0.25)' }}>
                  {i < 3 ? RANK_ICONS[i] : `#${i + 1}`}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: isMobile ? 13 : 15, color: i < 3 ? RANK_COLORS[i] : '#e8e0d0' }}>
                    {s.username ?? formatAddress(s.wallet_address)}
                  </div>
                  <div style={{ fontSize: isMobile ? 11 : 12, color: 'rgba(255,255,255,0.4)', fontFamily: "'Cinzel', serif", marginTop: 2 }}>
                    ☀ Daily · Seed {s.seed} · {formatDate(s.submitted_at)}
                  </div>
                </div>
                <div style={{ fontSize: isMobile ? 18 : 22, fontWeight: 700, color: i < 3 ? RANK_COLORS[i] : '#eedd44', fontFamily: "'Cinzel', serif" }}>
                  {s.score.toLocaleString()}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {scores.map((s, i) => (
              <motion.div key={s.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 16,
                  background: i < 3 ? `rgba(200,160,48,${0.08 - i * 0.02})` : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${i < 3 ? RANK_COLORS[i] + '44' : 'rgba(255,255,255,0.06)'}`,
                  borderRadius: 12, padding: isMobile ? '10px 12px' : '14px 18px',
                }}>
                {/* Rank */}
                <div style={{ width: 32, textAlign: 'center', fontSize: i < 3 ? 22 : 15, color: i < 3 ? RANK_COLORS[i] : 'rgba(255,255,255,0.25)' }}>
                  {i < 3 ? RANK_ICONS[i] : `#${i + 1}`}
                </div>
                {/* Info */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ fontSize: isMobile ? 13 : 15, color: i < 3 ? RANK_COLORS[i] : '#e8e0d0' }}>
                      {s.username ?? formatAddress(s.wallet_address)}
                    </div>
                  </div>
                  <div style={{ fontSize: isMobile ? 11 : 12, color: 'rgba(255,255,255,0.4)', fontFamily: "'Cinzel', serif", marginTop: 2 }}>
                    {s.run_title || 'Corsair'} · T{s.turn} · {formatDate(s.created_at)}
                  </div>
                </div>
                {/* Score */}
                <div style={{ fontSize: isMobile ? 18 : 22, fontWeight: 700, color: i < 3 ? RANK_COLORS[i] : '#eedd44', fontFamily: "'Cinzel', serif" }}>
                  {s.score.toLocaleString()}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
