// Skeleton Loading Components
// const SkeletonLoading = () => (
//   <div className="relative p-4 text-center border cursor-pointer transition-all duration-200 bg-primary-100">
//     <div className="flex flex-col items-center">
//       {/* Date Skeleton */}
//       <div className="w-6 h-6 bg-primary-200 rounded-full mb-2 animate-pulse" />

//       {/* Schedule Type Indicators Skeleton */}
//       <div className="flex -space-x-2.5 mt-1 justify-end">
//         {[1, 2, 3].map((_, index) => (
//           <div
//             key={index}
//             className="w-5 h-5 bg-primary-200 rounded-full animate-pulse"
//           />
//         ))}
//       </div>
//     </div>

//     {/* Dropdown Button Skeleton */}
//     <div className="absolute bottom-1 left-1">
//       <div className="w-6 h-6 bg-primary-200 rounded-full animate-pulse" />
//     </div>
//   </div>
// );

export const ScheduleListSkeleton = () => (
  <div className="w-full p-4  h-full overflow-y-clip">
    <div className="flex flex-col h-full">
      <div className="animate-pulse">
        <div className="h-24 bg-primary-200 rounded-lg mb-2"></div>
        <div className="h-full bg-primary-200 rounded-lg"></div>
      </div>
    </div>
  </div>
);

export const ModalSkeleton = () => (
  <div className="fixed  w-screen h-screen p-4 bg-primary-100 animate-pulse"></div>
);

export const CreateScheduleSkeleton = () => (
  <div className="w-full h-full p-4 bg-primary-100 animate-pulse"></div>
);

export const ScheduleItemSkeleton = () => (
  <div className="p-2 bg-primary-100 animate-pulse"></div>
);

export const UserViewSkeleton = () => (
  <div className="absolute right-0 w-48 mt-2 origin-top-right rounded-md shadow-lg">
    <div className="px-2 py-2 bg-primary-100 rounded-md shadow absolute right-0">
      <div className="animate-pulse">
        <div className="h-8 bg-primary-200 rounded-lg mb-2"></div>
        <div className="h-8 bg-primary-200 rounded-lg"></div>
      </div>
    </div>
  </div>
);
