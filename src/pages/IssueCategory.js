import { Button } from "antd";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import FaqsDataTable from "../components/Faqs/FaqsDataTable";
import useBreadCrumb from "../hooks/useBreadCrumb";

export default function IssueCategory() {
  const navigate = useNavigate();
  const location = useLocation();
  useBreadCrumb("Issue Category", location.pathname, "Issue Category");

  return (
    <div className="dashboard">
      <div className="section_row">
        <div className="top_row">
          <Button
            className="primary__btn"
            onClick={() => navigate("/getTicket")}
          >
            Add Issue Category
          </Button>
        </div>
        {/* <FaqsDataTable /> */}
      </div>
    </div>
  );
}
