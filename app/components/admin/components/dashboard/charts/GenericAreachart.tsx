"use client";
import React, { PureComponent } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { primaryColors } from "@lib/const";

interface DataType {
  [key: string]: number | string;
  category: string;
}

interface GenericAreaChartProps {
  data: DataType[];
  height?: number;
  grid?: boolean;
  smooth?: boolean;
  hideYAxis?: boolean;
}

class GenericAreaChart extends PureComponent<GenericAreaChartProps> {
  // Extract gradient rendering logic
  renderGradients = (valueKeys: string[]) => {
    const primaryColorsArray = Object.values(primaryColors);

    return valueKeys.map((key, index) => (
      <linearGradient
        key={key}
        id={`gradient-${key}`}
        x1="0"
        y1="0"
        x2="0"
        y2="1"
      >
        <stop
          offset="5%"
          stopColor={primaryColorsArray[index % primaryColorsArray.length]}
          stopOpacity={0.8}
        />
        <stop
          offset="95%"
          stopColor={primaryColorsArray[index % primaryColorsArray.length]}
          stopOpacity={0}
        />
      </linearGradient>
    ));
  };

  renderAreas = (valueKeys: string[]) => {
    const primaryColorsArray = Object.values(primaryColors);

    return valueKeys.map((key, index) => (
      <Area
        key={key}
        type={this.props.smooth ? "monotone" : "linear"}
        dataKey={key}
        stackId="1"
        stroke={primaryColorsArray[index % primaryColorsArray.length]}
        fill={`url(#gradient-${key})`}
        strokeWidth={2}
      />
    ));
  };

  render() {
    const { data, height = 300, grid = true, hideYAxis = false } = this.props;

    if (data.length === 0) return null;

    const valueKeys = Object.keys(data[0]).filter((key) => key !== "category");

    return (
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart
          data={data}
          margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>{this.renderGradients(valueKeys)}</defs>
          {grid && <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />}
          <XAxis
            dataKey="category"
            tick={{ fill: primaryColors["primary-500"] }} // Aligned with primaryColors
            axisLine={false}
            tickLine={false}
          />
          {!hideYAxis && (
            <YAxis
              tick={{ fill: primaryColors["primary-500"] }} // Aligned with primaryColors
              axisLine={false}
              tickLine={false}
            />
          )}
          <Tooltip
            contentStyle={{
              backgroundColor: primaryColors["primary-900"],
              color: primaryColors["primary-100"],
              borderRadius: "8px",
              padding: "10px",
            }}
            itemStyle={{ color: primaryColors["primary-100"] }}
            cursor={{ fill: "rgba(200, 200, 200, 0.2)" }}
          />
          {this.renderAreas(valueKeys)}
        </AreaChart>
      </ResponsiveContainer>
    );
  }
}

export default GenericAreaChart;
