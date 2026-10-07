import { motion } from 'framer-motion';
import type { GameState } from '../../types/game';
import type { OnboardTip } from '../../game/onboard';
import { ZONE_CONFIG } from '../../game/balance';
import { GRID_SIZE } from '../../game/mapGen';
import { getRelicDef, relicPortraitUrl } from '../../game/relics';
import { Icon } from '../../Icon';
import OnboardCard from './OnboardCard';
import ShipToken from './ShipToken';
import { CELL_COLOR_BY_ZONE, CELL_GLOW_BY_ZONE } from './cells';
import { ZONE_BG } from './scenes';
import {
  hunterBannerText, hunterManhattan, hunterModeShort, hunterThreatLevel,
} from './hunterUi';

const FOG_WASH: Record<number, string> = {
  1: 'rgba(6,14,22,0.82)',
  2: 'rgba(6,10,22,0.86)',
  3: 'rgba(4,6,14,0.9)',
};
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
  const vSize = s.ship.vision * 2 + 1;
  const reservedH = isMobile ? 240 : 210;
  const maxGridH = Math.max(180, window.innerHeight - reservedH);
  const maxGridW = isMobile ? window.innerWidth - 16 : Math.min(window.innerWidth * 0.48, 560);
  const CELL_S = Math.max(28, Math.floor(Math.min(maxGridW, maxGridH) / vSize) - 4);

  const sailControls = !s.event && !s.showPort && !s.gameOver && (
    isMobile ? (
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
    ) : (
      <div aria-label="Sailing controls" style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8, marginTop:10, flexShrink:0 }}>
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
    )
  );

  const hunterBanner = s.hunter?.active && !s.gameOver && (() => {
    const threat = hunterThreatLevel(s);
    const text = hunterBannerText(s);
    const bg = threat === 'critical' ? 'rgba(160,10,30,0.92)'
      : threat === 'danger' ? 'rgba(100,20,50,0.88)'
      : threat === 'watch' ? 'rgba(70,20,90,0.85)'
      : 'rgba(40,20,60,0.8)';
    const border = threat === 'critical' ? 'rgba(255,80,100,0.75)'
      : threat === 'danger' ? 'rgba(255,120,80,0.55)'
      : 'rgba(180,80,220,0.45)';
    return (
      <motion.div
        key={text}
        initial={{ opacity:0, y:-6 }}
        animate={{ opacity:1, y:0 }}
        style={{
          position:'absolute', top: -6, left:'50%', transform:'translateX(-50%)', zIndex:5,
          padding: isMobile ? '5px 10px' : '6px 14px',
          borderRadius:10,
          border:`1px solid ${border}`,
          background: bg,
          boxShadow: threat === 'critical' || threat === 'danger' ? `0 0 18px ${border}` : '0 4px 12px rgba(0,0,0,0.45)',
          display:'flex', alignItems:'center', gap:8, maxWidth:'min(100%, 420px)',
          whiteSpace:'nowrap',
          pointerEvents:'none',
        }}>
        <Icon name="kraken" size={isMobile ? 14 : 16} />
        <div style={{ fontFamily:"'Cinzel', serif", fontSize: isMobile ? 10 : 11, letterSpacing:1.1, color: threat==='critical' ? '#ffccdd' : '#e8d0ff', fontWeight:700 }}>
          {text}
        </div>
      </motion.div>
    );
  })();

  return (
        <div style={{ flex:1, minHeight:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent: isMobile ? 'flex-start' : 'center', padding: isMobile ? '6px 4px calc(96px + env(safe-area-inset-bottom))' : '8px 10px', position:'relative', overflowY:'auto' }}>
          {isMobile && (
            <div style={{ display:'flex', gap:12, marginBottom:6, fontSize:13, fontFamily:"'Cinzel', serif", flexShrink:0 }}>
              <span style={{ color: s.stormDistance <= 4 ? '#ee4444' : '#ee8844', display:'inline-flex', alignItems:'center', gap:4 }}>
                <Icon name="storm" size={13} /> {s.stormDistance} turns
              </span>
              <span style={{ color:'#cc44ee' }}>{ZONE_CONFIG[s.currentZone??1]?.name??'The Coasts'}</span>
              <span style={{ color:'#eedd44', display:'inline-flex', alignItems:'center', gap:4 }}>
                <Icon name="star" size={13} /> {s.score} pts
              </span>
            </div>
          )}

          {onboard && !s.event && !s.showPort && !s.gameOver && (
            <OnboardCard tip={onboard} isMobile={isMobile} onDismiss={onDismissOnboard} />
          )}

          <div style={{ position:'relative', flexShrink:0 }}>
            {hunterBanner}

            <>
                <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 50% 65%, transparent 20%, rgba(8,15,24,0.6) 45%, rgba(8,15,24,0.95) 70%)', pointerEvents:'none', zIndex:2, borderRadius:8 }}/>
                {ZONE_BG[s.currentZone ?? 1] && (
                  <div aria-hidden style={{
                    position:'absolute', inset: -6, zIndex: 0, borderRadius: 14, overflow: 'hidden',
                    backgroundImage: `url(${ZONE_BG[s.currentZone ?? 1]})`,
                    backgroundSize: 'cover', backgroundPosition: 'center',
                    opacity: 0.14, filter: 'saturate(0.55) brightness(0.45)',
                    pointerEvents: 'none',
                  }} />
                )}
                <div style={{
                  position:'relative', zIndex:1,
                  display:'grid', gridTemplateColumns:`repeat(${vSize},1fr)`, gap:4,
                  transform: `translate(${slide.x}px, ${slide.y}px)`,
                  transition: slide.instant ? 'none' : 'transform 420ms cubic-bezier(0.22, 1, 0.36, 1)',
                  willChange: 'transform',
                }}>
                  {Array.from({length: vSize}, (_,i) => i - s.ship.vision).flatMap(dy =>
                    Array.from({length: vSize}, (_,i) => i - s.ship.vision).map(dx => {
                    const x = s.ship.x+dx, y = s.ship.y+dy;
                    const hunterPredictions: Set<string> = (() => {
                      const set = new Set<string>();
                      if (!s.hunter?.active) return set;
                      const hx = s.hunter.x, hy = s.hunter.y;
                      const tx = s.ship.x, ty = s.ship.y;
                      if (s.hunter.mode === 'searching') {
                        [[-1,0],[1,0],[0,-1],[0,1],[-1,-1],[1,1]].forEach(([ddx,ddy]) => set.add(`${hx+ddx}-${hy+ddy}`));
                      } else {
                        const distX = Math.abs(tx-hx), distY = Math.abs(ty-hy);
                        if (distX >= distY) set.add(`${hx+(tx>hx?1:-1)}-${hy}`);
                        if (distY >= distX) set.add(`${hx}-${hy+(ty>hy?1:-1)}`);
                        if (distX === distY) { set.add(`${hx+(tx>hx?1:-1)}-${hy}`); set.add(`${hx}-${hy+(ty>hy?1:-1)}`); }
                      }
                      return set;
                    })();
                    const seesTracking = (s.relics ?? []).includes('kraken_eye') || s.shipType === 'specter';
                    const hunterOnScreen = s.hunter?.active && Math.abs(s.hunter.x - s.ship.x) <= s.ship.vision && Math.abs(s.hunter.y - s.ship.y) <= s.ship.vision;
                    const isPredicted = !!hunterOnScreen && (seesTracking || s.hunter?.mode !== 'tracking') && hunterPredictions.has(`${x}-${y}`) && !(x===s.hunter!.x && y===s.hunter!.y);
                    const cell = (x>=0&&x<GRID_SIZE&&y>=0&&y<GRID_SIZE) ? s.grid[y][x] : {type:'sea' as const,revealed:false,visited:false,value:0,stormed:false};
                    const absX = s.ship.x + dx;
                    const absY = s.ship.y + dy;
                    const isHunter = s.hunter?.active && s.hunter.x === absX && s.hunter.y === absY;
                    const hunterDist = s.hunter?.active ? hunterManhattan(s) : 99;
                    const isShip = dx===0 && dy===0;
                    const isRevealed = cell.revealed || cell.visited;
                    const isStormed = cell.stormed;
                    const stormFrontRow = s.stormDistance <= 0 ? -1 : s.grid.length + 2 - Math.floor((10 - s.stormDistance) / 3);
                    const isStormFront = isStormed && y === stormFrontRow;
                    const zone = s.currentZone ?? 1;
                    const zonePalette = CELL_COLOR_BY_ZONE[zone] ?? CELL_COLOR_BY_ZONE[1];
                    const zoneGlow = CELL_GLOW_BY_ZONE[zone] ?? CELL_GLOW_BY_ZONE[1];
                    const glow = isStormed ? '#cc2222' : zoneGlow[cell.type];
                    const wash = isShip ? '#0a2a4a'
                      : isHunter ? (s.hunter?.mode === 'frenzy' ? '#3a0612' : '#2a0830')
                      : isStormed ? 'rgba(90,12,18,0.78)'
                      : isRevealed ? (zonePalette[cell.type] ?? '#050a0f')
                      : (FOG_WASH[zone] ?? FOG_WASH[1]);
                    return (
                      <motion.div key={`${x}-${y}`} className={isStormFront ? 'storm-front' : undefined}
                        initial={isRevealed ? { opacity:0, scale:0.8 } : false}
                        animate={{ opacity:1, scale:1 }}
                        style={{
                          width:CELL_S, height:CELL_S,
                          background: wash,
                          border: isShip ? (hunterDist <= 1 ? '2px solid #ee4466' : '2px solid #4a8acc') : isHunter ? `2px solid ${s.hunter?.mode==='frenzy'?'#ff4466':s.hunter?.mode==='stalking'?'#dd66ff':'#aa44cc'}` : isStormed ? '1px solid #cc222244' : isRevealed ? `1px solid ${glow ? glow+'55' : 'rgba(255,255,255,0.1)'}` : '1px solid rgba(255,255,255,0.04)',
                          borderRadius:8,
                          display:'flex', alignItems:'center', justifyContent:'center',
                          fontSize: isShip ? 26 : 20,
                          boxShadow: isHunter ? `0 0 ${hunterDist<=2?22:14}px ${s.hunter?.mode==='frenzy'?'rgba(255,60,80,0.85)':'rgba(200,60,220,0.75)'}` : isShip ? (hunterDist <= 1 ? '0 0 22px rgba(238,68,102,0.55)' : '0 0 20px rgba(74,138,204,0.4)') : glow && isRevealed ? `0 0 10px ${glow}44` : 'none',
                          position:'relative', cursor:'default', overflow:'hidden',
                        }}>
                        {!isShip && !isHunter && isRevealed && cell.type === 'sea' && (
                          <div aria-hidden style={{
                            position: 'absolute', inset: 0, borderRadius: 7, pointerEvents: 'none',
                            background: zone === 3
                              ? 'radial-gradient(ellipse at 35% 30%, rgba(70,100,140,0.55) 0%, rgba(25,40,70,0.25) 55%, transparent 75%)'
                              : zone === 2
                                ? 'radial-gradient(ellipse at 35% 30%, rgba(80,110,170,0.5) 0%, rgba(40,55,110,0.22) 55%, transparent 75%)'
                                : 'radial-gradient(ellipse at 35% 30%, rgba(90,170,200,0.55) 0%, rgba(40,100,130,0.28) 50%, transparent 75%)',
                            boxShadow: 'inset 0 -10px 18px rgba(30,80,110,0.35), inset 0 6px 12px rgba(160,220,245,0.12)',
                          }} />
                        )}
                        {isShip && (
                          <>
                            <div style={{ position:'relative', zIndex:1, lineHeight:0 }}>
                              <ShipToken
                                shipId={s.shipType ?? 'default'}
                                size={Math.round(CELL_S * 0.9)}
                                lurchX={lurch.x}
                                lurchY={lurch.y}
                              />
                            </div>
                            <div style={{ position:'absolute', bottom:3, left:'5%', width:'90%', display:'flex', alignItems:'center', gap:3, zIndex:1 }}>
                              <div style={{ flex:1, height:3, background:'rgba(0,0,0,0.5)', borderRadius:2 }}>
                                <div style={{ width:`${(s.ship.hull/s.ship.maxHull)*100}%`, height:'100%', borderRadius:2, background: s.ship.hull<=5?'#ee4444':s.ship.hull<=10?'#ee8844':'#44cc88', transition:'width 0.3s' }}/>
                              </div>
                              <div style={{ fontSize: Math.max(7, CELL_S*0.16), color: s.ship.hull<=5?'#ee4444':s.ship.hull<=10?'#ee8844':'#44cc88', fontFamily:"'Cinzel', serif", fontWeight:700, textShadow:'0 1px 3px rgba(0,0,0,0.9)', lineHeight:1, flexShrink:0 }}>{s.ship.hull}</div>
                            </div>
                          </>
                        )}
                        {!isHunter && !isShip && !isRevealed && cell.type === 'portal' && (
                          <motion.div animate={{ opacity:[0.55,1,0.55], scale:[0.9,1.08,0.9] }} transition={{ repeat:Infinity, duration:1.6, ease:'easeInOut' }}
                            style={{ position:'absolute', inset:0, zIndex:1, display:'flex', alignItems:'center', justifyContent:'center', background:'radial-gradient(circle, #aa77ff 0%, #6644cc55 45%, transparent 75%)', borderRadius:4, boxShadow:'0 0 12px #8866ff' }}>
                            <img
                              src={`${import.meta.env.BASE_URL}icons/portal.png`}
                              alt=""
                              style={{ width: CELL_S*0.72, height: CELL_S*0.72, objectFit:'contain', filter:'drop-shadow(0 0 6px #aa77ff)', mixBlendMode:'screen' as const }}
                            />
                          </motion.div>
                        )}
                        {!isHunter && !isShip && isRevealed && cell.type !== 'sea' && (
                          <img src={`${import.meta.env.BASE_URL}icons/${cell.type}.png`} style={{ width:CELL_S*0.82, height:CELL_S*0.82, opacity: cell.visited ? 0.35 : 1, objectFit:'contain', mixBlendMode:'screen' as const, position:'relative', zIndex:1 }}/>
                        )}
                        {!isHunter && !isShip && isRevealed && cell.type === 'sea' && (
                          <div
                            aria-hidden
                            className="sea-shimmer"
                            style={{
                              position: 'absolute', inset: 0, zIndex: 1, borderRadius: 7, pointerEvents: 'none',
                              animationDelay: `${((Math.abs(absX) * 0.37 + Math.abs(absY) * 0.53) % 2.8).toFixed(2)}s`,
                            }}
                          />
                        )}
                        {isHunter && !isShip && (
                          <motion.div animate={{ scale:[1, s.hunter?.mode==='frenzy'?1.28:1.18, 1], opacity:[0.85,1,0.85] }} transition={{ repeat:Infinity, duration: s.hunter?.mode==='frenzy'?0.9:1.5 }}
                            style={{ filter:`drop-shadow(0 0 ${hunterDist<=2?16:10}px ${s.hunter?.mode==='frenzy'?'#ff4466':'#cc44ee'})`, position:'relative', zIndex:1 }}>
                            <img src={`${import.meta.env.BASE_URL}icons/hunter.png`} style={{width:CELL_S*0.82,height:CELL_S*0.82,objectFit:'contain'}}/>
                            <div style={{
                              position:'absolute', left:'50%', bottom: -2, transform:'translateX(-50%)',
                              fontSize: Math.max(7, CELL_S * 0.14), lineHeight:1.1, whiteSpace:'nowrap',
                              padding:'1px 4px', borderRadius:4,
                              background: s.hunter?.mode==='frenzy' ? 'rgba(180,20,40,0.92)' : 'rgba(60,10,80,0.88)',
                              color: s.hunter?.mode==='frenzy' ? '#ffccdd' : '#e8c8ff',
                              fontFamily:"'Cinzel', serif", fontWeight:700, letterSpacing:0.5,
                              border:`1px solid ${s.hunter?.mode==='frenzy'?'rgba(255,100,120,0.7)':'rgba(200,100,255,0.5)'}`,
                              textShadow:'0 1px 2px rgba(0,0,0,0.9)', pointerEvents:'none',
                            }}>
                              {hunterModeShort(s.hunter!.mode)} {hunterDist <= 1 ? 'HIT' : hunterDist}
                            </div>
                          </motion.div>
                        )}
                        {isPredicted && !isShip && !isHunter && (
                          <motion.div animate={{ opacity:[0,0.4,0] }} transition={{ repeat:Infinity, duration:1.8, ease:'easeInOut' }}
                            style={{ position:'absolute', inset:0, borderRadius:8, background:'rgba(180,30,220,0.15)', border:'1px solid rgba(180,30,220,0.3)', pointerEvents:'none', zIndex:1 }}/>
                        )}
                        {isHunter && !isShip && !isRevealed && (
                          <motion.div animate={{ opacity:[0.3,0.6,0.3] }} transition={{ repeat:Infinity, duration:2 }}
                            style={{ filter:'drop-shadow(0 0 8px #aa22cc)', position:'relative', zIndex:1 }}>
                            <img src={`${import.meta.env.BASE_URL}icons/hunter.png`} style={{width:CELL_S*0.82,height:CELL_S*0.82,objectFit:'contain',opacity:0.4,filter:'grayscale(0.8) brightness(0.5)'}}/>
                          </motion.div>
                        )}
                        {!isHunter && !isShip && !isRevealed && cell.type !== 'portal' && (
                          <span style={{ fontSize:21, color:'rgba(255,255,255,0.08)', fontWeight:700, position:'relative', zIndex:1 }}>?</span>
                        )}
                      </motion.div>
                    );
                  }))}
                </div>
              </>
          </div>

          {!isMobile && sailControls}

          {s.dangerStreak > 0 && (
            <motion.div
              key={s.dangerStreak}
              initial={{ scale:0.6, opacity:0 }}
              animate={{ scale:1, opacity:1 }}
              transition={{ type:'spring', stiffness:300 }}
              style={{ textAlign:'center', letterSpacing:2, flexShrink:0, marginTop:6 }}>
              {s.scoreMultiplier > 1 && (
                <div style={{
                  fontSize: isMobile ? 17 : (s.scoreMultiplier >= 3 ? 28 : 22),
                  fontWeight:700,
                  color: s.scoreMultiplier >= 3 ? '#ee4444' : '#eedd44',
                  letterSpacing: isMobile ? 2 : 3,
                  textShadow: isMobile ? 'none' : s.scoreMultiplier >= 3
                    ? '0 0 30px #ee4444, 0 0 60px #ee444466'
                    : '0 0 20px #eedd44, 0 0 40px #eedd4466',
                  filter: s.scoreMultiplier >= 3 ? 'brightness(1.3)' : 'brightness(1.1)',
                  display:'flex', alignItems:'center', justifyContent:'center', gap:6,
                }}>
                  {s.scoreMultiplier >= 3 ? (
                    <span style={{ display:'inline-flex', alignItems:'center', gap:2 }}>
                      <Icon name="fire" size={isMobile ? 16 : 22} /><Icon name="fire" size={isMobile ? 16 : 22} /><Icon name="fire" size={isMobile ? 16 : 22} />
                    </span>
                  ) : (
                    <Icon name="fire" size={isMobile ? 16 : 20} />
                  )}
                  <span>×{s.scoreMultiplier} COMBO</span>
                </div>
              )}
              <div style={{ display: isMobile ? 'none' : 'block', fontSize:12, color:'rgba(255,255,255,0.4)', fontFamily:"'Cinzel', serif", letterSpacing:2, marginTop:2 }}>
                STREAK {s.dangerStreak}
                {s.dangerStreak >= 3 && <span style={{ color:'#ee8844', marginLeft:10 }}>HUNTER ALERT</span>}
                {s.dangerStreak >= 4 && <span style={{ color:'#ee4444', marginLeft:10 }}>STORM SURGE</span>}
              </div>
            </motion.div>
          )}
          {(s.ship.upgrades.includes('hunter')) && (
            <div style={{ position:'relative', marginBottom:8, flexShrink:0 }}>
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
          <div aria-live="polite" aria-atomic="true" style={{ marginTop:8, textAlign:'center', maxWidth:420, paddingRight: isMobile ? 80 : 0, marginBottom: 0, flexShrink:0 }}>
            {(() => {
              const parts = (s.log ?? '').split('. ').map(p => p.trim()).filter(Boolean);
              const head = parts[0] ? parts[0].replace(/\.+$/, '') : '';
              const rest = parts.slice(1).join('. ');
              return (<>
                <div style={{ fontSize: isMobile ? 16 : 17, color:'rgba(255,255,255,0.95)', fontFamily:"'IM Fell English', cursive", lineHeight:1.35 }}>{head}{head ? '.' : ''}</div>
                {rest && <div style={{ marginTop:4, fontSize:13, color:'rgba(255,255,255,0.5)', fontFamily:"'IM Fell English', cursive", lineHeight:1.35 }}>{rest}{rest.endsWith('.') ? '' : '.'}</div>}
              </>);
            })()}
          </div>
          {s.portalHint && (
            <div style={{ marginTop:6, fontSize:13, color:'#8866ff', fontFamily:"'IM Fell English', cursive", textAlign:'center', fontStyle:'italic', animation:'pulse 2s infinite', flexShrink:0, paddingBottom:4, display:'flex', alignItems:'center', justifyContent:'center', gap:6 }}>
              <Icon name="vortex" size={14} /> {s.portalHint} <Icon name="vortex" size={14} />
            </div>
          )}
          {(s.relics ?? []).length > 0 && !isMobile && (
            <div style={{ marginTop:8, display:'flex', gap:6, justifyContent:'center', flexWrap:'wrap', flexShrink:0 }}>
              {(s.relics ?? []).map(rid => { const r = getRelicDef(rid); if (!r) return null; return (
                <div key={rid} title={`${r.name} — ${r.desc}`}
                  style={{ display:'flex', alignItems:'center', gap:4, padding:'3px 8px', borderRadius:8, background:'rgba(200,160,48,0.12)', border:'1px solid rgba(200,160,48,0.35)' }}>
                  <img src={relicPortraitUrl(r.id)} alt="" style={{ width:18, height:18, borderRadius:4, objectFit:'cover' }} />
                  <span style={{ fontSize:10, color:'#eedd88', fontFamily:"'Cinzel', serif", letterSpacing:0.5 }}>{r.name}</span>
                </div>
              ); })}
            </div>
          )}
          {isMobile && sailControls}
          {isMobile && <div aria-hidden style={{ flexShrink:0, height:'calc(112px + env(safe-area-inset-bottom))' }}/>}
        </div>
  );
}
