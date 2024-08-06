import { Button } from "antd";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useBreadCrumb from "../hooks/useBreadCrumb";
import TicketsDataTable from "../components/Tickets/TicketsDataTable";

export default function Tickets() {
  const navigate = useNavigate();
  const location = useLocation();
  useBreadCrumb("Tickets", location.pathname, "Tickets");

  return (
    <div className="dashboard">
      <div className="section_row">
      <TicketsDataTable />
        <div className="top_row">
          <Button
            className="primary__btn"
            onClick={() => navigate("/addTicket")}
          >
            Add Tickets
          </Button>
        </div>
      </div>
    </div>
  );
}
