// components/TopMovers.tsx
"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import CoinCard from "@/components/CoinCard";

export default function TopMovers() {
  const [coins, setCoins] = useState<any[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios.get("https://api.coingecko.com/api/v3/coins/markets", {
      params: { vs_currency: "usd", order: "price_change_percentage_24h_desc", per_page: 8 }
    })
    .then(res => setCoins(res.data))
    .catch(err => {
      console.error("❌ TopMovers error:", err);
      setError(true);
    });
  }, []);

  if (error) return <p className="text-red-500">Error loading top movers.</p>;
  if (!coins.length) return <p className="text-gray-400">Loading top movers...</p>;

  return (
    <section className="p-6">
      <h2 className="text-xl font-bold mb-4 text-blue-400">🚀 Top Movers</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
        {coins.map(c => <CoinCard key={c.id} coin={c} />)}
      </div>
    </section>
  );
}
