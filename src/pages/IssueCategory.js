import { Button } from "antd";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useBreadCrumb from "../hooks/useBreadCrumb";
import IssueCategoryDataTable from "../components/IssueCategory/IssueCategoryDataTable";
import { useStore } from "../store";

export default function IssueCategory() {
    const navigate = useNavigate();
    const location = useLocation();
    const { actionPrivileges } = useStore();
    useBreadCrumb("Issue Category", location.pathname, "Issue Category");

    return (
        <div className="dashboard">
            <div className="section_row">
                <IssueCategoryDataTable />
                { actionPrivileges.includes("ADD_ISSUE_CATEGORY") && (
                    <div className="top_row">
                        <Button
                            className="primary__btn"
                            onClick={() => navigate("/add-issue-category")}
                        >
                            Add Issue Category
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}