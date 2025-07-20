'use client';

import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#6366f1', '#34d399', '#f59e0b', '#f43f5e', '#10b981'];

interface DataItem {
  name: string;
  value: number;
}

interface Props {
  data: DataItem[];
}

export default function PieChartClient({ data }: Props) {
  return (
    <PieChart width={250} height={250}>
      <Pie
        data={data}
        cx={125}
        cy={125}
        innerRadius={60}
        outerRadius={100}
        fill="#8884d8"
        paddingAngle={2}
        dataKey="value"
      >
        {data.map((_, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
}
