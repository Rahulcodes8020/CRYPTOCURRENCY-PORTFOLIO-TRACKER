// components/TradingViewWidget.tsx
"use client";
import { useEffect } from "react";

interface Props {
  symbol: string;
}

export default function TradingViewWidget({ symbol }: Props) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbol: `BINANCE:${symbol}`,
      width: "100%",
      height: "220",
      locale: "en",
      dateRange: "1D",
      colorTheme: "dark",
      isTransparent: false,
      autosize: true,
      largeChartUrl: ""
    });

    const container = document.getElementById(`tv-${symbol}`);
    if (container) {
      container.innerHTML = "";
      container.appendChild(script);
    }
  }, [symbol]);

  return <div id={`tv-${symbol}`} />;
}
