import { motion, AnimatePresence } from 'framer-motion';
import type { GameState } from '../../types/game';
import type { Feat } from '../../game/feats';
import type { FeatProgress } from '../../game/progress';
import { getRelicDef, type RelicDef } from '../../game/relics';
import { getDailyKey, isDailySeedRevealed, hasDailyBeenPlayed } from '../../game/engine';
import { submitScoreOnChain } from '../../starknet';
import ShareCard, { shareVoyage } from '../../ShareCard';
import { Icon } from '../../Icon';
import { deriveDeathCause } from './deathCause';

export type GameOverScreenProps = {
  open: boolean;
  state: GameState;
  isMobile: boolean;
  isDailyRun: boolean;
  personalBest: number;
  isNewRecord: boolean;
  newFeats: Feat[];
  nearFeats: FeatProgress[];
  scoreSubmitted: boolean;
  nftMinted: string[];
  walletAddress: string | null;
  account?: any;
  onChainDone: boolean;
  setOnChainDone: (v: boolean) => void;
  submitting: boolean;
  setSubmitting: (v: boolean) => void;
  connecting: boolean;
  onConnect: () => void;
  showGuestDailyCta: boolean;
  onPlayDaily?: () => void;
  rangMois: { rank: number; total: number } | null;
  harborDown: boolean;
  restarting: boolean;
  onRestart: () => void;
  onHome: () => void;
};

