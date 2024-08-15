import React from "react";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { menuItems } from "./MenuItemRoutes"; // Import menuItems from MenuItemRoutes

function AppMenu() {
  console.log("AppMenu component is rendering");
  const navigate = useNavigate();

  // Get the pagePrivileges from local storage and parse them
  const pagePrivileges = localStorage.getItem("pagePrivileges")?.split(",") || [];
  console.log("pagePrivileges from localStorage:******************", pagePrivileges);

  // Filter menuItems and subMenus based on privileges
  const filteredMenuItems = menuItems.filter((item) => {
    // Check if the main menu item has the required privilege
    const hasMainPrivilege = pagePrivileges.includes(item.privilege);

    // Filter submenus based on privileges
    const filteredSubMenus = item.subMenus?.filter((subItem) =>
      pagePrivileges.includes(subItem.privilege)
    );

    // Update the item with the filtered submenus
    item.subMenus = filteredSubMenus;

    // Include the main menu item if it has the required privilege or has any valid submenus
    return hasMainPrivilege || (filteredSubMenus && filteredSubMenus.length > 0);
  });

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
