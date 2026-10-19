// Build-time prerender: renders each route with react-dom/server into
// dist/<route>/index.html so crawlers (Meta, Google) see real content without JS.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

// Minimal browser-storage shims so components that read localStorage in
// useState initializers render their default (first-visit) state.
const memStore = () => { const m = new Map(); return { getItem: (k) => (m.has(k) ? m.get(k) : null), setItem: (k, v) => m.set(k, String(v)), removeItem: (k) => m.delete(k), clear: () => m.clear(), key: (i) => [...m.keys()][i] ?? null, get length() { return m.size; } }; };
globalThis.localStorage ??= memStore();
globalThis.sessionStorage ??= memStore();
// useLayoutEffect is a no-op on the server; React's warning about it is noise here.
const origError = console.error;
console.error = (msg, ...rest) => { if (typeof msg === "string" && msg.includes("useLayoutEffect does nothing on the server")) return; origError(msg, ...rest); };

const SITE = "https://aliyafinancial.com";
const dist = path.resolve("dist");
const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");
const { render, routes, noindexRoutes = [], sitemapExcludeRoutes = [] } = await import(pathToFileURL(path.resolve("dist-ssr/entry-server.js")).href);

for (const route of routes) {
  let appHtml = "";
  try {
    appHtml = render(route);
  } catch (err) {
    console.warn(`WARN: could not prerender ${route}, shipping SPA shell: ${err.message}`);
  }
  const canonical = `${SITE}${route === "/" ? "/" : route}`;
  let html = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
  html = html.replace(/<link rel="canonical"[^>]*>/, "");
  html = html.replace("</head>", `  <link rel="canonical" href="${canonical}" />\n  </head>`);
  if (noindexRoutes.includes(route)) {
    html = html.replace("</head>", `  <meta name="robots" content="noindex" />\n  </head>`);
  }
  html = html.replace(/(<meta property="og:url" content=")[^"]*"/, `$1${canonical}"`);
  html = html.replace(/(<meta name="twitter:url" content=")[^"]*"/, `$1${canonical}"`);
  const outDir = route === "/" ? dist : path.join(dist, route.slice(1));
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "index.html"), html);
  console.log(`prerendered ${route} (${appHtml.length} chars)`);
}

const today = new Date().toISOString().slice(0, 10);
const sitemapRoutes = routes.filter((r) => !sitemapExcludeRoutes.includes(r));
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapRoutes.map((r) => `  <url><loc>${SITE}${r}</loc><lastmod>${today}</lastmod></url>`).join("\n")}
</urlset>
`;
fs.writeFileSync(path.join(dist, "sitemap.xml"), sitemap);
fs.rmSync(path.resolve("dist-ssr"), { recursive: true, force: true });
console.log(`sitemap.xml written with ${sitemapRoutes.length} URLs`);
