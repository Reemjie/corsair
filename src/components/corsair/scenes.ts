/** Assets et titres de scènes — partagés entre CorsairGame et EventChoicePanel. */

export const CHOICE_ICONS: Record<string, string> = Object.fromEntries(
  ['search','lurks','fight','tribute','pact','push','detour','take','leave','dock','sail','ritual','explore','careful','speed','vortex','cursed','sacrifice','cover']
    .map(name => [name, new URL(`../../assets/choices/${name}.png`, import.meta.url).href])
);

export const ZONE_BG: Record<number, string> = {
  1: import.meta.env.BASE_URL + 'scenes/island.jpg',
  2: import.meta.env.BASE_URL + 'scenes/storm.jpg',
  3: import.meta.env.BASE_URL + 'scenes/ancient-kraken.jpg',
};

export const SCENE_BG: Record<string, string> = {
  kraken: import.meta.env.BASE_URL + 'scenes/kraken.jpg',
  ancient_kraken: import.meta.env.BASE_URL + 'scenes/ancient-kraken.jpg',
  storm: import.meta.env.BASE_URL + 'scenes/storm.jpg',
  island: import.meta.env.BASE_URL + 'scenes/island.jpg',
  treasure: import.meta.env.BASE_URL + 'scenes/treasure.jpg',
  cursed_treasure: import.meta.env.BASE_URL + 'scenes/cursed_treasure.jpg',
  pirate: import.meta.env.BASE_URL + 'scenes/pirate.jpg',
  port: import.meta.env.BASE_URL + 'scenes/port.jpg',
  rocks: import.meta.env.BASE_URL + 'scenes/rocks.jpg',
  wreck: import.meta.env.BASE_URL + 'scenes/wreck.jpg',
  maelstrom: import.meta.env.BASE_URL + 'scenes/maelstrom.jpg',
};

export const SCENE_VIDEO: Record<string, string> = {
  kraken: import.meta.env.BASE_URL + 'scenes/kraken.mp4',
  ancient_kraken: import.meta.env.BASE_URL + 'scenes/ancient_kraken.mp4',
  storm: import.meta.env.BASE_URL + 'scenes/storm.mp4',
  island: import.meta.env.BASE_URL + 'scenes/island.mp4',
  treasure: import.meta.env.BASE_URL + 'scenes/treasure.mp4',
  cursed_treasure: import.meta.env.BASE_URL + 'scenes/cursed_treasure.mp4',
  pirate: import.meta.env.BASE_URL + 'scenes/pirate.mp4',
  port: import.meta.env.BASE_URL + 'scenes/port.mp4',
  rocks: import.meta.env.BASE_URL + 'scenes/rocks.mp4',
  wreck: import.meta.env.BASE_URL + 'scenes/wreck.mp4',
  maelstrom: import.meta.env.BASE_URL + 'scenes/maelstrom.mp4',
  death: import.meta.env.BASE_URL + 'scenes/death.mp4',
};

export const SCENE_TITLES: Record<string, string> = {
  kraken: 'The Kraken Rises',
  ancient_kraken: 'The Ancient One Awakens',
  storm: 'Into the Storm',
  island: 'Uncharted Island',
  treasure: 'Hidden Treasure',
  cursed_treasure: 'Cursed Gold',
  pirate: 'Pirates on the Horizon',
  port: 'Safe Harbor',
  rocks: 'Treacherous Reef',
  wreck: 'A Ghostly Wreck',
  death: 'Your Voyage Ends',
  maelstrom: 'The Maelstrom',
};
