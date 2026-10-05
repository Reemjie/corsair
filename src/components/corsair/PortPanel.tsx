import { motion, AnimatePresence } from 'framer-motion';
import type { Dispatch, SetStateAction } from 'react';
import type { Ship, UpgradeId } from '../../types/game';
import type { OnboardTip } from '../../game/onboard';
import { Icon } from '../../Icon';
import OnboardCard from './OnboardCard';
import { UPGRADES, UPGRADE_ICONS, BUILD_COLOR, UpgradeDesc } from './upgrades';
import anchorImg from '../../assets/anchor.png';
import hullImg from '../../assets/hull.png';
import visionImg from '../../assets/vision.png';
import powerImg from '../../assets/power.png';

export type PortPanelProps = {
  open: boolean;
  isMobile: boolean;
  ship: Ship;
  portUpgrades: string[];
  upgradeToken: boolean;
  maxedComponents: number;
  cart: string[];
  setCart: Dispatch<SetStateAction<string[]>>;
  onboard?: OnboardTip | null;
  onDismissOnboard?: () => void;
  onUpgradeComponent: (c: 'hull' | 'weapon' | 'nav') => void;
  onReroll: () => void;
  freeReroll?: boolean;
  onRepair: (hullGain: number, cost: number, actionCode: number) => void;
  onSetSail: () => void;
};

