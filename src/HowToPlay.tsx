import { motion } from 'framer-motion';
import { Icon } from './Icon';

const BASE = import.meta.env.BASE_URL;

const CELLS = [
  { icon: 'sea',             label: 'Calm Sea',        desc: 'You sail through without any event. But watch out — small random events can still occur: a favorable wind grants bonus points, floating debris gives gold, or your hull creaks for minor damage.', color: '#1a5a7a' },
  { icon: 'storm',           label: 'Storm',           desc: 'A violent storm blocks your path. You can push through (no storm turn lost but risk hull damage) or go around (safe but the storm advances 1 extra turn toward you).', color: '#4a2a8a' },
  { icon: 'pirate',          label: 'Pirates',         desc: 'A pirate ship attacks! You can fight them (take damage but earn gold and notoriety) or pay a tribute (lose gold but stay safe). The higher your notoriety, the more the tribute costs — but also the more gold you earn in battle.', color: '#8a2020' },
  { icon: 'treasure',        label: 'Treasure',        desc: 'You found a chest full of gold! Take it to earn gold and points. The more danger you have chained before this (combo), the more points you earn. Some treasures are cursed — beware.', color: '#8a7a00' },
  { icon: 'port',            label: 'Port',            desc: 'A safe harbor. Dock to repair your ship with Rum Barrel (+8 hull) or Full Repair (restore all hull), and browse 4 random upgrades. You can reroll upgrades for 20 gold. Always try to visit ports before your hull gets too low.', color: '#005a5a' },
  { icon: 'kraken',          label: 'Kraken',          desc: 'A terrifying sea monster! Attack it for massive rewards (+150 pts, vision cursed -1) or make a Pact: lose 20 HP but delay the storm by 6 turns. The Pact is often the better deal when desperate — but it awakens The Hunter.', color: '#4a008a' },
  { icon: 'wreck',           label: 'Wreck',           desc: 'The remains of a sunken ship. Search it for a chance at +40 to +100 gold (60% chance), but risk a booby trap (-6 to -12 hull, 40% chance). Or ignore it completely.', color: '#5a3a00' },
  { icon: 'island',          label: 'Island',          desc: 'A mysterious island. Perform an Ancient Ritual (spend 100 gold to delay the storm +4 turns) or explore freely for a chance to find a free upgrade token. Rituals are one of the best ways to extend your run.', color: '#005a20' },
  { icon: 'rocks',           label: 'Rocks',           desc: 'Dangerous reefs ahead. Navigate carefully to pass safely, or go full speed to save time but risk hull damage.', color: '#2a2a2a' },
  { icon: 'maelstrom',       label: 'Maelstrom',       desc: 'LEGENDARY — Rare event in mid/late zones. Enter the vortex to be teleported to a random location on the map (extreme risk and reward) or fight the current to resist it (lose 1 storm turn but stay safe).', color: '#3a006a', legendary: true },
  { icon: 'cursed_treasure', label: 'Cursed Treasure', desc: 'LEGENDARY — Rare event. Taking it gives +300 gold and major score points, but permanently reduces your vision by 1. Leave it to walk away clean.', color: '#6a3a00', legendary: true },
  { icon: 'ancient_kraken',  label: 'Ancient Kraken',  desc: 'LEGENDARY — The most dangerous encounter. Face it for +800 pts, +200 gold, and +3 power — but take massive damage. Or offer a sacrifice of 50 gold for safe passage. Defeating it unlocks the Legendary exploit (+1000 pts).', color: '#003a5a', legendary: true },
];

