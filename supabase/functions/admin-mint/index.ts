// ─── ADMIN-MINT ──────────────────────────────────────────────────────
//
// Seul point d'ecriture sur les tables NFT. Protege par un secret que seul
// le dashboard connait : la cle anon n'a plus aucun droit ici.
//
// Appel : POST { secret, id, tx_hash, token_id, nft_name }

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const URL_SB = Deno.env.get('SUPABASE_URL')!;
const CLE = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const SECRET = Deno.env.get('ADMIN_SECRET') ?? '';

Deno.serve(async (req: Request) => {
  const cors = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Content-Type': 'application/json',
  };
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });

  try {
    const { secret, id, tx_hash, token_id, nft_name } = await req.json();

    // Reponse 200 volontaire : le client lit le champ error plutot qu'un statut.
    if (!SECRET || secret !== SECRET) {
      return new Response(JSON.stringify({ ok: false, error: 'unauthorized' }), { headers: cors });
    }
    if (!id || !tx_hash || token_id === undefined || !nft_name) {
      return new Response(JSON.stringify({ ok: false, error: 'champs manquants' }), { headers: cors });
    }

    const sb = createClient(URL_SB, CLE);

    const { error: e1 } = await sb.from('nft_mints')
      .update({ status: 'minted', tx_hash, token_id })
      .eq('id', id);
    if (e1) return new Response(JSON.stringify({ ok: false, error: e1.message }), { headers: cors });

    // Le nom du token sert aux metadonnees : une seule entree par token_id.
    const { data: deja } = await sb.from('nft_token_metadata')
      .select('token_id').eq('token_id', token_id).limit(1).maybeSingle();
    if (!deja) {
      const { error: e2 } = await sb.from('nft_token_metadata')
        .insert({ token_id, nft_name });
      if (e2) return new Response(JSON.stringify({ ok: false, error: e2.message }), { headers: cors });
    }

    return new Response(JSON.stringify({ ok: true }), { headers: cors });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: String(e) }), { headers: cors });
  }
});
