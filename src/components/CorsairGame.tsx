import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { GameState, UpgradeId } from '../types/game';
import { initGame, moveShip, resolveEvent, buyUpgrade, repairHull, leavePort, skipEventFn } from '../game/engine';
import { GRID_SIZE } from '../game/mapGen';

const SCENE_BG: Record<string, string> = {
  kraken: '/scenes/kraken.jpg',
  ancient_kraken: '/scenes/kraken.jpg',
  storm: '/scenes/storm.jpg',
  island: '/scenes/island.jpg',
  treasure: '/scenes/treasure.jpg',
  cursed_treasure: '/scenes/treasure.jpg',
};

const CELL_ICONS: Record<string, string> = {
  sea:'〰', storm:'⛈', pirate:'☠', treasure:'✦',
  port:'⚓', kraken:'✺', wreck:'🚢', island:'🏝', rocks:'🪨',
};
const CELL_COLOR: Record<string, string> = {
  sea:'#1a3a4a', storm:'#2a1a4a', pirate:'#3a1010', treasure:'#2a2a00',
  port:'#0a2a2a', kraken:'#2a0a3a', wreck:'#2a1a0a', island:'#0a2a0a', rocks:'#1a1a1a',
};
const CELL_GLOW: Record<string, string> = {
  treasure:'#eedd44', port:'#44cccc', kraken:'#cc44ee', pirate:'#ee4444',
};
const UPGRADES = [
  { id:'vision',   name:"Crow's Nest",   desc:'See 2 cells ahead',          cost:60, icon:'🔭', build:'vision' },
  { id:'compass',  name:'Dark Compass',  desc:'Warns of danger',             cost:65, icon:'🧭', build:'vision' },
  { id:'detector', name:'Gold Detector', desc:'Reveals treasure/ports',      cost:55, icon:'🧲', build:'gold'   },
  { id:'power',    name:'Heavy Cannons', desc:'+4 power vs pirates',         cost:80, icon:'💥', build:'combat' },
  { id:'armor',    name:'Iron Hull',     desc:'-3 dmg, +5 max hull',         cost:90, icon:'🛡', build:'combat' },
  { id:'escape',   name:'Swift Sails',   desc:'Skip 1 danger per run',       cost:70, icon:'⛵', build:'escape' },
  { id:'ghost',    name:'Ghost Ship',     desc:'Ignore pirates, +env dmg',     cost:85, icon:'👻', build:'combat' },
  { id:'hunter',   name:'Treasure Hunter',desc:'All treasures visible, +danger',cost:75, icon:'🗺', build:'gold'   },
  { id:'rider',    name:'Storm Rider',    desc:'Storm immunity, constant dmg',  cost:95, icon:'🌪', build:'escape' },
  { id:'stormbreaker', name:'Stormbreaker', desc:'Reset storm to 5 once per run', cost:100, icon:'⛈', build:'escape' },
  { id:'greed',    name:'Cursed Greed',   desc:'Gold x2, cannot repair',        cost:60, icon:'💸', build:'gold'   },
  { id:'berserker',name:'Berserker',      desc:'Power x2, dmg received x2',     cost:60, icon:'🪓', build:'combat' },
  { id:'explorer', name:'Explorer',       desc:'Vision +3, rewards halved',     cost:60, icon:'🧭', build:'vision' },
] as const;
const BUILD_COLOR: Record<string,string> = { vision:'#6aaccc', gold:'#eedd44', combat:'#ee6644', escape:'#44cc88' };

