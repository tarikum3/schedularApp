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


import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";


import { permissionArray,  } from "@/lib/admin/utils/permissions";

import { PERMISSIONS } from "@/lib/admin/configs/permissions";


import PeopleAltOutlined from "@mui/icons-material/PeopleAltOutlined";

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
    'Read Dashboard Over All',
    'Read Customer Service Dashboard',
    'Read Marketing Dashboard',
    'Read Sales Dashboard'
  ];

  const userinfo = "userinfo";





  const [sideBarConfigs, setSideBarConfigs] = React.useState<any[]>([]);

  React.useEffect(() => {
    setSideBarConfigs([


      ...permissionArray(
        // (PERMISSIONS.READ_DASHBOARD || PERMISSIONS.SALES_DASHBOARD || PERMISSIONS.MARKETING_DASHBOARD || PERMISSIONS.CUSTOMER_SERVICE_DASHBOARD),
        [
          ...(permissions.includes(PERMISSIONS.MARKETING_DASHBOARD) ? [PERMISSIONS.MARKETING_DASHBOARD] : []),
          ...(permissions.includes(PERMISSIONS.CUSTOMER_SERVICE_DASHBOARD) ? [PERMISSIONS.CUSTOMER_SERVICE_DASHBOARD] : []),
        ],
        {
          label: "Dashboard",
          icon: <DashboardIcon />,
          isOpen: false,
          isHovered: false,
          children: [
            ...permissionArray(
              PERMISSIONS.READ_DASHBOARD,
              {
                label: "Overview",
                icon: <DashboardIcon />,
                route: ROUTES.DASHBOARD,
              },
              permissions,
              //userinfo?.user
            ),
            ...permissionArray(
              PERMISSIONS.CUSTOMER_SERVICE_DASHBOARD,
  
              {
                label: "C S",
                icon: <PeopleAltOutlined />,
                route: ROUTES.DASHBOARD_CUSTOMER,
              },
              permissions,
              //userinfo?.user
            )
  
          ],
        },
        permissions,
        // userinfo?.user
      ),
      

      {
        type: "divider",
      },


  

   


 
      ...permissionArray(
        PERMISSIONS.CREATE_ROLE,
        {
          label: "Employees",
          icon: <PeopleAltOutlinedIcon />,
          route: ROUTES.DASHBOARD,
        },
        permissions,
        userinfo
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
