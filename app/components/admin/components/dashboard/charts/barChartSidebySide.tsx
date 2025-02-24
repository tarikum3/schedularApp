"use client";
import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { primaryColors } from "@lib/const"; // Import primary colors

interface DataType {
  [key: string]: number | string;
  category: string;
}

interface GenericBarChartProps {
  data: DataType[];
}

const CustomBarShape: React.FC<any> = ({ x, y, width, height, fill }) => {
  const radius = 5;
  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill={fill}
      rx={radius}
      ry={radius}
    />
  );
};

const CustomLegend: React.FC<any> = ({ payload }) => (
  <ul className="flex justify-center flex-wrap">
    {payload.map((entry: any, index: number) => (
      <li key={`item-${index}`} className="flex items-center mr-4">
        <svg width="20" height="20" style={{ marginRight: 4 }}>
          <rect width="20" height="20" fill={entry.color} rx="5" ry="5" />
        </svg>
        <span>{entry.value}</span>
      </li>
    ))}
  </ul>
);

class GenericBarChart extends PureComponent<GenericBarChartProps> {
  render() {
    const { data } = this.props;

    if (data.length === 0) return null;

    // Determine the value keys dynamically, excluding the category key
    const valueKeys = Object.keys(data[0]).filter((key) => key !== "category");

    // Convert primaryColors object to an array for easy indexing
    const primaryColorsArray = Object.values(primaryColors);

    return (
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barCategoryGap="20%" // Gap between groups of bars
          barGap={0} // No gap between individual bars within a group
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip
            contentStyle={{
              backgroundColor: primaryColors["primary-900"], // Use primary-900
              borderColor: primaryColors["primary-700"], // Use primary-700
              borderRadius: 5,
              color: primaryColors["primary-100"], // Use primary-100
            }}
          />
          <Legend content={<CustomLegend />} />
          {valueKeys.map((key, index) => (
            <Bar
              key={key}
              dataKey={key}
              fill={primaryColorsArray[index % primaryColorsArray.length]} // Use primary colors
              shape={<CustomBarShape />}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    );
  }
}

export default GenericBarChart;
