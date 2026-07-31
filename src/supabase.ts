import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://eyahboeaekejmcgknsty.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5YWhib2VhZWtlam1jZ2tuc3R5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMyNjQ2NDIsImV4cCI6MjA4ODg0MDY0Mn0.utkttOZq0ilQgpd-6Shl3aH7dscaTwygzpl1G1krOPk';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function submitScore(wallet: string, score: number, runTitle: string, turn: number, zone: number, seed: number, username?: string) {
  const { error } = await supabase.from('corsair_scores').insert({
    wallet_address: wallet,
    username: username ?? null,
    score,
    run_title: runTitle,
    turn,
    zone,
    seed,
  });
  return !error;
}

export async function getLeaderboard() {
  const { data, error } = await supabase
    .from('corsair_scores')
    .select('*')
    .order('score', { ascending: false })
    .limit(20);
  return error ? [] : data;
}

export async function submitDailyScore(wallet: string, score: number, date: string, seed: number, username?: string) {
  // Insert simple : avec RLS INSERT-only, un seul score par joueur et par jour — personne ne peut le modifier.
  const { error } = await supabase.from('corsair_daily_scores').insert({
    wallet_address: wallet,
    username: username ?? null,
    score,
    date,
    seed: String(seed),
  });
  if (error) console.warn('[supabase] submitDailyScore failed:', error.message);
  return !error;
}

export async function getDailyLeaderboard(date: string) {
  const { data, error } = await supabase
    .from('corsair_daily_scores')
    .select('*')
    .eq('date', date)
    .order('score', { ascending: false })
    .limit(20);
  return error ? [] : data;
}

export async function checkNFTConditions(runData: {
  wallet_address: string;
  score: number;
  seed: number;
  turn: number;
  gold: number;
  hull: number;
  ports_visited: number;
  treasures_found: number;
  pirates_fought: number;
  kraken_killed: boolean;
  ancient_kraken_killed: boolean;
  hunter_attacks_survived: number;
  maelstrom_survived: boolean;
  min_hull_during_run: number;
  run_id?: string;
  combo_turn: number;
  storm_distance_min: number;
  cursed_treasure_taken: boolean;
}): Promise<{ minted: { nft: string; tx: string }[] }> {
  try {
    const res = await fetch(
      'https://eyahboeaekejmcgknsty.supabase.co/functions/v1/check-nft-conditions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify(runData),
      }
    );
    return await res.json();
  } catch (e) {
    console.warn('NFT check failed:', e);
    return { minted: [] };
  }
}

// ─── ADMIN NFT ───────────────────────────────────────────────────────
// Mapping NFT -> URI IPFS (identique a l'Edge Function check-nft-conditions)
export const NFT_URIS: Record<string, string> = {
  kraken_eye: 'ipfs://QmVnXgMYLnyMdUSbDXPqrFmWZJBNke7wPWvpn3ou86fKAX',
  ancient_chart: 'ipfs://QmbXeEXsfmgrfi1SoWvKJmcLhXqCZH4fCg5LNbYX7c1zLh',
  storm_caller: 'ipfs://Qmb54sRo5vJydXJ9m3L23fSCYMbqGkJkHsMfVD9bce1Pmv',
  ghost_corsair: 'ipfs://QmQXuYjxb99HrTmHSZWnTg2tTktiHd2o4yTdTrSbRXsQFG',
  maelstrom_heart: 'ipfs://QmXDXm9cAQ3g5bkYQyqKpnRG1uN7tndvjtfobcyDgD2pQa',
  cursed_doubloon: 'ipfs://QmRGSBiu4exYzt8hbQMGK5g4AEvSi23KJpaoog9MV9cHBe',
  hunters_mark: 'ipfs://QmNTmrM9GAeAtPY8jJcQ8FSLrSEfbovnmv7yxQbxn1bEi6',
  last_port: 'ipfs://QmPnXkYVFQqVKJcY87dQkSte8bKWQiYVY8KTfDBPMGB1wA',
  blood_moon_tide: 'ipfs://QmRQMW4ybuayF4S4yRwKzHHEpQWLbbJXtrYroAAB3rjx2M',
  leviathan: 'ipfs://QmNnwHkhNawMF1K2cEzfitNUAzWRoAaqAF3hxheULKxj19',
};

export const NFT_CONTRACT = '0x06c8b06fb6a94f3ae9b26c87b1baacc4a7a1f2e0184870c957728b5d17bd0202';

export interface PendingMint {
  id: number;
  wallet_address: string;
  nft_name: string;
  nft_id: number;
  status: string;
  tx_hash: string | null;
}

export async function getPendingMints(): Promise<PendingMint[]> {
  const { data, error } = await supabase
    .from('nft_mints')
    .select('id, wallet_address, nft_name, nft_id, status, tx_hash')
    .order('id', { ascending: false });
  if (error) { console.warn('[admin] getPendingMints:', error.message); return []; }
  return data ?? [];
}

