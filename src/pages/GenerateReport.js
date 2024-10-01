import { Button } from "antd";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useBreadCrumb from "../hooks/useBreadCrumb";
import TicketsSearchTable from "../components/Tickets/TicketsSearchTable";
import axios from 'axios';
import { apis } from "../properties";

export default function Tickets() {
  const location = useLocation();
  useBreadCrumb("Reports", location.pathname, "Reports");
  

  const handleDownload = async () => {
    let statusVal = localStorage.getItem("statusVal");
    try {
      let response = "";

      if (statusVal != "undefined" && statusVal != "null") {
        response = await axios({
          url: `${apis.EXPORT_TICKETS}/${statusVal}`,
          method: 'GET',
          responseType: 'blob',
        });
      } else {
        response = await axios({
          url: `${apis.EXPORT_TICKETS}`,
          method: 'GET',
          responseType: 'blob',
        });
      }


      // Create a URL for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // Create a link element and simulate a click to download the file
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'ticket_details.xlsx'); // Filename for the downloaded file
      document.body.appendChild(link);
      link.click();

      // Clean up
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading the file:', error);
    }
  };

  return (
    <div className="dashboard">
      <div className="section_row">
        <TicketsSearchTable />
        <div className="top_row">
          <Button
            className="primary__btn"
            onClick={handleDownload}
          >
            Generate Report
          </Button>
        </div>
      </div>
    </div>
  );
}
