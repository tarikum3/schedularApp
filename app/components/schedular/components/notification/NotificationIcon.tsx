"use client";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import { NotificationsNoneOutlined as Notification } from "@mui/icons-material";
import { useUI } from "@/app/components/schedular/components/ui/UIContext";
import { useGetNotificationsQuery } from "@/lib/admin/store/services/notification.service";
const NotificationIcon = () => {
  const { openRightSidebar } = useUI();
  const {
    data: notificationsData,
    isLoading,
    isError,
  } = useGetNotificationsQuery({});
  return (
    <IconButton
      className="w-10 h-10 "
      onClick={openRightSidebar}
      //  color="primary"
    >
      <Badge
        color="primary"
        variant="dot"
        //invisible={notifications.length === 0}
        invisible={notificationsData?.pendingCount ? true : false}
      >
        {/* {props.children} */}
        <Notification className=" text-primary-900" />
      </Badge>
    </IconButton>
  );
};

export default NotificationIcon;
