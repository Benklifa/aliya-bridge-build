// UTM capture for lead attribution. Reads utm_* params from the landing URL,
// keeps them in sessionStorage so they survive internal navigation (React
// Router links drop the query string), and exposes them for form payloads.
// UTM values are campaign labels, not personal data.

export const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content"] as const;
export type UtmKey = (typeof UTM_KEYS)[number];
export type UtmFields = Record<UtmKey, string>;

const STORAGE_KEY = "aliya_utm";
const EMPTY: UtmFields = { utm_source: "", utm_medium: "", utm_campaign: "", utm_content: "" };

const clean = (v: string | null) => (v ?? "").trim().slice(0, 200);

/** Store any utm_* params on the current URL (last ad click wins). Call once on page load. */
export const captureUtm = (search: string = typeof window !== "undefined" ? window.location.search : "") => {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(search);
  if (!UTM_KEYS.some((k) => params.get(k))) return;
  const next: UtmFields = { ...EMPTY };
  for (const k of UTM_KEYS) next[k] = clean(params.get(k));
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* storage blocked (private mode); the URL still carries the params on this page */
  }
};

/** UTM fields for a form submission: stored values, or the current URL's if storage is unavailable. */
export const getUtm = (): UtmFields => {
  if (typeof window === "undefined") return { ...EMPTY };
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<UtmFields>;
      const out: UtmFields = { ...EMPTY };
      for (const k of UTM_KEYS) out[k] = clean(typeof parsed[k] === "string" ? parsed[k]! : "");
      return out;
    }
  } catch {
    /* fall through */
  }
  const params = new URLSearchParams(window.location.search);
  const out: UtmFields = { ...EMPTY };
  for (const k of UTM_KEYS) out[k] = clean(params.get(k));
  return out;
};
