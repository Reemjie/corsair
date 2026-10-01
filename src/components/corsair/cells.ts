export const CELL_ICONS: Record<string, string> = {
  sea: '〰',
  storm: import.meta.env.BASE_URL + 'icons_ui/storm.png',
  pirate: import.meta.env.BASE_URL + 'icons_ui/swords.png',
  treasure: import.meta.env.BASE_URL + 'icons_ui/treasure.png',
  port: import.meta.env.BASE_URL + 'icons/port.png',
  kraken: import.meta.env.BASE_URL + 'icons_ui/kraken.png',
  wreck: import.meta.env.BASE_URL + 'icons/wreck.png',
  island: import.meta.env.BASE_URL + 'icons/island.png',
  rocks: import.meta.env.BASE_URL + 'icons/rocks.png',
};

export const CELL_COLOR_BY_ZONE: Record<number, Record<string, string>> = {
  1: { sea: '#1a3a4a', storm: '#2a1a4a', pirate: '#3a1010', treasure: '#2a2a00', port: '#0a2a2a', kraken: '#2a0a3a', wreck: '#2a1a0a', island: '#0a2a0a', rocks: '#1a1a1a', portal: '#1a0a3a' },
  2: { sea: '#1a2a3a', storm: '#3a0a5a', pirate: '#4a0a1a', treasure: '#2a1a00', port: '#0a1a2a', kraken: '#3a0a4a', wreck: '#3a1a0a', island: '#0a1a0a', rocks: '#0a0a1a', portal: '#2a0a4a' },
  3: { sea: '#0a1a2a', storm: '#2a0a3a', pirate: '#3a0505', treasure: '#1a1000', port: '#051015', kraken: '#200530', wreck: '#200a05', island: '#051005', rocks: '#050508', portal: '#150020' },
};

export const CELL_GLOW_BY_ZONE: Record<number, Record<string, string>> = {
  1: { treasure: '#eedd44', port: '#44cccc', kraken: '#cc44ee', pirate: '#ee4444', portal: '#8866ff' },
  2: { treasure: '#cc9922', port: '#2299aa', kraken: '#aa22cc', pirate: '#cc2222', portal: '#6644cc' },
  3: { treasure: '#aa7700', port: '#116677', kraken: '#880099', pirate: '#aa0000', portal: '#440088' },
};