export default function PortPanel({
  open,
  isMobile,
  ship,
  portUpgrades,
  upgradeToken,
  maxedComponents,
  cart,
  setCart,
  onboard,
  onDismissOnboard,
  onUpgradeComponent,
  onReroll,
  freeReroll,
  onRepair,
  onSetSail,
}: PortPanelProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }}
          style={{ background: 'rgba(5,10,18,0.985)', borderTop: '1px solid rgba(68,204,136,0.2)', padding: isMobile ? '12px 12px calc(12px + env(safe-area-inset-bottom))' : '16px 24px', flexShrink: 0, position: 'relative', zIndex: 5, maxHeight: isMobile ? '62vh' : undefined, overflowY: isMobile ? 'auto' : undefined }}>
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <img src={anchorImg} alt="" style={{ width: 40, height: 40, objectFit: 'contain' }} />
              <span style={{ fontSize: 26, fontWeight: 700, color: '#44cc88', letterSpacing: 2, fontFamily: "'Pirata One', cursive" }}>SAFE HARBOR</span>
            </div>
            {onboard && onDismissOnboard && (
              <OnboardCard tip={onboard} isMobile={isMobile} onDismiss={onDismissOnboard} />
            )}

            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 14, letterSpacing: 3, color: 'rgba(255,255,255,0.5)', fontFamily: "'Cinzel', serif", marginBottom: 10 }}>SHIP COMPONENTS</div>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap: 8 }}>
                {([
                  { key: 'hull' as const, label: 'HULL', img: hullImg, color: '#44cc88', effects: ['Hull 20', 'Hull 28 −2 storm dmg', 'Hull 38 −3 env dmg'] },
                  { key: 'weapon' as const, label: 'ARMEMENT', img: powerImg, color: '#ee6644', effects: ['Power 2', 'Power 5 +min dmg', 'Power 9 −3 combat dmg'] },
                  { key: 'nav' as const, label: 'NAVIGATION', img: visionImg, color: '#6aaccc', effects: ['Vision base 1', 'Vision base 2 (stacks with Spyglass)', 'Vision base 3 +detect'] },
                ]).map(comp => {
                  const lvl = ship.levels[comp.key];
                  const cost = lvl === 0 ? 50 : 110;
                  const canUpgrade = lvl < 2 && ship.gold >= cost && !(lvl === 1 && maxedComponents >= 2);
                  const isMaxed = lvl >= 2;
                  return (
                    <div key={comp.key} onClick={() => canUpgrade && onUpgradeComponent(comp.key)}
                      style={{ background: `${comp.color}12`, border: `1px solid ${comp.color}${canUpgrade ? '66' : '22'}`, borderRadius: 10, padding: '12px 10px', cursor: canUpgrade ? 'pointer' : 'default', opacity: canUpgrade || isMaxed ? 1 : 0.5, transition: 'all 0.2s' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: comp.color, fontFamily: "'Pirata One', cursive" }}>
                          <img src={comp.img} alt="" style={{ width: 22, height: 22, objectFit: 'contain' }} />{comp.label}
                        </div>
                        <div style={{ display: 'flex', gap: 3 }}>
                          {[0, 1, 2].map(i => <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: i <= lvl ? comp.color : 'rgba(255,255,255,0.1)' }} />)}
                        </div>
                      </div>
                      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', fontFamily: "'IM Fell English', cursive", marginBottom: 6 }}>{comp.effects[lvl]}</div>
                      {!isMaxed && (
                        <div style={{ fontSize: 11, color: canUpgrade ? '#eedd44' : 'rgba(255,255,255,0.2)', fontFamily: "'Cinzel', serif" }}>
                          {lvl === 1 && maxedComponents >= 2 ? 'MAX 2 N3' : `→ N${lvl + 2} · ${cost}g`}
                        </div>
                      )}
                      {isMaxed && <div style={{ fontSize: 11, color: comp.color, fontFamily: "'Cinzel', serif" }}>✓ MAX</div>}
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <div style={{ fontSize: 16, color: 'rgba(255,255,255,0.6)', fontFamily: "'Pirata One', cursive" }}>Available upgrades</div>
              <motion.button whileHover={{ scale: 1.05 }} onClick={onReroll}
                style={{ padding: '4px 12px', borderRadius: 6, border: freeReroll ? '1px solid rgba(238,221,68,0.55)' : '1px solid rgba(255,200,50,0.3)', background: freeReroll ? 'rgba(238,221,68,0.14)' : 'rgba(255,200,50,0.08)', cursor: 'pointer', color: '#eedd44', fontSize: 13, fontFamily: "'Pirata One', cursive" }}>
                {freeReroll ? '🎲 Free reroll (Merchant)' : '🎲 Reroll (20g)'}
              </motion.button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginBottom: 12 }}>
              {UPGRADES.filter(upg => portUpgrades.includes(upg.id) || ship.upgrades.includes(upg.id as UpgradeId)).map(upg => {
                const owned = ship.upgrades.includes(upg.id as UpgradeId);
                const inCart = cart.includes(upg.id);
                const cost = upgradeToken ? 0 : upg.cost;
                const atMax = (ship.upgrades.length + cart.length) >= 2;
                const canAdd = !owned && !inCart && ship.gold >= cost && !atMax;
                const bc = BUILD_COLOR[upg.build];
                return (
                  <div key={upg.id}
                    onClick={() => {
                      if (inCart) setCart(c => c.filter(x => x !== upg.id));
                      else if (canAdd) setCart(c => [...c, upg.id]);
                    }}
                    style={{ padding: '14px 18px', borderRadius: 10, border: `1px solid ${owned ? bc + '66' : inCart ? '#44cc8866' : canAdd ? bc + '33' : 'rgba(255,255,255,0.05)'}`, background: owned ? `${bc}18` : inCart ? 'rgba(68,204,136,0.15)' : canAdd ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.01)', cursor: canAdd || inCart ? 'pointer' : 'default', opacity: owned || canAdd || inCart ? 1 : 0.35, display: 'flex', alignItems: 'center', gap: 12 }}>
                    <img src={UPGRADE_ICONS[upg.id]} alt="" style={{ width: 44, height: 44, objectFit: 'contain' }} />
                    <div>
                      <div style={{ fontSize: 17, fontWeight: 700, color: owned ? bc : inCart ? '#44cc88' : '#e8e0d0', fontFamily: "'Pirata One', cursive" }}>{upg.name}</div>
                      <div style={{ marginTop: 3 }}>
                        <UpgradeDesc pros={upg.pros} cons={upg.cons} fontSize={12} opacity={0.5} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {(ship.upgrades.length + cart.length) >= 2 && (
              <div style={{ fontSize: 12, color: 'rgba(238,102,85,0.8)', fontFamily: "'Cinzel', serif", letterSpacing: 1, textAlign: 'center', marginBottom: 8 }}>
                MAX 2 SPECIAL ABILITIES
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            {[
              { label: 'Rum Barrel', desc: '+8 hull', cost: 25, gain: 8, code: 60 },
              { label: 'Full Repair', desc: 'Restore all', cost: 55, gain: ship.maxHull, code: 61 },
            ].map(item => (
              <motion.button key={item.label} whileTap={{ scale: 0.97 }}
                onClick={() => onRepair(item.gain, item.cost, item.code)}
                disabled={ship.gold < item.cost || ship.hull >= ship.maxHull}
                style={{ flex: 1, padding: '10px 8px', borderRadius: 10, border: '1px solid rgba(68,204,136,0.3)', background: 'rgba(68,204,136,0.08)', cursor: (ship.gold >= item.cost && ship.hull < ship.maxHull) ? 'pointer' : 'not-allowed', opacity: (ship.gold >= item.cost && ship.hull < ship.maxHull) ? 1 : 0.4, textAlign: 'center' }}>
                <div style={{ fontSize: 13, color: '#44cc88', fontFamily: "'Pirata One', cursive" }}>{item.label}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>{item.desc}</div>
                <div style={{ fontSize: 12, color: '#eedd44', marginTop: 4 }}>◆ {item.cost}g</div>
              </motion.button>
            ))}
          </div>

          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={onSetSail}
            style={{ width: '100%', padding: '14px', borderRadius: 12, border: '2px solid rgba(200,160,48,0.5)', background: 'rgba(200,160,48,0.1)', color: '#c8a030', fontSize: 18, fontFamily: "'Pirata One', cursive", letterSpacing: 3, cursor: 'pointer' }}>
            <Icon name="anchor" size={22} style={{ marginRight: 8 }} />SET SAIL
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
