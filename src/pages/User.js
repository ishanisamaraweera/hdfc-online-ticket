import { Button } from "antd";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useBreadCrumb from "../hooks/useBreadCrumb";
import UserDataTable from "../components/User/UserDataTable";

export default function User() {
    const navigate = useNavigate();
    const location = useLocation();
    useBreadCrumb("User", location.pathname, "User");

    return (
        <div className="dashboard">
            <div className="section_row">
                <UserDataTable />
                <div className="top_row">
                    <Button
                        className="primary__btn"
                        onClick={() => navigate("/user/add-user")}
                    >
                        Add User
                    </Button>
                </div>
            </div>
        </div>
    );
}