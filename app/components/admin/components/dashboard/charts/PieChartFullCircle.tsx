"use client";
import React, { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { primaryColors } from "@lib/const";

interface DataType {
  name: string;
  value: number;
}

interface PieChartFullCircleProps {
  data: DataType[];
}

const PieChartFullCircle: React.FC<PieChartFullCircleProps> = ({ data }) => {
  // Memoize the primary colors array to avoid recalculating it on every render
  const primaryColorsArray = Object.values(primaryColors);

  // Memoize the coloredData array to avoid recalculating it on every render
  const coloredData = useMemo(() => {
    return data.map((item, index) => ({
      ...item,
      color: primaryColorsArray[index % primaryColorsArray.length], // Assign colors cyclically
    }));
  }, [data, primaryColorsArray]);

  // Memoize the tooltip formatter function to avoid recreating it on every render
  const tooltipFormatter = useMemo(
    () => (value: number, name: string) => [`Value: ${value}`, `Name: ${name}`],
    []
  );

  return (
    <ResponsiveContainer width="100%" height={240}>
      <PieChart>
        <Pie
          dataKey="value"
          startAngle={0}
          endAngle={360}
          data={coloredData}
          cx="50%"
          cy="50%"
          innerRadius={40}
          outerRadius={80}
          fill="#8884d8"
          stroke="none"
        >
          {coloredData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip formatter={tooltipFormatter} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default React.memo(PieChartFullCircle);
