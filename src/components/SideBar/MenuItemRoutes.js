import React from "react";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import ReactDOM from 'react-dom';

// Get the pagePrivileges from local storage
const pagePrivileges = localStorage.getItem("pagePrivileges")?.split(",") || [];

export const menuItems = [
  {
    name: "Dashboard",
    exact: true,
    to: "/dashboard",
    iconClassName: "bi bi-cast",
    route_key: "DASHBOARD",
    privilege: "DASHBOARD",
  },
  {
    name: "Tickets",
    exact: true,
    to: "/tickets",
    iconClassName: "bi bi-layout-text-sidebar-reverse",
    route_key: "TICKETS",
    privilege: "TICKETS",
    subMenus: [
      {
        name: "Add Ticket",
        exact: true,
        to: "/addTicket",
        route_key: "ADD_TICKET",
        privilege: "ADD_TICKET",
      },
      {
        name: "Generate Reports",
        exact: true,
        to: "/tickets/generate-reports",
        route_key: "GENERATE_TICKETS",
        privilege: "GENERATE_TICKETS",
      },
    ],
  },
  {
    name: "Issue Category Operations",
    exact: true,
    to: "/issue-category",
    iconClassName: "bi bi-tags",
    route_key: "ISSUE_CATEGORY",
    privilege: "ISSUE_CATEGORY",
    subMenus: [
      {
        name: "Add New Issue Category",
        exact: true,
        to: "/add-issue-category",
        route_key: "ADD_ISSUE_CATEGORY",
        privilege: "ADD_ISSUE_CATEGORY",
      },
    ],
  },
  {
    name: "Users",
    exact: true,
    to: "/user",
    iconClassName: "bi bi-people",
    route_key: "USERS",
    privilege: "USERS",
    subMenus: [
      {
        name: "Add User",
        exact: true,
        to: "/user/add-user",
        route_key: "ADD_USER",
        privilege: "ADD_USER",
      },
    ],
  },
  {
    name: "User Role",
    exact: true,
    to: "/user/user-role",
    iconClassName: "bi bi-person",
    route_key: "USER_ROLE",
    privilege: "USER_ROLE",
    subMenus: [
      {
        name: "Add User Role",
        exact: true,
        to: "/user/add-user-role",
        route_key: "ADD_USER_ROLE",
        privilege: "ADD_USER_ROLE",
      },
    ],
  },
  {
    name: "Function",
    exact: true,
    to: "/user/function",
    iconClassName: "bi bi-slash-square",
    route_key: "FUNCTION",
    privilege: "FUNCTION",
    subMenus: [
      {
        name: "Add Function",
        exact: true,
        to: "user/add-function",
        route_key: "ADD_FUNCTION",
        privilege: "ADD_FUNCTION",
      },
      {
        name: "Assign Function",
        exact: true,
        to: "/user/assign-function",
        route_key: "ASSIGN_FUNCTION",
        privilege: "ASSIGN_FUNCTION",
      },
    ],
  },
  {
    name: "Settings",
    exact: true,
    to: "/settings",
    iconClassName: "bi bi-gear",
    route_key: "SETTINGS",
    privilege: "SETTINGS",
  },
];

function AppMenu() {
  console.log("AppMenu component is rendering");
  const navigate = useNavigate();

  // Filter menuItems and subMenus based on privileges
  const filteredMenuItems = menuItems.reduce((acc, item) => {
    // Filter submenus
    const filteredSubMenus = item.subMenus?.filter((subItem) =>
      pagePrivileges.includes(subItem.privilege)
    );

    console.log("pagePrivileges from localStorage:", pagePrivileges);

    // Include the main menu item if it has privileges or valid submenus
    if (pagePrivileges.includes(item.privilege) || filteredSubMenus?.length) {
      acc.push({
        ...item,
        subMenus: filteredSubMenus,
      });
    }
    
    console.log("Current filtered item: ", acc); // Log the accumulator

    return acc;
  }, []);

  console.log("Final filtered menu items: ", filteredMenuItems); // Log the final filtered menu

  return (
    <Menu>
      {filteredMenuItems.map((item) =>
        item.subMenus?.length ? (
          <Menu.SubMenu
            key={item.route_key}
            icon={<i className={item.iconClassName}></i>}
            title={item.name}
          >
            {item.subMenus.map((subItem) => (
              <Menu.Item
                key={subItem.route_key}
                onClick={() => navigate(subItem.to)}
              >
                {subItem.name}
              </Menu.Item>
            ))}
          </Menu.SubMenu>
        ) : (
          <Menu.Item
            key={item.route_key}
            icon={<i className={item.iconClassName}></i>}
            onClick={() => navigate(item.to)}
          >
            {item.name}
          </Menu.Item>
        )
      )}
    </Menu>
  );
}

export default AppMenu;
