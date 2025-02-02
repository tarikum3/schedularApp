// 'use client';


// import Card from '@material-ui/core/Card';
// import Icon from '@material-ui/core/Icon';
// import IconButton from '@material-ui/core/IconButton';
// import Typography from '@material-ui/core/Typography';
// import clsx from 'clsx';


// function NotificationCard(props:{item:{id:string,message:string},className:string}) {
//   const { item, className } = props;
 

//   const handleClose = () => {
//     // if (props.onClose) {
//     //   props.onClose(item.id);
//     // }
//   };

//   function ItemIcon() {
 
//         return (
//           <Icon className="mr-8 opacity-75" color="inherit">
//             cancel
//           </Icon>
//         );
//       }
    
     
//   return (
//     <Card
//       className={clsx(
//         'flex items-center relative w-full rounded-16 p-20 min-h-64 shadow',
      
//         className
//       )}
//       elevation={0}
//     >
//       <ItemIcon />
//       <Typography component="div">{item.message}</Typography>
//       <IconButton
//         disableRipple
//         className="top-0 right-0 absolute p-8"
//         color="inherit"
//         size="small"
//         onClick={handleClose}
//       >
//         <Icon className="text-12 opacity-75" color="inherit">
//           close
//         </Icon>
//       </IconButton>
//       {/* {item.children} */}
//     </Card>
//   );
// }

// export default NotificationCard;


'use client';

import { FC } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";

interface NotificationItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  link: string;
  useRouter: boolean;
}

interface NotificationCardProps {
  item: NotificationItem;
}

const NotificationCard: FC<NotificationCardProps> = ({ item }) => {
  const router = useRouter();

  const handleClick = () => {
    if (item.useRouter) {
      router.push(item.link);
    } else {
      window.location.href = item.link;
    }
  };

  return (
    <div
      className={clsx(
        "flex items-center p-4 rounded-lg shadow transition-all cursor-pointer",
        item.read ? "bg-gray-100 opacity-80" : "bg-white hover:bg-gray-50"
      )}
      onClick={handleClick}
    >
      <span className="text-2xl mr-4">{item.icon}</span>
      <div className="flex-1">
        <h3 className="text-sm font-semibold">{item.title}</h3>
        <p className="text-xs text-gray-500">{item.description}</p>
        <p className="text-xs text-gray-400 mt-1">{item.time}</p>
      </div>
      {!item.read && <span className="w-2 h-2 bg-blue-500 rounded-full ml-2"></span>}
    </div>
  );
};

export default NotificationCard;
