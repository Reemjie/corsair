const METADATA: Record<number, object> = {
  1: { name: "The Kraken's Eye", description: "A legendary artifact. Reveals the Hunter's position at spawn.", image: "ipfs://bafybeic3suyc2sklp2ypx7nvfmj4fhayqu2fqd3xalq257jhthpx5wr4se", attributes: [{ trait_type: "Rarity", value: "Legendary" }] },
  2: { name: "The Ancient Chart", description: "All treasure cells revealed from run start.", image: "ipfs://bafybeid576kkatsdsjvyldarwiybwq2hqibf7cd7dvdtidtizluvem5apm", attributes: [{ trait_type: "Rarity", value: "Epic" }] },
  3: { name: "The Storm Caller", description: "Storm distance +5 at run start.", image: "ipfs://bafybeieyiw5elinspkna3yua3thqqxsg5tldvm3ezospxm4azporrkvki4", attributes: [{ trait_type: "Rarity", value: "Legendary" }] },
  4: { name: "The Ghost Corsair", description: "Pirate immunity 1x per run.", image: "ipfs://bafybeih5se4lzkn5s3u52raqp6hgg77syijm4buyb5upq5y7zlfshrfbha", attributes: [{ trait_type: "Rarity", value: "Epic" }] },
  5: { name: "The Maelstrom Heart", description: "Survive once at 0 HP with 1 hull.", image: "ipfs://bafybeiepk3zxbacpf4ngormvc5kcgglvh46judpdfh7rkln2cenbveh3iy", attributes: [{ trait_type: "Rarity", value: "Legendary" }] },
  6: { name: "The Cursed Doubloon", description: "+50 gold at run start.", image: "ipfs://bafybeid56dnunq3wu5ad6eveuve4k23duy6bxreelt32mr4bbygmfydpra", attributes: [{ trait_type: "Rarity", value: "Rare" }] },
  7: { name: "The Hunter's Mark", description: "Hunter capped at STALKING mode.", image: "ipfs://bafybeibmsy6qmz4wlxoyqqxk2jbvvjl7cgqkx23ts4dczhjed7jnnc4pdm", attributes: [{ trait_type: "Rarity", value: "Legendary" }] },
  8: { name: "The Last Port", description: "Free repair at first port per run.", image: "ipfs://bafybeiagwhp7b5if5affgcbivuw5yxpek3dkjlrsvvxaugzifx44ayj6jy", attributes: [{ trait_type: "Rarity", value: "Rare" }] },
  9: { name: "The Blood Moon Tide", description: "Combat score x1.5 for first 5 turns.", image: "ipfs://bafybeibttmnchyiy4ypet6yuodsg3xkxqzcem5kf3zoymi7pu64i3rgjn4", attributes: [{ trait_type: "Rarity", value: "Epic" }] },
  10: { name: "The Leviathan's Throne", description: "All bonuses combined once per run. Mythic. 1 copy.", image: "ipfs://bafybeicsvnwhzz5wkn2geq3vnds2a56ko4w2fnojnqtsr6k5iafmidnprq", attributes: [{ trait_type: "Rarity", value: "Mythic" }] },
}

Deno.serve((req) => {
  const url = new URL(req.url)
  const tokenId = parseInt(url.pathname.split('/').pop() || '0')
  if (!tokenId || !METADATA[tokenId]) return new Response('Not found', { status: 404 })
  return new Response(JSON.stringify(METADATA[tokenId]), {
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
  })
})
