"use client";
import ZigzagDeclineIcon from "@/app/components/admin/components/dashboard/Icons/ZigzagDeclineIcon";
import ZigzagRiseIcon from "@/app/components/admin/components/dashboard/Icons/ZigzagRiseIcon";

export default function Card({
  title,
  value,
  total,
  barColor = "#2563EB",
  trend,
}: {
  title: string;
  value: number | string;
  total?: number | string;
  barColor?: string;
  trend?: "rise" | "decline";
}) {
  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm w-full max-w-52">
      <div className="flex p-4 item-center justify-center h-24">
        <h3 className="w-full text-sm font-medium p-2 bg-white rounded-lg">
          {title}
        </h3>
      </div>
      <div className="relative">
        <p className="truncate rounded-xl bg-white px-4 py-8 text-center text-2xl font-bold flex items-center">
          <span
            className="text-2xl font-bold overflow-hidden text-ellipsis whitespace-nowrap"
            title={value as any} // Tooltip on hover
          >
            {value}
          </span>
          {trend === "rise" && (
            <ZigzagRiseIcon className="ml-2 text-green-500" />
          )}
          {trend === "decline" && (
            <ZigzagDeclineIcon className="ml-2 text-red-500" />
          )}
        </p>
      </div>

      {(total as number) > 0 && (
        <div className="w-full h-6 bg-gray-200 rounded-full dark:bg-gray-700">
          <div
            className={`h-6 rounded-full`}
            style={{
              width: `${
                ((value as any as number) * 100) / (total as any as number)
              }%`,
              backgroundColor: `${barColor}`,
            }}
          ></div>
        </div>
      )}
    </div>
  );
}
