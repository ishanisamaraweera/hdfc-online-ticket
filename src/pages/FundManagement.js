import { Button } from "antd";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FundsDataTable from "../components/Fund/FundsDataTable";
import useBreadCrumb from "../hooks/useBreadCrumb";


export default function FundManagement() {
  const navigate = useNavigate();
  const location = useLocation();
  useBreadCrumb("Funds Management", location.pathname, "Funds Management");

  return (
    <div className="dashboard">
      <div className="section_row">
        <div className="top_row">
          <Button
            className="primary__btn"
            onClick={() => navigate("/fund-management/create")}
          >
            Add Fund
          </Button>
        </div>
        <FundsDataTable />
      </div>
    </div>
  );
}
