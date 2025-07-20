"use client";
import React from "react";

const MarketTable = ({ data }: { data: any[] }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm text-white bg-gray-900">
        <thead>
          <tr className="bg-gray-800 text-left border-b border-gray-700">
            <th className="p-3">Name</th>
            <th className="p-3">Price</th>
            <th className="p-3">High 24h</th>
            <th className="p-3">Low 24h</th>
            <th className="p-3">Change (24h)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((coin) => (
            <tr
              key={coin.id}
              className="hover:bg-gray-800 border-b border-gray-700 transition-colors"
            >
              <td className="p-3 flex items-center gap-2">
                <img
                  src={coin.image}
                  alt={coin.name}
                  width={20}
                  height={20}
                  className="rounded-full"
                />
                {coin.name}
              </td>
              <td className="p-3">${coin.current_price.toLocaleString()}</td>
              <td className="p-3">${coin.high_24h.toLocaleString()}</td>
              <td className="p-3">${coin.low_24h.toLocaleString()}</td>
              <td
                className={`p-3 ${
                  coin.price_change_percentage_24h >= 0
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {coin.price_change_percentage_24h.toFixed(2)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MarketTable;
