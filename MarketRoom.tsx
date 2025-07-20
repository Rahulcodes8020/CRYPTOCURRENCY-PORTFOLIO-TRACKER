// components/MarketRoom.tsx
"use client";

import { useState } from "react";
import {
  AdvancedRealTimeChart,
  TickerTape,
} from "react-ts-tradingview-widgets";

const popularStocks = [
  "NSE:NIFTY 50",
  "NSE:SENSEX",
  "NSE:RELIANCE",
  "NSE:TCS",
  "NSE:HDFCBANK",
  "BSE:INFY",
  "NSE:WIPRO",
];

export default function MarketRoom() {
  const [symbol, setSymbol] = useState(popularStocks[0]);

  return (
    <div className="space-y-4">
      <TickerTape
        symbols={popularStocks.map((s) => ({
          proName: s,
          title: s.split(":")[1],
        }))}
        colorTheme="dark"
        isTransparent={true}
        displayMode="adaptive"
        locale="en"
      />
      <select
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        className="p-2 bg-gray-800 text-white rounded"
      >
        {popularStocks.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden">
        <AdvancedRealTimeChart
          symbol={symbol}
          width="100%"
          height={500}
          theme="dark"
          autosize
        />
      </div>
    </div>
  );
}
