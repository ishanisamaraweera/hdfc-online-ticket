import React from "react";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { menuItems } from "./MenuItemRoutes"; // Import the menuItems

const pagePrivileges = localStorage.getItem("pagePrivileges")?.split(",") || [];

function AppMenu() {
  console.log("AppMenu component is rendering");
  const navigate = useNavigate();

  // Filter menuItems and subMenus based on privileges
  const filteredMenuItems = menuItems.reduce((acc, item) => {
    // Filter submenus
    const filteredSubMenus = item.subMenus?.filter((subItem) =>
      pagePrivileges.includes(subItem.privilege)
    );

    // Include the main menu item if it has privileges or valid submenus
    if (pagePrivileges.includes(item.privilege) || filteredSubMenus?.length) {
      acc.push({
        ...item,
        subMenus: filteredSubMenus || [],
      });
    }

    return acc;
  }, []);

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

