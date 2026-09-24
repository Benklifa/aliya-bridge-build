import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

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

// https://vitejs.dev/config/
export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), marketDataDevMiddleware()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
