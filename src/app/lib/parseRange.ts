export function parseDaterange(range: string) {
    const match = range.match(/\[(.*?),(.*?)\)/);
    if (!match) return null;
    const [, start, end] = match;
    return { start, end };
  }
  