'use client';

import Typography from '@material-ui/core/Typography';
 

const NotificationPanel = () => {
 
  const notifications=[""];
  
    return (
      <div 
      >
 
        {notifications.length > 0 ? (
          <div className="p-16">
            <div className="flex flex-col">
              <div className="flex justify-between items-end pt-136 mb-36">
                <Typography className="text-28 font-semibold leading-none">Notifications</Typography>
                <Typography
                  className="text-12 underline cursor-pointer"
                  color="secondary"
                 // onClick={handleDismissAll}
                >
                  dismiss all
                </Typography>
              </div>
              {notifications.map((item) => (
                <></>
                // <NotificationCard
                //   key={item.id}
                //   className="mb-16"
                //   item={item}
                //   onClose={handleDismiss}
                // />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-1 items-center justify-center p-16">
            <Typography className="text-24 text-center" color="textSecondary">
              There are no notifications for now.
            </Typography>
          </div>
        )}
      </div>
    );
  }
  
  export default NotificationPanel