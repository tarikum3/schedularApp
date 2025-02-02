// "use client";
// import React, { PureComponent } from "react";
// import {
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// interface DataType {
//   [key: string]: number | string;
//   category: string;
// }

// interface GenericAreaChartProps {
//   data: DataType[];
//   colors: string[];
//   height?: number;
//   grid?: boolean;
//   smooth?: boolean;
// }

// export default class GenericAreaChart extends PureComponent<GenericAreaChartProps> {
//   render() {
//     const { data, colors, height = 400, grid = true, smooth = true } = this.props;
//     if (data.length === 0) return null;

//     // Determine the value keys dynamically, excluding the category key
//     const valueKeys = Object.keys(data[0]).filter(key => key !== "category");

//     return (
//       <div className="p-4 bg-white shadow-lg rounded-lg">
//         <ResponsiveContainer width="100%" height={height}>
//           <AreaChart
//             data={data}
//             margin={{
//               top: 10,
//               right: 30,
//               left: 0,
//               bottom: 0,
//             }}
//           >
//             {grid && <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />}
//             <XAxis dataKey="category" tick={{ fill: "#555" }} />
//             {/* <YAxis tick={{ fill: "#555" }} /> */}
//             <Tooltip contentStyle={{ backgroundColor: "#f9f9f9", borderRadius: "8px" }} />
//             {valueKeys.map((key, index) => (
//               <Area
//                 key={key}
//                 type={smooth ? "monotone" : "linear"}
//                 dataKey={key}
//                 stackId="1"
//                 stroke={colors[index % colors.length]}
//                 fill={colors[index % colors.length]}
//                 strokeWidth={2}
//               />
//             ))}
//           </AreaChart>
//         </ResponsiveContainer>
//       </div>
//     );
//   }
// }








import React, { PureComponent } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
//   Defs,
//   LinearGradient,
//   Stop,
} from "recharts";

interface DataType {
  [key: string]: number | string;
  category: string;
}

interface GenericAreaChartProps {
  data: DataType[];
  colors: string[];
  areaColors?: string[];
  height?: number;
  grid?: boolean;
  smooth?: boolean;
  hideYAxis?: boolean;
}

export default class GenericAreaChart extends PureComponent<GenericAreaChartProps> {
  render() {
    const {
      data,
      colors,
      areaColors = colors,
      height = 400,
      grid = true,
      smooth = true,
      hideYAxis = false,
    } = this.props;
    if (data.length === 0) return null;

    const valueKeys = Object.keys(data[0]).filter(key => key !== "category");

    return (
      <div className="p-4 bg-white shadow-lg rounded-lg">
        <ResponsiveContainer width="100%" height={height}>
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              {valueKeys.map((key, index) => (
                <linearGradient  key={key} id={`gradient-${key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={areaColors[index % areaColors.length]} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={areaColors[index % areaColors.length]} stopOpacity={0} />
                </linearGradient >
              ))}
            </defs>
            {grid && <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />}
            <XAxis dataKey="category" tick={{ fill: "#555" }} axisLine={false} tickLine={false} />
            {!hideYAxis && <YAxis tick={{ fill: "#555" }} />}
            <Tooltip
              contentStyle={{ backgroundColor: "#2d3748", color: "#fff", borderRadius: "8px", padding: "10px" }}
              itemStyle={{ color: "#fff" }}
              cursor={{ fill: "rgba(200, 200, 200, 0.2)" }}
            />
            {valueKeys.map((key, index) => (
              <Area
                key={key}
                type={smooth ? "monotone" : "linear"}
                dataKey={key}
                stackId="1"
                stroke={colors[index % colors.length]}
                fill={`url(#gradient-${key})`}
                strokeWidth={2}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
