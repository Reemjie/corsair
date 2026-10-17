/** Shared map cell sizing — slide distance must match GameMap exactly. */

export const MAP_GAP = 2;

export function getMapCellSize(vision: number, isMobile: boolean): number {
  const vSize = vision * 2 + 1;
  const reservedH = isMobile ? 240 : 170;
  const maxGridH = Math.max(180, window.innerHeight - reservedH);
  // Slimmer side HUD → map can claim more of the viewport
  const widthFrac = vision >= 4 ? 0.58 : 0.55;
  const widthCap = vision >= 4 ? 700 : 640;
  const maxGridW = isMobile
    ? window.innerWidth - 12
    : Math.min(window.innerWidth * widthFrac, widthCap);
  // Floor: below ~44px the octagon badges become noise
  return Math.max(44, Math.floor(Math.min(maxGridW, maxGridH) / vSize) - MAP_GAP);
}

/** Pixels the world must travel for one grid step (cell + gap). */
export function getMapStep(vision: number, isMobile: boolean): number {
  return getMapCellSize(vision, isMobile) + MAP_GAP;
}
