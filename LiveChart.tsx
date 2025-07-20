"use client";

import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import axios from "axios";

interface LiveChartProps {
  coinId: string; // e.g., "bitcoin"
}

export default function LiveChart({ coinId }: LiveChartProps) {
  const [data, setData] = useState<{ time: string; price: number }[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMarketChart = async () => {
    try {
      const res = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=1&interval=minute`
      );
      const formatted = res.data.prices.map((point: number[]) => ({
        time: new Date(point[0]).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        price: point[1],
      }));
      setData(formatted);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch live chart data:", error);
    }
  };

  useEffect(() => {
    fetchMarketChart();
    const interval = setInterval(fetchMarketChart, 60 * 1000); // update every minute
    return () => clearInterval(interval);
  }, [coinId]);

  if (loading) {
    return <p className="text-gray-400">Loading live chart...</p>;
  }

  return (
    <div className="bg-[#1e1e22] p-4 rounded-lg shadow-md text-white">
      <h2 className="text-lg font-bold mb-4 capitalize">Live Price Chart: {coinId}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="time" hide />
          <YAxis domain={["dataMin", "dataMax"]} />
          <Tooltip />
          <Line type="monotone" dataKey="price" stroke="#00FFAA" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