export interface SupplyRow { name: string; minted: number; max_supply: number; }

export async function getSupply(): Promise<SupplyRow[]> {
  const { data, error } = await supabase
    .from('nft_conditions')
    .select('name, minted, max_supply')
    .order('name', { ascending: true });
  if (error) { console.warn('[admin] getSupply:', error.message); return []; }
  return data ?? [];
}

export async function markMinted(id: number, txHash: string, tokenId: number, nftName: string): Promise<boolean> {
  const { error } = await supabase.from('nft_mints')
    .update({ status: 'minted', tx_hash: txHash, token_id: tokenId })
    .eq('id', id);
  if (error) { console.warn('[admin] markMinted:', error.message); return false; }
  const { error: metaError } = await supabase.from('nft_token_metadata')
    .insert({ token_id: tokenId, nft_name: nftName });
  if (metaError) { console.warn('[admin] metadata insert:', metaError.message); return false; }
  return true;
}

// Genere la commande sncast prete a copier
export function buildMintCommand(walletAddress: string, _nftName: string): string {
  return `sncast --account corsair_deployer_mainnet invoke \\
  --contract-address ${NFT_CONTRACT} \\
  --function mint \\
  --arguments '${walletAddress}' \\
  --network mainnet`;
}


export async function getClaimedNFTs(wallet: string): Promise<string[]> {
  const { data, error } = await supabase.from('nft_mints').select('nft_name, wallet_address');
  if (error || !data) return [];
  const norm = (a: string) => '0x' + a.toLowerCase().replace(/^0x0*/, '');
  const w = norm(wallet);
  return data.filter(r => norm(r.wallet_address) === w).map(r => r.nft_name);
}


// ─── RUN TRACKING (live) ──────────────────────────────────────────────
// Suit une partie du debut a la fin. Lisible par les partenaires (Cudokan)
// via l'API REST Supabase ou Realtime.

export interface RunSnapshot {
  score: number;
  turn: number;
  zone: number;
  gold: number;
  hull: number;
  run_title?: string;
}

export async function startRun(r: {
  run_id: string;
  wallet_address: string;
  username?: string | null;
  seed: number;
  is_daily: boolean;
}): Promise<void> {
  const { error } = await supabase.from('corsair_runs').insert({
    run_id: r.run_id,
    wallet_address: r.wallet_address,
    username: r.username ?? null,
    seed: r.seed,
    is_daily: r.is_daily,
    status: 'playing',
    score: 0,
    turn: 0,
  });
  if (error) console.warn('[runs] start:', error.message);
}

export async function heartbeatRun(runId: string, s: RunSnapshot): Promise<void> {
  const { error } = await supabase.from('corsair_runs')
    .update({
      score: s.score, turn: s.turn, zone: s.zone, gold: s.gold, hull: s.hull,
      updated_at: new Date().toISOString(),
    })
    .eq('run_id', runId);
  if (error) console.warn('[runs] heartbeat:', error.message);
}

export async function finishRun(runId: string, s: RunSnapshot): Promise<void> {
  const now = new Date().toISOString();
  const { error } = await supabase.from('corsair_runs')
    .update({
      status: 'finished',
      score: s.score, turn: s.turn, zone: s.zone, gold: s.gold, hull: s.hull,
      run_title: s.run_title ?? null,
      updated_at: now, finished_at: now,
    })
    .eq('run_id', runId);
  if (error) console.warn('[runs] finish:', error.message);
}


// ─── LOG DE COUPS (runs verifiables) ──────────────────────────────────
// Table en ecriture seule : la cle anon peut inserer, pas relire.
// Encodage : 0/1/2 deplacement PORT/AHEAD/STARBOARD · 10+i choix d'evenement
// 20 skip · 30/31/32 upgrade hull/weapon/nav · 40 reroll port
// 50+n achat d'amelioration · 60 rum barrel · 61 full repair · 70 quitter le port

export async function saveRunLog(r: {
  run_id: string;
  wallet_address: string;
  seed: number;
  ship_id: string;
  is_daily: boolean;
  actions: number[];
  final_score: number;
  final_turn: number;
}): Promise<void> {
  const { error } = await supabase.from('corsair_run_logs').insert(r);
  if (error) console.warn('[runlog]', error.message);
}


// ─── VERDICTS DE VERIFICATION ─────────────────────────────────────────
// Lit la vue corsair_run_verdicts : le verdict est public, le log de coups non.

export async function getRunVerdicts(runIds: string[]): Promise<
  Record<string, { verified: boolean | null; replay_score: number | null; final_score: number }>
> {
  if (runIds.length === 0) return {};
  const { data, error } = await supabase
    .from('corsair_run_verdicts')
    .select('run_id, verified, replay_score, final_score')
    .in('run_id', runIds);
  if (error || !data) { console.warn('[verdicts]', error?.message); return {}; }
  const out: Record<string, any> = {};
  for (const r of data as any[]) out[r.run_id] = r;
  return out;
}
