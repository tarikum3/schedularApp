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

interface DataType {
  [key: string]: number | string;
  category: string;
}

interface GenericBarChartStackProps {
  data: DataType[];
  colors: string[];
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
  <ul className="flex justify-center">
    {payload.map((entry: any, index: number) => (
      <li key={`item-${index}`} className="flex items-center mr-4">
        <svg width="20" height="20" style={{ marginRight: 4 }}>
          <polygon points="10,0 0,20 20,20" fill={entry.color} />
        </svg>
        <span>{entry.value}</span>
      </li>
    ))}
  </ul>
);

class GenericBarChartStack extends PureComponent<GenericBarChartStackProps> {
  render() {
    const { data, colors } = this.props;

    if (data.length === 0) return null;

    // Determine the value keys dynamically, excluding the category key
    const valueKeys = Object.keys(data[0]).filter((key) => key !== "category");

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
          <Tooltip />
          <Legend content={<CustomLegend />} />
          {valueKeys.map((key, index) => (
            <Bar
              key={key}
              dataKey={key}
              fill={colors[index % colors.length]}
              stackId="a"
              shape={<CustomBarShape />}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    );
  }
}

export default GenericBarChartStack;
