"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

type Coin = {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
};

const CoinList = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchTopCoins = async () => {
    try {
      if (loading) return; // 🛑 Prevent spam
      setLoading(true);
      const res = await axios.get("/api/coingecko", {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 10,
          page: 1,
          sparkline: false,
        },
      });
      setCoins(res.data);
      setError(null);
    } catch (err: any) {
      console.error("❌ Fetch Error:", err.message);
      if (err.response?.status === 429) {
        setError("⚠️ Too many requests. Wait a few seconds.");
      } else {
        setError("❌ Failed to fetch top coins.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopCoins();
    const interval = setInterval(fetchTopCoins, 20000); // refresh every 20 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 bg-black text-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">🚀 Top Movers</h2>
      {error && <div className="text-red-400 font-semibold mb-4">{error}</div>}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {coins.map((coin) => (
          <div
            key={coin.id}
            className="bg-gradient-to-r from-gray-900 to-gray-800 p-4 rounded-lg shadow hover:scale-105 transition-transform"
          >
            <div className="flex items-center space-x-3">
              <img src={coin.image} alt={coin.name} className="w-8 h-8" />
              <div>
                <h3 className="text-sm font-semibold">{coin.name}</h3>
                <p className="text-xs text-gray-400 uppercase">{coin.symbol}</p>
              </div>
            </div>
            <div className="mt-2">
              <p className="text-lg font-bold">
                ${coin.current_price.toLocaleString()}
              </p>
              <p
                className={`text-sm ${
                  coin.price_change_percentage_24h >= 0
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {coin.price_change_percentage_24h.toFixed(2)}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoinList;
