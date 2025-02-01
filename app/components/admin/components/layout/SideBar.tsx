
"use client";
import * as React from "react";
import Link from "next/link";
import List from "@mui/material/List";
import Paper from "@mui/material/Paper";
import { ROUTES } from "@/lib/admin/configs/routes";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import { ButtonBase } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { permissionArray } from "@/lib/admin/utils/permissions";
import { PERMISSIONS } from "@/lib/admin/configs/permissions";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import UserView from "@components/admin/components/user/usermenu"
const FireNav = styled(List)<{ component?: React.ElementType }>({
  "& .MuiListItemButton-root": {
    paddingLeft: 24,
    paddingRight: 24,
  },
  "& .MuiListItemIcon-root": {
    minWidth: 0,
    marginRight: 16,
  },
  "& .MuiSvgIcon-root": {
    fontSize: 20,
  },
});

export default function SideBar() {
  const pathname = "/home";
  const permissions = [
    PERMISSIONS.READ_OVERVIEW_DASHBOARD,
    PERMISSIONS.READ_ANALYTICS_DASHBOARD,
    PERMISSIONS.CREATE_ROLE,
    PERMISSIONS.READ_ROLE,
    PERMISSIONS.UPDATE_ROLE,
    PERMISSIONS.DELETE_ROLE,
    PERMISSIONS.ASSIGN_ROLE,
    PERMISSIONS.CREATE_USER,
    PERMISSIONS.READ_USER,
    PERMISSIONS.UPDATE_USER,
    PERMISSIONS.DELETE_USER,
    PERMISSIONS.CREATE_PRODUCT,
    PERMISSIONS.READ_PRODUCT,
    PERMISSIONS.UPDATE_PRODUCT,
    PERMISSIONS.DELETE_PRODUCT,
    PERMISSIONS.CREATE_ORDER,
    PERMISSIONS.READ_ORDER,
    PERMISSIONS.UPDATE_ORDER,
    PERMISSIONS.DELETE_ORDER,
    PERMISSIONS.CREATE_CUSTOMER,
    PERMISSIONS.READ_CUSTOMER,
    PERMISSIONS.UPDATE_CUSTOMER,
    PERMISSIONS.DELETE_CUSTOMER,
    PERMISSIONS.CREATE_ACTIVITY,
    PERMISSIONS.READ_ACTIVITY,
    PERMISSIONS.UPDATE_ACTIVITY,
    PERMISSIONS.DELETE_ACTIVITY,
  ];

  const [sideBarConfigs, setSideBarConfigs] = React.useState<any[]>([]);

  React.useEffect(() => {
    setSideBarConfigs([
      ...permissionArray(
        [
          ...(permissions.includes(PERMISSIONS.READ_OVERVIEW_DASHBOARD)
            ? [PERMISSIONS.READ_OVERVIEW_DASHBOARD]
            : []),
          ...(permissions.includes(PERMISSIONS.READ_ANALYTICS_DASHBOARD)
            ? [PERMISSIONS.READ_ANALYTICS_DASHBOARD]
            : []),
        ],
        {
          label: "Dashboard",
          icon: <DashboardIcon className="text-primary-500" />,
          isOpen: false,
          isHovered: false,
          children: [
            ...permissionArray(
              PERMISSIONS.READ_OVERVIEW_DASHBOARD,
              {
                label: "Overview",
                icon: <DashboardIcon className="text-primary-400" />,
                route: ROUTES.DASHBOARD_OVERVIEW,
              },
              permissions
            ),
            ...permissionArray(
              PERMISSIONS.READ_ANALYTICS_DASHBOARD,
              {
                label: "Analytics",
                icon: <DashboardIcon className="text-primary-400" />,
                route: ROUTES.DASHBOARD_ANALYTICS,
              },
              permissions
            ),
          ],
        },
        permissions
      ),

      { type: "divider" },

      ...permissionArray(
        PERMISSIONS.READ_USER,
        {
          label: "Users",
          icon: <PeopleAltOutlinedIcon className="text-primary-500" />,
          route: ROUTES.USERS,
        },
        permissions
      ),

      { type: "divider" },

      ...permissionArray(
        PERMISSIONS.READ_PRODUCT,
        {
          label: "Products",
          icon: <Inventory2OutlinedIcon className="text-primary-500" />,
          route: ROUTES.PRODUCT,
        },
        permissions
      ),

      ...permissionArray(
        PERMISSIONS.READ_ORDER,
        {
          label: "Orders",
          icon: <ShoppingCartOutlinedIcon className="text-primary-500" />,
          route: ROUTES.ORDER,
        },
        permissions
      ),

      ...permissionArray(
        PERMISSIONS.READ_CUSTOMER,
        {
          label: "Customers",
          icon: <GroupOutlinedIcon className="text-primary-500" />,
          route: ROUTES.CUSTOMERS,
        },
        permissions
      ),

      ...permissionArray(
        PERMISSIONS.READ_ACTIVITY,
        {
          label: "Activities",
          icon: <EventOutlinedIcon className="text-primary-500" />,
          route: ROUTES.ACTIVITIES,
        },
        permissions
      ),
    ]);
  }, []);

  const toggleSubMenu = (index: number) => {
    setSideBarConfigs((prevConfigs) => {
      const updatedConfigs = [...prevConfigs];
      updatedConfigs[index].isOpen = !updatedConfigs[index].isOpen;
      return updatedConfigs;
    });
  };

  return (
    <div className="border-r border-primary-300 h-full pb-12">
      <div className="h-full flex flex-col justify-end">
        {/* <Paper
          elevation={0}
          sx={{
            mt: 1,
            width: "100%",
            height: "100%",
            overflowY: "auto",
            borderRadius: 0,
            paddingTop: "10px",
            background: "#fff",
          }}
        >
          <FireNav component="nav" disablePadding>
            {sideBarConfigs.map((config: any, index: number) => (
              <div className="my-1" key={config.label}>
                {config.type === "divider" ? (
                  <Divider className="my-4" />
                ) : (
                  <>
                    {config.children ? (
                      <div
                        className="w-[90%] mx-auto rounded-md cursor-pointer"
                        onMouseEnter={() => {
                          setSideBarConfigs((prevConfigs) => {
                            const updatedConfigs = [...prevConfigs];
                            updatedConfigs[index].isHovered = true;
                            return updatedConfigs;
                          });
                        }}
                        onMouseLeave={() => {
                          setSideBarConfigs((prevConfigs) => {
                            const updatedConfigs = [...prevConfigs];
                            updatedConfigs[index].isHovered = false;
                            return updatedConfigs;
                          });
                        }}
                      >
                        <ButtonBase
                          className={`flex justify-between items-center px-3 py-2 rounded-md w-full transition-colors ${
                            config.isHovered
                              ? "bg-primary-600 text-primary-100"
                              : "hover:bg-primary-500 hover:text-primary-100"
                          }`}
                          onClick={() => toggleSubMenu(index)}
                        >
                          <div className="flex items-center text-sm font-semibold">
                            {config.icon}
                            <span className="ml-2">{config.label}</span>
                          </div>
                          <div>{config.isOpen ? <ExpandMoreIcon /> : <ChevronRightIcon />}</div>
                        </ButtonBase>
                        {config.isOpen && (
                          <List disablePadding className="pl-6">
                            {config.children.map((subConfig: any) => (
                              <Link href={subConfig.route} key={subConfig.label}>
                                <div
                                  className={`px-3 py-2 rounded-md transition-colors cursor-pointer text-sm font-medium ${
                                    pathname === subConfig.route
                                      ? "bg-primary-700 text-primary-100"
                                      : "hover:bg-primary-500 hover:text-primary-100"
                                  }`}
                                >
                                  {subConfig.icon}
                                  <span className="ml-2">{subConfig.label}</span>
                                </div>
                              </Link>
                            ))}
                          </List>
                        )}
                      </div>
                    ) : (
                      <Link href={config.route}>
                        <div
                          className={`flex items-center px-3 py-2 rounded-md w-full text-sm font-semibold transition-colors cursor-pointer ${
                            pathname === config.route
                              ? "bg-primary-700 text-primary-100"
                              : "hover:bg-primary-500 hover:text-primary-100"
                          }`}
                        >
                          {config.icon}
                          <span className="ml-2">{config.label}</span>
                        </div>
                      </Link>
                    )}
                  </>
                )}
              </div>
            ))}
          </FireNav>
        </Paper> */}
        <UserView/>
      </div>
    </div>
  );
}
