import React from "react";
import Logo from "../Logo";
import DashboardSidebarLinkItem from "./DashboardSidebarLinkItem";
import {
  DASHBOARD_COLLECT_MENU_LIST,
  DASHBOARD_OVERVIEW_MENU_LIST,
} from "@/routes";

const DashboardSidebar = () => {
  return (
    <aside className=" p-4  px-6 border-r border-gray-300 row-span-4">
      <div className="mb-12">
        <Logo />
      </div>
      <div className="mb-8">
        <p className="text-gray-400 mb-2">Dashboard</p>
        <ul>
          {DASHBOARD_OVERVIEW_MENU_LIST.map((menu) => {
            return (
              <li key={menu.text}>
                <DashboardSidebarLinkItem {...menu}>
                  {menu.text}
                </DashboardSidebarLinkItem>
              </li>
            );
          })}
        </ul>
      </div>
      <p className="text-gray-400 mb-2">Collect</p>
      <ul>
        {DASHBOARD_COLLECT_MENU_LIST.map((menu) => {
          return (
            <li key={menu.text}>
              <DashboardSidebarLinkItem {...menu}>
                {menu.text}
              </DashboardSidebarLinkItem>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default DashboardSidebar;
