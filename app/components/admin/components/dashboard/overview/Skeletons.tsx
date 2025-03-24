export function CustomersOverMonthsSkeleton() {
  return (
    <div className="bg-primary-0 p-6 rounded-lg shadow-sm animate-pulse">
      {/* Header Section Skeleton */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div className="h-8 bg-primary-300 rounded w-1/4 mb-4 md:mb-0"></div>
        <div className="h-10 bg-primary-300 rounded w-1/4"></div>
      </div>

      {/* Chart Section Skeleton */}
      <div className="w-full h-[450px] bg-primary-300 rounded"></div>
    </div>
  );
}
