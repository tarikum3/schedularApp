
"use client";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import { useState, MouseEvent } from "react";
import Link from "next/link";


interface User {
  data: {
    displayName: string;
    photoURL?: string;
  };
  role?: string | string[];
}

interface RootState {
  auth: {
    user: User;
  };
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
    <div className="w-full  border bg-slate-300" >
      <Button className="min-h-40 min-w-40 px-0 md:px-16 py-0 md:py-6 border border-red-600" onClick={userMenuClick}>
        <div className="hidden md:flex flex-col mx-4 items-end">
          <Typography component="span" className="font-semibold flex">
            {"tari"}
          </Typography>
          <Typography className="text-11 font-medium capitalize" color="textSecondary">
            { "Guest"}
          </Typography>
        </div>

     
          <Avatar className="md:mx-4">{"Tari photo"}</Avatar>
        
      </Button>

      <Popover
        open={Boolean(userMenu)}
        anchorEl={userMenu}
        onClose={userMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        classes={{
          paper: "py-8",
        }}
      >
        {(
          
          <>
            <MenuItem onClick={userMenuClose}>
              <ListItemIcon className="min-w-40">
                <Icon>account_circle</Icon>
              </ListItemIcon>
              <ListItemText primary="My Profile" />
            </MenuItem>
            <MenuItem onClick={userMenuClose}>
              <ListItemIcon className="min-w-40">
                <Icon>mail</Icon>
              </ListItemIcon>
              <ListItemText primary="Inbox" />
            </MenuItem>
            <MenuItem
              onClick={() => {
                // dispatch(logoutUser());
                userMenuClose();
              }}
            >
              <ListItemIcon className="min-w-40">
                <Icon>exit_to_app</Icon>
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </MenuItem>
          </>
        )}
      </Popover>
    </div>
  );
}

export default UserMenu;