export default function GameOverScreen({
  open,
  state: s,
  isMobile,
  isDailyRun,
  personalBest,
  isNewRecord,
  newFeats,
  nearFeats,
  scoreSubmitted,
  nftMinted,
  walletAddress,
  account,
  onChainDone,
  setOnChainDone,
  submitting,
  setSubmitting,
  connecting,
  onConnect,
  showGuestDailyCta,
  onPlayDaily,
  rangMois,
  harborDown,
  restarting,
  onRestart,
  onHome,
}: GameOverScreenProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
          style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            background: 'radial-gradient(ellipse at center, #1a0505 0%, #050008 50%, #000000 100%)',
            overflow: 'hidden', overflowY: 'auto' }}>

          <motion.div animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ repeat: Infinity, duration: 3 }}
            style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 30%, rgba(150,0,0,0.4) 100%)', pointerEvents: 'none' }} />

          <motion.div initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 120, delay: 0.2 }}
            style={{ marginBottom: 8, filter: 'drop-shadow(0 0 30px rgba(220,30,30,0.8))' }}>
            <Icon name="skull" size={130} />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            style={{ fontSize: isMobile ? 42 : 72, fontWeight: 700, color: '#ee4444', fontFamily: "'Pirata One', cursive", letterSpacing: isMobile ? 3 : 6,
              textShadow: '0 0 40px rgba(220,30,30,0.8), 0 0 80px rgba(220,30,30,0.4)', marginBottom: 8 }}>
            SHIPWRECKED
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
            style={{ fontSize: isMobile ? 16 : 24, color: 'rgba(200,160,48,0.8)', fontFamily: "'Cinzel', serif", letterSpacing: isMobile ? 2 : 4, marginBottom: 4, textAlign: 'center' }}>
            {s.runTitle}
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
            style={{ fontSize: isMobile ? 15 : 20, color: 'rgba(255,255,255,0.35)', fontFamily: "'IM Fell English', cursive", marginBottom: 16, maxWidth: isMobile ? '90vw' : 600, textAlign: 'center', fontStyle: 'italic', padding: isMobile ? '0 16px' : 0 }}>
            "{s.log}"
          </motion.div>

          {(() => {
            const dc = deriveDeathCause(s.log);
            return (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}
                style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center', marginBottom: 16, padding: '10px 18px', borderRadius: 12, background: 'rgba(150,0,0,0.12)', border: '1px solid rgba(220,60,60,0.25)', maxWidth: isMobile ? '90vw' : 560 }}>
                <div style={{ fontSize: isMobile ? 13 : 15, color: '#ee6655', fontFamily: "'Cinzel', serif", letterSpacing: 2 }}>
                  <Icon name="anchor" size={16} style={{ marginRight: 6 }} />Sunk by: {dc.name}
                </div>
                <div style={{ fontSize: isMobile ? 12 : 14, color: 'rgba(255,255,255,0.55)', fontFamily: "'IM Fell English', cursive", textAlign: 'center' }}>
                  {dc.tip}
                </div>
              </motion.div>
            );
          })()}

          {newFeats.length > 0 && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.4, type: 'spring' }}
              style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center', marginBottom: 16, padding: '12px 22px', borderRadius: 12, background: 'rgba(200,160,48,0.12)', border: '1px solid rgba(238,221,68,0.55)', boxShadow: '0 0 24px rgba(238,221,68,0.15)', maxWidth: isMobile ? '90vw' : 560 }}>
              {newFeats.map(nf => (
                <div key={nf.id} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Icon name={nf.icon as any} size={26} />
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontFamily: "'Pirata One', cursive", fontSize: isMobile ? 15 : 17, color: '#eedd44', letterSpacing: 1 }}>NEW FEAT: {nf.name}</div>
                    <div style={{ fontFamily: "'Cinzel', serif", fontSize: isMobile ? 10 : 11, color: 'rgba(238,221,68,0.75)', letterSpacing: 1.5 }}>TITLE UNLOCKED: {nf.title}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* Unfinished business — reason to come back */}
          {(nearFeats.length > 0 || (!isNewRecord && personalBest > s.score)) && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.35 }}
              style={{
                marginBottom: 18, padding: isMobile ? '12px 14px' : '14px 20px', borderRadius: 12,
                border: '1px solid rgba(136,221,255,0.35)', background: 'rgba(10,24,40,0.75)',
                maxWidth: isMobile ? '92vw' : 520, width: '100%',
              }}>
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: 3, color: 'rgba(136,221,255,0.85)', marginBottom: 8, textAlign: 'center' }}>
                STILL ON THE TIDE
              </div>
              {!isNewRecord && personalBest > s.score && (
                <div style={{ fontFamily: "'IM Fell English', cursive", fontSize: isMobile ? 14 : 15, color: 'rgba(255,255,255,0.75)', textAlign: 'center', marginBottom: nearFeats.length ? 8 : 0 }}>
                  {personalBest - s.score} pts short of your best ({personalBest.toLocaleString()})
                </div>
              )}
              {nearFeats.map(p => (
                <div key={p.feat.id} style={{ marginTop: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'baseline', marginBottom: 4 }}>
                    <div style={{ fontFamily: "'Pirata One', cursive", fontSize: 15, color: '#c8e8ff' }}>{p.feat.name}</div>
                    <div style={{ fontFamily: "'Cinzel', serif", fontSize: 11, color: 'rgba(255,255,255,0.45)' }}>{Math.round(p.ratio * 100)}%</div>
                  </div>
                  <div style={{ height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.08)', overflow: 'hidden', marginBottom: 4 }}>
                    <div style={{ height: '100%', width: `${Math.round(p.ratio * 100)}%`, background: 'linear-gradient(90deg,#2a6a8a,#88ddff)', borderRadius: 2 }} />
                  </div>
                  <div style={{ fontFamily: "'IM Fell English', cursive", fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>
                    {p.line}
                  </div>
                </div>
              ))}
              {!isDailyRun && !hasDailyBeenPlayed() && onPlayDaily && walletAddress && (
                <div style={{ marginTop: 12, fontSize: 12, color: 'rgba(200,160,48,0.75)', fontFamily: "'Cinzel', serif", letterSpacing: 1, textAlign: 'center' }}>
                  Daily still open today — same seas as every captain.
                </div>
              )}
              {!isDailyRun && !hasDailyBeenPlayed() && !walletAddress && (
                <div style={{ marginTop: 12, fontSize: 12, color: 'rgba(200,160,48,0.75)', fontFamily: "'Cinzel', serif", letterSpacing: 1, textAlign: 'center' }}>
                  Connect to sail today’s Daily and climb the board.
                </div>
              )}
            </motion.div>
          )}

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}
            style={{ display: 'flex', gap: isMobile ? 16 : 32, marginBottom: isMobile ? 16 : 28, flexWrap: isMobile ? 'wrap' : 'nowrap', justifyContent: 'center', padding: isMobile ? '0 16px' : 0 }}>
            {[
              { label: 'SCORE', val: `${s.score} pts`, color: '#eedd44' },
              { label: 'BEST', val: `${Math.max(personalBest, s.score)} pts`, color: isNewRecord ? '#44ffaa' : 'rgba(255,255,255,0.3)' },
              { label: 'TURNS', val: s.turn, color: 'rgba(255,255,255,0.6)' },
              { label: 'GOLD', val: s.ship.gold, color: '#eedd44' },
              { label: 'HULL', val: `${s.ship.hull}/${s.ship.maxHull}`, color: s.ship.hull <= 5 ? '#ee4444' : s.ship.hull <= 10 ? '#ee8844' : '#44cc88' },
            ].map(st => (
              <div key={st.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: isMobile ? 10 : 13, color: 'rgba(255,255,255,0.3)', letterSpacing: isMobile ? 1 : 3, fontFamily: "'Cinzel', serif" }}>{st.label}</div>
                <div style={{ fontSize: isMobile ? 20 : 28, color: st.color, fontFamily: "'Cinzel', serif", fontWeight: 700 }}>{st.val}</div>
              </div>
            ))}
          </motion.div>

          {s.scoreBreakdown && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
              style={{ marginBottom: 16, padding: '12px 20px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(0,0,0,0.3)', width: '100%', maxWidth: 400 }}>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', letterSpacing: 3, fontFamily: "'Cinzel', serif", marginBottom: 8, textAlign: 'center' }}>SCORE BREAKDOWN</div>
              {[
                { label: 'MOVEMENT', val: s.scoreBreakdown.movement, color: '#6aaccc' },
                { label: 'COMBAT', val: s.scoreBreakdown.combat, color: '#ee6644' },
                { label: 'TREASURE', val: s.scoreBreakdown.treasure, color: '#eedd44' },
                { label: 'STREAKS', val: s.scoreBreakdown.streaks, color: '#cc44ee' },
                { label: 'FEATS', val: s.scoreBreakdown.achievements, color: '#44cc88' },
                ...(s.scoreBreakdown.other > 0 ? [{ label: 'BONUS', val: s.scoreBreakdown.other, color: '#aaaaff' }] : []),
              ].filter(b => b.val > 0).map(b => (
                <div key={b.label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontFamily: "'Cinzel', serif", letterSpacing: 1 }}>{b.label}</span>
                  <span style={{ fontSize: 12, color: b.color, fontFamily: "'Cinzel', serif", fontWeight: 700 }}>{b.val.toLocaleString()} pts</span>
                </div>
              ))}
            </motion.div>
          )}

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}
            style={{ fontSize: 13, color: 'rgba(255,255,255,0.25)', fontFamily: "'Cinzel', serif", letterSpacing: 2, marginBottom: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <div>
              {isDailyRun
                ? (isDailySeedRevealed() ? `Seed: ${s.seed} — Daily Key: ${getDailyKey()}` : 'Blind daily — seed revealed at 00:00 UTC')
                : `Seed: ${s.seed} — challenge your crew!`}
            </div>
            {isDailyRun && (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 14px', borderRadius: 20, border: '1px solid rgba(100,200,255,0.5)', background: 'rgba(0,30,60,0.7)', color: '#88ddff', fontSize: 12, fontFamily: "'Cinzel', serif", letterSpacing: 2 }}>
                ☀ DAILY RUN — {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </div>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            {account && !onChainDone && (
              <motion.button whileHover={{ scale: 1.05 }} disabled={submitting}
                onClick={async () => {
                  setSubmitting(true);
                  try {
                    await submitScoreOnChain(account as any, s.score, s.seed, s.turn, s.currentZone ?? 1, s.runTitle);
                  } catch (e) {
                    console.warn('On-chain submit failed:', e);
                  }
                  setOnChainDone(true);
                  setSubmitting(false);
                }}
                style={{ padding: '12px 32px', borderRadius: 10, border: '1px solid rgba(200,160,48,0.4)', background: 'rgba(200,160,48,0.1)', color: '#c8a030', fontSize: 16, letterSpacing: 3, cursor: 'pointer', fontFamily: "'Pirata One', cursive" }}>
                {submitting ? 'ENGRAVING...' : <><Icon name="anchor" size={16} style={{ marginRight: 6 }} />ENGRAVE ON STARKNET</>}
              </motion.button>
            )}
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', letterSpacing: 2, fontFamily: "'Cinzel', serif", textAlign: 'center', marginTop: -4 }}>OPTIONAL — CARVES THIS VOYAGE INTO STARKNET FOREVER</div>
            {scoreSubmitted && <div style={{ fontSize: 14, color: '#44cc88', letterSpacing: 2, fontFamily: "'Pirata One', cursive" }}>✓ SCORE SAVED — YOU'RE ON THE LEADERBOARD</div>}
            {nftMinted.length > 0 && (
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                style={{ padding: '12px 24px', borderRadius: 12, border: '1px solid rgba(200,160,48,0.6)', background: 'rgba(0,0,0,0.8)', textAlign: 'center' }}>
                <div style={{ marginBottom: 4 }}><Icon name="flag" size={24} /></div>
                <div style={{ fontSize: 16, color: '#FFD700', fontFamily: "'Pirata One', cursive", letterSpacing: 2 }}>NFT EARNED!</div>
                {nftMinted.map(n => (
                  <div key={n} style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', fontFamily: "'Cinzel', serif", marginTop: 4 }}>{n.replace(/_/g, ' ').toUpperCase()}</div>
                ))}
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontFamily: "'Cinzel', serif", marginTop: 8, lineHeight: 1.4 }}>Your NFT will be sent to your wallet soon.</div>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    const nftName = nftMinted[0].replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
                    const text = `🏴‍☠️ I earned "${nftName}" — a Genesis NFT in Corsair.\nNo mint button. No whitelist. Just sail, meet the condition, claim it before it's SOLD OUT.\nDare to find yours? ⚓\nhttps://playcorsair.xyz/`;
                    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
                  }}
                  style={{ marginTop: 10, padding: '8px 20px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.3)', background: 'rgba(0,0,0,0.5)', color: '#ffffff', cursor: 'pointer', fontSize: 13, fontFamily: "'Pirata One', cursive", letterSpacing: 1 }}>
                  𝕏 Share your find
                </motion.button>
              </motion.div>
            )}
            {!walletAddress && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', fontFamily: "'IM Fell English', cursive", textAlign: 'center', maxWidth: 360 }}>
                  This run stayed local. Connect a wallet to submit scores, play the Daily, and earn NFTs.
                </div>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                  onClick={onConnect} disabled={connecting}
                  style={{ padding: '12px 28px', borderRadius: 10, border: '1px solid rgba(200,160,48,0.55)', background: 'rgba(200,160,48,0.12)', color: '#c8a030', cursor: 'pointer', fontSize: 15, letterSpacing: 2, fontFamily: "'Pirata One', cursive" }}>
                  {connecting ? 'CONNECTING...' : 'CONNECT WALLET'}
                </motion.button>
              </div>
            )}
            {showGuestDailyCta && onPlayDaily && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', fontFamily: "'IM Fell English', cursive", textAlign: 'center', maxWidth: 360 }}>
                  Wallet linked. This run stayed local — sail the Daily to climb today's board.
                </div>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                  onClick={onPlayDaily}
                  style={{ padding: '12px 28px', borderRadius: 10, border: '2px solid rgba(200,160,48,0.75)', background: 'rgba(200,160,48,0.18)', color: '#c8a030', cursor: 'pointer', fontSize: 16, letterSpacing: 2, fontFamily: "'Pirata One', cursive" }}>
                  PLAY DAILY · 1 TRY
                </motion.button>
              </div>
            )}
            {(() => {
              const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
              const rarityRank: Record<string, number> = { legendary: 3, rare: 2, common: 1 };
              const bestRelic = (s.relics ?? [])
                .map(id => getRelicDef(id))
                .filter((r): r is RelicDef => !!r)
                .sort((a, b) => (rarityRank[b.rarity] ?? 0) - (rarityRank[a.rarity] ?? 0))[0];
              const relicLine = bestRelic ? `\nFound the ${bestRelic.name} relic along the way.` : '';
              const rankLine = rangMois
                ? `\n⚔️ #${rangMois.rank} in Starktember — ${rangMois.total.toLocaleString()} pts across the month.`
                : '';
              const text = isDailyRun
                ? `☀️ Daily Challenge — ${today} — ${s.score} pts before the storm claimed me.\nSame sea for every captain today. Can you beat me?${rankLine}${relicLine}\n⚓ @PlayCorsair https://playcorsair.xyz/ #Starktember #Starknet`
                : `🏴\u200d☠️ ${s.runTitle} — ${s.score} pts before the storm claimed me.\n${s.turn} turns · ${s.ship.gold} gold · No mercy.${relicLine}\nSame waters, seed ${s.seed}. Dare to sail further? ⚓ @PlayCorsair\nhttps://playcorsair.xyz/ #Starknet`;
              const death = deriveDeathCause(s.log);
              return (
                <ShareCard
                  isMobile={isMobile}
                  onShare={() => { void shareVoyage(text); }}
                  payload={{
                    score: s.score,
                    turn: s.turn,
                    gold: s.ship.gold,
                    runTitle: s.runTitle,
                    seed: s.seed,
                    deathName: death.name,
                    isDaily: isDailyRun,
                    text,
                  }}
                />
              );
            })()}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              {harborDown && (
                <div style={{ fontSize: 12, color: 'rgba(238,100,100,0.85)', fontFamily: "'Cinzel', serif", letterSpacing: 1, textAlign: 'center' }}>
                  Harbor unreachable — try Sail again when you're back online
                </div>
              )}
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
                {!isDailyRun && !hasDailyBeenPlayed() && onPlayDaily && walletAddress && (
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} onClick={onPlayDaily}
                    style={{ padding: '14px 28px', borderRadius: 12, border: '2px solid rgba(136,221,255,0.7)', background: 'rgba(30,80,110,0.45)', color: '#88ddff', cursor: 'pointer', fontSize: 18, fontWeight: 700, letterSpacing: 2, fontFamily: "'Pirata One', cursive",
                      boxShadow: '0 0 20px rgba(100,180,220,0.2)' }}>
                    PLAY DAILY · 1 TRY
                  </motion.button>
                )}
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} onClick={onRestart} disabled={restarting}
                  style={{ padding: '14px 36px', borderRadius: 12, border: '2px solid rgba(200,160,48,0.6)', background: 'rgba(80,60,10,0.5)', color: '#c8a030', cursor: restarting ? 'wait' : 'pointer', fontSize: 20, fontWeight: 700, letterSpacing: 2, fontFamily: "'Pirata One', cursive",
                    boxShadow: '0 0 20px rgba(200,160,48,0.2)', opacity: restarting ? 0.7 : 1 }}>
                  {restarting ? 'PREPARING…' : 'SAIL AGAIN'}
                </motion.button>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} onClick={onHome}
                  style={{ padding: '14px 24px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: 'rgba(255,255,255,0.3)', cursor: 'pointer', fontSize: 14, letterSpacing: 2, fontFamily: "'Pirata One', cursive" }}>
                  ← MENU
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
