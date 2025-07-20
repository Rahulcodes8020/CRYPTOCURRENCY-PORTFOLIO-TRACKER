"use client";
import React from "react";
import { useRouter } from "next/navigation";

type Props = {
  coin: {
    id: string;
    name: string;
    symbol: string;
    image: string;
    current_price: number;
    price_change_percentage_24h: number;
  };
};

export default function CoinCard({ coin }: Props) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/coins/${coin.id}`)}
      className="cursor-pointer bg-[#1e1e22] p-4 rounded shadow hover:shadow-lg transition"
    >
      <div className="flex items-center gap-4">
        <img src={coin.image} alt={coin.name} className="w-10 h-10 rounded-full" />
        <div>
          <h3 className="text-lg font-semibold">{coin.name}</h3>
          <p className="text-gray-400 uppercase">{coin.symbol}</p>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-xl font-bold">${coin.current_price.toLocaleString()}</p>
        <p className={`text-sm ${coin.price_change_percentage_24h >= 0 ? "text-green-400" : "text-red-400"}`}>
          {coin.price_change_percentage_24h.toFixed(2)}%
        </p>
      </div>
    </div>
  );
}
