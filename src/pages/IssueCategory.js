import { Button } from "antd";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useBreadCrumb from "../hooks/useBreadCrumb";
import IssueCategoryDataTable from "../components/IssueCategory/IssueCategoryDataTable";

export default function IssueCategory() {
    const navigate = useNavigate();
    const location = useLocation();
    useBreadCrumb("Issue Category", location.pathname, "Issue Category");

    return (
        <div className="dashboard">
            <div className="section_row">
                <IssueCategoryDataTable />
                <div className="top_row">
                    <Button
                        className="primary__btn"
                        onClick={() => navigate("/issue-category/add-issue-category")}
                    >
                        Add Issue Category
                    </Button>
                </div>
            </div>
        </div>
    );
}