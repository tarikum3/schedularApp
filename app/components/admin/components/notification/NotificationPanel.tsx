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
  link?: string; // Optional link
  type: "NEW_PRODUCT" | "NEW_USER" | "STOCK_OUT"; // Updated to match your model
  status: "OPENED" | "VIEWED" | "PENDING"; // Updated to match your model
}

const notificationss = [
  {
    id: "1",
    title: "New Product Launch",
    description: "Check out our latest product!",
    time: "2023-10-01T12:34:56Z",
    type: "NEW_PRODUCT",
    status: "PENDING",
    // No link provided, will default to `/products/1`
  },
  {
    id: "2",
    title: "Welcome New User",
    description: "Welcome to our platform!",
    time: "2023-10-01T10:00:00Z",
    type: "NEW_USER",
    status: "VIEWED",
    link: "/users/123", // Provided link
  },
  {
    id: "3",
    title: "Stock Out Alert",
    description: "Product XYZ is out of stock.",
    time: "2023-10-01T09:15:00Z",
    type: "STOCK_OUT",
    status: "OPENED",
    // No link provided, will default to `/stock/3`
  },
];

const NotificationPanel = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(1);
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
    setNotifications((prev) => [...prev, ...(notificationss as any)]);
  }, [notificationsData, limit]);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, status: "OPENED" })));
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
    <div className="p-6 w-full mx-auto bg-primary-100  h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Notifications</h2>
        {notifications.some((n) => n.status !== "OPENED") && (
          <button
            onClick={markAllAsRead}
            className="text-sm text-blue-500 hover:text-blue-700"
          >
            Mark all as read
          </button>
        )}
      </div>

      {notifications.length > 0 ? (
        <div className="space-y-4 h-full">
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
        <p className="text-primary-500 text-center">No new notifications.</p>
      )}
    </div>
  );
};

export default NotificationPanel;
