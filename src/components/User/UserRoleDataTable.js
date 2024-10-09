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
import useAllUserRoles from "../../hooks/useAllUserRoles.js"; 
import { useStore } from "../../store";
import axios from "axios";
import { useDebouncedResizeObserver } from '../../hooks/useDebouncedResizeObserver'; 

const { confirm } = Modal;
const { Search } = Input;

function UserRoleDataTable() {
  const { refreshTable, setRefreshTable } = useRefreshTable();
  const navigate = useNavigate();
  const [filterData, setFilterData] = useState({
    page: 1,
    pageSize: 10,
  });

  const [searchQuery, setSearchQuery] = useState("");
  const userRoles = useAllUserRoles();
  const [filteredTickets, setFilteredTickets] = useState(userRoles);
  const { actionPrivileges } = useStore();

  useEffect(() => {
    setFilteredTickets(
      userRoles.filter(userRole =>
        Object.values(userRole).some(value =>
          value ? value.toString().toLowerCase().includes(searchQuery.toLowerCase()) : false
        )
      )
    );
  }, [searchQuery, userRoles]);

  useDebouncedResizeObserver(() => {
    console.log("ResizeObserver triggered");
  });

    const columns = [
    {
      title: "User Role ID",
      dataIndex: "userRoleId",
      width: 200,
      sorter: (a, b) => a.username.localeCompare(b.username),
    },
    {
      title: "User Role Description",
      dataIndex: "userRoleDes",
      width: 200,
      sorter: (a, b) => a.displayName.localeCompare(b.displayName),
    },
    {
      title: "Created User",
      render: (record) => record?.createdUser,
      width: 200,
      sorter: (a, b) => a.createdUser.localeCompare(b.createdUser),
    },
    {
      title: "Created Date-Time",
      render: (record) =>
        record.createdDateTime
          ? moment(record.createdDateTime).format("YYYY-MM-DD h:mm:ss a")
          : "",
      width: 200,
      sorter: (a, b) =>
        new Date(a.createdDateTime) - new Date(b.createdDateTime),
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
        {actionPrivileges.includes("VIEW_USER_ROLE") && (
          <Tooltip placement="bottom" title="View">
            <Button
              className="view_button"
              shape="circle"
              icon={<EyeOutlined />}
              onClick={() => {
                navigate(`/viewUserRole/${record.userRoleId}`);
              }}
            />
          </Tooltip>
        )}
          &nbsp;&nbsp;
          {actionPrivileges.includes("UPDATE_USER_ROLE") && (
          <Tooltip placement="bottom" title="Edit">
            <Button
              className="edit_button"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => {
                navigate(`/updateUserRole/${record.userRoleId}`);
              }}
            />
          </Tooltip>
          )}
          &nbsp;&nbsp;
          {actionPrivileges.includes("DELETE_USER_ROLE") && (
          <Tooltip placement="bottom" title="Delete">
            <Button
              className="delete_button"
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => deleteContent(record.userRoleId)}
            />
          </Tooltip>
          )}
        </>
      ),
      fixed: "right",
      width: 150,
      align: "right",
    },
  ];

  const deleteContent = (id) => {
    confirm({
      title: `Are you sure?`,
      icon: <ExclamationCircleOutlined />,
      content: `Do you want to delete this user role?`,
      okText: "Yes",
      okType: "primary",
      cancelText: "No",
      onOk() {
        Progress.show();
        axios
          .put(`${apis.DELETE_USER_ROLE}/${id}`)
          .then((result) => {
            let responseJson = result;
            setRefreshTable(!refreshTable);            
            setFilteredTickets(filteredTickets.filter(user => user.userRoleId !== id));
            Progress.hide();
            message.success("User role deleted successfully");
          })
          .catch((error) => {
            message.error(error.response?.data?.message || "Failed to delete user role!");
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
        placeholder="Search User Roles"
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: 16, width: 300 }}
      />
      <Table
        scroll={filteredTickets.length > 0 ? { x: 1800 } : undefined}
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

export default UserRoleDataTable;
