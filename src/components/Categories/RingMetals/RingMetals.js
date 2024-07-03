import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import useBreadCrumb from "../../../hooks/useBreadCrumb";
import { Button } from "antd";
import DataTable from "./DataTable";
import AddItemModel from "./AddItemModel";

export default function RingMetals() {
  const location = useLocation();
  useBreadCrumb("Ring Metals", location.pathname, "Ring Metals");
  const [visible, setVisible] = useState(false);

  return (
    <div className="dashboard">
      <div className="section_row">
        <div className="top_row">
          <Button className="primary__btn" onClick={() => setVisible(true)}>
            Add New
          </Button>
        </div>
        <DataTable />
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
