"use client";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import { NotificationsNoneOutlined as Notification } from "@mui/icons-material";
import { useUI } from "@/app/components/schedular/components/ui/UIContext";

const NotificationIcon = () => {
  const { openRightSidebar } = useUI();
  return (
    <IconButton
      className="w-10 h-10 border border-zinc-800"
      onClick={openRightSidebar}
    >
      <Badge
        color="primary"
        variant="dot"
        //invisible={notifications.length === 0}
      >
        {/* {props.children} */}
        <Notification />
      </Badge>
    </IconButton>
  );
};

export default NotificationIcon;
