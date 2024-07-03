import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashBoardBox from "../components/DashBoardWidgets/DashBoardBox";
import useBreadCrumb from "../hooks/useBreadCrumb";

function Dashboard() {
  const location = useLocation();
  useBreadCrumb("Dashboard", location.pathname, "Dashboard");

  const [activeTicketCount, setActiveTicketCount] = useState(0);
  const [completedTicketCount, setCompletedTicketCount] = useState(0);
  const [closedTicketCount, setClosedTicketCount] = useState(0);
  const [totalTicketCount, setTotalTicketCount] = useState(0);

  useEffect(() => {
    const username = "admin";

    const fetchActiveTicketCount = async () => {
      try {
        const response = await fetch(`http://localhost:8080/getActiveTicketCount/${username}`);
        if (response.ok) {
          const data = await response.text()
          setActiveTicketCount(parseInt(data)); // Parse the response to an integer
        } else {
          console.error("Failed to fetch ticket count");
        }
      } catch (error) {
        console.error("Error fetching ticket count:", error);
      }
    };

    const fetchCompletedTicketCount = async () => {
      try {
        const response = await fetch(`http://localhost:8080/getCompletedTicketCount/${username}`);
        if (response.ok) {
          const data = await response.text()
          setCompletedTicketCount(parseInt(data)); // Parse the response to an integer
        } else {
          console.error("Failed to fetch ticket count");
        }
      } catch (error) {
        console.error("Error fetching ticket count:", error);
      }
    };

    const fetchClosedTicketCount = async () => {
      try {
        const response = await fetch(`http://localhost:8080/getClosedTicketCount/${username}`);
        if (response.ok) {
          const data = await response.text()
          setClosedTicketCount(parseInt(data)); // Parse the response to an integer
        } else {
          console.error("Failed to fetch ticket count");
        }
      } catch (error) {
        console.error("Error fetching ticket count:", error);
      }
    };

    const fetchTotalTicketCount = async () => {
      try {
        const response = await fetch(`http://localhost:8080/getTotalTicketCount/${username}`);
        if (response.ok) {
          const data = await response.text()
          setTotalTicketCount(parseInt(data)); // Parse the response to an integer
        } else {
          console.error("Failed to fetch ticket count");
        }
      } catch (error) {
        console.error("Error fetching ticket count:", error);
      }
    };

    fetchActiveTicketCount();
    fetchCompletedTicketCount();
    fetchClosedTicketCount();
    fetchTotalTicketCount();
  }, []);

  return (
    <div className="dashboard">
      <div className="box_section">
        <DashBoardBox title="My Active Tickets" count={activeTicketCount} icon={"bi bi-brightness-high"} />
        <DashBoardBox title="My Completed Tickets" count={completedTicketCount} icon={"bi bi-calendar2-check"} />
        <DashBoardBox title="My Closed Tickets" count={closedTicketCount} icon={"bi bi-x-circle"} />
        <DashBoardBox title="My Total Tickets" count={totalTicketCount} icon={"bi bi-hdd-stack"} />
      </div>
    </div>
  );
}

export default Dashboard;