export default function CorsairGame() {
  const [state, setState] = useState<GameState>(() => initGame());
  const [shake, setShake] = useState(false);
  const [cart, setCart] = useState<string[]>([]);

  const triggerShake = () => { setShake(true); setTimeout(() => setShake(false), 400); };
  const s = state;
  const stormPct = Math.min(100,(1-s.stormDistance/10)*100);
  const hullColor = s.ship.hull<=5?'#ee4444':s.ship.hull<=10?'#ee8844':'#44cc88';
  const canEscape = !s.escapeUsed && s.ship.upgrades.includes('escape') && s.event && s.event.choices[0].risk !== 'safe';

  const move = (dx:number, dy:number) => setState(s => moveShip(s,dx,dy));
  const resolve = (i:number) => {
    setState(s => {
      const next = resolveEvent(s, i);
      if (next.ship.hull < s.ship.hull) triggerShake();
      return next;
    });
  };
  const skip = () => setState(s => skipEventFn(s));
  const buy = (id:UpgradeId) => setState(s => buyUpgrade(s,id));
  const repair = (a:number,c:number) => setState(s => repairHull(s,a,c));
  const leave = () => { setCart([]); setState(s => leavePort(s)); };
  const restart = () => setState(initGame());

  return (
    <motion.div
      animate={shake ? { x: [0, -8, 8, -6, 6, -3, 3, 0] } : { x: 0 }}
      transition={{ duration: 0.4 }}
      style={{ height:'100vh', width:'100vw', background:'#080f18',
        boxShadow: s.stormDistance <= 2 ? 'inset 0 0 80px rgba(220,30,30,0.6)' : s.stormDistance <= 4 ? 'inset 0 0 50px rgba(220,100,30,0.3)' : 'none', color:'#e8e0d0', fontFamily:"'Pirata One', cursive", display:'flex', flexDirection:'column', overflow:'hidden' }}>

      {/* TOP BAR */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'16px 28px', background:'rgba(0,0,0,0.5)', borderBottom:'1px solid rgba(255,255,255,0.06)', flexShrink:0 }}>
        <div style={{ fontWeight:700, fontSize:29, letterSpacing:4, color:'#c8a030', fontFamily:"'Pirata One', cursive", display:'flex', alignItems:'center', gap:10 }}><img src={new URL('../assets/anchor.png', import.meta.url).href} style={{ width:32, height:32, objectFit:'contain' }}/> CORSAIR</div>
        <div style={{ display:'flex', gap:24 }}>
          {[
            {icon:'hull', label:'HULL', val:`${s.ship.hull}/${s.ship.maxHull}`, color:hullColor},
            {icon:'gold', label:'GOLD', val:s.ship.gold, color:'#eedd44'},
            {icon:'vision', label:'VISION', val:s.ship.vision, color:'#6aaccc'},
            {icon:'power', label:'POWER', val:s.ship.power, color:'#ee8844'},
            {icon:'turn', label:'TURN', val:s.turn, color:'rgba(255,255,255,0.4)'},{icon:'turn', label:'ZONE', val:s.zone, color:'#aa44ee'},
          ].map(st => (
            <div key={st.label} style={{ textAlign:'center' }}>
              <div style={{ fontSize:17, color:'rgba(255,255,255,0.7)', letterSpacing:1, fontFamily:"'Pirata One', cursive" }}>{st.label}</div>
              <div style={{ display:'flex', alignItems:'center', gap:4, fontWeight:700, color:st.color }}><img src={new URL('../assets/'+st.icon+'.png', import.meta.url).href} style={{ width:32, height:32, objectFit:'contain' }}/><span style={{ fontSize:22 }}>{st.val}</span></div>
            </div>
          ))}
        </div>
        <div style={{ fontSize:26, fontWeight:700, color:'#eedd44', display:'flex', alignItems:'center', gap:6 }}><img src={new URL('../assets/score.png', import.meta.url).href} style={{ width:32, height:32, objectFit:'contain' }}/>{s.score} pts</div>
      </div>

      {/* MAIN */}
      <div style={{ flex:1, display:'flex', overflow:'hidden' }}>

        {/* LEFT — Storm panel */}
        <div style={{ width:220, padding:'16px 12px', display:'flex', flexDirection:'column', gap:10, borderRight:'1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ background: stormPct>70?'rgba(180,30,30,0.2)':'rgba(255,255,255,0.03)', border:`1px solid ${stormPct>70?'rgba(220,50,50,0.5)':'rgba(255,255,255,0.08)'}`, borderRadius:10, padding:'12px 10px' }}>
            <div style={{ fontSize:14, color: stormPct>70?'#ee4444':'rgba(255,255,255,0.3)', letterSpacing:2, marginBottom:6 }}>⛈ STORM</div>
            <div style={{ fontSize:29, fontWeight:700, color: stormPct>70?'#ee4444':'#ee8844' }}>{s.stormDistance}</div>
            <div style={{ fontSize:20, color:'rgba(255,255,255,0.8)', fontFamily:"'Caveat', cursive", marginTop:2 }}>turns until impact</div>
            <div style={{ height:4, background:'rgba(255,255,255,0.06)', borderRadius:2, marginTop:8 }}>
              <motion.div animate={{ width:`${stormPct}%` }} transition={{ duration:0.5 }}
                style={{ height:4, borderRadius:2, background:`linear-gradient(90deg,#2a5a2a,#ee4444)` }}/>
            </div>
          </div>

          {/* Upgrades owned */}
          <div style={{ fontSize:17, color:'rgba(255,255,255,0.6)', letterSpacing:2, marginTop:8 }}>EQUIPPED</div>
          {s.ship.upgrades.length === 0
            ? <div style={{ fontSize:17, color:'rgba(255,255,255,0.5)', fontStyle:'italic' }}>None yet</div>
            : s.ship.upgrades.map(id => {
              const u = UPGRADES.find(u=>u.id===id)!;
              return <div key={id} style={{ fontSize:14, color:BUILD_COLOR[u.build], display:'flex', alignItems:'center', gap:6 }}><span>{u.icon}</span>{u.name}</div>;
            })
          }
          {s.upgradeToken && <div style={{ fontSize:14, color:'#eedd44', marginTop:4 }}>✦ Free upgrade!</div>}
        </div>

        {/* CENTER — Map */}
        <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'10px', position:'relative' }}>

          {/* Grid */}
          <div style={{ position:'relative' }}>
            {/* Fog overlay */}
            <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 50% 65%, transparent 20%, rgba(8,15,24,0.6) 45%, rgba(8,15,24,0.95) 70%)', pointerEvents:'none', zIndex:2, borderRadius:8 }}/>

            <div style={{ display:'grid', gridTemplateColumns:`repeat(5,1fr)`, gap:4 }}>
              {[-2,-1,0,1,2].flatMap(dy => [-2,-1,0,1,2].map(dx => {
                const x = s.ship.x+dx, y = s.ship.y+dy;
                const cell = (x>=0&&x<GRID_SIZE&&y>=0&&y<GRID_SIZE) ? s.grid[y][x] : {type:'sea' as const,revealed:false,visited:false,value:0};
                const absX = s.ship.x + dx;
                const absY = s.ship.y + dy;
                const isHunter = s.hunter?.active && s.hunter.x === absX && s.hunter.y === absY;
                const isShip = dx===0 && dy===0;
                const isRevealed = cell.revealed || cell.visited;
                const isStormed = (cell as any).stormed;
                const glow = isStormed ? '#cc2222' : CELL_GLOW[cell.type];
                const CELL_S = Math.floor(Math.min(window.innerWidth * 0.45, window.innerHeight * 0.65) / 5) - 4;
                return (
                  <motion.div key={`${x}-${y}`}
                    initial={isRevealed ? { opacity:0, scale:0.8 } : false}
                    animate={{ opacity:1, scale:1 }}
                    style={{
                      width:CELL_S, height:CELL_S,
                      background: isShip ? '#0a2a4a' : isStormed ? '#2a0505' : isRevealed ? CELL_COLOR[cell.type] : '#050a0f',
                      border: isShip ? '2px solid #4a8acc' : isStormed ? '1px solid #cc222244' : isRevealed ? `1px solid ${glow ? glow+'44' : 'rgba(255,255,255,0.08)'}` : '1px solid rgba(255,255,255,0.03)',
                      borderRadius:8,
                      display:'flex', alignItems:'center', justifyContent:'center',
                      fontSize: isShip ? 26 : 20,
                      boxShadow: isShip ? '0 0 20px rgba(74,138,204,0.4)' : glow && isRevealed ? `0 0 10px ${glow}44` : 'none',
                      position:'relative', cursor:'default',
                    }}>
                    {isShip && (
                      <motion.div animate={{ y:[0,-3,0] }} transition={{ repeat:Infinity, duration:2, ease:'easeInOut' }}>
                        <img src="/icons/ship.png" style={{ width: CELL_S*0.72, height: CELL_S*0.72, objectFit:'contain', filter:'drop-shadow(0 0 10px rgba(74,138,204,0.9))' }}/>
                      </motion.div>
                    )}
                    {!isHunter && !isShip && isRevealed && (
                      <img src={`/icons/${cell.type}.png`} style={{ width: CELL_S*0.72, height: CELL_S*0.72, opacity: cell.visited ? 0.35 : 1, objectFit:'contain', mixBlendMode:'screen' as const }}/>
                    )}
                    {isHunter && !isShip && (
                      <motion.div animate={{ scale:[1,1.2,1], opacity:[0.8,1,0.8] }} transition={{ repeat:Infinity, duration:1.5 }}
                        style={{ fontSize:28, filter:'drop-shadow(0 0 12px #cc44ee)' }}>🐙</motion.div>
                    )}
                    {!isHunter && !isShip && !isRevealed && (
                      <span style={{ fontSize:21, color:'rgba(255,255,255,0.06)', fontWeight:700 }}>?</span>
                    )}
                  </motion.div>
                );
              }))})
            </div>
          </div>

          {/* Combo multiplier */}
          {s.scoreMultiplier > 1 && (
            <motion.div
              initial={{ scale:0.5, opacity:0 }}
              animate={{ scale:1, opacity:1 }}
              style={{ fontSize: s.scoreMultiplier >= 3 ? 36 : 28, fontWeight:700, color: s.scoreMultiplier >= 3 ? '#ee4444' : '#eedd44', textAlign:'center', letterSpacing:4, textShadow: s.scoreMultiplier >= 3 ? '0 0 20px #ee4444' : '0 0 15px #eedd44' }}>
              🔥 x{s.scoreMultiplier} COMBO
            </motion.div>
          )}
          {/* Log */}
          <div style={{ marginTop:10, fontSize:22, color:'rgba(255,255,255,0.9)', fontFamily:"'Caveat', cursive", textAlign:'center', maxWidth:380 }}>{s.log}</div>
        </div>

        {/* RIGHT — Next zone hints + upgrades shop */}
        <div style={{ width:220, padding:'16px 12px', display:'flex', flexDirection:'column', gap:10, borderLeft:'1px solid rgba(255,255,255,0.05)', pointerEvents: s.showPort ? 'none' : 'auto', opacity: s.showPort ? 0.4 : 1 }}>
          {/* Next zone hints */}
          <div style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:10, padding:'12px 10px' }}>
            <div style={{ fontSize:17, color:'rgba(255,255,255,0.7)', letterSpacing:2, marginBottom:8 }}>NEARBY</div>
            <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
              {Array.from({length:GRID_SIZE}, (_,y) =>
                Array.from({length:GRID_SIZE}, (_,x) => {
                  const cell = s.grid[y][x];
                  if (!cell.revealed || cell.visited || cell.type === 'sea') return null;
                  const glow = CELL_GLOW[cell.type] || 'rgba(255,255,255,0.4)';
                  return (
                    <div key={`${x}-${y}`} style={{ width:52, height:52, borderRadius:8, background:`${glow}18`, border:`1px solid ${glow}44`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:21 }}>
                      <img src={`/icons/${cell.type}.png`} style={{width:38,height:38,objectFit:'contain'}}/>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Upgrades shop */}
          <div style={{ fontSize:17, color:'rgba(255,255,255,0.9)', letterSpacing:2 }}>UPGRADES</div>
          <div style={{ display:'flex', flexDirection:'column', gap:5, overflowY:'auto' }}>
            {UPGRADES.map(upg => {
              const owned = s.ship.upgrades.includes(upg.id as UpgradeId);
              const inCart = cart.includes(upg.id);
              const free = s.upgradeToken && s.showPort;
              const cost = free ? 0 : upg.cost;
              const canBuy = !owned && !inCart && s.ship.gold >= cost && s.showPort;
              const bc = BUILD_COLOR[upg.build];
              return (
                <div key={upg.id} onClick={() => { if (!s.showPort) return; if (inCart) { setCart(c => c.filter(x => x !== upg.id)); } else if (canBuy) { setCart(c => [...c, upg.id]); } }}
                  style={{ background: owned?`${bc}14`:'rgba(255,255,255,0.02)', border:`1px solid ${owned?bc+'44':canBuy?bc+'22':'rgba(255,255,255,0.04)'}`, borderRadius:7, padding:'7px 8px', cursor:canBuy?'pointer':'default', opacity:owned?1:canBuy?0.9:0.3, transition:'all 0.15s' }}>
                  <div style={{ display:'flex', justifyContent:'space-between' }}>
                    <span style={{ fontSize:17, fontWeight:600, color:owned?bc:'#ffffff' }}>{upg.icon} {upg.name}</span>
                    {owned ? <span style={{ fontSize:17, color:bc }}>✓</span>
                           : inCart ? <span style={{ fontSize:13, color:'#44cc88' }}>✓ CART</span>
                           : <span style={{ fontSize:17, color:'#eedd44' }}>{free&&s.showPort?'FREE':upg.cost+'g'}</span>}
                  </div>
                  <div style={{ fontSize:18, color:'rgba(255,255,255,0.85)', fontFamily:"'Caveat', cursive", marginTop:2 }}>{upg.desc}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* EVENT SCENE — plein écran */}
      <AnimatePresence>
        {s.event && !s.gameOver && !s.showPort && s.event.cellType && SCENE_BG[s.event.cellType] && (
          <motion.div
            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            transition={{ duration:0.3 }}
            style={{ position:'fixed', inset:0, zIndex:20, backgroundImage:`url(${SCENE_BG[s.event.cellType]})`, backgroundSize:'cover', backgroundPosition:'center', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'flex-end', padding:'40px' }}>
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(0,0,0,0.92) 40%, rgba(0,0,0,0.3) 100%)' }}/>
            {/* HUD sur la scène */}
            <div style={{ position:'fixed', top:0, left:0, right:0, zIndex:30, display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 24px', background:'rgba(0,0,0,0.6)', backdropFilter:'blur(8px)', borderBottom:'1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontWeight:700, fontSize:20, letterSpacing:4, color:'#c8a030', fontFamily:"'Pirata One', cursive" }}>⚓ CORSAIR</div>
              <div style={{ display:'flex', gap:20 }}>
                {[
                  {label:'HULL', val:`${s.ship.hull}/${s.ship.maxHull}`, color:s.ship.hull<=5?'#ee4444':s.ship.hull<=10?'#ee8844':'#44cc88'},
                  {label:'GOLD', val:s.ship.gold, color:'#eedd44'},
                  {label:'POWER', val:s.ship.power, color:'#ee8844'},
                  {label:'STORM', val:s.stormDistance, color:s.stormDistance<=3?'#ee4444':'#ee8844'},
                ].map(st => (
                  <div key={st.label} style={{ textAlign:'center' }}>
                    <div style={{ fontSize:10, color:'rgba(255,255,255,0.4)', letterSpacing:1 }}>{st.label}</div>
                    <div style={{ fontSize:16, fontWeight:700, color:st.color }}>{st.val}</div>
                  </div>
                ))}
              </div>
              <div style={{ fontSize:18, fontWeight:700, color:'#eedd44' }}>{s.score} pts</div>
            </div>
            <div style={{ position:'relative', zIndex:1, maxWidth:700, width:'100%', textAlign:'center' }}>
              <div style={{ fontSize:48, marginBottom:12 }}>{CELL_ICONS[s.event.cellType]}</div>
              <div style={{ fontSize:28, fontWeight:700, color:'#e8e0d0', marginBottom:20, fontFamily:"'Pirata One', cursive", letterSpacing:2 }}>
                {s.event.cellType === 'kraken' || s.event.cellType === 'ancient_kraken' ? '🐙 The Kraken Rises' : s.event.cellType}
              </div>
              <div style={{ display:'flex', gap:16, justifyContent:'center' }}>
                {s.event.choices.map((ch, i) => {
                  const rc = ch.risk==='safe'?'#44cc88':ch.risk==='risky'?'#eedd44':'#ee6644';
                  return (
                    <motion.button key={i} whileHover={{ scale:1.04 }} whileTap={{ scale:0.96 }}
                      onClick={() => resolve(i)}
                      style={{ flex:1, maxWidth:280, padding:'20px 24px', borderRadius:14, border:`2px solid ${rc}66`, background:`rgba(0,0,0,0.7)`, cursor:'pointer', color:'#e8e0d0', fontFamily:"'Pirata One', cursive", textAlign:'left' }}>
                      <div style={{ fontSize:28, marginBottom:8 }}>{ch.icon}</div>
                      <div style={{ fontSize:18, fontWeight:700, color:rc }}>{ch.label}</div>
                      <div style={{ fontSize:18, color:'rgba(255,255,255,0.7)', fontFamily:"'Caveat', cursive", marginTop:6 }}>{ch.desc}</div>
                      <div style={{ fontSize:11, color:rc, marginTop:8, letterSpacing:2 }}>{ch.risk.toUpperCase()}</div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* EVENT PANEL — fallback sans scène */}
      <AnimatePresence>
        {s.event && !s.gameOver && !s.showPort && s.event.cellType && !SCENE_BG[s.event.cellType] && (
          <motion.div initial={{ y:100, opacity:0 }} animate={{ y:0, opacity:1 }} exit={{ y:100, opacity:0 }}
            style={{ background:'rgba(5,10,18,0.97)', borderTop:'1px solid rgba(255,255,255,0.1)', padding:'16px 24px', flexShrink:0 }}>
            <div style={{ display:'flex', alignItems:'flex-start', gap:20, maxWidth:700, margin:'0 auto' }}>
              <div style={{ fontSize:55, flexShrink:0 }}>{CELL_ICONS[s.event.cellType]}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:21, fontWeight:700, marginBottom:4, color:'#e8e0d0' }}>
                  {s.event.cellType.charAt(0).toUpperCase()+s.event.cellType.slice(1).replace('_',' ')}
                </div>
                <div style={{ display:'flex', gap:10, marginTop:8 }}>
                  {s.event.choices.map((ch, i) => {
                    const rc = ch.risk==='safe'?'#44cc88':ch.risk==='risky'?'#eedd44':'#ee6644';
                    return (
                      <motion.button key={i} whileHover={{ scale:1.02 }} whileTap={{ scale:0.98 }}
                        onClick={() => resolve(i)}
                        style={{ flex:1, padding:'12px 16px', borderRadius:10, border:`1.5px solid ${rc}44`, background:`${rc}10`, cursor:'pointer', color:'#e8e0d0', fontFamily:"'Pirata One', cursive", textAlign:'left' }}>
                        <div style={{ fontSize:26, marginBottom:4 }}>{ch.icon}</div>
                        <div style={{ fontSize:18, fontWeight:600, color:rc }}>{ch.label}</div>
                        <div style={{ fontSize:20, color:'rgba(255,255,255,0.8)', fontFamily:"'Caveat', cursive", marginTop:2 }}>{ch.desc}</div>
                        <div style={{ fontSize:16, color:rc, marginTop:4, letterSpacing:1 }}>{ch.risk.toUpperCase()}</div>
                      </motion.button>
                    );
                  })}
                </div>
                {canEscape && (
                  <button onClick={skip} style={{ marginTop:8, padding:'6px 16px', borderRadius:7, border:'1px solid rgba(100,170,220,0.3)', background:'transparent', color:'rgba(100,170,220,0.5)', cursor:'pointer', fontSize:14 }}>
                    ⛵ Use Swift Sails (1 use left)
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PORT PANEL */}
      <AnimatePresence>
        {s.showPort && !s.gameOver && (
          <motion.div initial={{ y:100,opacity:0 }} animate={{ y:0,opacity:1 }} exit={{ y:100,opacity:0 }}
            style={{ background:'rgba(5,10,18,0.97)', borderTop:'1px solid rgba(68,204,136,0.2)', padding:'16px 24px', flexShrink:0 }}>
            <div style={{ maxWidth:700, margin:'0 auto' }}>
              <div style={{ fontSize:18, fontWeight:700, color:'#44cc88', marginBottom:12, letterSpacing:2 }}>⚓ PORT OF CALL</div>
              {/* Upgrades dans le port */}
              <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:12 }}>
                {UPGRADES.filter(upg => s.portUpgrades.includes(upg.id) || s.ship.upgrades.includes(upg.id as UpgradeId)).map(upg => {
                  const owned = s.ship.upgrades.includes(upg.id as UpgradeId);
                  const inCart = cart.includes(upg.id);
                  const free = s.upgradeToken;
                  const cost = free ? 0 : upg.cost;
                  const canAdd = !owned && !inCart && s.ship.gold >= cost;
                  const bc = BUILD_COLOR[upg.build];
                  return (
                    <div key={upg.id} onClick={() => { if (inCart) { setCart(c => c.filter(x => x !== upg.id)); } else if (canAdd) { setCart(c => [...c, upg.id]); } }}
                      style={{ padding:'14px 18px', borderRadius:10, border:`1px solid ${owned?bc+'66':inCart?'#44cc8866':canAdd?bc+'33':'rgba(255,255,255,0.05)'}`, background:owned?`${bc}18`:inCart?'rgba(68,204,136,0.15)':canAdd?'rgba(255,255,255,0.04)':'rgba(255,255,255,0.01)', cursor:canAdd||inCart?'pointer':'default', opacity:owned||canAdd||inCart?1:0.35, display:'flex', alignItems:'center', gap:12 }}>
                      <span style={{ fontSize:26 }}>{upg.icon}</span>
                      <div>
                        <div style={{ fontSize:17, fontWeight:700, color:owned?bc:inCart?'#44cc88':'#e8e0d0', fontFamily:"'Pirata One', cursive" }}>{upg.name}</div>
                        <div style={{ fontSize:15, color:'rgba(255,255,255,0.6)', fontFamily:"'Caveat', cursive" }}>{upg.desc}</div>
                      </div>
                      <span style={{ marginLeft:'auto', fontSize:16, color:owned?bc:inCart?'#44cc88':'#eedd44', fontWeight:700 }}>{owned?'✓':inCart?'CART':free?'FREE':upg.cost+'g'}</span>
                    </div>
                  );
                })}
              </div>
              <div style={{ display:'flex', gap:10 }}>
                {[{label:'Rum Barrel',desc:'+8 hull',cost:25,fn:()=>repair(8,25)},{label:'Full Repair',desc:'Restore all',cost:55,fn:()=>repair(s.ship.maxHull,55)}].map(item=>{
                  const ok=s.ship.gold>=item.cost;
                  return <motion.button key={item.label} whileHover={{scale:1.02}} onClick={item.fn} disabled={!ok}
                    style={{ flex:1, padding:'12px', borderRadius:10, border:`1px solid ${ok?'rgba(68,204,136,0.3)':'rgba(255,255,255,0.05)'}`, background:ok?'rgba(68,204,136,0.08)':'rgba(255,255,255,0.02)', cursor:ok?'pointer':'not-allowed', color:ok?'#e8e0d0':'rgba(255,255,255,0.2)', fontFamily:"'Pirata One', cursive", textAlign:'left' as const }}>
                    <div style={{fontWeight:600}}>{item.label}</div>
                    <div style={{fontSize:14,opacity:0.5,marginTop:2}}>{item.desc}</div>
                    <div style={{fontSize:16,color:'#eedd44',marginTop:6}}>✦ {item.cost}g</div>
                  </motion.button>;
                })}
                {cart.length > 0 && (
                  <motion.button whileHover={{scale:1.02}} onClick={() => { cart.forEach(id => buy(id as any)); setCart([]); }}
                    style={{ flex:1, padding:'12px', borderRadius:10, border:'1px solid rgba(68,204,136,0.4)', background:'rgba(10,60,30,0.6)', cursor:'pointer', color:'#44cc88', fontFamily:"'Pirata One', cursive", fontWeight:700, fontSize:18 }}>
                    ✓ Confirm ({cart.length})
                  </motion.button>
                )}
                <motion.button whileHover={{scale:1.02}} onClick={leave}
                  style={{ flex:1, padding:'12px', borderRadius:10, border:'1px solid rgba(100,170,220,0.3)', background:'rgba(20,50,80,0.4)', cursor:'pointer', color:'rgba(100,170,220,0.8)', fontFamily:"'Pirata One', cursive", fontWeight:700, fontSize:18 }}>
                  ⛵ Set Sail
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ACTION BAR */}
      {!s.gameOver && !s.event && !s.showPort && (
        <div style={{ display:'flex', justifyContent:'center', gap:12, padding:'12px 20px', background:'rgba(0,0,0,0.4)', borderTop:'1px solid rgba(255,255,255,0.05)', flexShrink:0 }}>
          {[
            {label:'← PORT',  dx:-1,dy:0},
            {label:'↑ AHEAD', dx:0, dy:-1},
            {label:'STARBOARD →', dx:1, dy:0},
          ].map(btn => (
            <motion.button key={btn.label} whileHover={{scale:1.05, background:'rgba(255,255,255,0.1)'}} whileTap={{scale:0.95}}
              onClick={()=>move(btn.dx,btn.dy)}
              style={{ padding:'12px 28px', borderRadius:10, border:'1px solid rgba(255,255,255,0.12)', background:'rgba(255,255,255,0.05)', cursor:'pointer', color:'#e8e0d0', fontFamily:"'Pirata One', cursive", fontSize:17, fontWeight:600, letterSpacing:1 }}>
              {btn.label}
            </motion.button>
          ))}
        </div>
      )}

      {/* GAME OVER */}
      <AnimatePresence>
        {s.gameOver && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}}
            style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.85)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:16, zIndex:10 }}>
            <motion.div initial={{scale:0}} animate={{scale:1}} transition={{type:'spring'}}>
              <div style={{ fontSize:83 }}>☠</div>
            </motion.div>
            <div style={{ fontSize:42, fontWeight:700, color:'#ee4444' }}>SHIPWRECKED</div>
            <div style={{ fontSize:17, color:'rgba(255,255,255,0.3)' }}>{s.log}</div>
            <div style={{ fontSize:36, fontWeight:700, color:'#eedd44' }}>{s.score} pts</div>
            <div style={{ fontSize:17, color:'rgba(255,255,255,0.5)' }}>Seed: {s.seed} — challenge your crew!</div>
            <motion.button whileHover={{scale:1.05}} onClick={restart}
              style={{ marginTop:8, padding:'14px 36px', borderRadius:12, border:'1px solid rgba(200,160,48,0.5)', background:'rgba(80,60,10,0.4)', color:'#c8a030', cursor:'pointer', fontSize:21, fontWeight:700, letterSpacing:2 }}>
              NEW VOYAGE
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
