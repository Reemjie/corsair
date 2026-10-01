export function deriveDeathCause(log: string): { name: string; tip: string } {
  const l = (log || '').toLowerCase();
  if (l.includes('storm') || l.includes('lightning') || l.includes('splits the deck') || l.includes('waves') || l.includes('surge')) {
    return { name: 'The Storm', tip: 'Rituals at islands (+4 turns) and Kraken Pacts (+6) push it back.' };
  }
  if (l.includes('tentacles') || l.includes('surfaces') || l.includes('hunter')) {
    return { name: 'The Hunter', tip: 'Ports (-15) and storms (-10) lower its awareness. Watch the bar.' };
  }
  if (l.includes('pirate')) return { name: 'Pirates', tip: 'Power wins fights — or swallow your pride and pay tribute.' };
  if (l.includes('kraken')) return { name: 'The Kraken', tip: 'Sometimes restraint is the better part of valor.' };
  if (l.includes('reef') || l.includes('rock')) return { name: 'The Reefs', tip: 'Careful navigation costs a turn but spares the hull.' };
  if (l.includes('curse')) return { name: 'The Curse', tip: 'Cursed gold always collects its price.' };
  return { name: 'The Deep', tip: 'The sea keeps its secrets.' };
}
