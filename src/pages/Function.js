import { Button } from "antd";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useBreadCrumb from "../hooks/useBreadCrumb";
import FunctionDataTable from "../components/User/FunctionDataTable";
import { useStore } from "../store";

export default function Function() {
    const navigate = useNavigate();
    const location = useLocation();
    useBreadCrumb("Function", location.pathname, "Function");
    const { actionPrivileges } = useStore();

    return (
        <div className="dashboard">
            <div className="section_row">
                <FunctionDataTable />
                {actionPrivileges.includes("ADD_FUNCTION") && (
                <div className="top_row">
                    <Button
                        className="primary__btn"
                        onClick={() => navigate("/user/add-function")}
                    >
                        Add Function
                    </Button>
                </div>
                )}
            </div>
        </div>
    );
}