-- Tideborn season 1 — supply rows for the 5 new cards.
-- Images live in storage bucket nft-images (12–16).

INSERT INTO public.nft_conditions (name, nft_id, rarity, minted, max_supply, condition)
VALUES
  ('splintered_keel', 12, 'Rare',      0, 50, 'Drop to 3 hull or less, then survive to turn 15.'),
  ('quiet_hold',      13, 'Rare',      0, 40, 'Finish with 200+ gold without fighting a pirate.'),
  ('red_wake',        14, 'Epic',      0, 25, 'Fight 5 or more pirates in a single voyage.'),
  ('abyss_lantern',   15, 'Legendary', 0, 10, 'Reach The Abyss and finish with 800+ points.'),
  ('tideborn_crown',  16, 'Mythic',    0, 1,  'Win the Tideborn season event — one crown, one captain.')
ON CONFLICT (name) DO NOTHING;
