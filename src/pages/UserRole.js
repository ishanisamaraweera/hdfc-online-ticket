import { Button } from "antd";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useBreadCrumb from "../hooks/useBreadCrumb";
import UserRoleDataTable from "../components/User/UserRoleDataTable";
import { useStore } from "../store";

export default function UserRole() {
    const navigate = useNavigate();
    const location = useLocation();
    const { actionPrivileges } = useStore();
    useBreadCrumb("User Role", location.pathname, "User Role");

    return (
        <div className="dashboard">
            <div className="section_row">
                <UserRoleDataTable />
                {actionPrivileges.includes("ADD_USER_ROLE") && (
                    <div className="top_row">
                        <Button
                            className="primary__btn"
                            onClick={() => navigate("/user/add-user-role")}
                        >
                            Add User Role
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}