import { useState, useEffect } from 'react';
import { getPendingMints, getSupply, markMinted, buildMintCommand, type PendingMint, type SupplyRow } from './supabase';

// Code d'acces admin (le dashboard ne fait aucune transaction on-chain,
// un code suffit — le mint reel se fait via sncast au terminal).
const ADMIN_CODE = 'corsair-admin';

export default function AdminPanel({ onHome }: { onHome: () => void }) {
  const [mints, setMints] = useState<PendingMint[]>([]);
  const [supply, setSupply] = useState<SupplyRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [txInputs, setTxInputs] = useState<Record<number, string>>({});
  const [authed, setAuthed] = useState(false);
  const [codeInput, setCodeInput] = useState('');

  const load = async () => {
    setLoading(true);
    const [m, s] = await Promise.all([getPendingMints(), getSupply()]);
    setMints(m); setSupply(s); setLoading(false);
  };

  useEffect(() => { if (authed) load(); }, [authed]);

  if (!authed) {
    return <Shell onHome={onHome}>
      <p style={msg}>Enter the admin code to continue.</p>
      <div style={{ display: 'flex', gap: 8, marginTop: 14, maxWidth: 340 }}>
        <input
          type="password"
          placeholder="Admin code"
          value={codeInput}
          onChange={e => setCodeInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && codeInput === ADMIN_CODE) setAuthed(true); }}
          style={{ flex: 1, padding: '9px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.3)', color: '#fff', fontSize: 14 }}
        />
        <button onClick={() => { if (codeInput === ADMIN_CODE) setAuthed(true); }} style={{ ...btn, fontSize: 14, padding: '9px 18px' }}>Enter</button>
      </div>
      {codeInput && codeInput !== ADMIN_CODE && <p style={{ ...msg, marginTop: 8, fontSize: 12, color: 'rgba(238,102,85,0.7)' }}>Wrong code.</p>}
    </Shell>;
  }

  const pending = mints.filter(m => m.status === 'pending');

  const copyCmd = async (m: PendingMint) => {
    const cmd = buildMintCommand(m.wallet_address, m.nft_name);
    try { await navigator.clipboard.writeText(cmd); setCopiedId(m.id); setTimeout(() => setCopiedId(null), 1500); }
    catch { alert(cmd); }
  };

  const doMark = async (id: number) => {
    const tx = txInputs[id]?.trim();
    if (!tx) { alert('Paste the transaction hash first.'); return; }
    const ok = await markMinted(id, tx);
    if (ok) load();
  };

  return (
    <Shell onHome={onHome}>
      {/* SUPPLY */}
      <h2 style={h2}>Supply</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: 8, marginBottom: 28 }}>
        {supply.map(s => {
          const pct = s.max_supply > 0 ? (s.minted / s.max_supply) * 100 : 0;
          const full = s.minted >= s.max_supply;
          return (
            <div key={s.name} style={{ padding: '10px 12px', borderRadius: 10, border: '1px solid rgba(200,160,48,0.3)', background: 'rgba(200,160,48,0.06)' }}>
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: 12, color: full ? '#ee6655' : '#eedd88', letterSpacing: 1 }}>{s.name}</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: full ? '#ee6655' : '#fff' }}>{s.minted}/{s.max_supply}</div>
              <div style={{ height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.1)', marginTop: 4 }}>
                <div style={{ width: `${pct}%`, height: '100%', borderRadius: 2, background: full ? '#ee6655' : '#44cc88' }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* PENDING MINTS */}
      <h2 style={h2}>Pending mints ({pending.length})</h2>
      {loading && <p style={msg}>Loading…</p>}
      {!loading && pending.length === 0 && <p style={msg}>No pending mints. All caught up. ⚓</p>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {pending.map(m => (
          <div key={m.id} style={{ padding: 14, borderRadius: 12, border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.03)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
              <div>
                <span style={{ fontFamily: "'Pirata One', cursive", fontSize: 18, color: '#eedd88' }}>{m.nft_name}</span>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginLeft: 10 }}>
                  {m.wallet_address.slice(0, 10)}…{m.wallet_address.slice(-6)}
                </span>
              </div>
              <button onClick={() => copyCmd(m)} style={btn}>
                {copiedId === m.id ? '✓ Copied!' : 'Copy mint command'}
              </button>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 10, alignItems: 'center' }}>
              <input
                placeholder="Paste tx hash after minting…"
                value={txInputs[m.id] ?? ''}
                onChange={e => setTxInputs({ ...txInputs, [m.id]: e.target.value })}
                style={{ flex: 1, padding: '7px 10px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.3)', color: '#fff', fontSize: 12 }}
              />
              <button onClick={() => doMark(m.id)} style={{ ...btn, borderColor: 'rgba(68,204,136,0.5)', color: '#44cc88' }}>
                Mark as minted
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Already minted, collapsed count */}
      <p style={{ ...msg, marginTop: 20 }}>
        {mints.filter(m => m.status === 'minted').length} already minted.
      </p>
    </Shell>
  );
}

function Shell({ children, onHome }: { children: React.ReactNode; onHome: () => void }) {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #0a0e16, #05080f)', padding: '24px 20px calc(24px + env(safe-area-inset-bottom))', color: '#fff' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h1 style={{ fontFamily: "'Pirata One', cursive", fontSize: 30, color: '#d4a531', letterSpacing: 3, margin: 0 }}>⚓ NFT ADMIN</h1>
          <button onClick={onHome} style={btn}>← Back</button>
        </div>
        {children}
      </div>
    </div>
  );
}

const h2: React.CSSProperties = { fontFamily: "'Cinzel', serif", fontSize: 14, letterSpacing: 3, color: 'rgba(136,221,255,0.8)', marginBottom: 12 };
const msg: React.CSSProperties = { fontFamily: "'IM Fell English', cursive", fontSize: 15, color: 'rgba(255,255,255,0.5)' };
const btn: React.CSSProperties = { padding: '7px 14px', borderRadius: 8, border: '1px solid rgba(200,160,48,0.5)', background: 'rgba(200,160,48,0.1)', color: '#eedd88', fontSize: 12, cursor: 'pointer', fontFamily: "'Cinzel', serif", letterSpacing: 1, whiteSpace: 'nowrap' };
