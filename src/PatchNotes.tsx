import { motion } from 'framer-motion';
import { Icon } from './Icon';

type PatchSection = {
  title: string;
  items: string[];
};

type Patch = {
  version: string;
  date: string;
  headline: string;
  sections: PatchSection[];
};

const PATCHES: Patch[] = [
  {
    version: '1.2',
    date: 'October 2026',
    headline: 'What the shop promises, the sea delivers',
    sections: [
      {
        title: 'Honesty',
        items: [
          'Berserker now truly takes ×2 damage from all sources — and weapon upgrades keep your doubled Power.',
          'Swift Sails is one escape per run (as the button already said).',
          'Ports offer 4 special abilities on dock — same as after a reroll.',
        ],
      },
      {
        title: 'Special abilities',
        items: [
          'Treasure Hunter costs 60g; storm surges are +15% more frequent.',
          'Cursed Greed: at 400g+ pirates hit harder; Hunter aggro and frenzy thresholds match the corruption ladder.',
        ],
      },
      {
        title: 'HUD',
        items: [
          'Hunter tile badge no longer truncates (TRK / STK / SRC / ENR).',
          'Sail controls and log stay on-screen — Hunter banner overlays the map instead of pushing the layout.',
        ],
      },
    ],
  },
  {
    version: '1.1',
    date: 'October 2026',
    headline: 'Ships, vision & clearer seas',
    sections: [
      {
        title: 'Balance',
        items: [
          'Fleeing a danger now pushes the storm back by 3.',
          'Below 8 hull, risky choices no longer build your danger streak.',
          'Combat hits harder mid-map (×1.15) and far north (×1.3).',
        ],
      },
      {
        title: 'Vision',
        items: [
          'Navigation and Cracked Spyglass now stack (cap 4).',
          'Kraken blindness recovers 1 vision every 5 turns.',
          'Cursed gold still costs permanent −1 vision.',
        ],
      },
      {
        title: 'The Hunter',
        items: [
          'Map banner shows mode, distance, and estimated hit damage.',
          'Clearer HUD and tile badge so you can read the threat at a glance.',
        ],
      },
      {
        title: 'Ships',
        items: [
          'Ship badge on the HUD — always know your vessel.',
          'The Wanderer — Steady Hand: +50 pts the first time you hit ×3 streak.',
          'The Merchant — 1 free port reroll each docking.',
          'The Specter — always see the Hunter’s next step; fades better while it searches.',
          'The Breakwater — softer storm damage; full-speed reefs deal no scrape.',
          'The Corsair (new) — unlock via Daredevil. +1 Power, −3 hull, +20 score per pirate win.',
          'Free runs: with 2+ ships unlocked, PLAY drafts 3 — pick 1 for that voyage.',
          'Daily Challenge still forces The Wanderer.',
        ],
      },
      {
        title: 'Fair play',
        items: [
          'Port actions only work in port — illegal at-sea logs are rejected on replay.',
        ],
      },
    ],
  },
];

export default function PatchNotes({ onClose }: { onClose: () => void }) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(3,6,12,0.88)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <motion.div initial={{ scale: 0.94, y: 12 }} animate={{ scale: 1, y: 0 }}
        onClick={e => e.stopPropagation()}
        style={{ width: '100%', maxWidth: 560, maxHeight: '86vh', overflowY: 'auto', borderRadius: 18, border: '2px solid rgba(200,160,48,0.45)', background: 'linear-gradient(160deg, rgba(24,18,6,0.98), rgba(8,12,20,0.98))', padding: '22px 20px calc(20px + env(safe-area-inset-bottom))' }}>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
          <div style={{ fontFamily: "'Pirata One', cursive", fontSize: isMobile ? 24 : 28, color: '#d4a531', letterSpacing: 3 }}>
            <Icon name="star" size={isMobile ? 26 : 30} style={{ marginRight: 10 }} />PATCH NOTES
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', fontSize: 22, cursor: 'pointer' }}>✕</button>
        </div>
        <div style={{ fontFamily: "'Cinzel', serif", fontSize: 12, color: 'rgba(136,221,255,0.75)', letterSpacing: 2, marginBottom: 18 }}>
          WHAT'S NEW ON THE TIDE
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          {PATCHES.map(patch => (
            <div key={patch.version}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12, marginBottom: 4, flexWrap: 'wrap' }}>
                <div style={{ fontFamily: "'Pirata One', cursive", fontSize: 20, color: '#eedd88', letterSpacing: 1 }}>
                  v{patch.version}
                </div>
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: 11, color: 'rgba(200,160,48,0.7)', letterSpacing: 2 }}>
                  {patch.date}
                </div>
              </div>
              <div style={{ fontFamily: "'IM Fell English', cursive", fontSize: 15, color: 'rgba(255,255,255,0.65)', fontStyle: 'italic', marginBottom: 14 }}>
                {patch.headline}
              </div>

              {patch.sections.map(sec => (
                <div key={sec.title} style={{ marginBottom: 14 }}>
                  <div style={{ fontFamily: "'Cinzel', serif", fontSize: 12, letterSpacing: 3, color: '#c8a030', marginBottom: 8, paddingBottom: 6, borderBottom: '1px solid rgba(200,160,48,0.2)' }}>
                    {sec.title.toUpperCase()}
                  </div>
                  <ul style={{ margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {sec.items.map(item => (
                      <li key={item} style={{ fontFamily: "'IM Fell English', cursive", fontSize: 14.5, color: 'rgba(255,255,255,0.72)', lineHeight: 1.45 }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
