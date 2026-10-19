import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import type { ReactNode } from "react";
import App from "./App";
import { lifeEvents } from "./data/lifeEvents";

export const routes: string[] = [
  "/", "/framework", "/framework/a", "/framework/l", "/framework/i", "/framework/y",
  "/framework/adapt", "/about", "/services", "/events", "/news", "/contact", "/faq",
  "/readiness", "/where-should-i-live", "/am-i-ready-to-buy", "/tools", "/glossary",
  "/disclosures", "/privacy", "/borrow-against-portfolio", "/aliya-plan",
  "/pre-aliya-liquidity-reserve",
  ...lifeEvents.map((e) => `/life-events/${e.slug}`),
];

// Routes prerendered with <meta name="robots" content="noindex">.
export const noindexRoutes: string[] = [
  "/borrow-against-portfolio",
  "/aliya-plan",
  "/pre-aliya-liquidity-reserve",
];

// Routes prerendered but left out of sitemap.xml.
export const sitemapExcludeRoutes: string[] = ["/aliya-plan", "/pre-aliya-liquidity-reserve"];

// Per-route <head> overrides applied at prerender time.
export const routeMeta: Record<string, { title: string; description: string; ogTitle: string }> = {
  "/pre-aliya-liquidity-reserve": {
    title: "Pre-Aliya liquidity reserve | Aliya Financial",
    description:
      "A portfolio-backed margin line set up before Aliya and used only if needed. Loans are made by the brokerage, not Aliya Financial. A market drop can trigger a margin call or force sales. Not suitable for all investors.",
    ogTitle: "Pre-Aliya liquidity reserve",
  },
};

export function render(url: string): string {
  const Router = ({ children }: { children: ReactNode }) => (
    <StaticRouter location={url}>{children}</StaticRouter>
  );
  return renderToString(<App Router={Router} />);
}
