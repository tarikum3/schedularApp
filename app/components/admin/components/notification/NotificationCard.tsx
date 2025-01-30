'use client';


import Card from '@material-ui/core/Card';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';

function NotificationCard(props:{item:{id:string,message:string},className:string}) {
  const { item, className } = props;
 

  const handleClose = () => {
    // if (props.onClose) {
    //   props.onClose(item.id);
    // }
  };

  function ItemIcon() {
 
        return (
          <Icon className="mr-8 opacity-75" color="inherit">
            cancel
          </Icon>
        );
      }
    
     
  return (
    <Card
      className={clsx(
        'flex items-center relative w-full rounded-16 p-20 min-h-64 shadow',
      
        className
      )}
      elevation={0}
    >
      <ItemIcon />
      <Typography component="div">{item.message}</Typography>
      <IconButton
        disableRipple
        className="top-0 right-0 absolute p-8"
        color="inherit"
        size="small"
        onClick={handleClose}
      >
        <Icon className="text-12 opacity-75" color="inherit">
          close
        </Icon>
      </IconButton>
      {/* {item.children} */}
    </Card>
  );
}

export default NotificationCard;
