// Vercel serverless proxy for the homepage market ticker.
// See _market-data-logic.js for why this proxy exists (Yahoo's endpoint
// has no CORS headers, so the browser can't call it directly).

import { fetchMarketData } from "./_market-data-logic.js";

export default async function handler(req, res) {
  try {
    const data = await fetchMarketData();
    // Cache briefly at the edge so refreshes across many visitors don't
    // hammer the upstream endpoint.
    res.setHeader("Cache-Control", "s-maxage=120, stale-while-revalidate=300");
    return res.status(200).json(data);
  } catch (error) {
    console.error("Market data proxy error:", error);
    return res.status(502).json({ error: "Upstream request failed" });
  }
}
