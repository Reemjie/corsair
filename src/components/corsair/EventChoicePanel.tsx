import { motion } from 'framer-motion';
import type { ActiveEvent } from '../../types/game';
import type { OnboardTip } from '../../game/onboard';
import OnboardCard from './OnboardCard';
import { CHOICE_ICONS, SCENE_BG, SCENE_TITLES } from './scenes';
import { canAffordChoice, choiceDescription, riskColor } from './eventChoice';

function renderCellIcon(icon: string | undefined, size: number) {
  if (!icon) return null;
  return (icon.startsWith('http') || icon.startsWith('/'))
    ? <img src={icon} alt="" style={{ width: size, height: size, objectFit: 'contain', borderRadius: '50%', mixBlendMode: 'lighten', filter: 'drop-shadow(0 0 12px rgba(200,160,48,0.6))' }} />
    : <span style={{ fontSize: size }}>{icon}</span>;
}

export type EventChoicePanelProps = {
  variant: 'scene' | 'compact';
  event: ActiveEvent;
  isMobile: boolean;
  gold: number;
  hull: number;
  relics?: string[];
  score?: number;
  cellIcon?: string;
  onboard?: OnboardTip | null;
  onDismissOnboard?: () => void;
  onChoose: (index: number) => void;
  canEscape?: boolean;
  onSkip?: () => void;
};

