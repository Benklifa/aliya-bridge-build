import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";

// Serves /api/market-data during local `vite`/`vite dev` sessions using the
// same logic as the Vercel serverless function in api/market-data.js, so
// the homepage ticker works identically in local preview and production.
const marketDataDevMiddleware = (): Plugin => ({
  name: "market-data-dev-middleware",
  configureServer(server) {
    server.middlewares.use("/api/market-data", async (req, res) => {
      try {
        const { fetchMarketData } = await import("./api/_market-data-logic.js");
        const data = await fetchMarketData();
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(data));
      } catch (error) {
        console.error("Market data dev middleware error:", error);
        res.statusCode = 502;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ error: "Upstream request failed" }));
      }
    });
  },
});

// Injects the Meta Pixel base code + <noscript> into index.html.
// Pixel ID comes from VITE_META_PIXEL_ID; if unset (placeholder), nothing is injected.
const META_PIXEL_ID_PLACEHOLDER = "META_PIXEL_ID_PLACEHOLDER";
const DEFAULT_META_PIXEL_ID = "4497366180476268";
const metaPixelHtml = (pixelId: string): Plugin => ({
  name: "meta-pixel-html",
  transformIndexHtml(html) {
    if (!pixelId || pixelId === META_PIXEL_ID_PLACEHOLDER || !/^\d+$/.test(pixelId)) return html;
    const base = `<!-- Meta Pixel Code -->
    <script>
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
    n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
    document,'script','https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '${pixelId}');
    fbq('track', 'PageView');
    </script>
    <!-- End Meta Pixel Code -->`;
    const noscript = `<noscript><img height="1" width="1" style="display:none" alt="" src="https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1" /></noscript>`;
    return html.replace("</head>", `${base}\n  </head>`).replace("<body>", `<body>\n    ${noscript}`);
  },
});

// Draft articles (src/content/articles, frontmatter `draft: true`) show on
// local builds (no VERCEL) and Vercel Preview builds only. On Production the
// plugin below blanks each draft's Markdown so its text never reaches the bundle.
const SHOW_DRAFTS = !process.env.VERCEL || process.env.VERCEL_ENV === "preview";
const stripDraftArticles = (): Plugin => ({
  name: "strip-draft-articles",
  enforce: "pre",
  transform(_code, id) {
    if (SHOW_DRAFTS || !/[\\/]src[\\/]content[\\/]articles[\\/][^\\/]+\.md\?raw$/.test(id)) return null;
    const source = fs.readFileSync(id.replace(/\?raw$/, ""), "utf8");
    const frontmatter = source.match(/^\uFEFF?---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? "";
    if (/^draft:\s*["']?true["']?\s*$/im.test(frontmatter)) return { code: 'export default "";', map: null };
    return null;
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const metaPixelId = (env.VITE_META_PIXEL_ID || DEFAULT_META_PIXEL_ID).trim();
  return {
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), marketDataDevMiddleware(), metaPixelHtml(metaPixelId), stripDraftArticles()],
  define: {
    __SHOW_DRAFTS__: JSON.stringify(SHOW_DRAFTS),
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
};
});
