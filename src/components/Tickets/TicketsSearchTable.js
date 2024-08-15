import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Form, Modal, Table, Tag, Button, message, Input, Select } from "antd";
import moment from "moment";
import React, { useState, useEffect } from "react";
import Progress from "react-progress-2";
import { useNavigate } from "react-router-dom";
import { apis } from "../../properties";
import { useRefreshTable } from "../../store";
import useAllTickets from "../../hooks/useAllTickets";
import axios from "axios";
import { useDebouncedResizeObserver } from '../../hooks/useDebouncedResizeObserver'; // Adjust the path accordingly

const { Option } = Select;
const { confirm } = Modal;
const { Search } = Input;


function TicketsSearchTable() {
  const { refreshTable, setRefreshTable } = useRefreshTable();
  const navigate = useNavigate();
  const [filterData, setFilterData] = useState({
    page: 1,
    pageSize: 10,
  });

  const tickets = useAllTickets();
  const [filteredTickets, setFilteredTickets] = useState(tickets);
  const [statuses, setStatuses] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(null);

  useEffect(() => {
    fetchStatuses('TICKET');
  }, []);

  const fetchStatuses = async (module) => {
    try {
      const response = await axios.get(`http://localhost:8080/getStatuses/${module}`);
      setStatuses(response.data);
    } catch (error) {
      message.error("Failed to load statuses");
    }
  };

  const handleStatusChange = (value) => {
    setSelectedStatus(value);
    localStorage.setItem("statusVal", selectedStatus);
  };

  const handleSubmitStatus = async () => { 
    if (selectedStatus) {
      try {
        localStorage.setItem("statusVal", selectedStatus);
        const response = await axios.get(`http://localhost:8080/searchTickets/${selectedStatus}`);
        setFilteredTickets(response.data);
        setRefreshTable(!refreshTable);
      } catch (error) {
        message.error("Failed to update status");
      }
    } else {
      localStorage.setItem("statusVal", selectedStatus);
        const response = await axios.get(`http://localhost:8080/searchTickets`);
        setFilteredTickets(response.data);
        setRefreshTable(!refreshTable);
    }
  };

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
      title: "Assignee",
      dataIndex: "assignee",
      width: 200,
      sorter: (a, b) => (a.assignee && b.assignee ? a.assignee.localeCompare(b.assignee) : 0),
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
      render: (record) => record?.branchDivision,
      width: 200,
      sorter: (a, b) => a.branchDivision.localeCompare(b.branchDivision),
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
      sorter: (a, b) => (a.serialNo && b.serialNo ? a.serialNo.localeCompare(b.serialNo) : 0),
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
      title: "Assignee Response Date-Time",
      render: (record) => record?.assigneeResponseDateTime,
      width: 200,
      sorter: (a, b) =>
        (a.assigneeResponseDateTime && b.assigneeResponseDateTime ? new Date(a.assigneeResponseDateTime) - new Date(b.assigneeResponseDateTime) : 0),
    },
    {
      title: "Resolved Date Time",
      render: (record) => record?.resolvedDateTime,
      width: 200,
      sorter: (a, b) =>
        (a.resolvedDateTime && b.resolvedDateTime ? new Date(a.resolvedDateTime) - new Date(b.resolvedDateTime) : 0),
    },
    {
      title: "Resolution Period",
      render: (record) => record?.resolutionPeriod,
      width: 200,
      sorter: (a, b) => (a.resolutionPeriod && b.resolutionPeriod ? a.resolutionPeriod - b.resolutionPeriod : 0),
    },
    {
      title: "Assignee Comments",
      render: (record) => record?.assigneeComments,
      width: 200,
      sorter: (a, b) => (a.assigneeComments && b.assigneeComments ? a.assigneeComments.localeCompare(b.assigneeComments) : 0),
    },
    {
      title: "Last Updated User",
      render: (record) => record?.lastUpdatedUser,
      width: 200,
      sorter: (a, b) => (a.lastUpdatedUser && b.lastUpdatedUser ? a.lastUpdatedUser.localeCompare(b.lastUpdatedUser) : 0),
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
  ];

  return (
    <>
      <Form>
        <Form.Item
          label="Status"
          name="status"
        >
          <Select allowClear placeholder="Select Status" size="small"  style={{ width: '150px', marginRight: '10px' }} onChange={handleStatusChange}>
            {statuses.map(status => (
              <Option key={status.statusId} value={status.statusId}>
                {status.statusDes}
              </Option>
            ))}
          </Select>

          <Button type="submit" onClick={handleSubmitStatus} className="primary__btn">
            Search
          </Button>
        </Form.Item>
      </Form>
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

export default TicketsSearchTable;