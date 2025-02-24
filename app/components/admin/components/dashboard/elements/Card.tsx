"use client";
import React, { memo, useMemo } from "react";
import ZigzagDeclineIcon from "@/app/components/admin/components/dashboard/Icons/ZigzagDeclineIcon";
import ZigzagRiseIcon from "@/app/components/admin/components/dashboard/Icons/ZigzagRiseIcon";

interface CardProps {
  title: string;
  value: number | string;
  total?: number | string;
  barColor?: string;
  trend?: "rise" | "decline";
}

const Card: React.FC<CardProps> = ({
  title,
  value,
  total,
  barColor = "#2563EB",
  trend,
}) => {
  const numericValue = useMemo(() => Number(value), [value]);
  const numericTotal = useMemo(() => Number(total), [total]);
  const percentage = useMemo(
    () => (numericTotal > 0 ? (numericValue * 100) / numericTotal : 0),
    [numericValue, numericTotal]
  );

  const TrendIcon = useMemo(() => {
    if (trend === "rise")
      return (
        <ZigzagRiseIcon
          className="ml-2 text-green-500"
          aria-label="Rising Trend"
        />
      );
    if (trend === "decline")
      return (
        <ZigzagDeclineIcon
          className="ml-2 text-red-500"
          aria-label="Declining Trend"
        />
      );
    return null;
  }, [trend]);

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm w-full max-w-52">
      <div className="flex p-4 items-center justify-center h-24">
        <h3
          className="w-full text-sm font-medium p-2 bg-white rounded-lg truncate"
          title={title}
        >
          {title}
        </h3>
      </div>

      <div className="relative">
        <p className="truncate rounded-xl bg-white px-4 py-8 text-center text-2xl font-bold flex items-center">
          <span
            className="text-2xl font-bold overflow-hidden text-ellipsis whitespace-nowrap"
            title={String(value)}
          >
            {numericValue}
          </span>
          {TrendIcon}
        </p>
      </div>

      {numericTotal > 0 && (
        <div className="w-full h-6 bg-gray-200 rounded-full dark:bg-gray-700">
          <div
            className="h-6 rounded-full transition-all duration-300"
            style={{ width: `${percentage}%`, backgroundColor: barColor }}
          />
        </div>
      )}
    </div>
  );
};

export default memo(Card);
