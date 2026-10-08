import { useState, useEffect } from 'react';
import { getSupply, getClaimedNFTs, type SupplyRow } from './supabase';
import { useWallet } from './useWallet';

const ipfsUrl = (uri: string) =>
  uri.startsWith('ipfs://') ? uri.replace('ipfs://', 'https://ipfs.io/ipfs/') : uri;

interface NFTDef {
  key: string;
  name: string;
  rarity: 'Rare' | 'Epic' | 'Legendary' | 'Mythic';
  image: string;
  condition: string;
  seedBound?: boolean;
  hidden?: boolean;
  eventOnly?: boolean;
}

const IMG = 'https://eyahboeaekejmcgknsty.supabase.co/storage/v1/object/public/nft-images';

const GENESIS: NFTDef[] = [
  { key: 'last_port', name: 'The Last Port', rarity: 'Rare', image: `${IMG}/08-last_port.jpg`, condition: 'Visit 2 ports and finish above 500 points.' },
  { key: 'cursed_doubloon', name: 'The Cursed Doubloon', rarity: 'Rare', image: `${IMG}/06-cursed_doubloon.jpg`, condition: 'Take the cursed treasure and end the run with 300+ gold.' },
  { key: 'ancient_chart', name: 'The Ancient Chart', rarity: 'Epic', image: `${IMG}/02-ancient_chart.jpg`, condition: 'Find 3 treasures and kill a Kraken in the same voyage.' },
  { key: 'ghost_corsair', name: 'The Ghost Corsair', rarity: 'Epic', image: `${IMG}/04-ghost_corsair.jpg`, condition: 'Finish above 400 points without fighting a single pirate.' },
  { key: 'blood_moon_tide', name: 'The Blood Moon Tide', rarity: 'Epic', image: `${IMG}/09-blood_moon_tide.jpg`, condition: 'Reach a 3-danger streak by turn 8, then survive to turn 20.' },
  { key: 'storm_caller', name: 'The Storm Caller', rarity: 'Legendary', image: `${IMG}/03-storm_caller.jpg`, condition: 'Let the storm close to within 2 tiles, and still be afloat on turn 10.', seedBound: true },
  { key: 'kraken_eye', name: "The Kraken's Eye", rarity: 'Legendary', image: `${IMG}/01-kraken_eye.jpg`, condition: 'Kill the Ancient Kraken — the one that only stirs in the deepest water.', seedBound: true },
  { key: 'maelstrom_heart', name: 'The Maelstrom Heart', rarity: 'Legendary', image: `${IMG}/05-maelstrom_heart.jpg`, condition: 'Be swallowed by a maelstrom and come back out.', seedBound: true },
  { key: 'hunters_mark', name: "The Hunter's Mark", rarity: 'Legendary', image: `${IMG}/07-hunters_mark.jpg`, condition: 'Survive 2 attacks from the Hunter in a single voyage.', seedBound: true },
  { key: 'starktember_tide', name: 'The Starktember Tide', rarity: 'Mythic', image: `${IMG}/11-starktember_tide.jpg`, condition: 'Won by iamraheemking with 77,197 points across 26 Dailies. Starktember 2026 — one month, one winner.', eventOnly: true },
  { key: 'leviathan', name: '???', rarity: 'Mythic', image: `${IMG}/10-leviathan.jpg`, condition: 'Finish above 3,000 points, with a Kraken dead in your wake.', seedBound: true, hidden: true },
];

