import { Button } from "antd";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import DownloadsDataTable from "../components/Downloads/DownloadsDataTable";
import useBreadCrumb from "../hooks/useBreadCrumb";


export default function Orders() {
  const navigate = useNavigate();
  const location = useLocation();
  useBreadCrumb("Orders", location.pathname, "Orders");

  return (
    <div className="dashboard">
      <div className="section_row">
        <div className="top_row">
          <Button
            className="primary__btn"
            onClick={() => navigate("/fund-downloads/create")}
          >
            Add Orders
          </Button>
        </div>
        {/* <DownloadsDataTable /> */}
      </div>
    </div>
  );
}
