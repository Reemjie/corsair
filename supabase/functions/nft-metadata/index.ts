import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// Les 10 relics — ne change jamais, sauf ajout de nouvelles relics au pool
const RELICS: Record<string, object> = {
  kraken_eye: { name: "The Kraken's Eye", description: "A legendary artifact. Reveals the Hunter's position at spawn.", image: "ipfs://bafybeic3suyc2sklp2ypx7nvfmj4fhayqu2fqd3xalq257jhthpx5wr4se", attributes: [{ trait_type: "Rarity", value: "Legendary" }] },
  ancient_chart: { name: "The Ancient Chart", description: "All treasure cells revealed from run start.", image: "ipfs://bafybeid576kkatsdsjvyldarwiybwq2hqibf7cd7dvdtidtizluvem5apm", attributes: [{ trait_type: "Rarity", value: "Epic" }] },
  storm_caller: { name: "The Storm Caller", description: "Storm distance +5 at run start.", image: "ipfs://bafybeieyiw5elinspkna3yua3thqqxsg5tldvm3ezospxm4azporrkvki4", attributes: [{ trait_type: "Rarity", value: "Legendary" }] },
  ghost_corsair: { name: "The Ghost Corsair", description: "Pirate immunity 1x per run.", image: "ipfs://bafybeih5se4lzkn5s3u52raqp6hgg77syijm4buyb5upq5y7zlfshrfbha", attributes: [{ trait_type: "Rarity", value: "Epic" }] },
  maelstrom_heart: { name: "The Maelstrom Heart", description: "Survive once at 0 HP with 1 hull.", image: "ipfs://bafybeiepk3zxbacpf4ngormvc5kcgglvh46judpdfh7rkln2cenbveh3iy", attributes: [{ trait_type: "Rarity", value: "Legendary" }] },
  cursed_doubloon: { name: "The Cursed Doubloon", description: "+50 gold at run start.", image: "ipfs://bafybeid56dnunq3wu5ad6eveuve4k23duy6bxreelt32mr4bbygmfydpra", attributes: [{ trait_type: "Rarity", value: "Rare" }] },
  hunters_mark: { name: "The Hunter's Mark", description: "Hunter capped at STALKING mode.", image: "ipfs://bafybeibmsy6qmz4wlxoyqqxk2jbvvjl7cgqkx23ts4dczhjed7jnnc4pdm", attributes: [{ trait_type: "Rarity", value: "Legendary" }] },
  last_port: { name: "The Last Port", description: "Free repair at first port per run.", image: "ipfs://bafybeiagwhp7b5if5affgcbivuw5yxpek3dkjlrsvvxaugzifx44ayj6jy", attributes: [{ trait_type: "Rarity", value: "Rare" }] },
  blood_moon_tide: { name: "The Blood Moon Tide", description: "Combat score x1.5 for first 5 turns.", image: "ipfs://bafybeibttmnchyiy4ypet6yuodsg3xkxqzcem5kf3zoymi7pu64i3rgjn4", attributes: [{ trait_type: "Rarity", value: "Epic" }] },
  leviathan: { name: "The Leviathan's Throne", description: "All bonuses combined once per run. Mythic. 1 copy.", image: "ipfs://bafybeicsvnwhzz5wkn2geq3vnds2a56ko4w2fnojnqtsr6k5iafmidnprq", attributes: [{ trait_type: "Rarity", value: "Mythic" }] },
}

Deno.serve(async (req) => {
  const url = new URL(req.url)
  const tokenId = parseInt(url.pathname.split('/').pop() || '0')
  if (!tokenId) return new Response('Not found', { status: 404 })

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  )

  const { data } = await supabase
    .from('nft_token_metadata')
    .select('nft_name')
    .eq('token_id', tokenId)
    .single()

  if (!data || !RELICS[data.nft_name]) return new Response('Not found', { status: 404 })

  return new Response(JSON.stringify(RELICS[data.nft_name]), {
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
  })
})
