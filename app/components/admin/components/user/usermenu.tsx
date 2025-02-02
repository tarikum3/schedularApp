
// "use client";
// import Avatar from "@material-ui/core/Avatar";
// import Button from "@material-ui/core/Button";
// import Icon from "@material-ui/core/Icon";
// import ListItemIcon from "@material-ui/core/ListItemIcon";
// import ListItemText from "@material-ui/core/ListItemText";
// import MenuItem from "@material-ui/core/MenuItem";
// import Popover from "@material-ui/core/Popover";
// import Typography from "@material-ui/core/Typography";
// import { useState, MouseEvent } from "react";
// import Link from "next/link";


// interface User {
//   data: {
//     displayName: string;
//     photoURL?: string;
//   };
//   role?: string | string[];
// }

// interface RootState {
//   auth: {
//     user: User;
//   };
// }

// const defaultUser: User = {
//   data: {
//     displayName: "Guest",
//     photoURL: "",
//   },
//   role: "Guest",
// };

// function UserMenu() {


//   const [userMenu, setUserMenu] = useState<HTMLElement | null>(null);

//   const userMenuClick = (event: MouseEvent<HTMLButtonElement>) => {
//     setUserMenu(event.currentTarget);
//   };

//   const userMenuClose = () => {
//     setUserMenu(null);
//   };

//   return (
//     <div className="w-full  border bg-slate-300" >
//       <Button className="min-h-40 min-w-40 px-0 md:px-16 py-0 md:py-6 border border-red-600" onClick={userMenuClick}>
//         <div className="hidden md:flex flex-col mx-4 items-end">
//           <Typography component="span" className="font-semibold flex">
//             {"tari"}
//           </Typography>
//           <Typography className="text-11 font-medium capitalize" color="textSecondary">
//             { "Guest"}
//           </Typography>
//         </div>

     
//           <Avatar className="md:mx-4">{"Tari photo"}</Avatar>
        
//       </Button>

//       <Popover
//         open={Boolean(userMenu)}
//         anchorEl={userMenu}
//         onClose={userMenuClose}
//         anchorOrigin={{
//           vertical: "bottom",
//           horizontal: "center",
//         }}
//         transformOrigin={{
//           vertical: "top",
//           horizontal: "center",
//         }}
//         classes={{
//           paper: "py-8",
//         }}
//       >
//         {(
          
//           <>
//             <MenuItem onClick={userMenuClose}>
//               <ListItemIcon className="min-w-40">
//                 <Icon>account_circle</Icon>
//               </ListItemIcon>
//               <ListItemText primary="My Profile" />
//             </MenuItem>
//             <MenuItem onClick={userMenuClose}>
//               <ListItemIcon className="min-w-40">
//                 <Icon>mail</Icon>
//               </ListItemIcon>
//               <ListItemText primary="Inbox" />
//             </MenuItem>
//             <MenuItem
//               onClick={() => {
//                 // dispatch(logoutUser());
//                 userMenuClose();
//               }}
//             >
//               <ListItemIcon className="min-w-40">
//                 <Icon>exit_to_app</Icon>
//               </ListItemIcon>
//               <ListItemText primary="Logout" />
//             </MenuItem>
//           </>
//         )}
//       </Popover>
//     </div>
//   );
// }

// export default UserMenu;


"use client";
import { useState, MouseEvent } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";

interface User {
  data: {
    displayName: string;
    photoURL?: string;
  };
  role?: string | string[];
}

const defaultUser: User = {
  data: {
    displayName: "Guest",
    photoURL: "",
  },
  role: "Guest",
};

function UserMenu() {
  const [userMenu, setUserMenu] = useState<HTMLElement | null>(null);

  const userMenuClick = (event: MouseEvent<HTMLButtonElement>) => {
    setUserMenu(event.currentTarget);
  };

  const userMenuClose = () => {
    setUserMenu(null);
  };

  return (
    <div className="w-full p-4 bg-gray-900 text-white border-t border-gray-700 shadow-md flex flex-col items-center">
      <Button className="w-full flex items-center justify-between px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all" onClick={userMenuClick}>
        <div className="flex items-center gap-3">
          <Avatar className="bg-primary-500">{defaultUser.data.displayName.charAt(0)}</Avatar>
          <div className="text-left">
            <Typography component="span" className="block text-sm font-semibold">
              {defaultUser.data.displayName}
            </Typography>
            <Typography className="text-xs font-medium text-gray-400">
              {defaultUser.role}
            </Typography>
          </div>
        </div>
        <Icon className="text-gray-400">expand_more</Icon>
      </Button>

      <Popover
        open={Boolean(userMenu)}
        anchorEl={userMenu}
        onClose={userMenuClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        classes={{ paper: "bg-gray-800 text-white rounded-lg shadow-lg w-48 overflow-hidden" }}
      >
        <div className="max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
          <MenuItem onClick={userMenuClose} className="hover:bg-gray-700">
            <ListItemIcon className="text-gray-400">
              <Icon>account_circle</Icon>
            </ListItemIcon>
            <ListItemText primary="My Profile" />
          </MenuItem>
          <MenuItem onClick={userMenuClose} className="hover:bg-gray-700">
            <ListItemIcon className="text-gray-400">
              <Icon>mail</Icon>
            </ListItemIcon>
            <ListItemText primary="Inbox" />
          </MenuItem>
          <MenuItem onClick={userMenuClose} className="hover:bg-gray-700">
            <ListItemIcon className="text-gray-400">
              <Icon>settings</Icon>
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </MenuItem>
          <MenuItem onClick={userMenuClose} className="hover:bg-gray-700 border-t border-gray-700">
            <ListItemIcon className="text-red-500">
              <Icon>exit_to_app</Icon>
            </ListItemIcon>
            <ListItemText primary="Logout" className="text-red-500" />
          </MenuItem>
        </div>
      </Popover>
    </div>
  );
}

export default UserMenu;
