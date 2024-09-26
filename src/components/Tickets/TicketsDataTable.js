import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Button, Modal, Table, Tag, Tooltip, message, Input } from "antd";
import moment from "moment";
import React, { useState, useEffect } from "react";
import Progress from "react-progress-2";
import { useNavigate } from "react-router-dom";
import { apis } from "../../properties";
import { useRefreshTable } from "../../store";
import useAllTickets from "../../hooks/useAllTickets";
import axios from "axios";
import { useDebouncedResizeObserver } from '../../hooks/useDebouncedResizeObserver';
import { useStore } from "../../store";
import { AutoScaling } from "aws-sdk";

const { confirm } = Modal;
const { Search } = Input;


function TicketDataTable() {
  const { refreshTable, setRefreshTable } = useRefreshTable();
  const navigate = useNavigate();
  const [filterData, setFilterData] = useState({
    page: 1,
    pageSize: 10,
  });

  const [searchQuery, setSearchQuery] = useState("");
  const tickets = useAllTickets();
  const [filteredTickets, setFilteredTickets] = useState();
  const { actionPrivileges } = useStore();

  useEffect(() => {
    if (tickets.length !== 0) {
      setFilteredTickets(
        tickets.filter(ticket =>
          Object.values(ticket).some(value =>
            value ? value.toString().toLowerCase().includes(searchQuery.toLowerCase()) : false
          )
        )
      );
    }
  }, [searchQuery, tickets]);

  useDebouncedResizeObserver(() => {
    console.log("ResizeObserver triggered");
  });

  const columns = [
    {
      title: "Ticket ID",
      dataIndex: "ticketId",
      width: 200,
      sorter: (a, b) => parseInt(a.ticketId, 10) - parseInt(b.ticketId, 10),
    },
    {
      title: "Sender",
      dataIndex: "sender",
      width: 200,
      sorter: (a, b) => a.sender.localeCompare(b.sender),
    },
    {
      title: "Agent",
      render: (record) => record.agent ? record.agent : "--",
      width: 200,
      sorter: (a, b) => a.agent.localeCompare(b.agent),
    },
    {
      title: "Reported Date Time",
      render: (record) =>
        record.reportedDateTime
          ? moment(record.reportedDateTime).format("YYYY-MM-DD h:mm:ss a")
          : "--",
      width: 200,
      sorter: (a, b) => new Date(a.reportedDateTime) - new Date(b.reportedDateTime),
    },  
    {
      title: "Emergency Level",
      render: (record) => record.emergencyLevel ? record.emergencyLevel : "--",
      width: 200,
      sorter: (a, b) => a.emergencyLevel.localeCompare(b.emergencyLevel),
    },    
    {
      title: "Location",
      render: (record) => record.location ? record.location : "--",
      width: 200,
      sorter: (a, b) => a.location.localeCompare(b.location),
    },
    {
      title: "Branch or Division",
      render: (record) => record.branchDivision ? record.branchDivision : "--",
      width: 200,
      sorter: (a, b) => a.branchDivision.localeCompare(b.branchDivision),
    },
    {
      title: "Issue Type",
      render: (record) => record.issueType ? record.issueType : "--",
      width: 200,
      sorter: (a, b) => a.issueType.localeCompare(b.issueType),
    },
    {
      title: "Issue Category",
      render: (record) => record.issueCategory ? record.issueCategory : "--",
      width: 200,
      sorter: (a, b) => a.issueCategory.localeCompare(b.issueCategory),
    },   
    {
      title: "Contact No",
      render: (record) => record.contactNo ? record.contactNo : "--",
      width: 200,
      sorter: (a, b) => a.contactNo.localeCompare(b.contactNo),
    },
    {
      title: "Serial No",
      render: (record) => record.serialNo ? record.serialNo : "--",
      width: 200,
      sorter: (a, b) => (a.serialNo && b.serialNo ? a.serialNo.localeCompare(b.serialNo) : 0),
    },
    {
      title: "Is Working PC",
      render: (record) => record.isWorkingPc ? record.isWorkingPc : "--",
      width: 200,
      sorter: (a, b) => a.isWorkingPc.localeCompare(b.isWorkingPc),
    },    
    {
      title: "IP",
      render: (record) => record.ip ? record.ip: "--",
      width: 200,
      sorter: (a, b) => a.ip.localeCompare(b.ip),
    },
    {
      title: "Issue Description & Remarks",
      render: (record) => record.issueDesAndRemarks ? record.issueDesAndRemarks : "--",
      width: 200,
      sorter: (a, b) => a.issueDesAndRemarks.localeCompare(b.issueDesAndRemarks),
    },
    {
      title: "Agent Response Date-Time",
      render: (record) => record.agentResponseDateTime ? record.agentResponseDateTime : "--",
      width: 200,
      sorter: (a, b) =>
        (a.agentResponseDateTime && b.agentResponseDateTime ? new Date(a.agentResponseDateTime) - new Date(b.agentResponseDateTime) : 0),
    },
    {
      title: "Completed Percentage (%)",
      render: (record) => record.completedPercentage ? record.completedPercentage : "0",
      width: 200,
      sorter: (a, b) =>
        (a.completedPercentage && b.completedPercentage ? new Date(a.completedPercentage) - new Date(b.completedPercentage) : 0),
    },
    {
      title: "Resolved Date Time",
      render: (record) => record.resolvedDateTime ? record.resolvedDateTime : "--",
      width: 200,
      sorter: (a, b) =>
        (a.resolvedDateTime && b.resolvedDateTime ? new Date(a.resolvedDateTime) - new Date(b.resolvedDateTime) : 0),
    },
    {
      title: "Resolution Period",
      render: (record) => record.resolutionPeriod ? record.resolutionPeriod : "--",
      width: 200,
      sorter: (a, b) => (a.resolutionPeriod && b.resolutionPeriod ? a.resolutionPeriod - b.resolutionPeriod : 0),
    },
    {
      title: "Agent Comments",
      render: (record) => record?.agentComment,
      width: 200,
      sorter: (a, b) => (a.agentComment && b.agentComment ? a.agentComment.localeCompare(b.agentComment) : 0),
    },
    {
      title: "Last Updated User",
      render: (record) => record.lastUpdatedUser ? record.lastUpdatedUser : "--",
      width: 200,
      sorter: (a, b) => (a.lastUpdatedUser && b.lastUpdatedUser ? a.lastUpdatedUser.localeCompare(b.lastUpdatedUser) : 0),
    },
    {
      title: "Last Updated Date-Time",
      render: (record) =>
        record.lastUpdatedDateTime
          ? moment(record.lastUpdatedDateTime).format("YYYY-MM-DD h:mm:ss a")
          : "--",
      width: 180,
      sorter: (a, b) =>
        new Date(a.lastUpdatedDateTime) - new Date(b.lastUpdatedDateTime),
    },  
    {
      title: "Status",
      render: (record) => (
        <Tag
          className="tags"
          color={record.status === "Closed" ? "#c73b27" : "#0d8c63"}
        >
          {record.status}
        </Tag>
      ),
      fixed: "right",
      width: 90,
      sorter: (a, b) => a.status.localeCompare(b.status),
    },
    {
      title: "Action",
      render: (text, record) => (
        <>
          <Tooltip placement="bottom" title="View">
            <Button
              className="view_button"
              shape="circle"
              icon={<EyeOutlined />}
              onClick={() => {
                navigate(`/viewTicket/${record.ticketId}`);
              }}
            />
          </Tooltip>
          &nbsp;&nbsp;
          {actionPrivileges.includes("UPDATE_TICKET") && (
            <>
              <Tooltip placement="bottom" title="Edit">
                <Button
                  className="edit_button"
                  shape="circle"
                  icon={<EditOutlined />}
                  onClick={() => {
                    navigate(`/updateTicket/${record.ticketId}`);
                  }}
                />
              </Tooltip>
              &nbsp;&nbsp;
            </>
          )}
          {actionPrivileges.includes("CLOSE_TICKET") && (
            <>
              <Tooltip placement="bottom" title="Close">
                <Button
                  className="delete_button"
                  shape="circle"
                  icon={<CloseOutlined />}
                  onClick={() => statusChange(record.ticketId, "Closed")}
                />
              </Tooltip>
              &nbsp;&nbsp;
            </>
          )}
          {actionPrivileges.includes("DELETE_TICKET") && (
            <>
              <Tooltip placement="bottom" title="Delete">
                <Button
                  className="delete_button"
                  shape="circle"
                  icon={<DeleteOutlined />}
                  onClick={() => deleteContent(record.ticketId)}
                />
              </Tooltip>
              &nbsp;&nbsp;
            </>
          )}
        </>
      ),
      fixed: "right",
      width: 175,
      align: "right",
    },
  ];

  const statusChange = (id, type) => {
    confirm({
      title: `Are you sure?`,
      icon: <ExclamationCircleOutlined />,
      content: `Do you want to ${type} this ticket?`,
      okText: "Yes",
      okType: "primary",
      cancelText: "No",
      onOk() {
        Progress.show();
        axios
          .put(`http://localhost:8080/closeTicket/${id}`, {
            status: type,
          })
          .then((result) => {
            let responseJson = result;
            setRefreshTable(!refreshTable);
            message.success("Ticket closed successfully");
            Progress.hide();
            window.location.reload();
          })
          .catch((error) => {
            message.error(error.response?.data?.message || "Failed to close ticket");
            Progress.hide();
          });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const deleteContent = (id) => {
    confirm({
      title: `Are you sure?`,
      icon: <ExclamationCircleOutlined />,
      content: `Do you want to delete this ticket?`,
      okText: "Yes",
      okType: "primary",
      cancelText: "No",
      onOk() {
        Progress.show();
        axios
          .put(`http://localhost:8080/deleteTicket/${id}`)
          .then((result) => {
            let responseJson = result;
            setRefreshTable(!refreshTable);
            setFilteredTickets(filteredTickets.filter(user => user.ticketId !== id));
            Progress.hide();
            message.success("Ticket deleted successfully");
          })
          .catch((error) => {
            message.error(error.response?.data?.message || "Failed to delete ticket! Tickets cannot delete after assign to an agent");
            Progress.hide();
          });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return (
    <>
      <Search
        placeholder="Search tickets"
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: 16, width: 300 }}
      />
      <Table
        scroll={{ x: 1800 }}
        columns={columns}
        dataSource={filteredTickets}
        bordered
        pagination={{
          current: filterData.page,
          pageSize: filterData.pageSize,
          total: filteredTickets.length,
          onChange: (page, pageSize) => {
            setFilterData({
              ...filterData,
              page: page,
              pageSize: pageSize,
            });
          },
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} items`,
        }}
      />
    </>
  );
}

export default TicketDataTable;
