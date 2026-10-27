import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import type { ReactNode } from "react";
import App from "./App";
import { lifeEvents } from "./data/lifeEvents";
import { resourcesNoindexRoutes, resourcesRoutes, resourcesSitemapExcludeRoutes } from "./content/articles";
export { routeMeta } from "./lib/routeMeta";

export const routes: string[] = [
  "/", "/framework", "/framework/a", "/framework/l", "/framework/i", "/framework/y",
  "/framework/adapt", "/about", "/services", "/events", "/news", "/contact", "/faq",
  "/readiness", "/where-should-i-live", "/am-i-ready-to-buy", "/tools", "/glossary",
  "/disclosures", "/privacy", "/borrow-against-portfolio", "/aliya-plan",
  ...lifeEvents.map((e) => `/life-events/${e.slug}`),
];

// Routes prerendered with <meta name="robots" content="noindex">.
export const noindexRoutes: string[] = ["/borrow-against-portfolio", "/aliya-plan"];

// Routes prerendered but left out of sitemap.xml.
export const sitemapExcludeRoutes: string[] = ["/borrow-against-portfolio", "/aliya-plan"];

export function render(url: string): string {
  const Router = ({ children }: { children: ReactNode }) => (
    <StaticRouter location={url}>{children}</StaticRouter>
  );
  return renderToString(<App Router={Router} />);
}

// Resources hub (/resources) and its articles (/resources/<slug>), generated
// from src/content/articles. Hold rules live in src/content/resources.config.ts.
routes.push(...resourcesRoutes);
noindexRoutes.push(...resourcesNoindexRoutes);
sitemapExcludeRoutes.push(...resourcesSitemapExcludeRoutes);
