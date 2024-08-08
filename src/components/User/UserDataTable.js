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
import useAllUsers from "../../hooks/useAllUsers"; 

import axios from "axios";
import { useDebouncedResizeObserver } from '../../hooks/useDebouncedResizeObserver'; 

const { confirm } = Modal;
const { Search } = Input;

function UserDataTable() {
  const { refreshTable, setRefreshTable } = useRefreshTable();
  const navigate = useNavigate();
  const [filterData, setFilterData] = useState({
    page: 1,
    pageSize: 10,
  });

  const [searchQuery, setSearchQuery] = useState("");
  const users = useAllUsers();
  const [filteredTickets, setFilteredTickets] = useState(users);

  useEffect(() => {
    setFilteredTickets(
      users.filter(user =>
        Object.values(user).some(value =>
          value ? value.toString().toLowerCase().includes(searchQuery.toLowerCase()) : false
        )
      )
    );
  }, [searchQuery, users]);

  useDebouncedResizeObserver(() => {
    console.log("ResizeObserver triggered");
  });

    const columns = [
    {
      title: "Username",
      dataIndex: "username",
      width: 200,
      sorter: (a, b) => a.username.localeCompare(b.username),
    },
    {
      title: "Name",
      dataIndex: "displayName",
      width: 200,
      sorter: (a, b) => a.displayName.localeCompare(b.displayName),
    },
    {
      title: "EPF",
      render: (record) => record?.epf,
      width: 200,
      sorter: (a, b) => a.epf.localeCompare(b.epf),
    },
    {
      title: "Designation",
      dataIndex: "designation",
      width: 200,
      sorter: (a, b) => (a.designation && b.designation ? a.designation.localeCompare(b.designation) :0),
    },
    {
      title: "Date of Birth",
      render: (record) =>
        record.dob
          ? moment(record.dob).format("YYYY-MM-DD")
          : "",
      width: 180,
      sorter: (a, b) =>
        new Date(a.dob) - new Date(b.dob),
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
      title: "Added By",
      render: (record) => record?.addedBy,
      width: 200,
      sorter: (a, b) => a.addedBy.localeCompare(b.addedBy),
    },
    {
      title: "Added Date-Time",
      render: (record) =>
        record.addedDateTime
          ? moment(record.addedDateTime).format("YYYY-MM-DD h:mm:ss a")
          : "",
      width: 200,
      sorter: (a, b) =>
        new Date(a.addedDateTime) - new Date(b.addedDateTime),
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
          color={record.status === "Deactive" ? "#c73b27" : "#0d8c63"}
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
                navigate(`/viewUser/${record.username}`);
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
                navigate(`/updateUser/${record.username}`);
              }}
            />
          </Tooltip>
          &nbsp;&nbsp;
          <Tooltip placement="bottom" title="Delete">
            <Button
              className="delete_button"
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => deleteContent(record.username)}
            />
          </Tooltip>
        </>
      ),
      fixed: "right",
      width: 150,
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
      content: `Do you want to delete this user?`,
      okText: "Yes",
      okType: "primary",
      cancelText: "No",
      onOk() {
        Progress.show();
        axios
          .put(`http://localhost:8080/deleteUser/${id}`)
          .then((result) => {
            let responseJson = result;
            setRefreshTable(!refreshTable);
            Progress.hide();
            message.success("User deleted successfully");
          })
          .catch((error) => {
            message.error(error.response?.data?.message || "Failed to delete user!");
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
        placeholder="Search users"
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

export default UserDataTable;