const TIDEBORN: NFTDef[] = [
  { key: 'splintered_keel', name: 'The Splintered Keel', rarity: 'Rare', image: `${IMG}/12-splintered_keel.jpg`, condition: 'Drop to 3 hull or less, then survive to turn 15.' },
  { key: 'quiet_hold', name: 'The Quiet Hold', rarity: 'Rare', image: `${IMG}/13-quiet_hold.jpg`, condition: 'Finish with 200+ gold without fighting a single pirate.' },
  { key: 'red_wake', name: 'The Red Wake', rarity: 'Epic', image: `${IMG}/14-red_wake.jpg`, condition: 'Fight 5 or more pirates in a single voyage.' },
  { key: 'abyss_lantern', name: 'The Abyss Lantern', rarity: 'Legendary', image: `${IMG}/15-abyss_lantern.jpg`, condition: 'Reach The Abyss and finish with 800+ points.' },
  { key: 'tideborn_crown', name: 'The Tideborn Crown', rarity: 'Mythic', image: `${IMG}/16-tideborn_crown.jpg`, condition: 'Reach The Abyss, slay the Ancient Kraken, and finish with 2,000+ points.', hidden: true },
];

const RARITY_COLOR: Record<string, string> = {
  Rare: '#44cc88',
  Epic: '#aa66ee',
  Legendary: '#eedd88',
  Mythic: '#ee5566',
};

