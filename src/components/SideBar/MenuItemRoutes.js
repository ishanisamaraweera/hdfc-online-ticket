import React from "react";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";

export const menuItems = [
  {
    name: "Dashboard",
    exact: true,
    to: "/dashboard",
    iconClassName: "bi bi-cast",
    route_key: "dashboard",
    privilege: "DASHBOARD",
  },
  {
    name: "Tickets",
    exact: true,
    to: "/tickets",
    iconClassName: "bi bi-layout-text-sidebar-reverse",
    route_key: "tickets",
    privilege: "TICKETS",
    subMenus: [
      {
        name: "Search Ticket",
        exact: true,
        to: "/tickets/gemstone-origins",
        route_key: "SEARCH_TICKET",
        privilege: "SEARCH_TICKET",
      },
      {
        name: "Generate Reports",
        exact: true,
        to: "/tickets/gemstone-types",
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
    route_key: "categories",
    privilege: "ISSUE_CATEGORY",
    subMenus: [
      {
        name: "Add New Issue Category",
        exact: true,
        to: "/issue-category/create-new",
        route_key: "create-issue-category",
        privilege: "ADD_ISSUE_CATEGORY", 
      },
    ],
  },
  {
    name: "Users",
    exact: true,
    to: "/user",
    iconClassName: "bi bi-people",
    route_key: "user-role",
    privilege: "USERS",
    subMenus: [
      {
        name: "Add User",
        exact: true,
        to: "/user/add-user",
        route_key: "add-user",
        privilege: "ADD_USER", 
      },
      {
        name: "User Role",
        exact: true,
        to: "/user/user-role",
        route_key: "user-role",
        privilege: "USER_ROLE", 
      },
      {
        name: "Function",
        exact: true,
        to: "/user/function",
        route_key: "function",
        privilege: "FUNCTION",
      },
      {
        name: "Assign Function",
        exact: true,
        to: "/user/assign-function",
        route_key: "assign-function",
        privilege: "ASSIGN_FUNCTION",
      },
    ],
  },
  {
    name: "Settings",
    exact: true,
    to: "/settings",
    iconClassName: "bi bi-gear",
    route_key: "settings",
    privilege: "SETTINGS",
  },
];

function AppMenu() {
  const navigate = useNavigate();
  
  // Get the pagePrivileges from local storage
  const pagePrivileges = localStorage.getItem("pagePrivileges")?.split(",") || [];
  
  // Filter the menuItems based on the user's privileges
  const filteredMenuItems = menuItems.filter((item) =>
    pagePrivileges.includes(item.privilege)
  );

  return (
    <Menu>
      {filteredMenuItems.map((item) => (
        <Menu.Item
          key={item.route_key}
          icon={<i className={item.iconClassName}></i>}
          onClick={() => navigate(item.to)}
        >
          {item.name}
        </Menu.Item>
      ))}
    </Menu>
  );
}

export default AppMenu;