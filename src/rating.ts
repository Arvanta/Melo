// Star rating helpers shared by the tag editor, the player card, the context
// menus and the library (round 125). Pure: no DOM access, no Tauri.

export const MAX_STARS = 5;

/** Clicking the star that is already the current value clears the rating. */
export function nextStars(current: number, clicked: number): number {
  const c = Math.max(0, Math.min(MAX_STARS, Math.round(clicked)));
  return c === current ? 0 : c;
}

export function clampStars(n: unknown): number {
  const v = Math.round(Number(n));
  return Number.isFinite(v) ? Math.max(0, Math.min(MAX_STARS, v)) : 0;
}

/** Digit keys 0-5 set the rating of the playing track; anything else is not ours. */
export function starsForKey(key: string): number | null {
  return /^[0-5]$/.test(key) ? Number(key) : null;
}

export const starsLabel = (n: number) => (n <= 0 ? "No rating" : `${n} star${n === 1 ? "" : "s"}`);

/** A row of five star buttons (filled up to `value`). `data-star` carries 1..5. */
export function starsHtml(value: number, cls = "rate-star"): string {
  let out = "";
  for (let i = 1; i <= MAX_STARS; i++) {
    out += `<button type="button" class="${cls}${i <= value ? " on" : ""}" data-star="${i}" role="radio" aria-checked="${i === value}" aria-label="${i} star${i === 1 ? "" : "s"}" title="${i} star${i === 1 ? "" : "s"}">★</button>`;
  }
  return out;
}
