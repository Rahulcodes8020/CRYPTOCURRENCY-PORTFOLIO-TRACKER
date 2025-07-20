"use client";
import { useEffect, useState } from "react";
import CoinCard from "./CoinCard";
import axios from "axios";

export default function Watchlist() {
  const [coins, setCoins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("watchlist") || "[]");

    if (stored.length === 0) {
      setLoading(false);
      return;
    }

    const ids = typeof stored[0] === "string" ? stored : stored.map((c: any) => c.id);

    axios
      .get("https://api.coingecko.com/api/v3/coins/markets", {
        params: {
          vs_currency: "usd",
          ids: ids.join(","),
        },
      })
      .then((res) => {
        setCoins(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4 text-white">
      <h2 className="text-xl font-bold mb-4 text-orange-500">👁️ Your Watchlist</h2>

      {loading ? (
        <p>⏳ Loading watchlist...</p>
      ) : error ? (
        <div className="bg-red-800 text-white p-4 rounded">
          ❌ Failed to load Watchlist
        </div>
      ) : coins.length === 0 ? (
        <p>No coins in watchlist.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {coins.map((coin) => (
            <CoinCard key={coin.id} data={coin} error={false} />
          ))}
        </div>
      )}
    </div>
  );
}
