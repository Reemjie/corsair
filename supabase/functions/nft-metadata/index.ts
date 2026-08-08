import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// Les 10 relics — ne change jamais, sauf ajout de nouvelles relics au pool
const RELICS: Record<string, object> = {
  kraken_eye: { name: "The Kraken's Eye", description: "Torn from the deep. Its bearer looked the Hunter in the eye and lived to tell it.", image: "https://eyahboeaekejmcgknsty.supabase.co/storage/v1/object/public/nft-images/01-kraken_eye.jpg", attributes: [{ trait_type: "IPFS", value: "bafybeic3suyc2sklp2ypx7nvfmj4fhayqu2fqd3xalq257jhthpx5wr4se" }, { trait_type: "Type", value: "Achievement" }, { trait_type: "Rarity", value: "Legendary" }] },
  ancient_chart: { name: "The Ancient Chart", description: "Every fortune on these waters, marked by a hand long since drowned.", image: "https://eyahboeaekejmcgknsty.supabase.co/storage/v1/object/public/nft-images/02-ancient_chart.jpg", attributes: [{ trait_type: "IPFS", value: "bafybeid576kkatsdsjvyldarwiybwq2hqibf7cd7dvdtidtizluvem5apm" }, { trait_type: "Type", value: "Achievement" }, { trait_type: "Rarity", value: "Epic" }] },
  storm_caller: { name: "The Storm Caller", description: "The tempest answered when called. Few have kept ahead of it this long.", image: "https://eyahboeaekejmcgknsty.supabase.co/storage/v1/object/public/nft-images/03-storm_caller.jpg", attributes: [{ trait_type: "IPFS", value: "bafybeieyiw5elinspkna3yua3thqqxsg5tldvm3ezospxm4azporrkvki4" }, { trait_type: "Type", value: "Achievement" }, { trait_type: "Rarity", value: "Legendary" }] },
  ghost_corsair: { name: "The Ghost Corsair", description: "A ship the pirates never saw coming. Nor going.", image: "https://eyahboeaekejmcgknsty.supabase.co/storage/v1/object/public/nft-images/04-ghost_corsair.jpg", attributes: [{ trait_type: "IPFS", value: "bafybeih5se4lzkn5s3u52raqp6hgg77syijm4buyb5upq5y7zlfshrfbha" }, { trait_type: "Type", value: "Achievement" }, { trait_type: "Rarity", value: "Epic" }] },
  maelstrom_heart: { name: "The Maelstrom Heart", description: "Dragged from the vortex with one plank still holding. The sea let this one go.", image: "https://eyahboeaekejmcgknsty.supabase.co/storage/v1/object/public/nft-images/05-maelstrom_heart.jpg", attributes: [{ trait_type: "IPFS", value: "bafybeiepk3zxbacpf4ngormvc5kcgglvh46judpdfh7rkln2cenbveh3iy" }, { trait_type: "Type", value: "Achievement" }, { trait_type: "Rarity", value: "Legendary" }] },
  cursed_doubloon: { name: "The Cursed Doubloon", description: "Gold that never spends well. Taken anyway, as gold always is.", image: "https://eyahboeaekejmcgknsty.supabase.co/storage/v1/object/public/nft-images/06-cursed_doubloon.jpg", attributes: [{ trait_type: "IPFS", value: "bafybeid56dnunq3wu5ad6eveuve4k23duy6bxreelt32mr4bbygmfydpra" }, { trait_type: "Type", value: "Achievement" }, { trait_type: "Rarity", value: "Rare" }] },
  hunters_mark: { name: "The Hunter's Mark", description: "It hunted. It failed. The mark it left is worn as a trophy.", image: "https://eyahboeaekejmcgknsty.supabase.co/storage/v1/object/public/nft-images/07-hunters_mark.jpg", attributes: [{ trait_type: "IPFS", value: "bafybeibmsy6qmz4wlxoyqqxk2jbvvjl7cgqkx23ts4dczhjed7jnnc4pdm" }, { trait_type: "Type", value: "Achievement" }, { trait_type: "Rarity", value: "Legendary" }] },
  last_port: { name: "The Last Port", description: "The last harbour before the storm claimed everything beyond it.", image: "https://eyahboeaekejmcgknsty.supabase.co/storage/v1/object/public/nft-images/08-last_port.jpg", attributes: [{ trait_type: "IPFS", value: "bafybeiagwhp7b5if5affgcbivuw5yxpek3dkjlrsvvxaugzifx44ayj6jy" }, { trait_type: "Type", value: "Achievement" }, { trait_type: "Rarity", value: "Rare" }] },
  blood_moon_tide: { name: "The Blood Moon Tide", description: "Three dangers braved without pause, under a moon the colour of blood.", image: "https://eyahboeaekejmcgknsty.supabase.co/storage/v1/object/public/nft-images/09-blood_moon_tide.jpg", attributes: [{ trait_type: "IPFS", value: "bafybeibttmnchyiy4ypet6yuodsg3xkxqzcem5kf3zoymi7pu64i3rgjn4" }, { trait_type: "Type", value: "Achievement" }, { trait_type: "Rarity", value: "Epic" }] },
  leviathan: { name: "The Leviathan's Throne", description: "One throne. One captain. The deep remembers no other.", image: "https://eyahboeaekejmcgknsty.supabase.co/storage/v1/object/public/nft-images/10-leviathan.jpg", attributes: [{ trait_type: "IPFS", value: "bafybeicsvnwhzz5wkn2geq3vnds2a56ko4w2fnojnqtsr6k5iafmidnprq" }, { trait_type: "Type", value: "Achievement" }, { trait_type: "Rarity", value: "Mythic" }] },
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
