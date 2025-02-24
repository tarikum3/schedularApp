"use client";
import React, { PureComponent } from "react";
import { PieChart, Pie, Sector, ResponsiveContainer, Legend } from "recharts";
import { primaryColors } from "@lib/const"; // Import primary colors

const RADIAN = Math.PI / 180;

const renderActiveShape = (props: any) => {
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;

  const offset = outerRadius * 0.15;
  const largeOffset = outerRadius * 0.3;

  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + offset) * cos;
  const sy = cy + (outerRadius + offset) * sin;
  const mx = cx + (outerRadius + largeOffset) * cos;
  const my = cy + (outerRadius + largeOffset) * sin;
  const ex = mx;
  const ey = my + (sin >= 0 ? 10 : -10);
  const textAnchor = "middle";

  return (
    <g>
      <text
        x={cx}
        y={cy}
        dy={8}
        textAnchor="middle"
        fill={primaryColors["primary-900"]} // Use primary-900 for text
        fontSize={14}
        fontWeight="bold"
      >
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill} // Keep the fill prop as is
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + offset}
        fill={fill} // Keep the fill prop as is
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={primaryColors["primary-700"]} // Use primary-700 for the line
        fill="none"
      />
      <circle
        cx={ex}
        cy={ey}
        r={2}
        fill={primaryColors["primary-700"]}
        stroke="none"
      />{" "}
      {/* Use primary-700 for the circle */}
      <text
        x={ex}
        y={ey + (sin >= 0 ? 20 : -20)}
        textAnchor={textAnchor}
        fill={primaryColors["primary-900"]} // Use primary-900 for text
        fontSize={12}
      >
        {`Value: ${value}`}
      </text>
      <text
        x={ex}
        y={ey + (sin >= 0 ? 34 : -34)}
        textAnchor={textAnchor}
        fill={primaryColors["primary-600"]} // Use primary-600 for text
        fontSize={11}
      >
        {`${(percent * 100).toFixed(2)}%`}
      </text>
    </g>
  );
};

interface PieChartProps {
  data: {
    name: string;
    value: number;
    fill: string;
  }[];
}

export default class GenericPieChart extends PureComponent<PieChartProps> {
  state = {
    activeIndex: 0,
  };

  onPieEnter = (_: any, index: number) => {
    this.setState({
      activeIndex: index,
    });
  };

  render() {
    const { data } = this.props;
    return (
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            activeIndex={this.state.activeIndex}
            activeShape={renderActiveShape}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            dataKey="value"
            onMouseEnter={this.onPieEnter}
          />
          <Legend
            align="center"
            verticalAlign="bottom"
            iconType="circle"
            wrapperStyle={{ paddingBottom: "10px" }}
          />
        </PieChart>
      </ResponsiveContainer>
    );
  }
}
