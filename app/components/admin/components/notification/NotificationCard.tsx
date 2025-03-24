"use client";

import React, { FC, memo, useCallback, useMemo, lazy, Suspense } from "react";
import { useRouter } from "next/navigation";
import { useUpdateNotificationMutation } from "@/lib/admin/store/services/notification.service";

// Lazy load icons
const PersonIcon = lazy(() => import("@mui/icons-material/Person"));
const InventoryIcon = lazy(() => import("@mui/icons-material/Inventory"));
const NotificationsIcon = lazy(
  () => import("@mui/icons-material/Notifications")
);

interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  link?: string;
  type: "NEW_PRODUCT" | "NEW_USER" | "STOCK_OUT";
  status: "OPENED" | "VIEWED" | "PENDING";
}

interface NotificationCardProps {
  item: Notification;
}

const NotificationCard: FC<NotificationCardProps> = memo(({ item }) => {
  const router = useRouter();
  const [updateNotification] = useUpdateNotificationMutation();

  const handleClick = useCallback(async () => {
    // Construct the default link based on the notification type
    let defaultLink = "";
    switch (item.type) {
      case "NEW_PRODUCT":
        defaultLink = `/products/${item.id}`;
        break;
      case "NEW_USER":
        defaultLink = `/users/${item.id}`;
        break;
      case "STOCK_OUT":
        defaultLink = `/stock/${item.id}`;
        break;
      default:
        defaultLink = "/notifications/default";
    }

    const finalLink = item.link || defaultLink;

    // Only update the status if it's not already "OPENED"
    if (item.status !== "OPENED") {
      try {
        await updateNotification({
          userId: "currentUserId", // Replace with the actual user ID
          notificationId: item.id,
          status: "OPENED",
        }).unwrap();
      } catch (error) {
        console.error("Failed to update notification status:", error);
      }
    }

    // Navigate to the link
    router.push(finalLink);
  }, [item, router, updateNotification]);

  // Format the time to a human-readable format
  const formattedTime = useMemo(() => {
    const date = new Date(item.time);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }, [item.time]);

  // Get the appropriate icon based on the notification type
  const getIcon = () => {
    switch (item.type) {
      case "NEW_PRODUCT":
        return (
          <Suspense fallback={<div>Loading...</div>}>
            <InventoryIcon style={{ color: "#10B981" }} /> {/* Green */}
          </Suspense>
        );
      case "NEW_USER":
        return (
          <Suspense fallback={<div>Loading...</div>}>
            <PersonIcon style={{ color: "#3B82F6" }} /> {/* Blue */}
          </Suspense>
        );
      case "STOCK_OUT":
        return (
          <Suspense fallback={<div>Loading...</div>}>
            <NotificationsIcon style={{ color: "#EF4444" }} /> {/* Red */}
          </Suspense>
        );
      default:
        return (
          <Suspense fallback={<div>Loading...</div>}>
            <NotificationsIcon style={{ color: "#6B7280" }} /> {/* Gray */}
          </Suspense>
        );
    }
  };

  return (
    <div
      className={`flex items-center p-4 rounded-lg shadow transition-all cursor-pointer ${
        item.status === "OPENED"
          ? "bg-gray-100 opacity-80"
          : "bg-white hover:bg-gray-50"
      }`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleClick();
        }
      }}
      aria-label={`Notification: ${item.title}`}
    >
      {/* Notification Icon */}
      <span className="text-2xl mr-4">{getIcon()}</span>

      {/* Notification Content */}
      <div className="flex-1">
        <h3 className="text-sm font-semibold">{item.title}</h3>
        <p className="text-xs text-gray-500">{item.description}</p>
        <p className="text-xs text-gray-400 mt-1">{formattedTime}</p>
      </div>

      {/* Unread Indicator */}
      {item.status !== "OPENED" && (
        <span className="w-2 h-2 bg-blue-500 rounded-full ml-2"></span>
      )}
    </div>
  );
});

export default NotificationCard;
