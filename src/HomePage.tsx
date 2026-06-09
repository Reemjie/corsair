import { getDailySeed, hasDailyBeenPlayed } from './game/engine';
import { getDailyLeaderboard } from './supabase';
import { useEffect } from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWallet } from './useWallet';
import { cartridgeConnector } from './cartridge';
import HowToPlay from './HowToPlay';
import Leaderboard from './Leaderboard';

const SLIDES = [
  { bg: 'scenes/storm.jpg',   label: 'THE STORM NEVER STOPS' },
  { bg: 'scenes/kraken.jpg',  label: 'SOMETHING ANCIENT AWAITS' },
  { bg: 'scenes/island.jpg',  label: 'UNCHARTED WATERS' },
  { bg: 'scenes/treasure.jpg',label: 'RICHES BEYOND MEASURE' },
  { bg: 'scenes/pirate.jpg',  label: 'DANGER AT EVERY TURN' },
];



export default function HomePage({ onPlay }: { onPlay: (address: string | null, username?: string | null, seed?: number) => void }) {
  const [showHowTo, setShowHowTo] = useState(false);
  const [top3, setTop3] = useState<{username:string|null,wallet_address:string,score:number}[]>([]);

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    getDailyLeaderboard(today).then(data => setTop3((data as any[]).slice(0, 3)));
  }, []);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const { address, username, connecting, connect, disconnect } = useWallet();
  const [slide, setSlide] = useState(0);

  // Auto-slide
  useState(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % SLIDES.length), 4000);
    return () => clearInterval(t);
  });

  return (
    <div style={{ height:'100vh', width:'100vw', background:'#060e18', overflow:'hidden', position:'relative', fontFamily:"'Pirata One', cursive" }}>

      {/* Background slides */}
      {SLIDES.map((sl, i) => (
        <motion.div key={i}
          animate={{ opacity: i === slide ? 1 : 0 }}
          transition={{ duration: 1.5 }}
          style={{ position:'absolute', inset:0, backgroundImage:`url(${import.meta.env.BASE_URL}${sl.bg})`, backgroundSize:'cover', backgroundPosition:'center' }}
        />
      ))}
      <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, rgba(6,14,24,0.6) 0%, rgba(6,14,24,0.3) 40%, rgba(6,14,24,0.85) 100%)' }}/>

      {/* Wallet button */}
      <div style={{ position:'absolute', top:20, right:24, zIndex:20 }}>
        {address ? (
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <div onClick={() => (cartridgeConnector.controller as any).openProfile()} style={{ fontFamily:"'Cinzel', serif", fontSize:11, color:'rgba(200,160,48,0.8)', letterSpacing:2, border:'1px solid rgba(200,160,48,0.3)', borderRadius:8, padding:'6px 14px', cursor:'pointer' }}>
              {username ?? `${address.slice(0,6)}...${address.slice(-4)}`}
            </div>
            <button onClick={disconnect} style={{ background:'transparent', border:'1px solid rgba(255,255,255,0.1)', color:'rgba(255,255,255,0.3)', fontSize:11, cursor:'pointer', borderRadius:6, padding:'6px 10px', fontFamily:"'Cinzel', serif" }}>
              DISCONNECT
            </button>
          </div>
        ) : (
          <motion.button whileHover={{ scale:1.05 }} onClick={connect} disabled={connecting}
            style={{ padding:'8px 20px', borderRadius:8, border:'1px solid rgba(200,160,48,0.4)', background:'rgba(200,160,48,0.08)', color:'#c8a030', fontSize:12, letterSpacing:3, cursor:'pointer', fontFamily:"'Pirata One', cursive" }}>
            {connecting ? 'CONNECTING...' : 'CONNECT WALLET'}
          </motion.button>
        )}
      </div>

      {/* Slide label */}
      <div style={{ position:'absolute', bottom:100, left:0, right:0, textAlign:'center', fontFamily:"'Cinzel', serif", fontSize:13, letterSpacing:6, color:'rgba(255,255,255,0.6)', textShadow:'0 1px 4px rgba(0,0,0,0.8)' }}>
        {SLIDES[slide].label}
      </div>

      {/* Content */}
      <div style={{ position:'relative', zIndex:10, height:'100%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:24 }}>
<motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3 }}
          style={{ fontSize:72, letterSpacing:16, color:'#c8a030', textShadow:'0 0 40px rgba(200,160,48,0.6), 0 2px 8px rgba(0,0,0,0.9)' }}>
          CORSAIR
        </motion.div>

        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.6 }}
          style={{ fontFamily:"'Cinzel', serif", fontSize:13, letterSpacing:6, color:'rgba(255,255,255,0.7)', marginTop:-16, textShadow:'0 1px 4px rgba(0,0,0,0.9)', textAlign:'center', width:'100%' }}>
          A ROGUELITE OF NAVIGATION & SURVIVAL
        </motion.div>

        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.9 }}
          style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:12, marginTop:16 }}>

          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:10 }}>
          <div style={{ display:'flex', gap:16 }}>
            <motion.button whileHover={{ scale:1.05, boxShadow:'0 0 30px rgba(200,160,48,0.4)' }} whileTap={{ scale:0.97 }}
              onClick={() => { if (!address) { connect(); } else { onPlay(address, username); } }}
              style={{ padding:'16px 48px', borderRadius:12, border:'2px solid rgba(200,160,48,0.9)', background:'rgba(200,160,48,0.25)', color:'#c8a030', fontSize:22, letterSpacing:4, cursor:'pointer', fontFamily:"'Pirata One', cursive" }}>
              PLAY
            </motion.button>


            <motion.button whileHover={{ scale:1.05 }} whileTap={{ scale:0.97 }}
              onClick={() => setShowLeaderboard(true)}
              style={{ padding:'16px 32px', borderRadius:12, border:'1px solid rgba(200,160,48,0.7)', background:'rgba(200,160,48,0.18)', color:'rgba(200,160,48,0.95)', fontSize:16, letterSpacing:3, cursor:'pointer', fontFamily:"'Pirata One', cursive" }}>
              LEADERBOARD
            </motion.button>
          </div>
          {hasDailyBeenPlayed()
            ? <div style={{ padding:'12px 32px', borderRadius:12, border:'1px solid rgba(100,200,255,0.35)', background:'rgba(0,20,40,0.5)', color:'rgba(136,221,255,0.55)', fontSize:13, letterSpacing:2, fontFamily:"'Cinzel', serif", textAlign:'center' }}>
                <div>☀ DAILY CHALLENGE — {new Date().toLocaleDateString('en-US',{month:'short',day:'numeric'})}</div>
                <div style={{ fontSize:11, marginTop:4, opacity:0.7 }}>Already attempted. Come back tomorrow.</div>
              </div>
            : <motion.button whileHover={{ scale:1.02, boxShadow:'0 0 20px rgba(100,200,255,0.3)' }} whileTap={{ scale:0.97 }}
                onClick={() => { if (!address) { connect(); } else { onPlay(address, username, getDailySeed()); } }}
                style={{ padding:'12px 32px', borderRadius:12, border:'2px solid rgba(100,200,255,0.7)', background:'rgba(100,200,255,0.15)', color:'#88ddff', fontSize:14, letterSpacing:2, cursor:'pointer', fontFamily:"'Pirata One', cursive", fontWeight:700 }}>
                ☀ DAILY CHALLENGE — {new Date().toLocaleDateString('en-US',{month:'short',day:'numeric'})}
              </motion.button>
          }
          </div>

          {top3.length > 0 && (
            <div style={{ padding:'10px 20px', borderRadius:12, border:'1px solid rgba(200,160,48,0.2)', background:'rgba(0,0,0,0.4)', width:'100%', maxWidth:360 }}>
              <div style={{ fontSize:11, color:'rgba(200,160,48,0.6)', fontFamily:"'Cinzel', serif", letterSpacing:3, marginBottom:8, textAlign:'center' }}>☀ TODAY'S TOP</div>
              {top3.map((s, i) => (
                <div key={i} style={{ display:'flex', alignItems:'center', gap:8, marginBottom:4 }}>
                  <div style={{ fontSize:13, color: i===0?'#FFD700':i===1?'#C0C0C0':'#CD7F32', width:16, textAlign:'center' }}>{['👑','⚔️','🏴‍☠️'][i]}</div>
                  <div style={{ flex:1, fontSize:13, color:'rgba(255,255,255,0.7)', fontFamily:"'Cinzel', serif", overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                    {s.username ?? `${s.wallet_address.slice(0,6)}...${s.wallet_address.slice(-4)}`}
                  </div>
                  <div style={{ fontSize:13, color:'#eedd44', fontFamily:"'Cinzel', serif" }}>{s.score.toLocaleString()}</div>
                </div>
              ))}
            </div>
          )}

          <motion.button whileHover={{ scale:1.05 }} whileTap={{ scale:0.97 }}
            onClick={() => setShowHowTo(true)}
            style={{ padding:'12px 32px', borderRadius:12, border:'1px solid rgba(255,255,255,0.5)', background:'rgba(255,255,255,0.12)', color:'rgba(255,255,255,0.85)', fontSize:14, letterSpacing:3, cursor:'pointer', fontFamily:"'Pirata One', cursive" }}>
            HOW TO PLAY
          </motion.button>

        </motion.div>

        {/* Dots */}
        <div style={{ display:'flex', gap:8, marginTop:8 }}>
          {SLIDES.map((_,i) => (
            <div key={i} onClick={() => setSlide(i)} style={{ width:6, height:6, borderRadius:'50%', background: i===slide ? 'rgba(200,160,48,0.8)' : 'rgba(255,255,255,0.15)', cursor:'pointer', transition:'background 0.3s' }}/>
          ))}
        </div>
      </div>

      {/* How To Play modal */}
      <AnimatePresence>
        {showHowTo && <HowToPlay onClose={() => setShowHowTo(false)} onPlay={() => { setShowHowTo(false); onPlay(null); }} />}
        {showLeaderboard && <Leaderboard onClose={() => setShowLeaderboard(false)} />}
      </AnimatePresence>
    </div>
  );
}
