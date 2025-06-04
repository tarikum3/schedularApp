"use client";

import React, { FC, memo, useCallback, useMemo, lazy, Suspense } from "react";
import { useRouter } from "next/navigation";
import {
  useUpdateNotificationMutation,
  UserNotification,
} from "@/lib/admin/store/services/notification.service";
import { NotificationType, NotificationStatus } from "@prisma/client";
// Lazy load icons
const PersonIcon = lazy(() => import("@mui/icons-material/Person"));
const InventoryIcon = lazy(() => import("@mui/icons-material/Inventory"));
const NotificationsIcon = lazy(
  () => import("@mui/icons-material/Notifications")
);
const EventIcon = lazy(() => import("@mui/icons-material/Event"));
const MeetingRoomIcon = lazy(() => import("@mui/icons-material/MeetingRoom"));

// interface NotificationCardProps {
//   item: {
//     userId: string;
//     status: NotificationStatus;
//     notification: NotificationType;
//     createdAt: Date;
//   };
// }
interface NotificationCardProps {
  item: UserNotification;
}
const NotificationCard: FC<NotificationCardProps> = memo(({ item }) => {
  const router = useRouter();
  const [updateNotification] = useUpdateNotificationMutation();

  const handleClick = useCallback(async () => {
    // Use the provided link or default to a sensible route
    const finalLink = item.notification.link || "/notifications";

    // Update the status if it's not already OPENED
    if (item.status !== "OPENED") {
      try {
        await updateNotification({
          userId: item.userId,
          id: item.id,
          newStatus: "OPENED" as const,
        }).unwrap();
      } catch (error) {
        console.error("Failed to update notification status:", error);
      }
    }

    router.push(finalLink);
  }, [item, router, updateNotification]);

  const formattedTime = useMemo(() => {
    const date = new Date(item.createdAt);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }, [item.createdAt]);

  const getIcon = () => {
    switch (item.notification.type) {
      case "MEETING":
        return (
          <Suspense fallback={<div>Loading...</div>}>
            <MeetingRoomIcon style={{ color: "#3B82F6" }} /> {/* Blue */}
          </Suspense>
        );
      case "APPOINTMENT":
        return (
          <Suspense fallback={<div>Loading...</div>}>
            <EventIcon style={{ color: "#10B981" }} /> {/* Green */}
          </Suspense>
        );
      case "PERSONAL":
        return (
          <Suspense fallback={<div>Loading...</div>}>
            <PersonIcon style={{ color: "#8B5CF6" }} /> {/* Purple */}
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
          ? "bg-primary-100 opacity-80"
          : "bg-primary-0 hover:bg-primary-50"
      }`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleClick();
        }
      }}
      aria-label={`Notification: ${item.notification.title}`}
    >
      {/* Notification Icon */}
      <span className="text-2xl mr-4">{getIcon()}</span>

      {/* Notification Content */}
      <div className="flex-1">
        <h3 className="text-sm font-semibold">{item.notification.title}</h3>
        <p className="text-xs text-primary-500">
          {item.notification.description}
        </p>
        <p className="text-xs text-primary-400 mt-1">{formattedTime}</p>
      </div>

      {/* Unread Indicator */}
      {item.status !== "OPENED" && (
        <span className="w-2 h-2 bg-blue-500 rounded-full ml-2"></span>
      )}
    </div>
  );
});

export default NotificationCard;
