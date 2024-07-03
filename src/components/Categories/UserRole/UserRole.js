import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import useBreadCrumb from "../../../hooks/useBreadCrumb";
import { Button } from "antd";
import TicketsDataTable from "./TicketsDataTable";
import AddItemModel from "./AddItemModel";

export default function IssueCategory() {
  const location = useLocation();
  useBreadCrumb("User Role", location.pathname, "User Role");
  const [visible, setVisible] = useState(false);

  return (
    <div className="dashboard">
      <div className="section_row">
        <div className="top_row">
          <Button className="primary__btn" onClick={() => setVisible(true)}>
            Add New
          </Button>
        </div>
        <TicketsDataTable /> 
      </div>
      {visible && (
        <AddItemModel
          visible={visible}
          setVisible={() => {
            setVisible(!visible);
          }}
        />
      )}
    </div>
  );
}
