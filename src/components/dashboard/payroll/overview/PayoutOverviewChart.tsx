import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const data = [
  { month: "Jan", price: 14926 },
  { month: "Feb", price: 13781 },
  { month: "Mar", price: 15307 },
  { month: "Apr", price: 14568 },
  { month: "May", price: 13840 },
  { month: "Jun", price: 15972 },
  { month: "Jul", price: 14329 },
  { month: "Aug", price: 15477 },
  { month: "Sep", price: 13549 },
  { month: "Oct", price: 15714 },
  { month: "Nov", price: 14001 },
  { month: "Dec", price: 16000 },
];

const PriceChart: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize(); // Set initially
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full bg-white dark:bg-gray-500 sm:pr-4 sm:pl-4 pt-4 rounded">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm font-semibold dark:text-gray-150 text-gray-500 mb-2 ml-1 sm:ml-2 leading-none">
          Payout overview
        </h2>
        <p className="text-xs text-gray-300 hidden sm:block">This year</p>
      </div>
      <div>
        <ResponsiveContainer width="100%" height={231}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="purpleFade" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#5A42DE" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#5A42DE" stopOpacity={0} />
              </linearGradient>
            </defs>

            {!isMobile && <CartesianGrid strokeDasharray="" vertical={false} />}

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={({ x, y, payload }) => {
                const offset = 10; // Adjust this for spacing
                return (
                  <text
                    x={x}
                    y={y + offset}
                    textAnchor="middle"
                    fontSize={12}
                    fill={isDark ? "#BDC5D1" : "#414F62"}
                  >
                    {payload.value}
                  </text>
                );
              }}
            />

            {!isMobile && (
              <YAxis
                axisLine={false}
                tickLine={false}
                domain={[0, 25000]}
                ticks={[0, 5000, 10000, 15000, 20000, 25000]}
                tick={({ x, y, payload }) => {
                  const offset = -8;
                  return (
                    <text
                      x={x + offset}
                      y={y}
                      textAnchor="end"
                      fontSize={12}
                      fill={isDark ? "#BDC5D1" : "#414F62"}
                    >
                      {`$${payload.value.toLocaleString()}`}
                    </text>
                  );
                }}
              />
            )}

            {!isMobile && (
              <Tooltip
                formatter={(value: number) => `$${value.toLocaleString()}`}
                contentStyle={{
                  backgroundColor: isDark ? "#1f2937" : "#ffffff",
                  color: isDark ? "#f3f4f6" : "#111827",
                  border: "none",
                  borderRadius: "8px",
                  boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                  fontSize: "14px",
                }}
                labelStyle={{ color: isDark ? "#94a3b8" : "#6b7280" }}
                itemStyle={{ color: isDark ? "#f3f4f6" : "#111827" }}
              />
            )}

            <Area
              type="monotone"
              dataKey="price"
              stroke="#5A42DE"
              fill="url(#purpleFade)"
              strokeWidth={3}
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PriceChart;
