// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import NotificationCard from "@/app/components/admin/components/notification/NotificationCard";
// import { useGetNotificationsQuery } from "@/lib/admin/store/services/notification.service";

// // Define the type for a notification based on the new schema
// interface Notification {
//   id: string;
//   title: string;
//   description: string;
//   time: string; // ISO 8601 date string
//   read: boolean;
//   link?: string; // Optional link
//   type: string; // e.g., "new product"
// }

// const NotificationPanel = () => {
//   const {
//     data: notificationsData,
//     isLoading,
//     isError,
//   } = useGetNotificationsQuery({});
//   const [notifications, setNotifications] = useState<Notification[]>([]);
//   const router = useRouter();

//   // Update notifications when data is fetched
//   useEffect(() => {
//     if (notificationsData) {
//       //setNotifications(notificationsData);
//     }
//   }, [notificationsData]);

//   // Mark all notifications as read
//   const markAllAsRead = () => {
//     setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
//   };

//   // Format the time to a human-readable format
//   const formatTime = (time: string) => {
//     const date = new Date(time);
//     return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
//   };

//   return (
//     <div className="p-6  max-w-lg mx-auto bg-primary-100 ">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-semibold">Notifications</h2>
//         {notifications.some((n) => !n.read) && (
//           <button
//             onClick={markAllAsRead}
//             className="text-sm text-blue-500 hover:text-blue-700"
//           >
//             Mark all as read
//           </button>
//         )}
//       </div>

//       {notifications.length > 0 ? (
//         <div className="space-y-4">
//           {notifications.map((item) => (
//             <NotificationCard
//               key={item.id}
//               item={{
//                 ...item,
//                 //time: formatTime(item.time), // Format the time
//               }}
//             />
//           ))}
//         </div>
//       ) : (
//         <p className="text-gray-500 text-center">No new notifications.</p>
//       )}
//     </div>
//   );
// };

// export default NotificationPanel;

"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { InfiniteLoader, List, AutoSizer } from "react-virtualized";
import NotificationCard from "@/app/components/admin/components/notification/NotificationCard";
import { useGetNotificationsQuery } from "@/lib/admin/store/services/notification.service";

interface Notification {
  id: string;
  title: string;
  description: string;
  time: string; // ISO 8601 date string
  read: boolean;
  link?: string; // Optional link
  type: string; // e.g., "new product"
}

const NotificationPanel = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const {
    data: notificationsData,
    isLoading,
    isError,
  } = useGetNotificationsQuery({ page, limit });

  const router = useRouter();

  useEffect(() => {
    if (notificationsData) {
      setNotifications((prev) => [...prev, ...notificationsData]);
      setHasMore(notificationsData.length === limit);
    }
  }, [notificationsData, limit]);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const formatTime = (time: string) => {
    const date = new Date(time);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const loadMoreNotifications = useCallback(() => {
    return new Promise<void>((resolve) => {
      if (!isLoading && hasMore) {
        setPage((prev) => prev + 1);
        resolve(); // Resolve the promise once the state is updated
      } else {
        resolve(); // Resolve immediately if there's nothing to load
      }
    });
  }, [isLoading, hasMore]);

  const isRowLoaded = ({ index }: { index: number }) => {
    return !!notifications[index];
  };

  const rowRenderer = ({
    index,
    key,
    style,
  }: {
    index: number;
    key: string;
    style: React.CSSProperties;
  }) => {
    const item = notifications[index];
    return (
      <div key={key} style={style}>
        <NotificationCard
          item={{
            ...item,
            time: formatTime(item.time),
          }}
        />
      </div>
    );
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-primary-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Notifications</h2>
        {notifications.some((n) => !n.read) && (
          <button
            onClick={markAllAsRead}
            className="text-sm text-blue-500 hover:text-blue-700"
          >
            Mark all as read
          </button>
        )}
      </div>

      {notifications.length > 0 ? (
        <div className="space-y-4">
          <AutoSizer>
            {({ width, height }) => (
              <InfiniteLoader
                isRowLoaded={isRowLoaded}
                loadMoreRows={loadMoreNotifications}
                rowCount={
                  hasMore ? notifications.length + 1 : notifications.length
                }
                threshold={1}
              >
                {({ onRowsRendered, registerChild }) => (
                  <List
                    width={width}
                    height={height}
                    rowCount={notifications.length}
                    rowHeight={100} // Adjust based on your card height
                    rowRenderer={rowRenderer}
                    onRowsRendered={onRowsRendered}
                    ref={registerChild}
                  />
                )}
              </InfiniteLoader>
            )}
          </AutoSizer>
          {hasMore && (
            <button
              onClick={loadMoreNotifications}
              className="w-full text-center py-2 text-blue-500 hover:text-blue-700"
            >
              View More
            </button>
          )}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No new notifications.</p>
      )}
    </div>
  );
};

export default NotificationPanel;
