'use client';
import * as React from "react";
import Link from 'next/link';
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
import { permissionArray,  } from "@/lib/admin/utils/permissions";
import { PERMISSIONS } from "@/lib/admin/configs/permissions";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';


interface ConfigChildren {
  label: string;
  icon: React.ReactNode;
  route: string;
}

interface Config {
  label: string;
  icon: React.ReactNode;
  route: string;
  children?: ConfigChildren[];
}

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

export default function SideBar(

) {
  const pathname = "/home";
  const permissions = [
    // Dashboard Permissions
    PERMISSIONS.READ_OVERVIEW_DASHBOARD,
    PERMISSIONS.READ_ANALYTICS_DASHBOARD,
  
    // Role Permissions
    PERMISSIONS.CREATE_ROLE,
    PERMISSIONS.READ_ROLE,
    PERMISSIONS.UPDATE_ROLE,
    PERMISSIONS.DELETE_ROLE,
    PERMISSIONS.ASSIGN_ROLE,
  
    // User Permissions
    PERMISSIONS.CREATE_USER,
    PERMISSIONS.READ_USER,
    PERMISSIONS.UPDATE_USER,
    PERMISSIONS.DELETE_USER,
  
    // Product Permissions
    PERMISSIONS.CREATE_PRODUCT,
    PERMISSIONS.READ_PRODUCT,
    PERMISSIONS.UPDATE_PRODUCT,
    PERMISSIONS.DELETE_PRODUCT,
  
    // Order Permissions
    PERMISSIONS.CREATE_ORDER,
    PERMISSIONS.READ_ORDER,
    PERMISSIONS.UPDATE_ORDER,
    PERMISSIONS.DELETE_ORDER,
  
    // Customer Permissions
    PERMISSIONS.CREATE_CUSTOMER,
    PERMISSIONS.READ_CUSTOMER,
    PERMISSIONS.UPDATE_CUSTOMER,
    PERMISSIONS.DELETE_CUSTOMER,
  
    // Activity Permissions
    PERMISSIONS.CREATE_ACTIVITY,
    PERMISSIONS.READ_ACTIVITY,
    PERMISSIONS.UPDATE_ACTIVITY,
    PERMISSIONS.DELETE_ACTIVITY,
  ];
  

  const userinfo = "userinfo";





  const [sideBarConfigs, setSideBarConfigs] = React.useState<any[]>([]);

  React.useEffect(() => {
    // setSideBarConfigs([

    //   ...permissionArray(

    //     [
    //       ...(permissions.includes(PERMISSIONS.READ_OVERVIEW_DASHBOARD) ? [PERMISSIONS.READ_OVERVIEW_DASHBOARD] : []),
    //       ...(permissions.includes(PERMISSIONS.READ_ANALYTICS_DASHBOARD) ? [PERMISSIONS.READ_ANALYTICS_DASHBOARD] : []),
    //     ],
    //     {
    //       label: "Dashboard",
    //       icon: <DashboardIcon />,
    //       isOpen: false,
    //       isHovered: false,
    //       children: [
    //         ...permissionArray(
    //           PERMISSIONS.READ_OVERVIEW_DASHBOARD,
    //           {
    //             label: "Overview",
    //             icon: <DashboardIcon />,
    //             route: ROUTES.DASHBOARD_OVERVIEW,
    //           },
    //           permissions,
              
    //         ),
    //         ...permissionArray(
    //           PERMISSIONS.READ_ANALYTICS_DASHBOARD,
  
    //           {
    //             label: "Analytics",
    //             icon: <PeopleAltOutlined />,
    //             route: ROUTES.DASHBOARD_ANALYTICS,
    //           },
    //           permissions,
              
    //         )
  
    //       ],
    //     },
    //     permissions,
       
    //   ),
      

    //   {
    //     type: "divider",
    //   },


  

   


 
    //   ...permissionArray(
    //     PERMISSIONS.READ_USER,
    //     {
    //       label: "Users",
    //       icon: <PeopleAltOutlinedIcon />,
    //       route: ROUTES.USERS,
    //     },
    //     permissions,
    //     userinfo
    //   ),


 
    // ]);




setSideBarConfigs([
  // Dashboard Section
  ...permissionArray(
    [
      ...(permissions.includes(PERMISSIONS.READ_OVERVIEW_DASHBOARD) ? [PERMISSIONS.READ_OVERVIEW_DASHBOARD] : []),
      ...(permissions.includes(PERMISSIONS.READ_ANALYTICS_DASHBOARD) ? [PERMISSIONS.READ_ANALYTICS_DASHBOARD] : []),
    ],
    {
      label: 'Dashboard',
      icon: <DashboardIcon />,
      isOpen: false,
      isHovered: false,
      children: [
        ...permissionArray(
          PERMISSIONS.READ_OVERVIEW_DASHBOARD,
          {
            label: 'Overview',
            icon: <DashboardIcon />,
            route: ROUTES.DASHBOARD_OVERVIEW,
          },
          permissions
        ),
        ...permissionArray(
          PERMISSIONS.READ_ANALYTICS_DASHBOARD,
          {
            label: 'Analytics',
            icon: <DashboardIcon />,
            route: ROUTES.DASHBOARD_ANALYTICS,
          },
          permissions
        ),
      ],
    },
    permissions
  ),

  {
    type: 'divider',
  },

  // Users Section
  ...permissionArray(
    PERMISSIONS.READ_USER,
    {
      label: 'Users',
      icon: <PeopleAltOutlinedIcon />,
      route: ROUTES.USERS,
    },
    permissions
  ),

  {
    type: 'divider',
  },

  // Products Section
  ...permissionArray(
    PERMISSIONS.READ_PRODUCT,
    {
      label: 'Products',
      icon: <Inventory2OutlinedIcon />,
      route: ROUTES.PRODUCT,
    },
    permissions
  ),

  // Orders Section
  ...permissionArray(
    PERMISSIONS.READ_ORDER,
    {
      label: 'Orders',
      icon: <ShoppingCartOutlinedIcon />,
      route: ROUTES.ORDER,
    },
    permissions
  ),

  // Customers Section
  ...permissionArray(
    PERMISSIONS.READ_CUSTOMER,
    {
      label: 'Customers',
      icon: <GroupOutlinedIcon />,
      route: ROUTES.CUSTOMERS,
    },
    permissions
  ),

  // Activities Section
  ...permissionArray(
    PERMISSIONS.READ_ACTIVITY,
    {
      label: 'Activities',
      icon: <EventOutlinedIcon />,
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
    <div className="border-r-[1px] border-gray-200 h-full pb-12">
      <div className="h-full">
        <Paper
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
            {sideBarConfigs.map((config: Config | any, index: number) => (
              <div className="my-1" key={config.label}>
                {config.type === "divider" ? (
                  <Divider sx={{ margin: "15px" }} key={config.label} />
                ) : (
                  <>
                    {config.children ? (
                      <div
                        className="mx-auto w-[90%] rounded-md cursor-pointer overflow-hidden"
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
                          sx={{ width: "100%" }}
                          onClick={() => toggleSubMenu(index)}
                        >
                          <div
                            className={`flex w-full px-1 py-[.7rem] justify-between ${
                              config.isHovered ? "bg-[#2C2E7B] text-white" : ""
                            }`}
                          >
                            <div className="flex text-[1.1rem] items-center">
                              <div className=" ">{config.icon}</div>{" "}
                              <span className="ml-2">{config.label}</span>
                            </div>
                            <div className="flex items-center">
                              {config.isOpen ? (
                                <ExpandMoreIcon />
                              ) : (
                                <ChevronRightIcon />
                              )}
                            </div>
                          </div>
                        </ButtonBase>
                        {config.isOpen && (
                          <List disablePadding>
                            {config.children.map(
                              (subConfig: ConfigChildren) => (
                                <Link
                                href={subConfig.route}
                                  key={subConfig.label}
                                >
                                  <div
                                    // mx-2 w-[90%] rounded-md
                                    className={`bg-[#EEEEFF] ml-4 cursor-pointer overflow-hidden ${
                                      pathname === subConfig.route
                                        ? "bg-[#8B5ACD] text-black"
                                        : "text-gray-700  hover:bg-[#6BD8E6] hover:text-black"
                                    }`}
                                  >
       
                                    <ButtonBase
                                      sx={{ width: "100%" }}
                                      className="hover:bg-[#212E7B] hover:text-white active:bg-[#2C2E7B] active:text-white"
                                    >
                                      <div className="flex w-full px-3 py-[.7rem]">
                                        <div className="flex text-[1.1rem] items-center">
                                          <div>{subConfig.icon}</div>
                                          <span className="ml-2">{subConfig.label}</span>
                                        </div>
                                      </div>
                                    </ButtonBase>
                                  </div>
                                </Link>
                              )
                            )}
                          </List>
                        )}
                      </div>
                    ) : (
                      <Link href={config.route} key={config.label}>
                        <div
                          className={`mx-auto w-[100%] rounded-md cursor-pointer overflow-hidden ${
                            location.pathname === config.route
                              ? "bg-[#2C2E7B] text-white"
                              : "text-gray-700  hover:bg-[#2C2E7B] hover:text-white"
                          }`}
                        >
                          <ButtonBase sx={{ width: "100%" }}>
                            <div className="flex w-full px-4 py-[.7rem]">
                              <div className="flex text-[1.1rem] items-center">
                                <div className=" ">{config.icon}</div>{" "}
                                <span className="ml-2">{config.label}</span>
                              </div>
                            </div>
                          </ButtonBase>
                        </div>
                      </Link>
                    )}
                  </>
                )}
              </div>
            ))}
          </FireNav>
        </Paper>
      </div>
    </div>
  );
}
