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
import useAllIssueCategories from "../../hooks/useAllIssueCategories.js";
import { useStore } from "../../store";
import axios from "axios";
import { useDebouncedResizeObserver } from '../../hooks/useDebouncedResizeObserver';

const { confirm } = Modal;
const { Search } = Input;

function IssueCategoryDataTable() {
  const { refreshTable, setRefreshTable } = useRefreshTable();
  const navigate = useNavigate();
  const [filterData, setFilterData] = useState({
    page: 1,
    pageSize: 10,
  });

  const [searchQuery, setSearchQuery] = useState("");
  const issueCategories = useAllIssueCategories();
  const [filteredTickets, setFilteredTickets] = useState(issueCategories);  
  const { actionPrivileges } = useStore();

  useEffect(() => {
    setFilteredTickets(
      issueCategories.filter(issueCategory =>
        Object.values(issueCategory).some(value =>
          value ? value.toString().toLowerCase().includes(searchQuery.toLowerCase()) : false
        )
      )
    );
  }, [searchQuery, issueCategories]);

  useDebouncedResizeObserver(() => {
    console.log("ResizeObserver triggered");
  });

  const columns = [
    {
      title: "Issue Category ID",
      dataIndex: "issueCategoryId",
      width: 200,
      sorter: (a, b) => a.issueCategoryId.localeCompare(b.issueCategoryId),
    },
    {
      title: "Issue Category Description",
      dataIndex: "issueCategoryDes",
      width: 200,
      sorter: (a, b) => a.issueCategoryDes.localeCompare(b.issueCategoryDes),
    },
    ,
    {
      title: "Issue Type",
      dataIndex: "issueType",
      width: 200,
      sorter: (a, b) => a.issueType.localeCompare(b.issueType),
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
          {actionPrivileges.includes("VIEW_ISSUE_CATEGORY") && (
            <Tooltip placement="bottom" title="View">
              <Button
                className="view_button"
                shape="circle"
                icon={<EyeOutlined />}
                onClick={() => {
                  navigate(`/viewIssueCategory/${record.issueCategoryId}`);
                }}
              />
            </Tooltip>
          )}
          &nbsp;&nbsp;
          {actionPrivileges.includes("UPDATE_ISSUE_CATEGORY") && (
          <Tooltip placement="bottom" title="Edit">
            <Button
              className="edit_button"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => {
                navigate(`/updateIssueCategory/${record.issueCategoryId}`);
              }}
            />
          </Tooltip>
          )}
          &nbsp;&nbsp;
          {actionPrivileges.includes("DELETE_ISSUE_CATEGORY") && (
          <Tooltip placement="bottom" title="Delete">
            <Button
              className="delete_button"
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => deleteContent(record.issueCategoryId)}
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
      content: `Do you want to delete this isuue category?`,
      okText: "Yes",
      okType: "primary",
      cancelText: "No",
      onOk() {
        Progress.show();
        axios
          .put(`${apis.DELETE_ISSUE_CATEGORY}/${id}`)
          .then((result) => {
            let responseJson = result;
            setRefreshTable(!refreshTable);
            setFilteredTickets(filteredTickets.filter(user => user.issueCategoryId !== id));
            Progress.hide();
            message.success("Issue category deleted successfully");
          })
          .catch((error) => {
            message.error(error.response?.data?.message || "Failed to delete issue category!");
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
        placeholder="Search Issue Categories"
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

export default IssueCategoryDataTable;