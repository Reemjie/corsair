import { motion } from 'framer-motion';
import type { GameState } from '../../types/game';
import type { OnboardTip } from '../../game/onboard';
import { ZONE_CONFIG } from '../../game/balance';
import { GRID_SIZE } from '../../game/mapGen';
import { getRelicDef } from '../../game/relics';
import { Icon } from '../../Icon';
import OnboardCard from './OnboardCard';
import { CELL_COLOR_BY_ZONE, CELL_GLOW_BY_ZONE } from './cells';

export type GameMapProps = {
  state: GameState;
  isMobile: boolean;
  slide: { x: number; y: number; instant: boolean };
  lurch: { x: number; y: number };
  onboard: OnboardTip | null;
  onDismissOnboard: () => void;
  onMove: (dx: number, dy: number) => void;
};

export default function GameMap({
  state: s,
  isMobile,
  slide,
  lurch,
  onboard,
  onDismissOnboard,
  onMove,
}: GameMapProps) {
  return (
        <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent: isMobile ? 'flex-start' : 'center', padding: isMobile ? '6px 4px calc(96px + env(safe-area-inset-bottom))' : '10px', position:'relative', overflowY: isMobile ? 'auto' : 'visible' }}>
          {/* MOBILE — boutons de direction (le clavier n'existe pas sur mobile) */}
          {isMobile && !s.event && !s.showPort && !s.gameOver && (
            <div style={{ position:'fixed', left:0, right:0, bottom:0, zIndex:60, display:'flex', gap:8, padding:'10px 12px calc(10px + env(safe-area-inset-bottom))', background:'linear-gradient(to top, rgba(5,8,15,0.96), rgba(5,8,15,0.0))' }}>
              {[
                { label:'◀ PORT', dx:-1, dy:0 },
                { label:'▲ AHEAD', dx:0, dy:-1 },
                { label:'STARBOARD ▶', dx:1, dy:0 },
              ].map(b => (
                <button key={b.label} onClick={() => onMove(b.dx, b.dy)} aria-label={`Sail ${b.label.replace(/[▲◀▶]/g, '').trim().toLowerCase()}`}
                  style={{ flex: b.dy === -1 ? 1.3 : 1, padding:'16px 8px', borderRadius:12, border:'2px solid rgba(200,160,48,0.7)', background: b.dy === -1 ? 'rgba(200,160,48,0.28)' : 'rgba(200,160,48,0.14)', color:'#e8d8a8', fontSize:15, fontFamily:"'Pirata One', cursive", letterSpacing:1, cursor:'pointer', WebkitTapHighlightColor:'transparent' }}>
                  {b.label}
                </button>
              ))}
            </div>
          )}
          {isMobile && (
            <div style={{ display:'flex', gap:12, marginBottom:6, fontSize:13, fontFamily:"'Cinzel', serif" }}>
              <span style={{ color: s.stormDistance <= 4 ? '#ee4444' : '#ee8844' }}>⛈ {s.stormDistance} turns</span>
              <span style={{ color:'#cc44ee' }}>{ZONE_CONFIG[s.currentZone??1]?.name??'The Coasts'}</span>
              <span style={{ color:'#eedd44' }}>✦ {s.score} pts</span>
            </div>
          )}

          {!isMobile && !s.event && !s.showPort && !s.gameOver && (
            <div aria-label="Sailing controls" style={{ display:'flex', alignItems:'center', gap:8, marginBottom:10 }}>
              <span style={{ fontSize:11, color:'rgba(255,255,255,0.38)', fontFamily:"'Cinzel', serif", letterSpacing:1.5 }}>SAIL</span>
              {[
                { label:'← PORT', keyHint:'A', dx:-1, dy:0 },
                { label:'↑ AHEAD', keyHint:'W', dx:0, dy:-1 },
                { label:'STARBOARD →', keyHint:'D', dx:1, dy:0 },
              ].map(b => (
                <button key={b.label} onClick={() => onMove(b.dx, b.dy)} title={`${b.label} (${b.keyHint} / arrow key)`}
                  style={{ padding:'8px 11px', borderRadius:8, border:'1px solid rgba(200,160,48,0.46)', background:b.dy === -1 ? 'rgba(200,160,48,0.2)' : 'rgba(200,160,48,0.08)', color:'#e8d8a8', fontSize:13, fontFamily:"'Pirata One', cursive", letterSpacing:1, cursor:'pointer' }}>
                  {b.label} <span style={{ marginLeft:4, color:'rgba(255,255,255,0.42)', fontFamily:"'Cinzel', serif", fontSize:10 }}>{b.keyHint}</span>
                </button>
              ))}
            </div>
          )}

          {onboard && !s.event && !s.showPort && !s.gameOver && (
            <OnboardCard tip={onboard} isMobile={isMobile} onDismiss={onDismissOnboard} />
          )}

          {/* Grid */}
          <div style={{ position:'relative' }}>
            {/* Fog overlay */}
            <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 50% 65%, transparent 20%, rgba(8,15,24,0.6) 45%, rgba(8,15,24,0.95) 70%)', pointerEvents:'none', zIndex:2, borderRadius:8 }}/>

            <div style={{
              display:'grid', gridTemplateColumns:`repeat(${s.ship.vision*2+1},1fr)`, gap:4,
              transform: `translate(${slide.x}px, ${slide.y}px)`,
              transition: slide.instant ? 'none' : 'transform 420ms cubic-bezier(0.22, 1, 0.36, 1)',
              willChange: 'transform',
            }}>
              {Array.from({length: s.ship.vision*2+1}, (_,i) => i - s.ship.vision).flatMap(dy =>
                Array.from({length: s.ship.vision*2+1}, (_,i) => i - s.ship.vision).map(dx => {
                const x = s.ship.x+dx, y = s.ship.y+dy;
                // Prediction tiles — where hunter might move next
                const hunterPredictions: Set<string> = (() => {
                  const set = new Set<string>();
                  if (!s.hunter?.active) return set;
                  const hx = s.hunter.x, hy = s.hunter.y;
                  const tx = s.ship.x, ty = s.ship.y;
                  if (s.hunter.mode === 'searching') {
                    // Random adjacent
                    [[-1,0],[1,0],[0,-1],[0,1],[-1,-1],[1,1]].forEach(([ddx,ddy]) => set.add(`${hx+ddx}-${hy+ddy}`));
                  } else {
                    // Likely next step (orthogonal priority)
                    const distX = Math.abs(tx-hx), distY = Math.abs(ty-hy);
                    if (distX >= distY) set.add(`${hx+(tx>hx?1:-1)}-${hy}`);
                    if (distY >= distX) set.add(`${hx}-${hy+(ty>hy?1:-1)}`);
                    if (distX === distY) { set.add(`${hx+(tx>hx?1:-1)}-${hy}`); set.add(`${hx}-${hy+(ty>hy?1:-1)}`); }
                  }
                  return set;
                })();
                const seesTracking = (s.relics ?? []).includes('kraken_eye');
                // Predictions visibles des qu'on voit le hunter (Eye of the Kraken aussi en tracking).
                const hunterOnScreen = s.hunter?.active && Math.abs(s.hunter.x - s.ship.x) <= s.ship.vision && Math.abs(s.hunter.y - s.ship.y) <= s.ship.vision;
                const isPredicted = !!hunterOnScreen && (seesTracking || s.hunter?.mode !== 'tracking') && hunterPredictions.has(`${x}-${y}`) && !(x===s.hunter!.x && y===s.hunter!.y);
                const cell = (x>=0&&x<GRID_SIZE&&y>=0&&y<GRID_SIZE) ? s.grid[y][x] : {type:'sea' as const,revealed:false,visited:false,value:0};
                const absX = s.ship.x + dx;
                const absY = s.ship.y + dy;
                const isHunter = s.hunter?.active && s.hunter.x === absX && s.hunter.y === absY;
                const hunterDist = s.hunter?.active ? Math.abs(s.hunter.x - s.ship.x) + Math.abs(s.hunter.y - s.ship.y) : 99;
                const isShip = dx===0 && dy===0;
                const isRevealed = cell.revealed || cell.visited;
                const isStormed = (cell as any).stormed;
                const stormFrontRow = s.stormDistance <= 0 ? -1 : s.grid.length + 2 - Math.floor((10 - s.stormDistance) / 3);
                const isStormFront = isStormed && y === stormFrontRow;
                const zonePalette = CELL_COLOR_BY_ZONE[s.currentZone ?? 1] ?? CELL_COLOR_BY_ZONE[1];
                const zoneGlow = CELL_GLOW_BY_ZONE[s.currentZone ?? 1] ?? CELL_GLOW_BY_ZONE[1];
                const glow = isStormed ? '#cc2222' : zoneGlow[cell.type];
                const vSize = s.ship.vision * 2 + 1; const CELL_S = isMobile ? Math.floor((window.innerWidth - 16) / vSize) : Math.floor(Math.min(window.innerWidth * 0.50, window.innerHeight * 0.62) / vSize) - 4;
                return (
                  <motion.div key={`${x}-${y}`} className={isStormFront ? 'storm-front' : undefined}
                    initial={isRevealed ? { opacity:0, scale:0.8 } : false}
                    animate={{ opacity:1, scale:1 }}
                    style={{
                      width:CELL_S, height:CELL_S,
                      background: isShip ? '#0a2a4a' : isHunter ? (s.hunter?.mode==='frenzy' ? '#3a0612' : '#2a0830') : isStormed ? '#2a0505' : isRevealed ? (zonePalette[cell.type] ?? '#050a0f') : (s.currentZone === 2 ? '#03050a' : s.currentZone === 3 ? '#020204' : '#050a0f'),
                      border: isShip ? (hunterDist <= 1 ? '2px solid #ee4466' : '2px solid #4a8acc') : isHunter ? `2px solid ${s.hunter?.mode==='frenzy'?'#ff4466':s.hunter?.mode==='stalking'?'#dd66ff':'#aa44cc'}` : isStormed ? '1px solid #cc222244' : isRevealed ? `1px solid ${glow ? glow+'44' : 'rgba(255,255,255,0.08)'}` : '1px solid rgba(255,255,255,0.03)',
                      borderRadius:8,
                      display:'flex', alignItems:'center', justifyContent:'center',
                      fontSize: isShip ? 26 : 20,
                      boxShadow: isHunter ? `0 0 ${hunterDist<=2?22:14}px ${s.hunter?.mode==='frenzy'?'rgba(255,60,80,0.85)':'rgba(200,60,220,0.75)'}` : isShip ? (hunterDist <= 1 ? '0 0 22px rgba(238,68,102,0.55)' : '0 0 20px rgba(74,138,204,0.4)') : glow && isRevealed ? `0 0 10px ${glow}44` : 'none',
                      position:'relative', cursor:'default',
                    }}>
                    {isShip && (
                      <>
                        <motion.div
                          animate={{ rotate: lurch.x * 10, y: lurch.y * 5, scale: (lurch.x || lurch.y) ? 1.06 : 1 }}
                          transition={{ type:'spring', stiffness:200, damping:11 }}
                          style={{ transformOrigin:'50% 75%' }}>
                        <motion.div animate={{ y:[0,-3,0] }} transition={{ repeat:Infinity, duration:2, ease:'easeInOut' }}>
                          <img src={`${import.meta.env.BASE_URL}icons/ship.png`} style={{ width: CELL_S*0.82, height: CELL_S*0.82, objectFit:'contain', filter:'drop-shadow(0 0 10px rgba(74,138,204,0.9))' }}/>
                        </motion.div>
                        </motion.div>
                        <div style={{ position:'absolute', bottom:3, left:'5%', width:'90%', display:'flex', alignItems:'center', gap:3 }}>
                          <div style={{ flex:1, height:3, background:'rgba(0,0,0,0.5)', borderRadius:2 }}>
                            <div style={{ width:`${(s.ship.hull/s.ship.maxHull)*100}%`, height:'100%', borderRadius:2, background: s.ship.hull<=5?'#ee4444':s.ship.hull<=10?'#ee8844':'#44cc88', transition:'width 0.3s' }}/>
                          </div>
                          <div style={{ fontSize: Math.max(7, CELL_S*0.16), color: s.ship.hull<=5?'#ee4444':s.ship.hull<=10?'#ee8844':'#44cc88', fontFamily:"'Cinzel', serif", fontWeight:700, textShadow:'0 1px 3px rgba(0,0,0,0.9)', lineHeight:1, flexShrink:0 }}>{s.ship.hull}</div>
                        </div>
                      </>
                    )}
                    {!isHunter && !isShip && !isRevealed && cell.type === 'portal' && (
                      <motion.div animate={{ opacity:[0.55,1,0.55], scale:[0.9,1.08,0.9] }} transition={{ repeat:Infinity, duration:1.6, ease:'easeInOut' }}
                        style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', background:'radial-gradient(circle, #aa77ff 0%, #6644cc55 45%, transparent 75%)', borderRadius:4, boxShadow:'0 0 12px #8866ff' }}>
                        <div style={{ fontSize: CELL_S*0.5, lineHeight:1, filter:'drop-shadow(0 0 6px #aa77ff)' }}>🌀</div>
                      </motion.div>
                    )}
                    {!isHunter && !isShip && isRevealed && (
                      <img src={`${import.meta.env.BASE_URL}icons/${cell.type}.png`} style={{ width: CELL_S*0.82, height: CELL_S*0.82, opacity: cell.visited ? 0.35 : 1, objectFit:'contain', mixBlendMode:'screen' as const }}/>
                    )}
                    {isHunter && !isShip && (
                      <motion.div animate={{ scale:[1,1.2,1], opacity:[0.8,1,0.8] }} transition={{ repeat:Infinity, duration:1.5 }}
                        style={{ filter:'drop-shadow(0 0 12px #cc44ee)' }}><img src={`${import.meta.env.BASE_URL}icons/hunter.png`} style={{width:CELL_S*0.82,height:CELL_S*0.82,objectFit:'contain'}}/></motion.div>
                    )}
                    {isPredicted && !isShip && !isHunter && (
                      <motion.div animate={{ opacity:[0,0.4,0] }} transition={{ repeat:Infinity, duration:1.8, ease:'easeInOut' }}
                        style={{ position:'absolute', inset:0, borderRadius:8, background:'rgba(180,30,220,0.15)', border:'1px solid rgba(180,30,220,0.3)', pointerEvents:'none' }}/>
                    )}
                    {isHunter && !isShip && !isRevealed && (
                      <motion.div animate={{ opacity:[0.3,0.6,0.3] }} transition={{ repeat:Infinity, duration:2 }}
                        style={{ filter:'drop-shadow(0 0 8px #aa22cc)' }}>
                        <img src={`${import.meta.env.BASE_URL}icons/hunter.png`} style={{width:CELL_S*0.82,height:CELL_S*0.82,objectFit:'contain',opacity:0.4,filter:'grayscale(0.8) brightness(0.5)'}}/>
                      </motion.div>
                    )}
                    {!isHunter && !isShip && !isRevealed && (
                      <span style={{ fontSize:21, color:'rgba(255,255,255,0.06)', fontWeight:700 }}>?</span>
                    )}
                  </motion.div>
                );
              }))})
            </div>
          </div>

          {/* Combo multiplier + streak effects */}
          {s.dangerStreak > 0 && (
            <motion.div
              key={s.dangerStreak}
              initial={{ scale:0.6, opacity:0 }}
              animate={{ scale:1, opacity:1 }}
              transition={{ type:'spring', stiffness:300 }}
              style={{
                textAlign:'center',
                letterSpacing:2,
              }}>
              {s.scoreMultiplier > 1 && (
                <div style={{
                  fontSize: isMobile ? 17 : (s.scoreMultiplier >= 3 ? 42 : 32),
                  fontWeight:700,
                  color: s.scoreMultiplier >= 3 ? '#ee4444' : '#eedd44',
                  letterSpacing: isMobile ? 2 : 4,
                  textShadow: isMobile ? 'none' : s.scoreMultiplier >= 3
                    ? '0 0 30px #ee4444, 0 0 60px #ee444466'
                    : '0 0 20px #eedd44, 0 0 40px #eedd4466',
                  filter: s.scoreMultiplier >= 3 ? 'brightness(1.3)' : 'brightness(1.1)',
                }}>
                  {s.scoreMultiplier >= 3 ? '🔥🔥🔥' : '🔥'} ×{s.scoreMultiplier} COMBO
                </div>
              )}
              <div style={{ display: isMobile ? 'none' : 'block', fontSize:13, color:'rgba(255,255,255,0.4)', fontFamily:"'Cinzel', serif", letterSpacing:2, marginTop:4 }}>
                STREAK {s.dangerStreak}
              </div>
              {s.dangerStreak >= 3 && (
                <motion.div animate={{ opacity:[1,0.4,1] }} transition={{ repeat:Infinity, duration:1.2 }}
                  style={{ fontSize:11, color:'#ee8844', fontFamily:"'Cinzel', serif", letterSpacing:1, marginTop:2 }}>
                  HUNTER ALERT
                </motion.div>
              )}
              {s.dangerStreak >= 4 && (
                <motion.div animate={{ opacity:[1,0.4,1] }} transition={{ repeat:Infinity, duration:0.9 }}
                  style={{ fontSize:11, color:'#ee4444', fontFamily:"'Cinzel', serif", letterSpacing:1, marginTop:2 }}>
                  ⛈ STORM SURGE +8%
                </motion.div>
              )}
              {s.dangerStreak >= 5 && (
                <motion.div animate={{ opacity:[1,0.3,1] }} transition={{ repeat:Infinity, duration:0.7 }}
                  style={{ fontSize:11, color:'#cc44ee', fontFamily:"'Cinzel', serif", letterSpacing:1, marginTop:2 }}>
                  <Icon name="skull" size={18} style={{ marginRight:6 }} />CURSED WATERS
                </motion.div>
              )}
              {s.dangerStreak >= 6 && (
                <motion.div animate={{ opacity:[1,0.2,1] }} transition={{ repeat:Infinity, duration:0.5 }}
                  style={{ fontSize:11, color:'#ff2222', fontFamily:"'Cinzel', serif", letterSpacing:1, marginTop:2 }}>
                  <Icon name="skull" size={18} style={{ marginRight:6 }} />LEGENDARY ZONE
                </motion.div>
              )}
            </motion.div>
          )}
          {/* Mini-map Gold Detector / Treasure Hunter */}
          {(s.ship.upgrades.includes('hunter')) && (
            <div style={{ position:'relative', marginBottom:8 }}>
              <div style={{ fontSize:11, color:'rgba(255,255,255,0.3)', letterSpacing:3, textAlign:'center', marginBottom:4, fontFamily:"'Cinzel', serif" }}>NAVIGATOR</div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(12, 1fr)', gap:1, width:120, margin:'0 auto', border:'1px solid rgba(255,255,255,0.1)', borderRadius:4, padding:2, background:'rgba(0,0,0,0.4)' }}>
                {Array.from({length:12}, (_,y) => Array.from({length:12}, (_,x) => {
                  const cell = s.grid[y][x];
                  const isShip = x===s.ship.x && y===s.ship.y;
                  const isHunter = s.hunter?.active && x===s.hunter.x && y===s.hunter.y;
                  const isTreasure = cell.revealed && !cell.visited && (cell.type==='treasure'||cell.type==='cursed_treasure');
                  const isPort = cell.revealed && !cell.visited && cell.type==='port';
                  const bg = isShip ? '#4a8acc' : isHunter ? '#ee4444' : isTreasure ? '#eedd44' : isPort ? '#44cccc' : cell.revealed ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.3)';
                  return <div key={`${x}-${y}`} style={{ width:8, height:8, background:bg, borderRadius: isHunter || isShip ? 4 : 1 }}/>;
                }))}
              </div>
            </div>
          )}
          {/* Dark Compass warning */}
          {false && (() => {
            const dangerTypes = ['pirate','kraken','storm','ancient_kraken','maelstrom'];
            let closestDanger: {type:string, dist:number} | null = null; // eslint-disable-line
            for (let dy=-2; dy<=2; dy++) for (let dx=-2; dx<=2; dx++) {
              const x = s.ship.x+dx, y = s.ship.y+dy;
              if (x<0||x>=12||y<0||y>=12) continue;
              const cell = s.grid[y][x];
              if (cell.revealed && !cell.visited && dangerTypes.includes(cell.type)) {
                const dist = Math.abs(dx)+Math.abs(dy);
                if (!closestDanger || dist < (closestDanger as {type:string,dist:number}).dist) closestDanger = {type:cell.type, dist};
              }
            }
            if (!closestDanger) return null;
            const cd = closestDanger as {type:string, dist:number};
            return (
              <div style={{ fontSize:13, color: cd.dist <= 1 ? '#ee4444' : '#ee8844', letterSpacing:2, textAlign:'center', marginBottom:4, fontFamily:"'Cinzel', serif" }}>
                ⚠️ {cd.type.toUpperCase()} — {cd.dist} {cd.dist <= 1 ? 'CELL AWAY' : 'CELLS AWAY'}
              </div>
            );
          })()}
          {/* Log */}
          <div aria-live="polite" aria-atomic="true" style={{ marginTop:10, textAlign:'center', maxWidth:420, paddingRight: isMobile ? 80 : 0, marginBottom: 0 }}>
            {(() => {
              const parts = (s.log ?? '').split('. ').map(p => p.trim()).filter(Boolean);
              const head = parts[0] ? parts[0].replace(/\.+$/, '') : '';
              const rest = parts.slice(1).join('. ');
              return (<>
                <div style={{ fontSize:18, color:'rgba(255,255,255,0.95)', fontFamily:"'IM Fell English', cursive", lineHeight:1.4 }}>{head}{head ? '.' : ''}</div>
                {rest && <div style={{ marginTop:4, fontSize:13.5, color:'rgba(255,255,255,0.5)', fontFamily:"'IM Fell English', cursive", lineHeight:1.4 }}>{rest}{rest.endsWith('.') ? '' : '.'}</div>}
              </>);
            })()}
          </div>
          {s.portalHint && (
            <div style={{ marginTop:6, fontSize:14, color:'#8866ff', fontFamily:"'IM Fell English', cursive", textAlign:'center', fontStyle:'italic', animation:'pulse 2s infinite' }}>
              ✦ {s.portalHint} ✦
            </div>
          )}
          {(s.relics ?? []).length > 0 && !isMobile && (
            <div style={{ marginTop:8, display:'flex', gap:6, justifyContent:'center', flexWrap:'wrap' }}>
              {(s.relics ?? []).map(rid => { const r = getRelicDef(rid); if (!r) return null; return (
                <div key={rid} title={`${r.name} — ${r.desc}`}
                  style={{ display:'flex', alignItems:'center', gap:4, padding:'3px 8px', borderRadius:8, background:'rgba(200,160,48,0.12)', border:'1px solid rgba(200,160,48,0.35)' }}>
                  <Icon name={r.icon as any} size={16} />
                  <span style={{ fontSize:10, color:'#eedd88', fontFamily:"'Cinzel', serif", letterSpacing:0.5 }}>{r.name}</span>
                </div>
              ); })}
            </div>
          )}
          {isMobile && <div aria-hidden style={{ flexShrink:0, height:'calc(112px + env(safe-area-inset-bottom))' }}/>}
        </div>

  );
}
