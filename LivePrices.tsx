"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function LivePrices() {
  const [prices, setPrices] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrices = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,tether,xrp,binancecoin,usd-coin&vs_currencies=usd"
        );
        const data = await res.json();
        setPrices(data);
      } catch (error) {
        console.error("Error fetching prices:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 30000); // refresh every 30s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6">
      {loading ? (
        <p className="col-span-full text-center text-gray-400">Loading prices...</p>
      ) : (
        Object.entries(prices).map(([key, value]: any) => (
          <Card key={key} className="bg-[#1e1e22]">
            <CardContent className="p-4">
              <h2 className="text-white font-semibold text-lg capitalize">{key}</h2>
              <p className="text-green-400 text-xl mt-2">
                ${value.usd.toLocaleString()}
              </p>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