const UPGRADES = [
  { id: 'ghost',    name: 'Ghost Ship',      desc: '+2 vision on equip. Pirates always avoid you. Cannot dock at ports. Krakens are attracted to you on sea tiles (midgame+). A high-mobility stealth build — ultra fragile, ultra fast.',                                                cost: '80g', color: '#ee6644' },
  { id: 'rider',    name: 'Storm Rider',     desc: 'Storm immunity — storm cells give you gold, score, and +1 vision instead of killing you. Trade-off: -1 HP every 2 turns, port repairs heal only 50%. Play aggressive, surf the storm front.',                                              cost: '90g', color: '#44cc88' },
  { id: 'greed',    name: 'Cursed Greed',    desc: 'Gold x1.5 on combat. Cannot repair at port. Corruption scales with wealth: 600g = cursed events start. 800g = Hunter doubles speed. The richer you get, the more the world hunts you.',                                                                        cost: '60g', color: '#eedd44' },
  { id: 'berserker',name: 'Berserker',       desc: 'Doubles your Power stat immediately. But you also receive twice as much damage from all sources. Best combined with Hull upgrades.',                                                                cost: '60g', color: '#ee6644' },
  { id: 'hunter',   name: 'Treasure Hunter', desc: 'Reveals all treasures on the map and doubles your treasure reward when your combo is at ×3. Downside: storm surges become 10% more likely.',                                                      cost: '75g', color: '#eedd44' },
  { id: 'escape',   name: 'Swift Sails',     desc: 'Lets you skip dangerous events twice per run with no consequences. Save it for the most desperate situations.',                                                                                    cost: '65g', color: '#44cc88' },
];

const UPGRADE_ICONS: Record<string, string> = {
  ghost: 'upgrades/ghost_ship.png', rider: 'upgrades/storm_rider.png',
  greed: 'upgrades/cursed_greed.png', berserker: 'upgrades/berserker.png',
  hunter: 'upgrades/treasure_hunter.png', escape: 'upgrades/swift_sails.png',
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 36 }}>
      <div style={{ fontSize: 15, letterSpacing: 5, color: '#c8a030', fontFamily: "'Cinzel', serif", marginBottom: 16, paddingBottom: 10, borderBottom: '1px solid rgba(200,160,48,0.2)' }}>
        {title}
      </div>
      {children}
    </div>
  );
}

