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
