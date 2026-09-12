"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type OverviewStatusChartProps = {
  data: {
    type: string;
    published: number;
    review: number;
  }[];
};

export function OverviewStatusChart({ data }: OverviewStatusChartProps) {
  return (
    <div className="h-[320px] px-4 py-5 max-[720px]:h-[300px] max-[720px]:px-2">
      <ResponsiveContainer height="100%" width="100%">
        <BarChart data={data} margin={{ bottom: 8, left: 0, right: 18, top: 8 }}>
          <CartesianGrid stroke="#e4e5df" strokeDasharray="3 3" vertical={false} />
          <XAxis
            axisLine={false}
            dataKey="type"
            dy={10}
            interval={0}
            tick={{ fill: "#68756f", fontSize: 12 }}
            tickLine={false}
          />
          <YAxis
            allowDecimals={false}
            axisLine={false}
            tick={{ fill: "#68756f", fontSize: 12 }}
            tickLine={false}
            width={34}
          />
          <Tooltip
            contentStyle={{
              background: "#fffefb",
              border: "1px solid #cfd1ca",
              borderRadius: 6,
              boxShadow: "0 10px 24px rgba(11, 27, 51, .1)",
              color: "#17251f",
              fontSize: 12,
            }}
            cursor={{ fill: "#f5f4ef" }}
            labelStyle={{ color: "#17251f", fontWeight: 700 }}
          />
          <Bar
            dataKey="published"
            fill="var(--chart-published)"
            name="Published"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="review"
            fill="var(--chart-review)"
            name="Draft/preview"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
