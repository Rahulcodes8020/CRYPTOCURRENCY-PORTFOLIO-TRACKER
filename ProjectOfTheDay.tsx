"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ProjectOfTheDay() {
  const [coin, setCoin] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const res = await axios.get("/api/coingecko", {
          params: {
            vs_currency: "usd",
            order: "market_cap_desc",
            per_page: 1,
            page: 1,
          },
        });
        setCoin(res.data[0]);
        setError(null);
      } catch (err: any) {
        console.error("❌ Project of the Day Error:", err.message);
        setError("Error loading project of the day.");
      }
    };

    fetchCoin();
  }, []);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!coin) return <p>Loading...</p>;

  return (
    <div className="p-4 rounded-lg bg-gradient-to-r from-yellow-900 to-black shadow">
      <h2 className="text-lg font-bold text-yellow-400 mb-2">🔥 Project of the Day</h2>
      <div className="flex items-center space-x-4">
        <img src={coin.image} alt={coin.name} className="w-10 h-10" />
        <div>
          <p className="font-semibold">{coin.name}</p>
          <p className="text-sm text-gray-400 uppercase">{coin.symbol}</p>
          <p className="text-green-400 text-sm">
            ${coin.current_price.toLocaleString()} (
            {coin.price_change_percentage_24h.toFixed(2)}%)
          </p>
        </div>
      </div>
    </div>
  );
}
