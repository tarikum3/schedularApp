

// export default function CustomersBytime (){



//     return (<>
    
//     </>)
// }

"use client";
import React from "react";

import GenericAreaChart from "@/app/components/admin/components/dashboard/charts/GenericAreachart";
const sampleData = [
  { category: "Jan", sales: 4000, revenue: 2400, profit: 2000 },
  { category: "Feb", sales: 3000, revenue: 1398, profit: 1800 },
  { category: "Mar", sales: 5000, revenue: 9800, profit: 2900 },
  { category: "Apr", sales: 4780, revenue: 3908, profit: 2500 },
  { category: "May", sales: 5890, revenue: 4800, profit: 3200 },
  { category: "Jun", sales: 6390, revenue: 5800, profit: 4000 },
  { category: "Jul", sales: 7490, revenue: 6700, profit: 4500 },
];

const colors = ["#8884d8", "#82ca9d", "#ffc658"];

const SampleAreaChart = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="w-full max-w-3xl">
        <h2 className="text-xl font-semibold text-center mb-4">Sales Performance</h2>
        <GenericAreaChart data={sampleData} colors={colors} height={450} grid smooth />
      </div>
    </div>
  );
};

export default SampleAreaChart;
