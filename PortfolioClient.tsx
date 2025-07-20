"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

type PortfolioItem = {
  id: string;
  name: string;
  amount: number;
};

type AllocationItem = {
  name: string;
  value: string;
};

type BreakdownItem = {
  name: string;
  share: string;
  value: string;
};

const COLORS = ["#6366f1", "#22d3ee", "#38bdf8", "#facc15"];

export default function PortfolioClient() {
  const [allocation, setAllocation] = useState<AllocationItem[]>([]);
  const [breakdown, setBreakdown] = useState<BreakdownItem[]>([]);
  const [totalValue, setTotalValue] = useState<number>(0);

  useEffect(() => {
    const raw = localStorage.getItem("portfolio");
    const portfolio: PortfolioItem[] = raw
      ? JSON.parse(raw)
      : [
          { id: "bitcoin", name: "Bitcoin", amount: 1.2 },
          { id: "ethereum", name: "Ethereum", amount: 5.0 },
          { id: "solana", name: "Solana", amount: 80 },
        ];

    const fetchData = async () => {
      const ids = portfolio.map((coin) => coin.id).join(",");
      const res = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`
      );
      const prices = await res.json();

      const enriched = portfolio.map((coin) => {
        const price = prices[coin.id]?.usd || 0;
        const value = coin.amount * price;
        return { ...coin, price, value };
      });

      const total = enriched.reduce((sum, coin) => sum + coin.value, 0);
      setTotalValue(total);

      setAllocation(
        enriched.map((coin) => ({
          name: coin.name,
          value: ((coin.value / total) * 100).toFixed(2),
        }))
      );

      setBreakdown(
        enriched.map((coin) => ({
          name: coin.name,
          share: ((coin.value / total) * 100).toFixed(2) + "%",
          value: `$${coin.value.toFixed(2)}`,
        }))
      );
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#0e0e10] text-white p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">📊 Portfolio Overview</h1>
      </div>

      {/* Summary Card */}
      <Card className="bg-[#1e1e22] text-white mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div>
              <p className="text-gray-400">Net Worth</p>
              <h2 className="text-3xl font-bold">${totalValue.toFixed(2)}</h2>
              <p className="text-red-500">- $1,452,654 (-41.23%)</p>
            </div>
            <div className="mt-6 md:mt-0">
              <p className="text-gray-400">Total Assets</p>
              <p>${totalValue.toFixed(2)}</p>
              <p className="text-gray-400 mt-2">Total Liabilities</p>
              <p>$0</p>
            </div>
          </div>
          <div className="mt-6">
            <p className="text-gray-400">Risk Profile</p>
            <div className="w-full h-3 bg-gray-700 rounded-full mt-1 overflow-hidden">
              <div className="bg-blue-500 h-full w-[71%] inline-block"></div>
              <div className="bg-purple-500 h-full w-[24%] inline-block"></div>
              <div className="bg-teal-500 h-full w-[5%] inline-block"></div>
              <div className="bg-yellow-400 h-full w-[0.5%] inline-block"></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Allocation Pie Chart */}
      <Card className="bg-[#1e1e22] text-white mb-6">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4">Protocol Allocation</h2>
          <div className="flex flex-col md:flex-row gap-8">
            <PieChart width={250} height={250}>
              <Pie
                data={allocation}
                cx={125}
                cy={125}
                innerRadius={60}
                outerRadius={100}
                dataKey="value"
              >
                {allocation.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
            <div>
              {allocation.map((entry, index) => (
                <p key={entry.name} className="mb-1">
                  <span
                    className={cn("inline-block w-3 h-3 rounded-full mr-2", {
                      "bg-indigo-500": index === 0,
                      "bg-cyan-400": index === 1,
                      "bg-sky-400": index === 2,
                      "bg-yellow-400": index === 3,
                    })}
                  ></span>
                  {entry.name}: {entry.value}%
                </p>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Breakdown Table */}
      <Card className="bg-[#1e1e22] text-white">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4">Protocol Breakdown</h2>
          <div className="grid grid-cols-3 gap-4 font-semibold text-gray-400 border-b border-gray-700 pb-2">
            <p>Name</p>
            <p>Share</p>
            <p className="text-right">Value</p>
          </div>
          {breakdown.map((row) => (
            <div
              key={row.name}
              className="grid grid-cols-3 gap-4 py-2 border-b border-gray-800 text-white"
            >
              <p>{row.name}</p>
              <p>{row.share}</p>
              <p className="text-right">{row.value}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
