import React from "react";
import { useLocation } from "react-router-dom";
import useBreadCrumb from "../hooks/useBreadCrumb";


export default function Settings() {
  const location = useLocation();
  useBreadCrumb("Settings", location.pathname, "Settings");

  return (
    <div className="dashboard">
      <div className="section_row">
        <div className="top_row">
        
        </div>
      </div>
    </div>
  );
}
