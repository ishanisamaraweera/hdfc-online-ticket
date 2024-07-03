import Header from "./components/Header/Header";
import React, { useEffect } from "react";
import SideMenu from "./components/SideBar/SideMenu";
import { useStore } from "./store";
import { Outlet } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

export default function Layout() {
  const activeSideMenu = useStore((state) => state.activeSideMenu);
  const setSettingData = useStore((state) => state.setSettingData);
  const isMobileDevice = useMediaQuery({ query: "(max-width: 600px)" });

  useEffect(() => {
    if (isMobileDevice) {
      setSettingData(true);
    }
    // eslint-disable-next-line
  }, [isMobileDevice]);

  return (
    <div className="bg_layer">
      <SideMenu />
      <div className={`container_main ${activeSideMenu ? "inactive" : ""}`}>
        <Header />
        <Outlet />
      </div>
    </div>
  );
}
