// 'use client';

// import { FC } from "react";
// import { useRouter } from "next/navigation";
// import clsx from "clsx";

// interface NotificationItem {
//   id: string;
//   icon: string;
//   title: string;
//   description: string;
//   time: string;
//   read: boolean;
//   link: string;
//   useRouter: boolean;
// }

// interface NotificationCardProps {
//   item: NotificationItem;
// }

// const NotificationCard: FC<NotificationCardProps> = ({ item }) => {
//   const router = useRouter();

//   const handleClick = () => {
//     if (item.useRouter) {
//       router.push(item.link);
//     } else {
//       window.location.href = item.link;
//     }
//   };

//   return (
//     <div
//       className={clsx(
//         "flex items-center p-4 rounded-lg shadow transition-all cursor-pointer",
//         item.read ? "bg-gray-100 opacity-80" : "bg-white hover:bg-gray-50"
//       )}
//       onClick={handleClick}
//     >
//       <span className="text-2xl mr-4">{item.icon}</span>
//       <div className="flex-1">
//         <h3 className="text-sm font-semibold">{item.title}</h3>
//         <p className="text-xs text-gray-500">{item.description}</p>
//         <p className="text-xs text-gray-400 mt-1">{item.time}</p>
//       </div>
//       {!item.read && <span className="w-2 h-2 bg-blue-500 rounded-full ml-2"></span>}
//     </div>
//   );
// };

// export default NotificationCard;

"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import MailIcon from "@mui/icons-material/Mail"; // Icon for mailbox type
import InventoryIcon from "@mui/icons-material/Inventory"; // Icon for new product type
import NotificationsIcon from "@mui/icons-material/Notifications"; // Default icon

interface Notification {
  id: string;
  title: string;
  description: string;
  time: string; // ISO 8601 date string
  read: boolean;
  link?: string; // Optional link
  type: string; // e.g., "new product", "mailbox"
}

interface NotificationCardProps {
  item: Notification;
}

const NotificationCard: FC<NotificationCardProps> = ({ item }) => {
  const router = useRouter();

  // Handle click to navigate
  const handleClick = () => {
    if (item.link) {
      router.push(item.link);
    }
  };

  // Get the appropriate icon based on the notification type
  const getIcon = () => {
    switch (item.type) {
      case "mailbox":
        return <MailIcon className="text-blue-500" />;
      case "new product":
        return <InventoryIcon className="text-green-500" />;
      default:
        return <NotificationsIcon className="text-gray-500" />;
    }
  };

  // Format the time to a human-readable format
  const formatTime = (time: string) => {
    const date = new Date(time);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div
      className={clsx(
        "flex items-center p-4 rounded-lg shadow transition-all cursor-pointer",
        item.read ? "bg-gray-100 opacity-80" : "bg-white hover:bg-gray-50"
      )}
      onClick={handleClick}
    >
      {/* Notification Icon */}
      <span className="text-2xl mr-4">{getIcon()}</span>

      {/* Notification Content */}
      <div className="flex-1">
        <h3 className="text-sm font-semibold">{item.title}</h3>
        <p className="text-xs text-gray-500">{item.description}</p>
        <p className="text-xs text-gray-400 mt-1">{formatTime(item.time)}</p>
      </div>

      {/* Unread Indicator */}
      {!item.read && (
        <span className="w-2 h-2 bg-blue-500 rounded-full ml-2"></span>
      )}
    </div>
  );
};

export default NotificationCard;
