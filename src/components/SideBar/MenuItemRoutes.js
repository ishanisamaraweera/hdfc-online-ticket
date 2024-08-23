

import React from "react";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

console.log("MenuItemRoutes.js is loaded");

// Get the pagePrivileges from local storage
const pagePrivileges = localStorage.getItem("pagePrivileges")?.split(",") || [];
console.log("pagePrivileges from localStorage:", pagePrivileges);

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
];//.map((menuItem) => {
  // console.log(`Checking privilege for ${menuItem.name}: ${menuItem.privilege}`);
  // console.log(`Privilege available: ${pagePrivileges.includes(menuItem.privilege)}`);

//   // Filter the subMenus based on privileges
//   if (menuItem.subMenus) {
//     menuItem.subMenus = menuItem.subMenus.filter(subMenu =>
//       pagePrivileges.includes(subMenu.privilege)
//     );
//   }

//   // Check if the current menu item's privilege is included in the user's privileges
//   if (pagePrivileges.includes(menuItem.privilege) || (menuItem.subMenus && menuItem.subMenus.length > 0)) {
//     return menuItem;
//   }

//   // Return null if the privilege is not present
//   return null;
// }).filter(Boolean); // Filter out null values
// if (pagePrivileges.includes(menuItem.privilege)) {
//   // Return the menu item if the privilege is present
//   if (menuItem?.name) {
//     return (
//       <Menu.Item key={menuItem.route_key} icon={<i className={menuItem.iconClassName}></i>}>
//         <Link to={menuItem.to}>{menuItem.name}</Link>
//       </Menu.Item>
//     );
//   }
// }
// // Return null if the privilege is not present
// return null;
// });
