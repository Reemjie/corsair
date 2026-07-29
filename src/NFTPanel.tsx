import { useState, useEffect } from 'react';
import { getSupply, getClaimedNFTs, type SupplyRow } from './supabase';
import { useWallet } from './useWallet';

const ipfsUrl = (uri: string) => uri.replace('ipfs://', 'https://ipfs.io/ipfs/');

interface NFTDef {
  key: string;
  name: string;
  rarity: 'Rare' | 'Epic' | 'Legendary' | 'Mythic';
  image: string;
  condition: string;
  seedBound?: boolean; // legendaries: bound to a cursed seed
  hidden?: boolean;    // mythic: fully hidden until claimed
}

const NFTS: NFTDef[] = [
  { key: 'last_port', name: 'The Last Port', rarity: 'Rare', image: 'ipfs://bafybeiagwhp7b5if5affgcbivuw5yxpek3dkjlrsvvxaugzifx44ayj6jy', condition: 'Visit 2 ports and score over 500 in a single run.' },
  { key: 'cursed_doubloon', name: 'The Cursed Doubloon', rarity: 'Rare', image: 'ipfs://bafybeid56dnunq3wu5ad6eveuve4k23duy6bxreelt32mr4bbygmfydpra', condition: 'Take the cursed treasure and end the run with 300+ gold.' },
  { key: 'ancient_chart', name: 'The Ancient Chart', rarity: 'Epic', image: 'ipfs://bafybeid576kkatsdsjvyldarwiybwq2hqibf7cd7dvdtidtizluvem5apm', condition: 'Find 3 treasures and slay the Kraken in one run.' },
  { key: 'ghost_corsair', name: 'The Ghost Corsair', rarity: 'Epic', image: 'ipfs://bafybeih5se4lzkn5s3u52raqp6hgg77syijm4buyb5upq5y7zlfshrfbha', condition: 'Score over 400 without fighting a single pirate.' },
  { key: 'blood_moon_tide', name: 'The Blood Moon Tide', rarity: 'Epic', image: 'ipfs://bafybeibttmnchyiy4ypet6yuodsg3xkxqzcem5kf3zoymi7pu64i3rgjn4', condition: 'Land a combo by turn 8, then survive past turn 20.' },
  { key: 'storm_caller', name: 'The Storm Caller', rarity: 'Legendary', image: 'ipfs://bafybeieyiw5elinspkna3yua3thqqxsg5tldvm3ezospxm4azporrkvki4', condition: '“Sail where the storm can taste your wake, and do not flinch.”', seedBound: true },
  { key: 'kraken_eye', name: "The Kraken's Eye", rarity: 'Legendary', image: 'ipfs://bafybeic3suyc2sklp2ypx7nvfmj4fhayqu2fqd3xalq257jhthpx5wr4se', condition: '“Stare into the oldest abyss until it blinks first.”', seedBound: true },
  { key: 'maelstrom_heart', name: 'The Maelstrom Heart', rarity: 'Legendary', image: 'ipfs://bafybeiepk3zxbacpf4ngormvc5kcgglvh46judpdfh7rkln2cenbveh3iy', condition: '“What the whirlpool swallows, it sometimes spits back — changed.”', seedBound: true },
  { key: 'hunters_mark', name: "The Hunter's Mark", rarity: 'Legendary', image: 'ipfs://bafybeibmsy6qmz4wlxoyqqxk2jbvvjl7cgqkx23ts4dczhjed7jnnc4pdm', condition: '“Wear his blows like medals. Twice.”', seedBound: true },
  { key: 'leviathan', name: '???', rarity: 'Mythic', image: 'ipfs://bafybeicsvnwhzz5wkn2geq3vnds2a56ko4w2fnojnqtsr6k5iafmidnprq', condition: 'No one has ever seen it. No one knows how.', hidden: true },
];

const RARITY_COLOR: Record<string, string> = {
  Rare: '#44cc88',
  Epic: '#aa66ee',
  Legendary: '#eedd88',
  Mythic: '#ee5566',
};

export default function NFTPanel({ onClose }: { onClose: () => void }) {
  const { address } = useWallet();
  const [supply, setSupply] = useState<SupplyRow[]>([]);
  const [claimed, setClaimed] = useState<string[]>([]);

  useEffect(() => {
    getSupply().then(setSupply);
    if (address) getClaimedNFTs(address).then(setClaimed);
  }, [address]);

  const supplyOf = (key: string) => supply.find(s => s.name === key);

  return (
    <div style={overlay} onClick={onClose}>
      <div style={panel} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <h1 style={{ fontFamily: "'Pirata One', cursive", fontSize: 26, color: '#d4a531', letterSpacing: 2, margin: 0 }}>⚓ Genesis NFTs</h1>
          <button onClick={onClose} style={closeBtn}>✕</button>
        </div>
        <p style={{ fontFamily: "'IM Fell English', cursive", fontSize: 13, color: 'rgba(255,255,255,0.5)', margin: '0 0 16px' }}>
          Earned in-game, minted on Starknet. Limited supply — once claimed, gone forever.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 12 }}>
          {NFTS.map(nft => {
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
                  <p style={{ fontFamily: "'IM Fell English', cursive", fontSize: 12, color: nft.seedBound ? 'rgba(238,221,136,0.75)' : 'rgba(255,255,255,0.55)', fontStyle: nft.seedBound || nft.hidden ? 'italic' : 'normal', margin: '8px 0 0', lineHeight: 1.35 }}>
                    {nft.condition}
                  </p>
                  {nft.seedBound && (
                    <p style={{ fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: 1, color: 'rgba(238,221,136,0.45)', margin: '6px 0 0' }}>⚠ BOUND TO A CURSED SEED</p>
                  )}
                  {nft.hidden && (
                    <p style={{ fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: 1, color: 'rgba(238,85,102,0.6)', margin: '6px 0 0' }}>1 COPY. EVER.</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <p style={{ fontFamily: "'IM Fell English', cursive", fontSize: 12, color: 'rgba(255,255,255,0.35)', marginTop: 16, textAlign: 'center' }}>
          Connect your Cartridge wallet before playing — NFTs are granted to the wallet that earned them.
        </p>
      </div>
    </div>
  );
}

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
