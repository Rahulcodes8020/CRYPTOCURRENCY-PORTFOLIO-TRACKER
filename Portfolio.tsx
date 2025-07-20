"use client";
import { useEffect, useState } from "react";
import CoinCard from "./CoinCard";
import axios from "axios";

export default function Portfolio() {
  const [coins, setCoins] = useState<any[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("portfolio") || "[]");
    const ids = stored.map((c: any) => c.id);

    if (ids.length === 0) return;

    Promise.all(
      ids.map((id: string) =>
        axios
          .get(`https://api.coingecko.com/api/v3/coins/${id}`)
          .then((res) => res.data)
          .catch(() => null)
      )
    )
      .then((data) => {
        const filtered = data.filter(Boolean);
        setCoins(filtered);
      })
      .catch(() => setError(true));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">📊 Your Portfolio</h2>
      {error ? (
        <div className="bg-red-800 text-white p-4 rounded">
          ❌ Failed to load Portfolio
        </div>
      ) : coins.length === 0 ? (
        <p>No coins in portfolio.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {coins.map((coin) => (
            <CoinCard key={coin.id} coin={coin} />

          ))}
        </div>
      )}
    </div>
  );
}
