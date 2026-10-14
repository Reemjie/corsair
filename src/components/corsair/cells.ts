const I = (name: string) => `${import.meta.env.BASE_URL}icons/${name}.png`;

/** Compact event-panel icons — same set as the map (`public/icons/`). */
export const CELL_ICONS: Record<string, string> = {
  sea: I('sea'),
  storm: I('storm'),
  pirate: I('pirate'),
  treasure: I('treasure'),
  cursed_treasure: I('cursed_treasure'),
  port: I('port'),
  kraken: I('kraken'),
  ancient_kraken: I('ancient_kraken'),
  wreck: I('wreck'),
  island: I('island'),
  rocks: I('rocks'),
  maelstrom: I('maelstrom'),
  portal: I('portal'),
  hunter: I('hunter'),
};

/** Uniform sea wash — type color lives in the icon, not a flat cell fill. */
export const CELL_COLOR_BY_ZONE: Record<number, Record<string, string>> = {
  1: { sea: '#1a5a6e', storm: '#1a5a6e', pirate: '#1a5a6e', treasure: '#1a5a6e', port: '#1a5a6e', kraken: '#1a5a6e', wreck: '#1a5a6e', island: '#1a5a6e', rocks: '#1a5a6e', portal: '#1a5a6e' },
  2: { sea: '#164860', storm: '#164860', pirate: '#164860', treasure: '#164860', port: '#164860', kraken: '#164860', wreck: '#164860', island: '#164860', rocks: '#164860', portal: '#164860' },
  3: { sea: '#123848', storm: '#123848', pirate: '#123848', treasure: '#123848', port: '#123848', kraken: '#123848', wreck: '#123848', island: '#123848', rocks: '#123848', portal: '#123848' },
};

export const CELL_GLOW_BY_ZONE: Record<number, Record<string, string>> = {
  1: { treasure: '#eedd44', port: '#44cccc', kraken: '#cc44ee', pirate: '#ee4444', portal: '#8866ff' },
  2: { treasure: '#cc9922', port: '#2299aa', kraken: '#aa22cc', pirate: '#cc2222', portal: '#6644cc' },
  3: { treasure: '#aa7700', port: '#116677', kraken: '#880099', pirate: '#aa0000', portal: '#440088' },
};

/** Thin rim / icon halo — identity without flat cell fills. */
export const CELL_ACCENT: Record<string, string> = {
  pirate: '#ee5555',
  storm: '#a78bfa',
  treasure: '#f0d060',
  cursed_treasure: '#88cc66',
  port: '#44d4d4',
  kraken: '#cc66ee',
  ancient_kraken: '#e070ff',
  wreck: '#c4a574',
  island: '#66bb66',
  rocks: '#9aa3ad',
  maelstrom: '#66aadd',
  portal: '#aa88ff',
};
