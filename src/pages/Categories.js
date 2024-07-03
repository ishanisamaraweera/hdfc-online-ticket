import React from "react";
import { useLocation } from "react-router-dom";
// import ReportsDataTable from "../components/Reports/ReportsDataTable";
import useBreadCrumb from "../hooks/useBreadCrumb";

export default function Categories() {
  const location = useLocation();
  useBreadCrumb("Categories", location.pathname, "Categories");

  return (
    <div className="dashboard">
      <div className="section_row">
      </div>
    </div>
  );
}
