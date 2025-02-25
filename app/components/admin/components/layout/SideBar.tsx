"use client";
import * as React from "react";
import Link from "next/link";
import { ROUTES } from "@/lib/admin/configs/routes";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { permissionArray } from "@/lib/admin/utils/permissions";
import { PERMISSIONS } from "@/lib/admin/configs/permissions";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import UserView from "@/app/components/admin/components/user/UserMenu";
export default function SideBar() {
  const pathname = "/home";
  const permissions = [
    PERMISSIONS.READ_OVERVIEW_DASHBOARD,
    PERMISSIONS.READ_ANALYTICS_DASHBOARD,
    PERMISSIONS.READ_USER,
    PERMISSIONS.READ_PRODUCT,
    PERMISSIONS.READ_ORDER,
    PERMISSIONS.READ_CUSTOMER,
    PERMISSIONS.READ_ACTIVITY,
  ];

  const [sideBarConfigs, setSideBarConfigs] = React.useState<any[]>([]);

  React.useEffect(() => {
    setSideBarConfigs([
      ...permissionArray(
        [
          PERMISSIONS.READ_OVERVIEW_DASHBOARD,
          PERMISSIONS.READ_ANALYTICS_DASHBOARD,
        ],
        {
          label: "Dashboard",
          icon: <DashboardIcon className="text-primary-500" />,
          isOpen: true,
          isHovered: false,
          children: [
            {
              label: "Overview",
              icon: <DashboardIcon className="text-primary-400" />,
              route: ROUTES.DASHBOARD_OVERVIEW,
            },
            {
              label: "Analytics",
              icon: <DashboardIcon className="text-primary-400" />,
              route: ROUTES.DASHBOARD_ANALYTICS,
            },
          ],
        },
        permissions
      ),

      {
        label: "Users",
        icon: <PeopleAltOutlinedIcon className="text-primary-500" />,
        route: ROUTES.USERS,
      },

      {
        label: "Products",
        icon: <Inventory2OutlinedIcon className="text-primary-500" />,
        route: ROUTES.PRODUCT,
      },
      {
        label: "Orders",
        icon: <ShoppingCartOutlinedIcon className="text-primary-500" />,
        route: ROUTES.ORDER,
      },
      {
        label: "Customers",
        icon: <GroupOutlinedIcon className="text-primary-500" />,
        route: ROUTES.CUSTOMERS,
      },
      {
        label: "Activities",
        icon: <EventOutlinedIcon className="text-primary-500" />,
        route: ROUTES.ACTIVITIES,
      },
    ]);
  }, []);

  const toggleSubMenu = (index: number) => {
    setSideBarConfigs((prevConfigs) => {
      const updatedConfigs = [...prevConfigs];
      updatedConfigs[index] = {
        ...updatedConfigs[index],
        isOpen: !updatedConfigs[index].isOpen,
      };
      return updatedConfigs;
    });
  };

  return (
    <div className="border-r border-primary-300 h-full pb-12">
      <div className="h-full flex flex-col justify-end">
        <div className="mt-1 w-full h-full overflow-y-auto bg-white p-2">
          {/* <nav>
            {sideBarConfigs.map((config: any, index: number) => (
              <div className="my-1" key={index}>
                {config.type === "divider" ? (
                  <div className="border-t border-gray-300 my-2" />
                ) : (
                  <>
                    {config.children ? (
                      <div
                        className="w-full mx-auto rounded-md cursor-pointer"
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
                        <button
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
                          <div>
                            {config.isOpen ? (
                              <ExpandMoreIcon />
                            ) : (
                              <ChevronRightIcon />
                            )}
                          </div>
                        </button>
                        {config.isOpen && (
                          <div className="pl-6">
                            {config.children.map(
                              (subConfig: any, subIndex: number) => (
                                <Link href={subConfig.route} key={subIndex}>
                                  <div
                                    className={`px-3 py-2 rounded-md transition-colors cursor-pointer text-sm font-medium ${
                                      pathname === subConfig.route
                                        ? "bg-primary-700 text-primary-100"
                                        : "hover:bg-primary-500 hover:text-primary-100"
                                    }`}
                                  >
                                    {subConfig.icon}
                                    <span className="ml-2">
                                      {subConfig.label}
                                    </span>
                                  </div>
                                </Link>
                              )
                            )}
                          </div>
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
          </nav> */}
        </div>
        <UserView />
      </div>
    </div>
  );
}
