"use client";
import { Line } from "react-chartjs-2";

export default function ChartView({ data }: { data: number[] }) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <Line
        data={{
          labels: data.map((_, i) => i),
          datasets: [{ label: "Price", data, borderColor: "#3b82f6", fill: false }],
        }}
        options={{ responsive: true, elements: { point: { radius: 0 } } }}
      />
    </div>
  );
}