/** Panneau de choix unifie — scene illustree ou compact (sans SCENE_BG). */
export default function EventChoicePanel({
  variant,
  event,
  isMobile,
  gold,
  hull,
  relics,
  score,
  cellIcon,
  onboard,
  onDismissOnboard,
  onChoose,
  canEscape,
  onSkip,
}: EventChoicePanelProps) {
  const choices = (
    <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'stretch' : undefined, width: isMobile ? '100%' : undefined, gap: isMobile ? (variant === 'scene' ? 10 : 8) : (variant === 'scene' ? 16 : 10), justifyContent: 'center', marginTop: variant === 'compact' ? 8 : 0 }}>
      {event.choices.map((ch, i) => {
        const rc = riskColor(ch.risk);
        const canAfford = canAffordChoice(ch.desc, gold);
        const desc = choiceDescription(ch, event.cellType, relics, hull);
        const hover = variant === 'scene' ? 1.04 : 1.02;
        const tap = variant === 'scene' ? 0.96 : 0.98;
        return (
          <motion.button key={i} whileHover={{ scale: canAfford ? hover : 1 }} whileTap={{ scale: canAfford ? tap : 1 }}
            onClick={() => { if (!canAfford) return; onChoose(i); }}
            style={{
              flex: 1,
              maxWidth: variant === 'scene' && !isMobile ? 320 : undefined,
              padding: variant === 'scene' ? (isMobile ? '14px 16px' : '24px 28px') : '20px 24px',
              borderRadius: 16,
              border: `1.5px solid ${canAfford ? rc : 'rgba(255,255,255,0.1)'}55`,
              background: canAfford ? `linear-gradient(135deg, rgba(0,0,0,0.85) 0%, ${rc}0f 100%)` : 'rgba(0,0,0,0.5)',
              cursor: canAfford ? 'pointer' : 'not-allowed',
              color: canAfford ? '#e8e0d0' : 'rgba(255,255,255,0.3)',
              fontFamily: "'Pirata One', cursive",
              textAlign: 'left',
              backdropFilter: 'blur(8px)',
              boxShadow: variant === 'scene' && canAfford ? `0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 ${rc}22` : 'none',
              transition: 'all 0.2s',
              opacity: canAfford ? 1 : 0.5,
            }}>
            {variant === 'scene' ? (
              <div style={{ marginBottom: 12, textAlign: 'center' }}>
                <img src={CHOICE_ICONS[ch.icon] || ''} alt="" style={{ width: 72, height: 72, objectFit: 'contain' }} />
              </div>
            ) : (
              <div style={{ fontSize: 26, marginBottom: 4 }}>{ch.icon}</div>
            )}
            <div style={{ fontSize: variant === 'scene' ? 24 : 18, fontWeight: variant === 'scene' ? 700 : 600, color: rc, textAlign: variant === 'scene' ? 'center' : 'left' }}>{ch.label}</div>
            <div style={{ fontSize: 20, color: 'rgba(255,255,255,0.8)', fontFamily: "'IM Fell English', cursive", marginTop: variant === 'scene' ? 8 : 2, textAlign: variant === 'scene' ? 'center' : 'left' }}>{desc}</div>
            <div style={{ fontSize: variant === 'scene' ? 13 : 16, color: rc, marginTop: variant === 'scene' ? 10 : 4, letterSpacing: variant === 'scene' ? 2 : 1, textAlign: variant === 'scene' ? 'center' : 'left' }}>{ch.risk.toUpperCase()}</div>
          </motion.button>
        );
      })}
    </div>
  );

  const escapeBtn = canEscape && onSkip ? (
    <button onClick={onSkip} style={{ marginTop: 8, padding: '6px 16px', borderRadius: 7, border: '1px solid rgba(100,170,220,0.3)', background: 'transparent', color: 'rgba(100,170,220,0.5)', cursor: 'pointer', fontSize: 14 }}>
      ⛵ Use Swift Sails (1 use left)
    </button>
  ) : null;

  if (variant === 'scene') {
    return (
      <motion.div key="event-scene" initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
        transition={{ delay: 0.26, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', padding: isMobile ? '12px' : '24px', paddingBottom: isMobile ? 'calc(20px + env(safe-area-inset-bottom))' : 64, overflowY: 'auto' }}>
        {SCENE_BG[event.cellType] && (
          <div style={{ position: 'absolute', inset: 0, zIndex: 0, backgroundImage: `url(${SCENE_BG[event.cellType]})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        )}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, background: 'linear-gradient(to bottom, rgba(5,8,15,0.55) 0%, rgba(5,8,15,0.78) 60%, rgba(5,8,15,0.92) 100%)' }} />
        {score != null && (
          <div style={{ position: 'absolute', top: 16, right: 24, display: 'flex', alignItems: 'center', gap: 6, zIndex: 2 }}>
            <div style={{ fontSize: isMobile ? 13 : 18, fontWeight: 700, color: '#eedd44' }}>{score}{isMobile ? 'pts' : ' pts'}</div>
          </div>
        )}
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 700, width: '100%', textAlign: 'center' }}>
          {onboard && onDismissOnboard && (
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
              <OnboardCard tip={onboard} isMobile={isMobile} onDismiss={onDismissOnboard} />
            </div>
          )}
          <div style={{ alignSelf: 'flex-start', marginBottom: 16, paddingLeft: 8 }}>
            <div style={{ fontSize: isMobile ? 28 : 42, fontWeight: 700, color: '#e8e0d0', fontFamily: "'Pirata One', cursive", letterSpacing: 3, textShadow: '0 2px 20px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.7)', lineHeight: 1.1 }}>
              {SCENE_TITLES[event.cellType] ?? event.cellType}
            </div>
          </div>
          {choices}
          {escapeBtn && <div style={{ marginTop: 4 }}>{escapeBtn}</div>}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div key="event-compact" initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }}
      style={{ background: 'rgba(5,10,18,0.97)', borderTop: '1px solid rgba(255,255,255,0.1)', padding: '16px 24px', flexShrink: 0 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20, maxWidth: 700, margin: '0 auto' }}>
        <div style={{ flexShrink: 0 }}>{renderCellIcon(cellIcon, 55)}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 21, fontWeight: 700, marginBottom: 4, color: '#e8e0d0' }}>
            {event.cellType.charAt(0).toUpperCase() + event.cellType.slice(1).replace('_', ' ')}
          </div>
          {onboard && onDismissOnboard && (
            <OnboardCard tip={onboard} isMobile={isMobile} onDismiss={onDismissOnboard} />
          )}
          {choices}
          {escapeBtn}
        </div>
      </div>
    </motion.div>
  );
}
