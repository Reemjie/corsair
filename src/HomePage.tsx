import { getDailySeed, hasDailyBeenPlayed, getDailyKey } from './game/engine';
import { getDailyLeaderboard, issueSeed, hasPlayedDailyOnServer, getStarktemberBoard, type StarktemberRow } from './supabase';
import { loadActiveRun, type ActiveRun } from './game/crashRecovery';
import { useEffect } from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWallet } from './useWallet';
import { cartridgeConnector } from './cartridge';
import HowToPlay from './HowToPlay';
import FeatsPanel from './FeatsPanel';
import NFTPanel from './NFTPanel';
import ShipsPanel from './ShipsPanel';
import { Icon } from './Icon';
import Leaderboard from './Leaderboard';

const SLIDES = [
  { bg: 'scenes/storm.jpg',   label: 'THE STORM NEVER STOPS' },
  { bg: 'scenes/kraken.jpg',  label: 'SOMETHING ANCIENT AWAITS' },
  { bg: 'scenes/island.jpg',  label: 'UNCHARTED WATERS' },
  { bg: 'scenes/treasure.jpg',label: 'RICHES BEYOND MEASURE' },
  { bg: 'scenes/pirate.jpg',  label: 'DANGER AT EVERY TURN' },
];



export default function HomePage({ onPlay, onResume }: { onPlay: (address: string | null, username?: string | null, seed?: number, isDaily?: boolean, seedToken?: string) => void; onResume?: (run: ActiveRun) => void }) {
  const [saved, setSaved] = useState<ActiveRun | null>(null);
  // Course Starktember : visible seulement pendant le mois concerne.
  const [board, setBoard] = useState<StarktemberRow[]>([]);
  const enSeptembre = (() => {
    const n = new Date();
    return n.getUTCFullYear() === 2026 && n.getUTCMonth() === 8;
  })();
  useEffect(() => {
    if (!enSeptembre) return;
    getStarktemberBoard().then(setBoard);
    const id = setInterval(() => getStarktemberBoard().then(setBoard), 120000);
    return () => clearInterval(id);
  }, [enSeptembre]);
  const [dailyDone, setDailyDone] = useState(() => hasDailyBeenPlayed());
  const [isMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);
  const [showHowTo, setShowHowTo] = useState(false);
  const [showFeats, setShowFeats] = useState(false);
  const [showNFTs, setShowNFTs] = useState(false);
  const [showShips, setShowShips] = useState(false);
  const [top3, setTop3] = useState<{username:string|null,wallet_address:string,score:number}[]>([]);
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    getDailyLeaderboard(today).then(data => setTop3((data as any[]).slice(0, 3)));
  }, []);

  // Compte a rebours vers minuit UTC (reset du Daily Challenge)
  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      const d = new Date(now);
      const target = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() + 1, 0, 0, 0);
      const diff = Math.max(0, target - now);
      const h = String(Math.floor(diff / 3600000)).padStart(2, '0');
      const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
      const sec = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
      setTimeLeft(`${h}:${m}:${sec}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const { address, username, connecting, connect, disconnect } = useWallet();
  // La tentative quotidienne est verifiee cote serveur : localStorage seul
  // se contournait avec une fenetre privee.
  useEffect(() => {
    if (!address) { setDailyDone(hasDailyBeenPlayed()); return; }
    hasPlayedDailyOnServer(address, getDailyKey())
      .then(done => setDailyDone(done || hasDailyBeenPlayed()));
  }, [address]);
  useEffect(() => {
    const r = loadActiveRun();
    if (r && address && r.wallet_address === address) setSaved(r); else setSaved(null);
  }, [address]);

  const [slide, setSlide] = useState(0);

  // Auto-slide
  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % SLIDES.length), 4000);
    return () => clearInterval(t);
  }, []);

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
      <div style={{ position:'absolute', top: isMobile ? 8 : 20, right: isMobile ? 8 : 24, zIndex:20 }}>
        {address ? (
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <div onClick={() => (cartridgeConnector.controller as any).openProfile()} style={{ fontFamily:"'Cinzel', serif", fontSize: isMobile ? 9 : 11, color:'rgba(200,160,48,0.8)', letterSpacing: isMobile ? 1 : 2, border:'1px solid rgba(200,160,48,0.3)', borderRadius:8, padding: isMobile ? '3px 8px' : '6px 14px', cursor:'pointer' }}>
              {username ?? `${address.slice(0,6)}...${address.slice(-4)}`}
            </div>
            <button onClick={disconnect} style={{ background:'transparent', border:'1px solid rgba(255,255,255,0.1)', color:'rgba(255,255,255,0.3)', fontSize: isMobile ? 9 : 11, cursor:'pointer', borderRadius:6, padding: isMobile ? '3px 6px' : '6px 10px', fontFamily:"'Cinzel', serif" }}>
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
      <div style={{ position:'absolute', bottom:100, left:0, right:0, textAlign:'center', fontFamily:"'Cinzel', serif", fontSize:13, letterSpacing:6, color:'rgba(255,255,255,0.6)', textShadow:'0 1px 4px rgba(0,0,0,0.8)', display: (isMobile || enSeptembre) ? 'none' : 'block' }}>
        {SLIDES[slide].label}
      </div>

      {/* Content */}
      <div style={{ position:'relative', zIndex:10, height:'100%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent: isMobile ? 'flex-start' : 'center', gap: isMobile ? 12 : 24, overflowY: isMobile ? 'auto' : 'visible', paddingTop: isMobile ? 44 : 0, paddingBottom: isMobile ? 32 : 0 }}>
<motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3 }}
          style={{ fontSize: isMobile ? 58 : 72, letterSpacing: isMobile ? 10 : 16, marginTop: isMobile ? 32 : 0, color:'#c8a030', textShadow:'0 0 40px rgba(200,160,48,0.6), 0 2px 8px rgba(0,0,0,0.9)' }}>
          CORSAIR
        </motion.div>

        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.6 }}
          style={{ fontFamily:"'Cinzel', serif", fontSize: isMobile ? 10 : 13, letterSpacing: isMobile ? 3 : 6, color:'rgba(255,255,255,0.7)', marginTop: isMobile ? -6 : -16, textShadow:'0 1px 4px rgba(0,0,0,0.9)', textAlign:'center', width:'100%' }}>
          A ROGUELITE OF NAVIGATION & SURVIVAL
        </motion.div>

        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.9 }}
          style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:12, marginTop:16 }}>

          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:10 }}>
          <div style={{ display:'flex', gap:16, width: isMobile ? '88%' : 'auto' }}>
            <motion.button whileHover={{ scale:1.05, boxShadow:'0 0 30px rgba(200,160,48,0.4)' }} whileTap={{ scale:0.97 }}
              onClick={async () => { if (!address) { connect(); return; } const issued = await issueSeed(address); onPlay(address, username, issued?.seed, false, issued?.seed_token); }}
              style={{ padding: isMobile ? '20px 0' : '16px 48px', width: isMobile ? '100%' : 'auto', borderRadius:12, border:'2px solid rgba(200,160,48,0.9)', background: isMobile ? 'rgba(200,160,48,0.38)' : 'rgba(200,160,48,0.25)', color: isMobile ? '#e8c250' : '#c8a030', fontSize: isMobile ? 28 : 22, letterSpacing:4, cursor:'pointer', fontFamily:"'Pirata One', cursive" }}>
              PLAY
            </motion.button>


            <motion.button whileHover={{ scale:1.05 }} whileTap={{ scale:0.97 }}
              onClick={() => setShowLeaderboard(true)}
              style={{ display: isMobile ? 'none' : 'block', padding:'16px 32px', borderRadius:12, border:'1px solid rgba(200,160,48,0.7)', background:'rgba(200,160,48,0.18)', color:'rgba(200,160,48,0.95)', fontSize:16, letterSpacing:3, cursor:'pointer', fontFamily:"'Pirata One', cursive" }}>
              LEADERBOARD
            </motion.button>
          </div>
          <div style={{ padding: isMobile ? '12px 14px' : '16px 20px', borderRadius:16, border:'2px solid rgba(200,160,48,0.5)', background:'linear-gradient(135deg, rgba(30,20,5,0.9), rgba(10,15,25,0.9))', maxWidth:380, width:'100%', boxShadow:'0 0 24px rgba(200,160,48,0.15)' }}>
            <div style={{ display:'flex', alignItems:'center', gap:14 }}>
              <div style={{ flex:1, textAlign:'left' }}>
                <div style={{ fontSize:15, color:'#c8a030', letterSpacing:2, fontFamily:"'Pirata One', cursive", display:'flex', alignItems:'center', gap:7 }}><Icon name="sun" size={19}/>DAILY CHALLENGE</div>
                <div style={{ display: isMobile ? 'none' : 'block', fontSize:12, color:'rgba(255,255,255,0.65)', fontFamily:"'IM Fell English', cursive", marginTop:2, lineHeight:1.4 }}>One run a day · same map for all · climb the board</div>
              </div>
            </div>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:12, gap:10 }}>
              <div style={{ fontSize:12, color:'rgba(136,221,255,0.8)', fontFamily:"'Cinzel', serif", letterSpacing:1 }}>
                ⏳ Resets in <span style={{ color:'#88ddff', fontWeight:700 }}>{timeLeft}</span> <span style={{ opacity:0.5 }}>UTC</span>
              </div>
              {dailyDone
                ? <div style={{ fontSize:11, color:'rgba(136,221,255,0.55)', fontFamily:"'Cinzel', serif", textAlign:'right' }}>Already played ·<br/>back at 00:00 UTC</div>
                : <motion.button whileHover={{ scale:1.04, boxShadow:'0 0 20px rgba(200,160,48,0.4)' }} whileTap={{ scale:0.96 }}
                    onClick={() => { if (!address) { connect(); } else { onPlay(address, username, getDailySeed(), true); } }}
                    style={{ padding:'10px 20px', borderRadius:10, border:'2px solid rgba(200,160,48,0.8)', background:'rgba(200,160,48,0.2)', color:'#c8a030', fontSize:13, letterSpacing:2, cursor:'pointer', fontFamily:"'Pirata One', cursive", fontWeight:700, whiteSpace:'nowrap' }}>
                    PLAY · 1 TRY
                  </motion.button>
              }
            </div>
            <div style={{ display: isMobile ? 'none' : 'block', fontSize:10, color:'rgba(238,221,68,0.55)', fontFamily:"'Cinzel', serif", marginTop:10, textAlign:'center', letterSpacing:1 }}>
              <Icon name="trophy" size={17} style={{ marginRight:7 }} />Starktember is live — the Daily decides who takes the Tide
            </div>
          </div>
          </div>

          {top3.length > 0 && (
            <div style={{ padding:'10px 20px', borderRadius:12, border:'1px solid rgba(200,160,48,0.2)', background:'rgba(0,0,0,0.4)', width:'100%', maxWidth:360 }}>
              <div style={{ fontSize:11, color:'rgba(200,160,48,0.6)', fontFamily:"'Cinzel', serif", letterSpacing:3, marginBottom:8, textAlign:'center', display:'flex', alignItems:'center', justifyContent:'center', gap:6 }}><Icon name="sun" size={14}/>TODAY'S TOP</div>
              {top3.map((s, i) => (
                <div key={i} style={{ display:'flex', alignItems:'center', gap:8, marginBottom:4 }}>
                  <div style={{ fontSize:13, color: i===0?'#FFD700':i===1?'#C0C0C0':'#CD7F32', width:16, textAlign:'center' }}>{i===0 ? <Icon name="crown" size={19}/> : ['','⚔️','🏴‍☠️'][i]}</div>
                  <div style={{ flex:1, fontSize:13, color:'rgba(255,255,255,0.7)', fontFamily:"'Cinzel', serif", overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                    {s.username ?? `${s.wallet_address.slice(0,6)}...${s.wallet_address.slice(-4)}`}
                  </div>
                  <div style={{ fontSize:13, color:'#eedd44', fontFamily:"'Cinzel', serif" }}>{s.score.toLocaleString()}</div>
                </div>
              ))}
            </div>
          )}

          {enSeptembre && (
            <div style={{ padding:'12px 20px', borderRadius:12, border:'1px solid rgba(238,170,68,0.35)', background:'linear-gradient(135deg, rgba(30,18,4,0.85), rgba(8,10,18,0.85))', width:'100%', maxWidth:360 }}>
              <div style={{ fontSize:11, color:'rgba(238,170,68,0.8)', fontFamily:"'Cinzel', serif", letterSpacing:3, textAlign:'center', marginBottom:2 }}>
                STARKTEMBER
              </div>
              <div style={{ fontSize: isMobile ? 9 : 10, color:'rgba(255,255,255,0.45)', fontFamily:"'IM Fell English', cursive", textAlign:'center', marginBottom:8 }}>
                Highest total across the month · one relic, one winner
              </div>
              <div style={{ fontSize: isMobile ? 9 : 10, color:'rgba(238,170,68,0.7)', fontFamily:"'Cinzel', serif", letterSpacing:1, textAlign:'center', marginBottom:8 }}>
                ONLY THE DAILY CHALLENGE COUNTS
              </div>
              {board.length === 0
                ? <div style={{ fontSize:11, color:'rgba(255,255,255,0.35)', fontFamily:"'Cinzel', serif", textAlign:'center', padding:'6px 0' }}>No captain has sailed yet.</div>
                : board.slice(0, 5).map((r, i) => (
                    <div key={r.wallet_address} style={{ display:'flex', alignItems:'center', gap:8, marginBottom:4 }}>
                      <div style={{ fontSize:12, color: i===0?'#FFD700':'rgba(255,255,255,0.4)', width:16, textAlign:'center' }}>{i===0 ? <Icon name="crown" size={17}/> : i+1}</div>
                      <div style={{ flex:1, fontSize:12, color:'rgba(255,255,255,0.75)', fontFamily:"'Cinzel', serif", overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                        {r.username ?? `${r.wallet_address.slice(0,6)}...${r.wallet_address.slice(-4)}`}
                      </div>
                      <div style={{ fontSize:10, color:'rgba(255,255,255,0.3)', fontFamily:"'Cinzel', serif" }}>{r.days_played}d</div>
                      <div style={{ fontSize:12, color:'#eeaa44', fontFamily:"'Cinzel', serif", minWidth:52, textAlign:'right' }}>{r.total.toLocaleString()}</div>
                    </div>
                  ))}
              {(() => {
                // Etre 8e sans le savoir ne donne aucune raison de revenir.
                if (!address) return null;
                const norm = (a: string) => a.toLowerCase().replace(/^0x0*/, '');
                const moi = board.find(r => norm(r.wallet_address) === norm(address));
                if (!moi || moi.rank <= 5) return null;
                const tete = board[0];
                return (
                  <div style={{ display:'flex', alignItems:'center', gap:8, marginTop:8, paddingTop:8, borderTop:'1px solid rgba(238,170,68,0.18)' }}>
                    <div style={{ fontSize:12, color:'rgba(238,170,68,0.9)', width:16, textAlign:'center' }}>{moi.rank}</div>
                    <div style={{ flex:1, fontSize:12, color:'rgba(255,255,255,0.9)', fontFamily:"'Cinzel', serif" }}>You</div>
                    <div style={{ fontSize:10, color:'rgba(255,255,255,0.3)', fontFamily:"'Cinzel', serif" }}>{moi.days_played}d</div>
                    <div style={{ fontSize:12, color:'#eeaa44', fontFamily:"'Cinzel', serif", minWidth:52, textAlign:'right' }}>{moi.total.toLocaleString()}</div>
                    <div style={{ fontSize:10, color:'rgba(255,255,255,0.35)', fontFamily:"'Cinzel', serif", minWidth:56, textAlign:'right' }}>
                      -{(tete.total - moi.total).toLocaleString()}
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {saved && saved.actions.length > 0 && onResume && (
            <motion.button whileHover={{ scale:1.05 }} whileTap={{ scale:0.97 }}
              onClick={() => onResume(saved)}
              style={{ padding:'12px 32px', borderRadius:12, border:'1px solid rgba(68,204,136,0.6)', background:'rgba(68,204,136,0.12)', color:'#44cc88', fontSize:14, letterSpacing:3, cursor:'pointer', fontFamily:"'Pirata One', cursive" }}>
              ⚓ RESUME VOYAGE — {saved.score} pts, turn {saved.turn}
            </motion.button>
          )}
          <motion.button whileHover={{ scale:1.05 }} whileTap={{ scale:0.97 }}
            onClick={() => setShowHowTo(true)}
            style={{ padding: isMobile ? '4px 10px' : '12px 32px', borderRadius:12, border: isMobile ? 'none' : '1px solid rgba(255,255,255,0.5)', background: isMobile ? 'transparent' : 'rgba(255,255,255,0.12)', color: isMobile ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.85)', fontSize: isMobile ? 12 : 14, letterSpacing:3, cursor:'pointer', fontFamily:"'Pirata One', cursive" }}>
            HOW TO PLAY
          </motion.button>
          <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
          {isMobile && (
          <motion.button whileTap={{ scale:0.96 }} onClick={() => setShowLeaderboard(true)}
            style={{ padding:'9px 12px', borderRadius:12, border:'1px solid rgba(200,160,48,0.45)', background:'rgba(200,160,48,0.07)', color:'rgba(200,160,48,0.9)', fontSize:11, letterSpacing:1, cursor:'pointer', fontFamily:"'Pirata One', cursive", display:'flex', alignItems:'center' }}>
            <Icon name="crown" size={16} style={{ marginRight:5 }} />BOARD
          </motion.button>
          )}
          <motion.button whileHover={{ scale:1.04 }} whileTap={{ scale:0.96 }} onClick={() => setShowFeats(true)}
            style={{ padding: isMobile ? '9px 12px' : '12px 26px', borderRadius:12, border:'1px solid rgba(238,221,68,0.45)', background:'rgba(238,221,68,0.07)', color:'rgba(238,221,68,0.9)', fontSize: isMobile ? 11 : 14, letterSpacing: isMobile ? 1 : 3, cursor:'pointer', fontFamily:"'Pirata One', cursive", display:'flex', alignItems:'center' }}>
            <Icon name="fleurdelys" size={isMobile ? 16 : 22} style={{ marginRight: isMobile ? 5 : 8 }} />FEATS
          </motion.button>
          <motion.button whileHover={{ scale:1.04 }} whileTap={{ scale:0.96 }} onClick={() => setShowShips(true)}
            style={{ padding: isMobile ? '9px 12px' : '12px 26px', borderRadius:12, border:'1px solid rgba(136,221,255,0.45)', background:'rgba(136,221,255,0.07)', color:'rgba(136,221,255,0.9)', fontSize: isMobile ? 11 : 14, letterSpacing: isMobile ? 1 : 3, cursor:'pointer', fontFamily:"'Pirata One', cursive", display:'flex', alignItems:'center' }}>
            <Icon name="ship" size={isMobile ? 16 : 22} style={{ marginRight: isMobile ? 5 : 8 }} />SHIPS
          </motion.button>
          <motion.button whileHover={{ scale:1.04 }} whileTap={{ scale:0.96 }} onClick={() => setShowNFTs(true)}
            style={{ padding: isMobile ? '9px 12px' : '12px 26px', borderRadius:12, border:'1px solid rgba(170,102,238,0.45)', background:'rgba(170,102,238,0.07)', color:'rgba(200,150,255,0.9)', fontSize: isMobile ? 11 : 14, letterSpacing: isMobile ? 1 : 3, cursor:'pointer', fontFamily:"'Pirata One', cursive", display:'flex', alignItems:'center' }}>
            <Icon name="fleurdelys" size={isMobile ? 16 : 22} style={{ marginRight: isMobile ? 5 : 8 }} />NFTS
          </motion.button>
          </div>

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
        {showHowTo && <HowToPlay onClose={() => setShowHowTo(false)} onPlay={async () => {
          setShowHowTo(false);
          if (!address) { connect(); return; }
          const issued = await issueSeed(address);
          onPlay(address, username, issued?.seed, false, issued?.seed_token);
        }} />}
        {showFeats && <FeatsPanel onClose={() => setShowFeats(false)} />}
        {showShips && <ShipsPanel onClose={() => setShowShips(false)} />}
        {showNFTs && <NFTPanel onClose={() => setShowNFTs(false)} />}
        {showLeaderboard && <Leaderboard onClose={() => setShowLeaderboard(false)} />}
      </AnimatePresence>
    </div>
  );
}
