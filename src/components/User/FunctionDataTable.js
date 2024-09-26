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
import useAllUserFunctions from "../../hooks/useAllUserFunctions.js"; 
import { useStore } from "../../store";
import axios from "axios";
import { useDebouncedResizeObserver } from '../../hooks/useDebouncedResizeObserver'; 

const { confirm } = Modal;
const { Search } = Input;

function FunctionDataTable() {
  const { refreshTable, setRefreshTable } = useRefreshTable();
  const navigate = useNavigate();
  const [filterData, setFilterData] = useState({
    page: 1,
    pageSize: 10,
  });

  const [searchQuery, setSearchQuery] = useState("");
  const userFunctions = useAllUserFunctions();
  const [filteredTickets, setFilteredTickets] = useState(userFunctions);
  const { actionPrivileges } = useStore();

  useEffect(() => {

    setFilteredTickets(
      userFunctions?.filter(userFunction =>
        Object.values(userFunction).some(value =>
          value ? value.toString().toLowerCase().includes(searchQuery.toLowerCase()) : false
        )
      )
    );
  }, [searchQuery, userFunctions]);

  useDebouncedResizeObserver(() => {
    console.log("ResizeObserver triggered");
  });

    const columns = [
    {
      title: "Function ID",
      dataIndex: "userFunctionId",
      width: 200,
      sorter: (a, b) => a.userFunctionId.localeCompare(b.userFunctionId),
    },
    {
      title: "Function Description",
      dataIndex: "userFunctionDes",
      width: 200,
      sorter: (a, b) => a.userFunctionDes.localeCompare(b.userFunctionDes),
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
        {actionPrivileges.includes("VIEW_FUNCTION") && (
          <Tooltip placement="bottom" title="View">
            <Button
              className="view_button"
              shape="circle"
              icon={<EyeOutlined />}
              onClick={() => {
                navigate(`/viewFunction/${record.userFunctionId}`);
              }}
            />
          </Tooltip>
        )}
          &nbsp;&nbsp;
          {actionPrivileges.includes("UPDATE_FUNCTION") && (
          <Tooltip placement="bottom" title="Edit">
            <Button
              className="edit_button"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => {
                navigate(`/updateFunction/${record.userFunctionId}`);
              }}
            />
          </Tooltip>
          )}
          &nbsp;&nbsp;
          {actionPrivileges.includes("DELETE_FUNCTION") && (
          <Tooltip placement="bottom" title="Delete">
            <Button
              className="delete_button"
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => deleteContent(record.userFunctionId)}
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
      content: `Do you want to delete this function?`,
      okText: "Yes",
      okType: "primary",
      cancelText: "No",
      onOk() {
        Progress.show();
        axios
          .put(`${apis.FUNCTION_DATA}/${id}`)
          .then((result) => {
            let responseJson = result;
            setRefreshTable(!refreshTable);            
            setFilteredTickets(filteredTickets.filter(user => user.userFunctionId !== id));
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

export default FunctionDataTable;
