import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SUPABASE_SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

// Fenetre anti seed-shopping : dans cet intervalle, le meme joueur recoit
// toujours le meme seed. Pour en obtenir un nouveau, il doit attendre.
// (Version forte a venir : un nouveau seed seulement apres une run jouee.)
const REISSUE_WINDOW_MS = 60_000

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405)

  let wallet_address: string | undefined
  try {
    const body = await req.json()
    wallet_address = body?.wallet_address
  } catch {
    return json({ error: 'Invalid JSON' }, 400)
  }

  if (!wallet_address || typeof wallet_address !== 'string') {
    return json({ error: 'wallet_address required' }, 400)
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

  // Un seed recent non rattache a une run est resservi tel quel.
  const since = new Date(Date.now() - REISSUE_WINDOW_MS).toISOString()
  const { data: recent } = await supabase
    .from('corsair_seeds')
    .select('seed_token, seed')
    .eq('wallet_address', wallet_address)
    .is('run_id', null)
    .gte('issued_at', since)
    .order('issued_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (recent) {
    return json({ seed: recent.seed, seed_token: recent.seed_token, reissued: true })
  }

  // Nouveau seed, tire cote serveur : le client ne le choisit jamais.
  const seed = Math.floor(Math.random() * 999999)

  const { data, error } = await supabase
    .from('corsair_seeds')
    .insert({ wallet_address, seed })
    .select('seed_token, seed')
    .single()

  if (error) {
    console.warn('[issue-seed]', error.message)
    return json({ error: 'could not issue seed' }, 500)
  }

  return json({ seed: data.seed, seed_token: data.seed_token, reissued: false })
})
