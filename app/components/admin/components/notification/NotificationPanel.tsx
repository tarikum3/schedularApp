// 'use client';

// import Typography from '@material-ui/core/Typography';
 
// import NotificationCard from "@/app/components/admin/components/notification/NotificationCard";
// const NotificationPanel = () => {
 
//   const notifications=[""];
  
//     return (
//       <div 
//       >
 
//         {notifications.length > 0 ? (
//           <div className="p-16">
//             <div className="flex flex-col">
//               <div className="flex justify-between items-end pt-136 mb-36">
//                 <Typography className="text-28 font-semibold leading-none">Notifications</Typography>
//                 <Typography
//                   className="text-12 underline cursor-pointer"
//                   color="secondary"
//                  // onClick={handleDismissAll}
//                 >
//                   dismiss all
//                 </Typography>
//               </div>
//               {notifications.map((item) => (
               
//                 <NotificationCard
//                   key={item.id}
//                   className="mb-16"
//                   item={item}
//                   //onClose={handleDismiss}
//                 />
//               ))}
//             </div>
//           </div>
//         ) : (
//           <div className="flex flex-1 items-center justify-center p-16">
//             <Typography className="text-24 text-center" color="textSecondary">
//               There are no notifications for now.
//             </Typography>
//           </div>
//         )}
//       </div>
//     );
//   }
  
//   export default NotificationPanel



'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import NotificationCard from "@/app/components/admin/components/notification/NotificationCard";

const initialNotifications = [
  {
    id: "1",
    icon: "📦",
    title: "New Product Added",
    description: "A new product has been added to the inventory.",
    time: "5 mins ago",
    read: false,
    link: "/admin/products",
    useRouter: true,
  },
  {
    id: "2",
    icon: "👤",
    title: "New User Registered",
    description: "John Doe has joined the platform.",
    time: "10 mins ago",
    read: false,
    link: "/admin/users",
    useRouter: true,
  },
  {
    id: "3",
    icon: "🔔",
    title: "System Update",
    description: "Your system has been updated successfully.",
    time: "1 hour ago",
    read: true,
    link: "/admin/settings",
    useRouter: true,
  },
];

const NotificationPanel = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const router = useRouter();

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-primary-100 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Notifications</h2>
        {notifications.some((n) => !n.read) && (
          <button onClick={markAllAsRead} className="text-sm text-blue-500 hover:text-blue-700">
            Mark all as read
          </button>
        )}
      </div>

      {notifications.length > 0 ? (
        <div className="space-y-4">
          {notifications.map((item) => (
            <NotificationCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No new notifications.</p>
      )}
    </div>
  );
};

export default NotificationPanel;