export default function HowToPlay({ onClose, onPlay }: { onClose: () => void; onPlay: () => void }) {
  const isMobile = window.innerWidth < 768;
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, fontFamily: "'Pirata One', cursive" }}
      onClick={onClose}>
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
        onClick={e => e.stopPropagation()}
        style={{ background: 'linear-gradient(135deg, #0a1422 0%, #060e18 100%)', border: '1px solid rgba(200,160,48,0.3)', borderRadius: isMobile ? 0 : 20, padding: isMobile ? 16 : 36, maxWidth: 960, width: '100%', height: isMobile ? '100vh' : 'auto', maxHeight: isMobile ? '100vh' : '88vh', overflowY: 'auto', position: 'relative' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: isMobile ? 20 : 30, color: '#c8a030', letterSpacing: isMobile ? 3 : 6 }}>HOW TO PLAY</div>
          <button onClick={onClose} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.4)', fontSize: 16, cursor: 'pointer', borderRadius: 8, padding: '6px 16px', fontFamily: "'Pirata One', cursive" }}>✕ CLOSE</button>
        </div>

        {/* Objectif */}
        <Section title="THE GOAL">
          <p style={{ fontFamily: "'IM Fell English', cursive", fontSize: 18, color: 'rgba(255,255,255,0.75)', lineHeight: 1.9 }}>
            You are a lone corsair sailing the northern seas. A deadly storm is chasing you from the south — and it never stops advancing. Your goal is to survive as long as possible, explore the fog-covered map, make smart decisions, and accumulate the highest score. There is no finish line. Every run ends in death. The only question is how far you can go before the sea claims you.
          </p>
        </Section>

        {/* Movement */}
        <Section title="MOVEMENT & NAVIGATION">
          <p style={{ fontFamily: "'IM Fell English', cursive", fontSize: 18, color: 'rgba(255,255,255,0.75)', lineHeight: 1.9, marginBottom: 16 }}>
            You can move in three directions each turn: <span style={{ color: '#c8a030' }}>← PORT</span> (left), <span style={{ color: '#c8a030' }}>↑ AHEAD</span> (forward), or <span style={{ color: '#c8a030' }}>STARBOARD →</span> (right). You cannot go backwards. Every move advances the storm by 1 turn and reveals the cells around you based on your current Vision stat. Each move also earns you +5 points.
          </p>
          <p style={{ fontFamily: "'IM Fell English', cursive", fontSize: 18, color: 'rgba(255,255,255,0.75)', lineHeight: 1.9 }}>
            The map is a 12×12 grid divided into three zones. The <span style={{ color: '#44cc88' }}>early zone</span> (bottom) is calmer with frequent ports. The <span style={{ color: '#eedd44' }}>mid zone</span> is where pirates, storms and hybrid events appear. The <span style={{ color: '#ee4444' }}>late zone</span> (top) is pure chaos with legendary encounters and relentless storms.
          </p>
        </Section>

        {/* Stats */}
        <Section title="YOUR STATS">
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)', gap: 12, marginBottom: 16 }}>
            {[
              { label: 'HULL', val: '20/20', desc: 'Your ship hit points. If it reaches 0, you sink. Repair at ports.', color: '#44cc88' },
              { label: 'GOLD', val: '80g', desc: 'Used to repair your ship and buy upgrades at port. Earned through combat and exploration.', color: '#eedd44' },
              { label: 'VISION', val: '1', desc: 'The radius of cells revealed around you each turn. Higher vision means more information.', color: '#6aaccc' },
              { label: 'POWER', val: '2', desc: 'Reduces damage received in combat. Every point of power directly lowers hull damage.', color: '#ee8844' },
              { label: 'STORM', val: '18', desc: 'Turns remaining before the storm reaches your position. Always watch this counter.', color: '#ee4444' },
              { label: 'NOTORIETY', val: '0-10', desc: 'Hidden stat. Rises when you fight pirates, falls when you pay tribute. Affects combat rewards and tribute costs.', color: '#cc44ee' },
            ].map(s => (
              <div key={s.label} style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${s.color}33`, borderRadius: 10, padding: '12px 16px' }}>
                <div style={{ fontSize: 12, letterSpacing: 3, color: s.color, fontFamily: "'Cinzel', serif" }}>{s.label}</div>
                <div style={{ fontSize: 24, color: s.color, marginTop: 4 }}>{s.val}</div>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', fontFamily: "'IM Fell English', cursive", marginTop: 6, lineHeight: 1.5 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* Storm */}
        <Section title="THE STORM">
          <div style={{ background: 'rgba(180,30,30,0.1)', border: '1px solid rgba(220,50,50,0.3)', borderRadius: 12, padding: 20, marginBottom: 12 }}>
            <p style={{ fontFamily: "'IM Fell English', cursive", fontSize: 18, color: 'rgba(255,255,255,0.75)', lineHeight: 1.9, margin: 0 }}>
              The storm advances from the bottom of the map every turn. When it reaches your position, you die instantly — unless you have the Storm Rider upgrade. Each turn, there is a small chance of a <span style={{ color: '#ee4444' }}>storm surge</span>, which advances it 2 turns instead of 1. This chance increases as you go deeper: 3% in the early zone, 12% in mid, and 25% in the late zone. When the storm is 4 turns away, the screen turns orange. At 2 turns, it turns red. You can delay the storm in two ways: spend 100 gold on an Ancient Ritual at an island (+4 turns), or make a Kraken Pact at the cost of 20 HP (+6 turns).
            </p>
          </div>
        </Section>

        {/* Zones & Portals */}
        <Section title="ZONES & PORTALS">
          <p style={{ fontFamily: "'IM Fell English', cursive", fontSize: 18, color: 'rgba(255,255,255,0.75)', lineHeight: 1.9, marginBottom: 16 }}>
            Your voyage spans three great zones, each more perilous and rewarding than the last: <span style={{ color: '#44cc88' }}>The Coasts</span>, then <span style={{ color: '#cc44ee' }}>The Storm Sea</span>, and finally <span style={{ color: '#ee4444' }}>The Abyss</span>. Storms grow fiercer and monsters deadlier with each crossing — but so do the points.
          </p>
          <div style={{ background: 'rgba(100,60,180,0.1)', border: '1px solid rgba(140,90,220,0.35)', borderRadius: 12, padding: 20 }}>
            <p style={{ fontFamily: "'IM Fell English', cursive", fontSize: 18, color: 'rgba(255,255,255,0.75)', lineHeight: 1.9, margin: 0 }}>
              After you have sailed deep enough into a zone, a glowing purple <span style={{ color: '#aa77ff' }}>VORTEX</span> appears somewhere ahead of you on the map. Watch the log — as you near it, reality begins to distort. Sail onto the vortex cell and choose <span style={{ color: '#aa77ff' }}>Enter the portal</span> to cross into the next zone. Crossing pushes the storm back and grants a large score bonus. The final zone, The Abyss, has no portal — it is the end of the line.
            </p>
          </div>
        </Section>

        {/* Cells */}
        <Section title="THE CELLS — WHAT YOU WILL ENCOUNTER">
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: 10 }}>
            {CELLS.map(cell => (
              <div key={cell.icon} style={{ background: `${cell.color}18`, border: `1px solid ${cell.color}44`, borderRadius: 12, padding: '14px 16px', display: 'flex', gap: 14, position: 'relative' }}>
                {cell.legendary && <div style={{ position: 'absolute', top: 8, right: 10, fontSize: 10, color: '#c8a030', fontFamily: "'Cinzel', serif", letterSpacing: 2, border: '1px solid rgba(200,160,48,0.3)', borderRadius: 4, padding: '1px 6px' }}>LEGENDARY</div>}
                <img src={`${BASE}icons/${cell.icon}.png`} style={{ width: 44, height: 44, objectFit: 'contain', flexShrink: 0, marginTop: 2 }}/>
                <div>
                  <div style={{ fontSize: 15, color: '#e8e0d0', marginBottom: 6 }}>{cell.label}</div>
                  <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', fontFamily: "'IM Fell English', cursive", lineHeight: 1.6 }}>{cell.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Score */}
        <Section title="SCORE & COMBO SYSTEM">
          <p style={{ fontFamily: "'IM Fell English', cursive", fontSize: 18, color: 'rgba(255,255,255,0.75)', lineHeight: 1.9, marginBottom: 16 }}>
            You earn +5 points per move. Combat, treasure, and exploration all add to your score. The key to a high score is the <span style={{ color: '#eedd44' }}>combo multiplier</span>: every time you encounter a dangerous cell (pirates, kraken, storm, rocks, wreck), your combo stack increases by 1 up to a maximum of ×3. Every safe cell decreases it by 1. If you flee or pay tribute, it drops by 2. This means the best scores come from chains of risky decisions — but each one could end your run.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)', gap: 8 }}>
            {[
              { label: '×1 → ×2 → ×3', desc: 'Chain dangers to boost all rewards', color: '#ee8844' },
            { label: 'Streak 2', desc: '+25% gold on all combat and treasure rewards', color: '#eedd44' },
            { label: 'Streak 3', desc: 'The Hunter becomes aggressive — moves every turn', color: '#ee8844' },
            { label: 'Streak 4', desc: '+8% storm surge chance + elite encounters replace pirates', color: '#ee6644' },
            { label: 'Streak 5', desc: 'Cursed waters — random curse triggers (-vision or -20% gold)', color: '#cc44ee' },
            { label: 'Streak 6+', desc: 'Legendary zone — ancient krakens and maelstroms everywhere', color: '#ff2222' },
              { label: '-1 stack', desc: 'Each safe cell (sea) reduces your combo by 1', color: '#6aaccc' },
              { label: '-2 stack', desc: 'Fleeing or paying tribute drops combo faster', color: '#ee4444' },
              { label: '+200 pts', desc: 'Exploit: survive at exactly 1 HP', color: '#eedd44' },
              { label: '+300 pts', desc: 'Exploit: 5 dangerous cells in a row', color: '#eedd44' },
              { label: '+500 pts', desc: 'Exploit: defeat the Kraken at ≤5 HP', color: '#eedd44' },
              { label: '+150 pts', desc: 'Exploit: navigate with 0 gold', color: '#eedd44' },
              { label: '+1000 pts', desc: 'Exploit: defeat the Ancient Kraken', color: '#c8a030' },
              { label: 'Run Title', desc: 'Earn a unique title based on your playstyle', color: '#cc44ee' },
            ].map(s => (
              <div key={s.label} style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${s.color}33`, borderRadius: 8, padding: '10px 14px', textAlign: 'center' }}>
                <div style={{ fontSize: 16, color: s.color }}>{s.label}</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', fontFamily: "'IM Fell English', cursive", marginTop: 4, lineHeight: 1.5 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* Port */}
        <Section title="THE PORT — YOUR LIFELINE">
          <p style={{ fontFamily: "'IM Fell English', cursive", fontSize: 18, color: 'rgba(255,255,255,0.75)', lineHeight: 1.9 }}>
            Whenever you land on a port cell and choose to dock, you enter the port. Here you can repair your hull with a Rum Barrel (+8 hull for 25 gold) or a Full Repair (restore all hull for 55 gold). You also see 4 randomly selected upgrades — each port offers a different selection. Click an upgrade to add it to your cart, then press Confirm to purchase. If the selection does not suit your build, you can reroll it for 20 gold. You can only own one of each upgrade per run, so choose wisely. Occasionally, exploring an island grants you an Upgrade Token — your next upgrade at port costs 0 gold, so save it for the most expensive ability.
          </p>
        </Section>

        {/* Upgrades */}
        <Section title="SHIP COMPONENTS">
          <p style={{ fontFamily: "'IM Fell English', cursive", fontSize: 18, color: 'rgba(255,255,255,0.75)', lineHeight: 1.9, marginBottom: 16 }}>
            At port you can upgrade 3 core components of your ship, each on 3 levels. Maximum 2 components can reach level 3 — forcing you to specialize.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)', gap: 12, marginBottom: 8 }}>
            {[
              { icon: 'anchor', label: 'HULL', color: '#44cc88', levels: ['N1 — Hull 20', 'N2 — Hull 28, -2 storm dmg', 'N3 — Hull 38, -3 env dmg'], cost: '50g → 110g' },
              { icon: 'swords', label: 'ARMEMENT', color: '#ee6644', levels: ['N1 — Power 2', 'N2 — Power 5, min dmg 2', 'N3 — Power 9, -3 combat dmg'], cost: '50g → 110g' },
              { icon: 'spyglass', label: 'NAVIGATION', color: '#6aaccc', levels: ['N1 — Vision 1', 'N2 — Vision 2 + danger detect', 'N3 — Vision 3 + detects nearby dangers in log'], cost: '50g → 110g' },
            ].map(comp => (
              <div key={comp.label} style={{ background: `${comp.color}12`, border: `1px solid ${comp.color}44`, borderRadius: 12, padding: '14px 16px' }}>
                <div style={{ fontSize: 15, color: comp.color, marginBottom: 10, display:'flex', alignItems:'center', gap:8 }}><Icon name={comp.icon as any} size={20}/>{comp.label}</div>
                {comp.levels.map((l, i) => (
                  <div key={i} style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', fontFamily: "'IM Fell English', cursive", lineHeight: 1.7 }}>
                    {l}
                  </div>
                ))}
                <div style={{ fontSize: 12, color: '#eedd44', marginTop: 8, fontFamily: "'Cinzel', serif" }}>{comp.cost}</div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="SPECIAL ABILITIES (MAX 2 PER RUN)">
          <p style={{ fontFamily: "'IM Fell English', cursive", fontSize: 18, color: 'rgba(255,255,255,0.75)', lineHeight: 1.9, marginBottom: 20 }}>
            At each port, 2 random special abilities are offered. You can equip a maximum of 2 per run. Choose wisely — these abilities define your playstyle and cannot be changed once bought.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: 10 }}>
            {UPGRADES.map(upg => (
              <div key={upg.id} style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${upg.color}33`, borderRadius: 12, padding: '14px 16px', display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                <img src={`${BASE}${UPGRADE_ICONS[upg.id]}`} style={{ width: 44, height: 44, objectFit: 'contain', flexShrink: 0 }}/>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <div style={{ fontSize: 15, color: upg.color }}>{upg.name}</div>
                    <div style={{ fontSize: 14, color: '#eedd44' }}>{upg.cost}</div>
                  </div>
                  <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', fontFamily: "'IM Fell English', cursive", lineHeight: 1.6 }}>{upg.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Hunter */}
        <Section title="THE HUNTER — SOMETHING IS FOLLOWING YOU">
          <div style={{ background: 'rgba(100,20,120,0.1)', border: '1px solid rgba(150,50,180,0.3)', borderRadius: 12, padding: 20 }}>
<p style={{ fontFamily: "'IM Fell English', cursive", fontSize: 18, color: 'rgba(255,255,255,0.75)', lineHeight: 1.9, marginBottom: 12 }}>
              At turn 8, a mysterious entity spawns on the opposite side of the map and begins tracking you. It has four modes, visible in the left panel (or top bar on mobile):
            </p>
            <div style={{ display:'flex', flexDirection:'column', gap:8, marginBottom:12 }}>
              {[
                { icon:'compass', mode:'TRACKING', desc:'Moves every other turn. Low threat — you have time to breathe.', color:'rgba(255,255,255,0.4)' },
                { icon:'eye', mode:'STALKING', desc:'Moves every turn, following you directly. Awareness 50%+. Start worrying.', color:'#dd88ff' },
                { icon:'lightning', mode:'ENRAGED', desc:'Moves twice per turn. Awareness 80%+. Run.', color:'#ff6666' },
                { icon:'mist', mode:'SEARCHING', desc:'Lost your trail — wanders randomly for 2 turns. Use this window.', color:'#66aaff' },
              ].map(m => (
                <div key={m.mode} style={{ display:'flex', gap:10, alignItems:'flex-start' }}>
                  <div style={{ color:m.color, fontFamily:"'Cinzel', serif", fontSize:13, minWidth:120, flexShrink:0, display:'flex', alignItems:'center', gap:6 }}><Icon name={m.icon as any} size={16}/>{m.mode}</div>
                  <div style={{ fontFamily:"'IM Fell English', cursive", fontSize:16, color:'rgba(255,255,255,0.6)', lineHeight:1.5 }}>{m.desc}</div>
                </div>
              ))}
            </div>
            <p style={{ fontFamily: "'IM Fell English', cursive", fontSize: 18, color: 'rgba(255,255,255,0.75)', lineHeight: 1.9, margin: 0 }}>
              The awareness bar fills faster when the Hunter is close to you (≤4 cells), when you are on a danger streak, or if you have the Greed upgrade with 800g+. Passing through storms or ports reduces its awareness. When it lands on your cell, it deals damage reduced by your Power stat. Its icon is always visible on the map — even in the fog as a shadow.
            </p>
          </div>
        </Section>

        {/* Progression */}
        <Section title="PROGRESSION & SHIPS">
          <div style={{ fontFamily: "'IM Fell English', cursive", fontSize: 17, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: 14 }}>
            Every run counts, even a short one. Reaching milestones — surviving Hunter attacks, hoarding gold, reaching deeper zones — unlocks <span style={{ color:'#eedd44' }}>Feats</span>, each granting a captain title and often a new <span style={{ color:'#88ddff' }}>ship</span>.
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {[
              { c:'#eedd44', t:'FEATS', d:'Accomplishments that persist across runs. Check the ⚜ FEATS menu to see what you have earned and what is still out there.' },
              { c:'#88ddff', t:'SHIPS', d:'Unlock new vessels from the ⛵ SHIPS menu. The Merchant sails on gold, the Specter sees far but is easily sensed, the Breakwater shrugs off reefs. Each rewrites how a run plays.' },
              { c:'#c8a030', t:'THE DAILY', d:'The daily tournament always uses the standard ship — same map, same rules for everyone. Pure skill.' },
            ].map((r,i) => (
              <div key={i} style={{ display:'flex', gap:12, alignItems:'flex-start' }}>
                <div style={{ color:r.c, fontFamily:"'Pirata One', cursive", fontSize:15, letterSpacing:1, flexShrink:0, width:74 }}>{r.t}</div>
                <div style={{ fontFamily:"'IM Fell English', cursive", fontSize:16, color:'rgba(255,255,255,0.7)', lineHeight:1.6 }}>{r.d}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* Tips */}
        <Section title="RELICS — TREASURES OF THE DEEP">
          <div style={{ fontFamily: "'IM Fell English', cursive", fontSize: 17, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: 14 }}>
            When you <span style={{ color:'#88ddff' }}>search a wreck</span>, you may uncover a <span style={{ color:'#eedd44' }}>relic</span> — a unique artifact that bends one rule for the rest of your run. Unlike abilities you buy at port, relics are found by chance. You keep every relic you find until you die.
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {[
              { c:'#88ddbb', t:'COMMON', d:'Bone Compass (portal sooner), Weighted Net (+50% wreck gold), Cracked Spyglass (+1 vision).' },
              { c:'#c88aff', t:'RARE', d:'Eye of the Kraken (always see the Hunter\'s next move), Ghost Anchor (ports calm the Hunter far more), Heart of the Storm (Kraken Pacts cost half).' },
              { c:'#eedd44', t:'LEGENDARY', d:'Gold Tooth (pirates pay YOU — but notoriety draws the Hunter), Black Flag (the Hunter appears later but hits harder).' },
            ].map((r,i) => (
              <div key={i} style={{ display:'flex', gap:12, alignItems:'flex-start' }}>
                <div style={{ color:r.c, fontFamily:"'Cinzel', serif", fontSize:12, letterSpacing:1, flexShrink:0, width:92, paddingTop:2 }}>{r.t}</div>
                <div style={{ fontFamily:"'IM Fell English', cursive", fontSize:15.5, color:'rgba(255,255,255,0.7)', lineHeight:1.6 }}>{r.d}</div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="TIPS FOR BEGINNERS">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { tip: 'Always keep an eye on the storm counter. If it drops below 5, prioritize finding an island for a ritual (+4 turns) or making a Kraken Pact (-20 HP, +6 turns — halved with Heart of the Storm).', color: '#ee4444' },
              { tip: 'Visit ports early. A repaired hull and one good upgrade can completely change your run. Do not sail past ports unless you are in good shape.', color: '#44cc88' },
              { tip: 'The Kraken Pact is often underestimated. Trading 20 HP for 6 extra storm turns can be the difference between a short run and a legendary one.', color: '#cc44ee' },
              { tip: 'Build your combo deliberately. Three dangerous cells in a row triples your score on everything — treasures, combat, and kraken rewards.', color: '#eedd44' },
              { tip: 'Power reduces all combat damage. Even 1 or 2 points of Power early makes a big difference over a long run against pirates and krakens.', color: '#ee8844' },
              { tip: 'Watch the Hunter awareness bar. Pass through storms or ports to reduce it. When it goes ENRAGED (80%+), it moves twice per turn — prioritize escaping over exploring.', color: '#6aaccc' },
            ].map((t, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ color: t.color, fontSize: 18, flexShrink: 0, marginTop: 2 }}>→</div>
                <div style={{ fontFamily: "'IM Fell English', cursive", fontSize: 17, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7 }}>{t.tip}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* CTA */}
        <div style={{ display:'flex', gap:12 }}>
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={onPlay}
            style={{ flex:1, padding: '18px', borderRadius: 12, border: '2px solid rgba(200,160,48,0.5)', background: 'rgba(200,160,48,0.1)', color: '#c8a030', fontSize: 24, letterSpacing: 4, cursor: 'pointer', fontFamily: "'Pirata One', cursive", marginTop: 8 }}>
            SET SAIL
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
