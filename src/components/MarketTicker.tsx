import { useEffect, useState } from "react";

interface TickerItem {
  key: string;
  label: string;
  ok: boolean;
  price?: number;
  changePercent?: number | null;
  decimals?: number;
}

const PLACEHOLDER: TickerItem[] = [
  { key: "usdils", label: "USD/ILS", ok: false },
  { key: "tase", label: "TASE", ok: false },
  { key: "spx", label: "S&P 500", ok: false },
  { key: "nasdaq", label: "NASDAQ", ok: false },
  { key: "djia", label: "DJIA", ok: false },
];

const REFRESH_INTERVAL_MS = 5 * 60 * 1000;

const formatPrice = (item: TickerItem) => {
  if (!item.ok || item.price == null) return "—";
  return item.price.toLocaleString(undefined, {
    minimumFractionDigits: item.decimals ?? 2,
    maximumFractionDigits: item.decimals ?? 2,
  });
};

const MarketTicker = () => {
  const [items, setItems] = useState<TickerItem[]>(PLACEHOLDER);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const response = await fetch("/api/market-data");
        const data = await response.json();
        if (!cancelled && Array.isArray(data.items)) {
          setItems(data.items);
        }
      } catch {
        // Keep whatever was last shown (or the placeholder) rather than
        // clearing the tape on a transient network error.
      }
    };

    load();
    const interval = setInterval(load, REFRESH_INTERVAL_MS);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  const renderSet = (setKey: string) => (
    <div className="flex items-center" aria-hidden={setKey !== "primary"}>
      {items.map((item) => {
        const change = item.ok ? item.changePercent : null;
        const isUp = change != null && change >= 0;
        return (
          <span
            key={`${setKey}-${item.key}`}
            className="inline-flex items-center gap-1.5 px-5 whitespace-nowrap text-xs sm:text-sm border-r border-white/10 last:border-r-0"
          >
            <span className="font-semibold text-gold-500">{item.label}</span>
            <span className="text-white">{formatPrice(item)}</span>
            {change != null && (
              <span className={isUp ? "text-emerald-400" : "text-red-400"}>
                {isUp ? "▲" : "▼"} {Math.abs(change).toFixed(2)}%
              </span>
            )}
          </span>
        );
      })}
      <span
        key={`${setKey}-disclaimer`}
        className="inline-flex items-center px-5 whitespace-nowrap text-[11px] sm:text-xs text-white/50 italic border-r border-white/10 last:border-r-0"
      >
        Quotes delayed &middot; For informational purposes only &middot; Not investment advice
      </span>
    </div>
  );

  return (
    <div
      className="w-full bg-navy-600 overflow-hidden py-1.5"
      aria-label="Market and exchange rate data"
    >
      <div className="market-ticker-track flex">
        {renderSet("primary")}
        {renderSet("duplicate")}
      </div>
    </div>
  );
};

export default MarketTicker;
