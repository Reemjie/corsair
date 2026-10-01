// Ecritures joueur qui ne doivent plus passer par la cle anon.
// Titres equipes + suivi live des runs (partenaires).
// Les feats et le daily consomme sont ecrits par approve-run apres rejeu.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const URL_SB = Deno.env.get('SUPABASE_URL')!
const CLE = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...cors, 'Content-Type': 'application/json' },
  })

type Body = {
  action?: string
  wallet_address?: string
  title?: string | null
  run_id?: string
  username?: string | null
  seed?: number
  is_daily?: boolean
  seed_token?: string | null
  score?: number
  turn?: number
  zone?: number
  gold?: number
  hull?: number
  run_title?: string | null
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors })
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405)

  let body: Body
  try { body = await req.json() } catch { return json({ error: 'Invalid JSON' }, 400) }

  const action = body.action
  if (!action) return json({ error: 'action required' }, 400)

  const sb = createClient(URL_SB, CLE)

  if (action === 'set_title') {
    const wallet = body.wallet_address
    if (!wallet || typeof wallet !== 'string') return json({ error: 'wallet_address required' }, 400)
    const { error } = await sb.from('player_titles').upsert({
      wallet_address: wallet,
      title: body.title ?? null,
      updated_at: new Date().toISOString(),
    })
    if (error) return json({ error: error.message }, 500)
    return json({ ok: true })
  }

  if (action === 'run_start') {
    const wallet = body.wallet_address
    if (!wallet || !body.run_id) return json({ error: 'run_id and wallet_address required' }, 400)
    const { error } = await sb.from('corsair_runs').insert({
      run_id: body.run_id,
      wallet_address: wallet,
      username: body.username ?? null,
      seed: body.seed ?? 0,
      is_daily: !!body.is_daily,
      seed_token: body.seed_token ?? null,
      status: 'playing',
      score: 0,
      turn: 0,
    })
    if (error) return json({ error: error.message }, 500)
    return json({ ok: true })
  }

  if (action === 'run_heartbeat') {
    if (!body.run_id) return json({ error: 'run_id required' }, 400)
    const { error } = await sb.from('corsair_runs').update({
      score: body.score ?? 0,
      turn: body.turn ?? 0,
      zone: body.zone ?? 1,
      gold: body.gold ?? 0,
      hull: body.hull ?? 0,
      updated_at: new Date().toISOString(),
    }).eq('run_id', body.run_id).neq('status', 'finished')
    if (error) return json({ error: error.message }, 500)
    return json({ ok: true })
  }

  if (action === 'run_finish') {
    if (!body.run_id) return json({ error: 'run_id required' }, 400)
    const now = new Date().toISOString()
    const { error } = await sb.from('corsair_runs').update({
      status: 'finished',
      score: body.score ?? 0,
      turn: body.turn ?? 0,
      zone: body.zone ?? 1,
      gold: body.gold ?? 0,
      hull: body.hull ?? 0,
      run_title: body.run_title ?? null,
      updated_at: now,
      finished_at: now,
    }).eq('run_id', body.run_id)
    if (error) return json({ error: error.message }, 500)
    return json({ ok: true })
  }

  return json({ error: `unknown action: ${action}` }, 400)
})
