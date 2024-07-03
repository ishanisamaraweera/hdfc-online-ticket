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
import axiosInstance from "../../util/axiosInstance";
import useAllTickets from "../../hooks/useAllTickets";
import axios from "axios";
import { useDebouncedResizeObserver } from '../../hooks/useDebouncedResizeObserver'; // Adjust the path accordingly

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
  const [filteredTickets, setFilteredTickets] = useState(tickets);

  useEffect(() => {
    setFilteredTickets(
      tickets.filter(ticket =>
        Object.values(ticket).some(value =>
          value ? value.toString().toLowerCase().includes(searchQuery.toLowerCase()) : false
        )
      )
    );
  }, [searchQuery, tickets]);

  useDebouncedResizeObserver(() => {
    console.log("ResizeObserver triggered");
  });

    const columns = [
    {
      title: "Ticket No",
      dataIndex: "ticketNo",
      width: 200,
      sorter: (a, b) => a.ticketNo.toString().localeCompare(b.ticketNo.toString()),
    },
    {
      title: "Sender",
      dataIndex: "sender",
      width: 200,
      sorter: (a, b) => a.sender.localeCompare(b.sender),
    },
    {
      title: "Assignee",
      dataIndex: "assignee",
      width: 200,
      sorter: (a, b) => a.assignee.localeCompare(b.assignee),
    },
    {
      title: "Reported Date Time",
      render: (record) =>
        record.reportedDateTime
          ? moment(record.reportedDateTime).format("YYYY-MM-DD h:mm:ss a")
          : "",
      width: 180,
      sorter: (a, b) =>
        new Date(a.reportedDateTime) - new Date(b.reportedDateTime),
    },
    {
      title: "Emergency Level",
      render: (record) => record?.emergencyLevel,
      width: 200,
      sorter: (a, b) => a.emergencyLevel.localeCompare(b.emergencyLevel),
    },
    {
      title: "Location",
      render: (record) => record?.location,
      width: 200,
      sorter: (a, b) => a.location.localeCompare(b.location),
    },
    {
      title: "Branch or Division",
      render: (record) => record?.branchOrDivision,
      width: 200,
      sorter: (a, b) => a.branchOrDivision.localeCompare(b.branchOrDivision),
    },
    {
      title: "Issue Type",
      render: (record) => record?.issueType,
      width: 200,
      sorter: (a, b) => a.issueType.localeCompare(b.issueType),
    },
    {
      title: "Issue Category",
      render: (record) => record?.issueCategory,
      width: 200,
      sorter: (a, b) => a.issueCategory.localeCompare(b.issueCategory),
    },
    {
      title: "Contact No",
      render: (record) => record?.contactNo,
      width: 200,
      sorter: (a, b) => a.contactNo.localeCompare(b.contactNo),
    },
    {
      title: "Serial No",
      render: (record) => record?.serialNo,
      width: 200,
      sorter: (a, b) => a.serialNo.localeCompare(b.serialNo),
    },
    {
      title: "Is Working PC",
      render: (record) => record?.isWorkingPc,
      width: 200,
      sorter: (a, b) => a.isWorkingPc.localeCompare(b.isWorkingPc),
    },
    {
      title: "IP",
      render: (record) => record?.ip,
      width: 200,
      sorter: (a, b) => a.ip.localeCompare(b.ip),
    },
    {
      title: "Issue Description & Remarks",
      render: (record) => record?.issueDesAndRemarks,
      width: 200,
      sorter: (a, b) => a.issueDesAndRemarks.localeCompare(b.issueDesAndRemarks),
    },
    {
      title: "Agent Response Date-Time",
      render: (record) => record?.agentResponseDateTime,
      width: 200,
      sorter: (a, b) =>
        new Date(a.agentResponseDateTime) - new Date(b.agentResponseDateTime),
    },
    {
      title: "Resolved Date Time",
      render: (record) => record?.resolvedDateTime,
      width: 200,
      sorter: (a, b) =>
        new Date(a.resolvedDateTime) - new Date(b.resolvedDateTime),
    },
    {
      title: "Resolution Period",
      render: (record) => record?.resolutionPeriod,
      width: 200,
      sorter: (a, b) => a.resolutionPeriod - b.resolutionPeriod,
    },
    {
      title: "Agent Comments",
      render: (record) => record?.agentComments,
      width: 200,
      sorter: (a, b) => a.agentComments.localeCompare(b.agentComments),
    },
    {
      title: "Last Updated User",
      render: (record) => record?.lastUpdatedUser,
      width: 200,
      sorter: (a, b) => a.lastUpdatedUser.localeCompare(b.lastUpdatedUser),
    },
    {
      title: "Last Updated Date-Time",
      render: (record) =>
        record.lastUpdatedDateTime
          ? moment(record.lastUpdatedDateTime).format("YYYY-MM-DD h:mm:ss a")
          : "",
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
      width: 75,
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
                navigate(`/viewTicket/${record.ticketNo}`);
              }}
            />
          </Tooltip>
          &nbsp;&nbsp;
          <Tooltip placement="bottom" title="Edit">
            <Button
              className="edit_button"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => {
                navigate(`/updateTicket/${record.ticketNo}`);
              }}
            />
          </Tooltip>
          &nbsp;&nbsp;
          <Tooltip placement="bottom" title="Close">
            <Button
              className="delete_button"
              shape="circle"
              icon={<CloseOutlined />}
              onClick={() => statusChange(record.ticketNo, "Closed")}
            />
          </Tooltip>
          &nbsp;&nbsp;
          <Tooltip placement="bottom" title="Delete">
            <Button
              className="delete_button"
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => deleteContent(record.ticketNo)}
            />
          </Tooltip>
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
