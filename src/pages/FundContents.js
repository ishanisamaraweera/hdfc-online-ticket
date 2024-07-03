import { Button } from "antd";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FundContentsTable from "../components/FundContents/FundContentsTable";
import useBreadCrumb from "../hooks/useBreadCrumb";


export default function FundContents() {
  const navigate = useNavigate();
  const location = useLocation();
  useBreadCrumb("Funds Contents", location.pathname, "Funds Contents");

  return (
    <div className="dashboard">
      <div className="section_row">
        <div className="top_row">
          <Button
            className="primary__btn"
            onClick={() => navigate("/fund-contents/create")}
          >
            Add New Contents
          </Button>
        </div>
        <FundContentsTable />
      </div>
    </div>
  );
}
