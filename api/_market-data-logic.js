// Shared market-data fetch logic, used by both the Vercel serverless
// function (api/market-data.js, production) and the Vite dev middleware
// (vite.config.ts, local preview) so both environments behave the same.
//
// Yahoo Finance's unofficial chart endpoint doesn't send CORS headers, so
// this can't be called directly from the browser — it has to be fetched
// server-side and relayed.

const SYMBOLS = [
  { key: "usdils", label: "USD/ILS", symbol: "ILS=X", decimals: 4 },
  { key: "tase", label: "TASE", symbol: "TA35.TA", decimals: 2 },
  { key: "spx", label: "S&P 500", symbol: "^GSPC", decimals: 2 },
  { key: "nasdaq", label: "NASDAQ", symbol: "^IXIC", decimals: 2 },
  { key: "djia", label: "DJIA", symbol: "^DJI", decimals: 2 },
];

export async function fetchMarketData() {
  const items = await Promise.all(
    SYMBOLS.map(async ({ key, label, symbol, decimals }) => {
      try {
        const upstream = await fetch(
          `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}`,
          { headers: { "User-Agent": "Mozilla/5.0" } },
        );
        const data = await upstream.json();
        const meta = data?.chart?.result?.[0]?.meta;
        if (!meta || typeof meta.regularMarketPrice !== "number") {
          return { key, label, ok: false };
        }
        return {
          key,
          label,
          ok: true,
          price: meta.regularMarketPrice,
          changePercent:
            typeof meta.regularMarketChangePercent === "number"
              ? meta.regularMarketChangePercent
              : null,
          decimals,
        };
      } catch {
        return { key, label, ok: false };
      }
    }),
  );

  return { updatedAt: new Date().toISOString(), items };
}
