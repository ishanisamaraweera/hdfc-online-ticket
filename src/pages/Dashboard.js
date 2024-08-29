import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Modal, Button, Form, Input, message } from "antd";
import DashBoardBox from "../components/DashBoardWidgets/DashBoardBox";
import useBreadCrumb from "../hooks/useBreadCrumb";
import axios from "axios";
import '../assets/css/Dashboard.css';
import { useStore } from "../store";

function Dashboard() {
  const location = useLocation();
  useBreadCrumb("Dashboard", location.pathname, "Dashboard");

  const [newTicketCount, setNewTicketCount] = useState(0);
  const [assignedTicketCount, setAssignedTicketCount] = useState(0);
  const [activeTicketCount, setActiveTicketCount] = useState(0);
  const [completedTicketCount, setCompletedTicketCount] = useState(0);
  const [closedTicketCount, setClosedTicketCount] = useState(0);
  const [totalTicketCount, setTotalTicketCount] = useState(0);
  const [username] = useState(localStorage.getItem("username"));
  const [allowedPages, setAllowedPages] = useState([]);
  const [allowedActions, setAllowedActions] = useState([]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const { setPagePrivileges, setActionPrivileges, actionPrivileges } = useStore();

  useEffect(() => {
    const fetchInitialLoginStatus = async () => {
      try {
        const response = await fetch(`http://localhost:8080/checkInitialLoginStatus/${username}`);

        if (response.ok) {
          const data = await response.text();
          if (data.trim() === "Yes") {
            setIsModalVisible(true);
          }
        } else {
          console.error("Failed to fetch initial login status");
        }
      } catch (error) {
        console.error("Error fetching initial login status:", error);
      }
    };

    fetchInitialLoginStatus();

    const fetchNewTicketCount = async () => {
      try {
        const response = await fetch(`http://localhost:8080/getNewTicketCount/${username}`);
        if (response.ok) {
          const data = await response.text();
          setNewTicketCount(parseInt(data)); // Parse the response to an integer
        } else {
          console.error("Failed to fetch ticket count");
        }
      } catch (error) {
        console.error("Error fetching ticket count:", error);
      }
    };

    const fetchAssignedTicketCount = async () => {
      try {
        const response = await fetch(`http://localhost:8080/getAssignedTicketCount/${username}`);
        if (response.ok) {
          const data = await response.text();
          setAssignedTicketCount(parseInt(data)); // Parse the response to an integer
        } else {
          console.error("Failed to fetch ticket count");
        }
      } catch (error) {
        console.error("Error fetching ticket count:", error);
      }
    };

    const fetchActiveTicketCount = async () => {
      try {
        const response = await fetch(`http://localhost:8080/getActiveTicketCount/${username}`);
        if (response.ok) {
          const data = await response.text();
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
          const data = await response.text();
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
          const data = await response.text();
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
          const data = await response.text();
          setTotalTicketCount(parseInt(data)); // Parse the response to an integer
        } else {
          console.error("Failed to fetch ticket count");
        }
      } catch (error) {
        console.error("Error fetching ticket count:", error);
      }
    };

    const fetchPrivileges = async () => {
      try {
        const username = localStorage.getItem("username");
        const pagesResponse = await axios.get(`http://localhost:8080/getPagePrivileges/${username}`);
        const actionsResponse = await axios.get(`http://localhost:8080/getFunctionPrivileges/${username}`);
        setPagePrivileges(pagesResponse.data)
        setActionPrivileges(actionsResponse.data)
        localStorage.setItem("pagePrivileges", pagesResponse.data);
        localStorage.setItem("actionPrivileges", actionsResponse.data);
        setAllowedPages(pagesResponse.data);
        setAllowedActions(actionsResponse.data);
      } catch (error) {
        console.error("Failed to fetch privileges", error);
      }
    };

    fetchNewTicketCount();
    fetchAssignedTicketCount();
    fetchActiveTicketCount();
    fetchCompletedTicketCount();
    fetchClosedTicketCount();
    fetchTotalTicketCount();
    fetchPrivileges();
  }, []);

  const handleFinish = async (values) => {
    try {
      values.username = username;
      const response = await axios.put('http://localhost:8080/changePassword', values);
      message.success("Password changed successfully!");
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error("Failed to change password");
    }
  };

  // // Function to check if a page is allowed
  // const isPageAllowed = (page) => allowedPages.includes(page);

  // // Function to check if an action is allowed
  // const isActionAllowed = (action) => allowedActions.includes(action);

  return (
    <div className="dashboard">
      <Modal
        title="Change Password"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        centered
      >
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item
            name="oldPassword"
            label="Old Password"
            rules={[{ required: true, message: "Please input your old password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="newPassword"
            label="New Password"
            rules={[{ required: true, message: "Please input your new password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={['newPassword']}
            rules={[
              { required: true, message: "Please confirm your new password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords do not match!'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Change Password
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      {actionPrivileges.includes("DASHBOARD_VIEW") && (
        <div className="box_section">
          <DashBoardBox title="My New Tickets" count={newTicketCount} icon={"bi bi-plus-circle"} />
          <DashBoardBox title="My Assigned Tickets" count={assignedTicketCount} icon={"bi bi-card-checklist"} />
          <DashBoardBox title="My Active Tickets" count={activeTicketCount} icon={"bi bi-brightness-high"} />
          <DashBoardBox title="My Completed Tickets" count={completedTicketCount} icon={"bi bi-calendar2-check"} />
          <DashBoardBox title="My Closed Tickets" count={closedTicketCount} icon={"bi bi-x-circle"} />
          <DashBoardBox title="My Total Tickets" count={totalTicketCount} icon={"bi bi-hdd-stack"} />
        </div>
      )}
    </div>
  );
}

export default Dashboard;