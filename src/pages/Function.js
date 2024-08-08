import { Button } from "antd";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useBreadCrumb from "../hooks/useBreadCrumb";
import FunctionDataTable from "../components/User/FunctionDataTable";

export default function Function() {
    const navigate = useNavigate();
    const location = useLocation();
    useBreadCrumb("Function", location.pathname, "Function");

    return (
        <div className="dashboard">
            <div className="section_row">
                <FunctionDataTable />
                <div className="top_row">
                    <Button
                        className="primary__btn"
                        onClick={() => navigate("/user/add-function")}
                    >
                        Add Function
                    </Button>
                </div>
            </div>
        </div>
    );
}