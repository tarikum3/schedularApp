"use client";
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface DataType {
  name: string;
  value: number;
  color: string;
}

interface PieChartFullCircleProps {
  data: DataType[];
}

const PieChartFullCircle: React.FC<PieChartFullCircleProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <PieChart>
        <Pie
          dataKey="value"
          startAngle={0}
          endAngle={360}
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={40}
          outerRadius={80}
          fill="#8884d8"
          stroke="none"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value: number, name: string) => [
            `Value: ${value}`,
            `Name: ${name}`,
          ]}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartFullCircle;
