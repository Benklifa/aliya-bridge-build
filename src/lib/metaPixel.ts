// Meta Pixel helpers. The base pixel code is injected into index.html at
// build time by the metaPixelHtml plugin in vite.config.ts. Set the Pixel ID
// via the VITE_META_PIXEL_ID environment variable (Vercel project env vars).
// If no real ID is configured, every helper below is a no-op.
// IMPORTANT: never pass PII (names, emails, phones, form values) in params.

export const META_PIXEL_ID_PLACEHOLDER = "META_PIXEL_ID_PLACEHOLDER";
export const DEFAULT_META_PIXEL_ID = "4497366180476268";

export const META_PIXEL_ID: string =
  (import.meta.env.VITE_META_PIXEL_ID as string | undefined)?.trim() ||
  DEFAULT_META_PIXEL_ID;

export const isPixelEnabled = () =>
  META_PIXEL_ID !== META_PIXEL_ID_PLACEHOLDER &&
  /^\d+$/.test(META_PIXEL_ID) &&
  typeof window !== "undefined" &&
  typeof (window as unknown as { fbq?: unknown }).fbq === "function";

type Params = Record<string, string | number | boolean>;

export const trackEvent = (event: string, params?: Params) => {
  if (!isPixelEnabled()) return;
  const fbq = (window as unknown as { fbq: (...args: unknown[]) => void }).fbq;
  if (params) fbq("track", event, params);
  else fbq("track", event);
};
