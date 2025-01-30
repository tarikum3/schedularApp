'use client';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';


const NotificationIcon = () => {
  
    return (
      <IconButton className="w-40 h-40" onClick={() => {}}>
        <Badge color="secondary" variant="dot" 
        //invisible={notifications.length === 0}
        >
          {/* {props.children} */}
        </Badge>
      </IconButton>
    );
  }


  export default NotificationIcon;