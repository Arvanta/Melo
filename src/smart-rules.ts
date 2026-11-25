// Round 126: smart-playlist rules (mirror of the Rust SmartRules in
// library_db.rs — the backend re-validates everything, this only keeps the
// dialog honest and builds the human summary).
export type SmartOp = "is" | "isNot" | "atLeast" | "atMost" | "between";
export type SmartRule = { field: "rating"; op: SmartOp; value: number; value2: number };
export type SmartSort = "title" | "artist" | "rating-desc" | "added-desc" | "plays-desc";
export type SmartRules = { rules: SmartRule[]; matchAll: boolean; sort: SmartSort; limit: number | null };

export const SMART_OPS: { id: SmartOp; label: string }[] = [
  { id: "is", label: "is" },
  { id: "isNot", label: "is not" },
  { id: "atLeast", label: "is at least" },
  { id: "atMost", label: "is at most" },
  { id: "between", label: "is between" },
];
export const SMART_SORTS: { id: SmartSort; label: string }[] = [
  { id: "title", label: "Title" },
  { id: "artist", label: "Artist" },
  { id: "rating-desc", label: "Highest rated first" },
  { id: "added-desc", label: "Recently added first" },
  { id: "plays-desc", label: "Most played first" },
];
export const MAX_SMART_RULES = 10;
export const MAX_SMART_LIMIT = 100000;

export const defaultSmartRules = (): SmartRules => ({
  rules: [{ field: "rating", op: "atLeast", value: 4, value2: 0 }],
  matchAll: true, sort: "title", limit: null,
});

const star = (n: number) => (n <= 0 ? "unrated" : `${n}★`);

export function describeRule(r: SmartRule): string {
  switch (r.op) {
    case "is": return `Rating is ${star(r.value)}`;
    case "isNot": return `Rating is not ${star(r.value)}`;
    case "atLeast": return `Rating ≥ ${star(r.value)}`;
    case "atMost": return `Rating ≤ ${star(r.value)}`;
    case "between": return `Rating ${star(Math.min(r.value, r.value2))}–${star(Math.max(r.value, r.value2))}`;
  }
}

export function describeRules(s: SmartRules): string {
  const parts = s.rules.map(describeRule);
  const joined = parts.join(s.matchAll ? " and " : " or ");
  return s.limit ? `${joined} · first ${s.limit}` : joined;
}

const clampStar = (n: unknown) => { const v = Math.round(Number(n)); return Number.isFinite(v) ? Math.min(5, Math.max(0, v)) : 0; };

/** Returns a cleaned copy, or an error message for the dialog. */
export function normalizeSmartRules(s: SmartRules): { ok: SmartRules } | { error: string } {
  if (!s.rules.length) return { error: "Add at least one rule." };
  if (s.rules.length > MAX_SMART_RULES) return { error: `At most ${MAX_SMART_RULES} rules.` };
  const rules = s.rules.map((r): SmartRule => {
    const value = clampStar(r.value);
    if (r.op !== "between") return { field: "rating", op: r.op, value, value2: 0 };
    const v2 = clampStar(r.value2);
    return { field: "rating", op: "between", value: Math.min(value, v2), value2: Math.max(value, v2) };
  });
  let limit: number | null = null;
  if (s.limit != null && Number(s.limit) > 0) {
    limit = Math.floor(Number(s.limit));
    if (!Number.isFinite(limit)) return { error: "The limit must be a number." };
    limit = Math.min(limit, MAX_SMART_LIMIT);
  }
  return { ok: { rules, matchAll: !!s.matchAll, sort: s.sort, limit } };
}
