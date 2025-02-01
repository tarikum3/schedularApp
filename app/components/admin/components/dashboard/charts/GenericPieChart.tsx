import React, { PureComponent } from "react";
import { PieChart, Pie, Sector, ResponsiveContainer, Legend } from "recharts";


const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
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
  
  // Position label tip above or below based on sin value
  const ex = mx;
  const ey = my + (sin >= 0 ? 10 : -10); // Adjust line's end point up or down
  const textAnchor = "middle"; // Center-align text for a balanced look

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} fontSize={14} fontWeight="bold">
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + offset}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />

      {/* Positioning the labels based on whether line points up or down */}
      <text
        x={ex}
        y={ey + (sin >= 0 ? 20 : -20)} // Position labels below or above the line tip
        textAnchor={textAnchor}
        fill="#333"
        fontSize={12}
      >
        {`Value: ${value}`}
      </text>
      <text
        x={ex}
        y={ey + (sin >= 0 ? 34 : -34)} // Position percentage below or above Value label
        textAnchor={textAnchor}
        fill="#999"
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
