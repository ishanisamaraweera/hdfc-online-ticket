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
  },
  {
    name: "Reports",
    exact: true,
    to: "/tickets/generate-reports",
    iconClassName: "bi bi-file-earmark-text",
    route_key: "REPORT",
    privilege: "REPORT",
  },
  {
    name: "Issue Category Operations",
    exact: true,
    to: "/issue-category",
    iconClassName: "bi bi-tags",
    route_key: "ISSUE_CATEGORY",
    privilege: "ISSUE_CATEGORY",
  },
  {
    name: "Users",
    exact: true,
    to: "/user",
    iconClassName: "bi bi-people",
    route_key: "USER",
    privilege: "USER",
  },
  {
    name: "User Role",
    exact: true,
    to: "/user/user-role",
    iconClassName: "bi bi-person",
    route_key: "USER_ROLE",
    privilege: "USER_ROLE",
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
    ]//.filter((subMenus) => pagePrivileges.includes(subMenus.route_key)),
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