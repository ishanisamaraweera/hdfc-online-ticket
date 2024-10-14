import {
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Breadcrumb, Dropdown, Menu, message } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { IMAGE_PATH } from "../../properties";
import { useBreadcrumbStore, useStore } from "../../store";
import Notifications from "./Notifications";

function Header(props) {
  const navigate = useNavigate();

  const setSettingData = useStore((state) => state.setSettingData);
  const activeSideMenu = useStore((state) => state.activeSideMenu);
  const breadcrumb = useBreadcrumbStore((state) => state.breadcrumb);
  const setActiveRoute = useStore((state) => state.setActiveRoute);
  const profileData = useStore((state) => state.profileData);

  const logout = () => {
    localStorage.removeItem("atml");
    localStorage.removeItem("breadCrumb");
    message.success("Logged out successfully");
    navigate("/login");
  };

  const homeRoot = () => {
    setActiveRoute("dashboard");
  };

  const menu = (
    <Menu>
      <Menu.Item onClick={logout}>
        <div>Change Password</div>
      </Menu.Item>
      <Menu.Item onClick={logout}>
        <div>Logout</div>
      </Menu.Item>
    </Menu>
  );
  return (
    <div className="Header">
      <div className="Header_left">
        <div
          onClick={() => setSettingData(!activeSideMenu)}
          className="toggle-menu-btn"
        >
          {activeSideMenu ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </div>
        <div className="Header_main">
          <div className="Header_main_top">
            <div className="Header_main_top_right">
              <p>{breadcrumb.length !== 0 ? breadcrumb[0].title : ""}</p>
              <Breadcrumb>
                <Breadcrumb.Item>
                  <Link
                    to="/dashboard"
                    className="link"
                    onClick={() => homeRoot()}
                  >
                    <HomeOutlined className="bb_home" />
                  </Link>
                </Breadcrumb.Item>
                {breadcrumb.map((item, index) => (
                  <Breadcrumb.Item>
                    <Link to={item.url} className="link">
                      <span className="bb_other">{item.name}</span>
                    </Link>
                  </Breadcrumb.Item>
                ))}
              </Breadcrumb>
            </div>
          </div>
        </div>
      </div>
      <div className="Header_right">
        <Notifications />
        <div className="user_pro_name">
          {/* <p>
            {profileData.first_name
              ? profileData.first_name + " " + profileData.last_name
              : ""}
          </p> */}
          {/* <span>{profileData.role ? profileData.role : ""}</span> */}
        </div>
        {/* <Dropdown
          overlay={menu}
          trigger={["click"]}
          placement="bottomLeft"
          arrow
        >
          {profileData.img_url ? (
            <Avatar src={`${IMAGE_PATH}/${profileData.img_url}`} />
          ) : (
            <Avatar
              style={{ color: "#234caa", backgroundColor: "#06297a30" }}
              icon={<UserOutlined />}
            />
          )}
        </Dropdown> */}
      </div>
    </div>
  );
}

export default Header;
