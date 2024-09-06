import React from "react";
import AppMenu from "./components/SideBar/AppMenu"; // Adjust the path if needed
import { Outlet } from "react-router-dom"; // Import Outlet to render child routes

const Layout = () => {
  return (
    <div className="layout">
      <aside className="sidebar">
        <AppMenu /> {/* Include the AppMenu component */}
      </aside>
      <main className="content">
        <Outlet /> {/* Render child routes here */}
      </main>
    </div>
  );
};

export default Layout;
