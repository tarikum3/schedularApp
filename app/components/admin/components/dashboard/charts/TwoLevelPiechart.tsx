



import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface DataType {
  name: string;
  value: number;
  color: string;
}

interface TwoLevelPieChartProps {
  data1: DataType[];
  data2: DataType[];
}

const TwoLevelPieChart: React.FC<TwoLevelPieChartProps> = ({ data1, data2 }) => {
  return (
    <div className="w-full h-96 flex flex-col items-center">
      <ResponsiveContainer width="100%" height="80%">
        <PieChart>
          {/* Outer Pie */}
          <Pie
            data={data1}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={60}
            fill="#8884d8"
          >
            {data1.map((entry, index) => (
              <Cell key={`cell-outer-${index}`} fill={entry.color} />
            ))}
          </Pie>

          {/* Inner Pie */}
          <Pie
            data={data2}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={90}
            fill="#82ca9d"
          >
            {data2.map((entry, index) => (
              <Cell key={`cell-inner-${index}`} fill={entry.color} />
            ))}
          </Pie>

          <Tooltip formatter={(value: number, name: string) => [`Value: ${value}`, `Name: ${name}`]} />
        </PieChart>
      </ResponsiveContainer>

      {/* Custom Legends */}
      <div className="w-full flex flex-col items-center mt-4 gap-2">
        {/* Outer Legend */}
        <div className="flex flex-wrap justify-center items-center gap-4">
          {data1.map((entry, index) => (
            <div key={`legend-outer-${index}`} className="flex items-center gap-2">
              <div style={{ backgroundColor: entry.color }} className="w-3 h-3 rounded-full"></div>
              <span>{entry.name}</span>
            </div>
          ))}
        </div>

        {/* Inner Legend */}
        <div className="flex flex-wrap justify-center items-center gap-4">
          {data2.map((entry, index) => (
            <div key={`legend-inner-${index}`} className="flex items-center gap-2">
              <div style={{ backgroundColor: entry.color }} className="w-3 h-3 rounded-full"></div>
              <span>{entry.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TwoLevelPieChart;

