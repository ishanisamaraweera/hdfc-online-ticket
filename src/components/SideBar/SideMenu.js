import React, { useEffect } from "react";
import logo from "../../assets/images/logo.png";
import MenuItem from "./MenuItem";
import { menuItems } from "./MenuItemRoutes";
import { useStore } from "../../store";

const SideMenu = () => {
  const activeSideMenu = useStore((state) => state.activeSideMenu);

  const removeActiveClassFromSubMenu = () => {
    document.querySelectorAll(".sub-menu").forEach((el) => {
      el.classList.remove("active");
    });
  };

  useEffect(() => {
    let menuItems = document.querySelectorAll(".menu-item");
    menuItems.forEach((el) => {
      el.addEventListener("click", (e) => {
        const next = el.nextElementSibling;
        removeActiveClassFromSubMenu();
        menuItems.forEach((el) => el.classList.remove("active"));
        el.classList.toggle("active");
        if (next !== null) {
          next.classList.toggle("active");
        }
      });
    });
  }, []);

  return (
    <div className={`side-menu ${activeSideMenu ? "inactive" : ""}`}>
      <div className="top-section">
        <div className="logo">
          <img src={logo} alt="logo" />
          <span>HDFC Ticket Management System</span>
        </div>
      </div>

      <div className="main-menu">
        <ul>
          {menuItems.map((menuItem, index) => (
            <MenuItem
              key={index}
              name={menuItem.name}
              exact={menuItem.exact}
              to={menuItem.to}
              subMenus={menuItem.subMenus || []}
              iconClassName={menuItem.iconClassName}
              route_key={menuItem.route_key}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

//{
/* <div className="main-menu">
      <ul>
        {menuItems
        //.filter((menuItem) => menuItem?.name)
        .map((menuItem, index) => {
          // Check if the current menu item has a name property
          //if (menuItem?.name) {
            return (
              <MenuItem
                key={index}
                name={menuItem.name}
                exact={menuItem.exact}
                to={menuItem.to}
                subMenus={menuItem.subMenus || []}
                iconClassName={menuItem.iconClassName}
                route_key={menuItem.route_key}
              />
            );
          //}
        })}
      </ul>
      </div> *///}

export default SideMenu;
