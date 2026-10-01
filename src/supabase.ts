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

// Classement Starktember : cumul des scores quotidiens sur septembre.
// La vue fait le regroupement, que PostgREST ne sait pas faire seul.
export interface StarktemberRow {
  wallet_address: string; username: string | null;
  rank: number; total: number; days_played: number; best_day: number;
}

export async function getStarktemberBoard(): Promise<StarktemberRow[]> {
  const { data, error } = await supabase
    .from('starktember_board')
    .select('rank, wallet_address, username, total, days_played, best_day')
    .limit(50);
  if (error) { console.warn('[starktember]', error.message); return []; }
  return (data ?? []) as StarktemberRow[];
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

// L'ecriture passe par une Edge Function protegee : la cle anon n'a plus
// aucun droit sur les tables NFT. Le secret est demande une fois puis garde
// en local.
export async function markMinted(id: number, txHash: string, tokenId: number, nftName: string): Promise<boolean> {
  // Pas de prompt() : il bloque la page entiere et les fenetres s'empilent.
  // La cle se pose une fois depuis la console :
  //   localStorage.setItem('corsair_admin_secret', '...')
  const secret = localStorage.getItem('corsair_admin_secret');
  if (!secret) { console.warn('[admin] cle admin absente'); return false; }
  const { data, error } = await supabase.functions.invoke('admin-mint', {
    body: { secret, id, tx_hash: txHash, token_id: tokenId, nft_name: nftName },
  });
  if (error || !(data as any)?.ok) {
    const raison = (data as any)?.error ?? error?.message;
    if (raison === 'unauthorized') localStorage.removeItem('corsair_admin_secret');
    console.warn('[admin] markMinted:', raison);
    return false;
  }
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
  seed_token?: string | null;
}): Promise<void> {
  try {
    const { error } = await supabase.functions.invoke('player-write', {
      body: { action: 'run_start', ...r },
    });
    if (error) console.warn('[runs] start:', error.message);
  } catch (e: any) {
    console.warn('[runs] start:', e?.message ?? e);
  }
}

export async function heartbeatRun(runId: string, s: RunSnapshot): Promise<void> {
  try {
    const { error } = await supabase.functions.invoke('player-write', {
      body: { action: 'run_heartbeat', run_id: runId, ...s },
    });
    if (error) console.warn('[runs] heartbeat:', error.message);
  } catch (e: any) {
    console.warn('[runs] heartbeat:', e?.message ?? e);
  }
}

export async function finishRun(runId: string, s: RunSnapshot): Promise<void> {
  try {
    const { error } = await supabase.functions.invoke('player-write', {
      body: { action: 'run_finish', run_id: runId, ...s },
    });
    if (error) console.warn('[runs] finish:', error.message);
  } catch (e: any) {
    console.warn('[runs] finish:', e?.message ?? e);
  }
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
  checks?: number[];
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


// ─── SEED EMIS PAR LE SERVEUR ─────────────────────────────────────────
// Le client ne choisit jamais son seed. En cas d'echec, on renvoie null et
// le jeu retombe sur un seed local : une partie ne doit jamais etre bloquee.

export async function issueSeed(wallet: string): Promise<{ seed: number; seed_token: string } | null> {
  try {
    const { data, error } = await supabase.functions.invoke('issue-seed', {
      body: { wallet_address: wallet },
    });
    if (error || typeof data?.seed !== 'number') {
      console.warn('[seed] emission impossible, seed local utilise');
      return null;
    }
    return { seed: data.seed, seed_token: data.seed_token };
  } catch {
    console.warn('[seed] emission impossible, seed local utilise');
    return null;
  }
}


// ─── FEATS ET TITRES (lies au wallet) ─────────────────────────────────
// localStorage reste le cache synchrone lu par le moteur ; ces fonctions
// le synchronisent avec le serveur pour que rien ne soit perdu.

export async function fetchPlayerFeats(wallet: string): Promise<{ feats: string[]; title: string | null }> {
  const [f, t] = await Promise.all([
    supabase.from('player_feats').select('feat_id').eq('wallet_address', wallet),
    supabase.from('player_titles').select('title').eq('wallet_address', wallet).maybeSingle(),
  ]);
  return {
    feats: (f.data ?? []).map((r: any) => r.feat_id),
    title: (t.data as any)?.title ?? null,
  };
}

export async function pushFeatUnlock(_wallet: string, _featId: string): Promise<void> {
  // Les feats serveur sont ecrits par approve-run apres rejeu — plus d'insert anon.
}

export async function pushPlayerTitle(wallet: string, title: string | null): Promise<void> {
  try {
    const { error } = await supabase.functions.invoke('player-write', {
      body: { action: 'set_title', wallet_address: wallet, title },
    });
    if (error) console.warn('[title]', error.message);
  } catch (e: any) {
    console.warn('[title]', e?.message ?? e);
  }
}

// ─── DAILY : tentative consommee cote serveur ─────────────────────────
// Source de verite : corsair_daily_scores (ecrit uniquement par approve-run).
// daily_plays n'accepte plus d'insert anon.

export async function hasPlayedDailyOnServer(wallet: string, key: string): Promise<boolean> {
  // key = YYYYMMDD → date ISO
  if (key.length !== 8) return false;
  const date = `${key.slice(0, 4)}-${key.slice(4, 6)}-${key.slice(6, 8)}`;
  const { data, error } = await supabase.from('corsair_daily_scores')
    .select('id').eq('wallet_address', wallet).eq('date', date).maybeSingle();
  if (error) return false; // hors ligne : on ne bloque pas le joueur
  return !!data;
}

export async function markDailyPlayedOnServer(_wallet: string, _key: string): Promise<void> {
  // Plus d'insert anon : la tentative est posee par approve-run a l'approbation.
}


// ─── APPROBATION SERVEUR ──────────────────────────────────────────────
// Le client n'annonce plus son score : il demande au serveur de rejouer la
// partie depuis son log et d'approuver (ou non) le resultat.

export async function approveRun(runId: string): Promise<any> {
  const { data, error } = await supabase.functions.invoke('approve-run', {
    body: { run_id: runId },
  });
  if (error) throw error;
  return data;
}
