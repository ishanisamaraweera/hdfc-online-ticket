import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useStore } from "../../store";
/**
 * 
 * @function MenuItem
 **/

const MenuItem = (props) => {
  const { name, subMenus, iconClassName, to, route_key } = props;
  const activeRoute = useStore((state) => state.activeRoute);
  const setActiveRoute = useStore((state) => state.setActiveRoute);
  return (
    <li>
      <Link
        exact
        to={to}
        className={route_key === activeRoute ? "menu-item active" : "menu-item"}
        onClick={() => {
          setActiveRoute(route_key);
        }}
      >
        <div className="menu-icon">
          <i class={iconClassName}></i>
        </div>
        <span>{name}</span>
      </Link>
      {subMenus.length > 0 ? (
        <ul
          className={route_key === activeRoute ? "sub-menu active" : "sub-menu"}
        >
          {subMenus.map((menu, index) => (
            <li key={index}>
              <NavLink to={menu.to} exact>
                {menu.name}
              </NavLink>
            </li>
          ))}
        </ul>
      ) : null}
    </li>
  );
};

export default MenuItem;
