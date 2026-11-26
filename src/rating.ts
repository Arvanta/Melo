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
    out += `<button type="button" class="${cls}${i <= value ? " on" : ""}" data-star="${i}" role="radio" aria-checked="${i === value}" aria-label="${i} star${i === 1 ? "" : "s"}">★</button>`;
  }
  return out;
}

/**
 * Hover preview for a star row (round 127). Per star: "add" = would be filled
 * by a click, "remove" = would be emptied by a click, "" = unchanged.
 * Nothing unrated: stars 1..hover are "add". Already rated N: hovering above N
 * previews only the new stars (N+1..hover); hovering below N previews the
 * stars that would go (hover+1..N); hovering N itself shows nothing.
 * `current < 0` (mixed values) behaves like unrated.
 */
export function previewStars(current: number, hover: number): ("add" | "remove" | "")[] {
  const cur = current < 0 ? 0 : clampStars(current);
  const out: ("add" | "remove" | "")[] = [];
  for (let i = 1; i <= MAX_STARS; i++) {
    if (hover < 1) out.push("");
    else if (hover > cur) out.push(i > cur && i <= hover ? "add" : "");
    else if (hover < cur) out.push(i > hover && i <= cur ? "remove" : "");
    else out.push("");
  }
  return out;
}

const previewBound = new WeakSet<HTMLElement>();
/** Wire the hover preview once per container; stars may be re-rendered freely. */
export function bindStarPreview(box: HTMLElement, getCurrent: () => number) {
  if (previewBound.has(box)) { (box as any).__starCur = getCurrent; return; }
  previewBound.add(box);
  (box as any).__starCur = getCurrent;
  const clear = () => box.querySelectorAll<HTMLElement>("[data-star]").forEach(b => b.classList.remove("pv-add", "pv-remove"));
  box.addEventListener("mouseover", e => {
    const b = (e.target as HTMLElement | null)?.closest?.("[data-star]") as HTMLElement | null;
    clear();
    if (!b || !box.contains(b)) return;
    const kinds = previewStars((box as any).__starCur(), Number(b.dataset.star));
    box.querySelectorAll<HTMLElement>("[data-star]").forEach(s => {
      const k = kinds[Number(s.dataset.star) - 1];
      if (k) s.classList.add(k === "add" ? "pv-add" : "pv-remove");
    });
  });
  box.addEventListener("mouseleave", clear);
}
