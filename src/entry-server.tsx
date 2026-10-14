import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import type { ReactNode } from "react";
import App from "./App";
import { lifeEvents } from "./data/lifeEvents";

export const routes: string[] = [
  "/", "/framework", "/framework/a", "/framework/l", "/framework/i", "/framework/y",
  "/framework/adapt", "/about", "/services", "/events", "/news", "/contact", "/faq",
  "/readiness", "/where-should-i-live", "/am-i-ready-to-buy", "/tools", "/glossary",
  "/disclosures", "/privacy",
  ...lifeEvents.map((e) => `/life-events/${e.slug}`),
];

export function render(url: string): string {
  const Router = ({ children }: { children: ReactNode }) => (
    <StaticRouter location={url}>{children}</StaticRouter>
  );
  return renderToString(<App Router={Router} />);
}
