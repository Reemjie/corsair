import swiftSailsImg from '../../assets/upgrades/swift_sails.png';
import ghostShipImg from '../../assets/upgrades/ghost_ship.png';
import treasureHunterImg from '../../assets/upgrades/treasure_hunter.png';
import stormRiderImg from '../../assets/upgrades/storm_rider.png';
import cursedGreedImg from '../../assets/upgrades/cursed_greed.png';
import berserkerImg from '../../assets/upgrades/berserker.png';
import { BALANCE } from '../../game/balance';

export const UPGRADE_ICONS: Record<string, string> = {
  escape: swiftSailsImg,
  ghost: ghostShipImg,
  hunter: treasureHunterImg,
  rider: stormRiderImg,
  greed: cursedGreedImg,
  berserker: berserkerImg,
};

/** Codes stables des ameliorations pour le log de coups (ne jamais reordonner).
 *  Indices 0–5 = specials live. Slots 6–12 reserves (anciens stubs) — ne pas recycler. */
export const UPGRADE_CODES: string[] = [
  'ghost', 'hunter', 'rider', 'greed', 'berserker', 'escape',
  '_reserved6', '_reserved7', '_reserved8', '_reserved9', '_reserved10', '_reserved11', '_reserved12',
];

const C = BALANCE.upgrades.costs;
const surgePct = Math.round(BALANCE.storm.hunterSurgeBonus * 100);

export const UPGRADES = [
  { id: 'ghost', name: 'Ghost Ship', pros: ['Pirates ignore you. +2 vision.'], cons: ['Cannot dock at ports. Krakens attracted on sea cells.'], cost: C.ghost, icon: 'ghost', build: 'combat' },
  { id: 'rider', name: 'Storm Rider', pros: ['Storm immunity. Storm cells give gold+score.', 'Hull+Rider synergy heals on storm.'], cons: ['-1 HP every 2 turns. Repairs -50%.'], cost: C.rider, icon: 'rider', build: 'escape' },
  { id: 'greed', name: 'Cursed Greed', pros: [`Gold x${BALANCE.greed.goldMultiplier} on combat.`], cons: ['Cannot repair at port. Storm worsens every 200g. Pirates hit harder at 400g+. Hunter aggro at 600g+.'], cost: C.greed, icon: 'greed', build: 'gold' },
  { id: 'berserker', name: 'Berserker', pros: ['Power x2. Weapon3 synergy = 15% crit chance.'], cons: ['All damage received x2.'], cost: C.berserker, icon: 'berserker', build: 'combat' },
  { id: 'hunter', name: 'Treasure Hunter', pros: ['All treasures revealed on map. x3 combo = treasure reward x2.'], cons: [`Storm surges +${surgePct}% more frequent.`], cost: C.hunter, icon: 'hunter', build: 'gold' },
  { id: 'escape', name: 'Swift Sails', pros: ['Skip one dangerous event per run with no consequences. Save for the worst moment.'], cons: [], cost: C.escape, icon: 'escape', build: 'escape' },
] as const;

export const BUILD_COLOR: Record<string, string> = {
  vision: '#6aaccc', gold: '#eedd44', combat: '#ee6644', escape: '#44cc88',
};

function Pip({ ok }: { ok: boolean }) {
  return (
    <span style={{
      display: 'inline-block', width: 7, height: 7, borderRadius: '50%', flexShrink: 0,
      marginTop: 6, marginRight: 7,
      background: ok ? '#4ccf7e' : '#d9534f',
      boxShadow: ok ? '0 0 5px rgba(76,207,126,0.6)' : '0 0 5px rgba(217,83,79,0.6)',
    }} />
  );
}

export function UpgradeDesc({ pros, cons, fontSize = 11, opacity = 0.55 }: {
  pros: readonly string[];
  cons: readonly string[];
  fontSize?: number;
  opacity?: number;
}) {
  const Row = (text: string, ok: boolean, key: string) => (
    <div key={key} style={{ display: 'flex', alignItems: 'flex-start', lineHeight: 1.45 }}>
      <Pip ok={ok} />
      <span style={{ color: `rgba(255,255,255,${opacity})` }}>{text}</span>
    </div>
  );
  return (
    <div style={{ fontSize, display: 'flex', flexDirection: 'column', gap: 3 }}>
      {pros.map((p, i) => Row(p, true, 'p' + i))}
      {cons.map((c, i) => Row(c, false, 'c' + i))}
    </div>
  );
}