function NFTGrid({
  nfts, supply, claimed,
}: {
  nfts: NFTDef[];
  supply: SupplyRow[];
  claimed: string[];
}) {
  const supplyOf = (key: string) => supply.find(s => s.name === key);
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 12 }}>
      {nfts.map(nft => {
        const s = supplyOf(nft.key);
        const owned = claimed.includes(nft.key);
        const full = s ? s.minted >= s.max_supply : false;
        const color = RARITY_COLOR[nft.rarity];
        const showImage = !nft.hidden || owned;
        return (
          <div key={nft.key} style={{
            borderRadius: 12,
            border: `1px solid ${owned ? 'rgba(68,204,136,0.7)' : 'rgba(200,160,48,0.3)'}`,
            background: 'rgba(255,255,255,0.03)',
            overflow: 'hidden',
            opacity: full && !owned ? 0.55 : 1,
          }}>
            <div style={{ position: 'relative', aspectRatio: '3/4', background: 'rgba(0,0,0,0.4)' }}>
              {showImage ? (
                <img src={ipfsUrl(nft.image)} alt={nft.name} loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Pirata One', cursive", fontSize: 54, color: 'rgba(238,85,102,0.5)' }}>?</div>
              )}
              {owned && (
                <div style={{ position: 'absolute', top: 8, right: 8, padding: '3px 8px', borderRadius: 6, background: 'rgba(68,204,136,0.9)', color: '#04160c', fontFamily: "'Cinzel', serif", fontSize: 10, fontWeight: 700, letterSpacing: 1 }}>CLAIMED ⚓</div>
              )}
              {full && !owned && (
                <div style={{ position: 'absolute', top: 8, right: 8, padding: '3px 8px', borderRadius: 6, background: 'rgba(238,102,85,0.9)', color: '#fff', fontFamily: "'Cinzel', serif", fontSize: 10, fontWeight: 700, letterSpacing: 1 }}>SOLD OUT</div>
              )}
            </div>
            <div style={{ padding: '10px 12px' }}>
              <div style={{ fontFamily: "'Pirata One', cursive", fontSize: 16, color: '#fff', lineHeight: 1.1 }}>{nft.name}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
                <span style={{ fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: 1, color, fontWeight: 700 }}>{nft.rarity.toUpperCase()}</span>
                {s && <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)' }}>{s.minted}/{s.max_supply}</span>}
              </div>
              {s && (
                <div style={{ height: 3, borderRadius: 2, background: 'rgba(255,255,255,0.1)', marginTop: 5 }}>
                  <div style={{ width: `${s.max_supply > 0 ? (s.minted / s.max_supply) * 100 : 0}%`, height: '100%', borderRadius: 2, background: full ? '#ee6655' : color }} />
                </div>
              )}
              <p style={{ fontFamily: "'IM Fell English', cursive", fontSize: 12, color: nft.seedBound ? 'rgba(238,221,136,0.75)' : 'rgba(255,255,255,0.55)', fontStyle: 'normal', margin: '8px 0 0', lineHeight: 1.35 }}>
                {nft.condition}
              </p>
              {nft.seedBound && (
                <p style={{ fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: 1, color: 'rgba(238,221,136,0.45)', margin: '6px 0 0' }}>⚠ BOUND TO A CURSED SEED</p>
              )}
              {nft.eventOnly && (
                <p style={{ fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: 1, color: 'rgba(170,102,238,0.65)', margin: '6px 0 0' }}>EVENT TROPHY</p>
              )}
              {nft.hidden && (
                <p style={{ fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: 1, color: 'rgba(238,85,102,0.6)', margin: '6px 0 0' }}>1 COPY. EVER.</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function NFTPanel({ onClose }: { onClose: () => void }) {
  const { address } = useWallet();
  const [supply, setSupply] = useState<SupplyRow[]>([]);
  const [claimed, setClaimed] = useState<string[]>([]);

  useEffect(() => {
    getSupply().then(setSupply);
    if (address) getClaimedNFTs(address).then(setClaimed);
  }, [address]);

  return (
    <div style={overlay} onClick={onClose}>
      <div style={panel} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <h1 style={{ fontFamily: "'Pirata One', cursive", fontSize: 26, color: '#d4a531', letterSpacing: 2, margin: 0 }}>⚓ NFT Relics</h1>
          <button onClick={onClose} style={closeBtn}>✕</button>
        </div>
        <p style={{ fontFamily: "'IM Fell English', cursive", fontSize: 13, color: 'rgba(255,255,255,0.5)', margin: '0 0 20px' }}>
          Earned in-game, minted on Starknet. Limited supply — once claimed, the card shows SOLD OUT.
        </p>

        <h2 style={sectionTitle}>Tideborn — Season 1</h2>
        <p style={sectionBlurb}>A new tide. Fresh conditions. The Crown waits for one captain.</p>
        <NFTGrid nfts={TIDEBORN} supply={supply} claimed={claimed} />

        <h2 style={{ ...sectionTitle, marginTop: 28 }}>Genesis</h2>
        <p style={sectionBlurb}>The original relics. Some still haunt cursed seeds.</p>
        <NFTGrid nfts={GENESIS} supply={supply} claimed={claimed} />

        <p style={{ fontFamily: "'IM Fell English', cursive", fontSize: 12, color: 'rgba(255,255,255,0.35)', marginTop: 16, textAlign: 'center' }}>
          Connect your Cartridge wallet before playing — NFTs are granted to the wallet that earned them.
        </p>
      </div>
    </div>
  );
}

const sectionTitle: React.CSSProperties = {
  fontFamily: "'Pirata One', cursive", fontSize: 20, color: '#88c8ee', letterSpacing: 1, margin: '0 0 4px',
};
const sectionBlurb: React.CSSProperties = {
  fontFamily: "'IM Fell English', cursive", fontSize: 12, color: 'rgba(255,255,255,0.4)', margin: '0 0 12px',
};

const overlay: React.CSSProperties = {
  position: 'fixed', inset: 0, zIndex: 1000,
  background: 'rgba(3,6,12,0.85)', backdropFilter: 'blur(4px)',
  display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
  overflowY: 'auto', padding: '24px 12px calc(24px + env(safe-area-inset-bottom))',
};

const panel: React.CSSProperties = {
  width: '100%', maxWidth: 860,
  background: 'linear-gradient(160deg, #0a0e16, #05080f)',
  border: '1px solid rgba(200,160,48,0.35)', borderRadius: 16,
  padding: '20px 18px',
};

const closeBtn: React.CSSProperties = {
  width: 34, height: 34, borderRadius: 8,
  border: '1px solid rgba(200,160,48,0.5)', background: 'rgba(200,160,48,0.1)',
  color: '#eedd88', fontSize: 15, cursor: 'pointer',
};
