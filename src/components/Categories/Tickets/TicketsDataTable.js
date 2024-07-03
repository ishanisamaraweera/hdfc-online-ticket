// import {
//   CheckOutlined,
//   CloseOutlined,
//   DeleteOutlined,
//   EditOutlined,
//   ExclamationCircleOutlined,
// } from "@ant-design/icons";
// import { Button, Modal, Table, Tag, Tooltip, message } from "antd";
// import moment from "moment";
// import React, { useState } from "react";
// import Progress from "react-progress-2";
// import useAllGemShapes from "../../../hooks/useAllGemShapes";
// import { IMAGE_PATH, apis } from "../../../properties";
// import { useRefreshTable } from "../../../store";
// import axiosInstance from "../../../util/axiosInstance";
// import AddItemModel from "./AddItemModel";

// const { confirm } = Modal;

// function TicketsDataTable() {
//   const setRefreshTable = useRefreshTable((state) => state.setRefreshTable);
//   const refreshTable = useRefreshTable((state) => state.refreshTable);
//   const [visible, setVisible] = useState(false);
//   const [id, setId] = useState();
//   const [filterData, setFilterData] = useState({
//     page: 1,
//     pageSize: 10,
//   });

//   const allGemShapes = useAllGemShapes(filterData);

//   const columns = [
//     {
//       title: "Imagesss",
//       render: (record) => (
//         <img
//           src={IMAGE_PATH + "/" + record.image_path}
//           alt="Gemstone Shape"
//           style={{ width: "30px", height: "30px", borderRadius: "50%" }}
//         />
//       ),
//       width: 50,
//     },
//     {
//       title: "Name",
//       dataIndex: "name",
//       width: 200,
//     },
//     {
//       title: "Created Date",
//       render: (record) =>
//         record.created_at
//           ? moment(record.created_at).format("YYYY-MM-DD h:mm:ss a")
//           : "",
//       width: 180,
//     },
//     {
//       title: "Status",
//       render: (record) => (
//         <Tag
//           className="tags"
//           color={record.status === "ACTIVE" ? "#0d8c63" : "#c73b27"}
//         >
//           {record.status}
//         </Tag>
//       ),
//       fixed: "right",
//       width: 50,
//     },
//     {
//       title: "Action",
//       render: (text, record) => (
//         <>
//           <Tooltip placement="bottom" title="Edit">
//             <Button
//               className="edit_button"
//               shape="circle"
//               icon={<EditOutlined />}
//               onClick={() => {
//                 setVisible(true);
//                 setId(record.id);
//               }}
//             />
//           </Tooltip>
//           &nbsp;&nbsp;
//           {record.status === "ACTIVE" ? (
//             <Tooltip placement="bottom" title="Deactivate">
//               <Button
//                 className="delete_button"
//                 shape="circle"
//                 icon={<CloseOutlined />}
//                 onClick={() => statusChange(record.id, "INACTIVE")}
//               />
//             </Tooltip>
//           ) : (
//             <Tooltip placement="bottom" title="Activate">
//               <Button
//                 className="view_button"
//                 shape="circle"
//                 icon={<CheckOutlined />}
//                 onClick={() => statusChange(record.id, "ACTIVE")}
//               />
//             </Tooltip>
//           )}
//           &nbsp;&nbsp;
//           <Tooltip placement="bottom" title="Delete">
//             <Button
//               className="delete_button"
//               shape="circle"
//               icon={<DeleteOutlined />}
//               onClick={() => deleteNewsContent(record.id)}
//             />
//           </Tooltip>
//         </>
//       ),
//       fixed: "right",
//       width: 100,
//       align: "right",
//     },
//   ];

//   const statusChange = (id, type) => {
//     confirm({
//       title: `Are you sure?`,
//       icon: <ExclamationCircleOutlined />,
//       content: `Do  you want to ${type} this?`,
//       okText: "Yes",
//       okType: "primary",
//       cancelText: "No",
//       onOk() {
//         Progress.show();
//         axiosInstance
//           .put(`${apis.GEMSTONE_SHAPE}/${id}`, {
//             status: type,
//           })
//           .then((result) => {
//             let responseJson = result;
//             setRefreshTable(!refreshTable);
//             message.success(responseJson.data.message);
//             Progress.hide();
//           })
//           .catch((error) => {
//             message.error(error.response.data.message);
//             Progress.hide();
//           });
//       },
//       onCancel() {
//         console.log("Cancel");
//       },
//     });
//   };

//   const deleteNewsContent = (id) => {
//     confirm({
//       title: `Are you sure?`,
//       icon: <ExclamationCircleOutlined />,
//       content: `Do  you want to delete this?`,
//       okText: "Yes",
//       okType: "primary",
//       cancelText: "No",
//       onOk() {
//         Progress.show();
//         axiosInstance
//           .delete(`${apis.GEMSTONE_SHAPE}/${id}`)
//           .then((result) => {
//             let responseJson = result;
//             setRefreshTable(!refreshTable);
//             Progress.hide();
//             message.success(responseJson.data.message);
//           })
//           .catch((error) => {
//             message.error(error.response.data.message);
//             Progress.hide();
//           });
//       },
//       onCancel() {
//         console.log("Cancel");
//       },
//     });
//   };

//   return (
//     <>
//       <Table
//         scroll={{ x: 1000 }}
//         columns={columns}
//         dataSource={allGemShapes.data}
//         bordered
//         pagination={{
//           current: filterData.current_page,
//           pageSize: filterData.pageSize,
//           total: allGemShapes.total,
//           onChange: (page, pageSize) => {
//             setFilterData({
//               ...filterData,
//               page: page,
//               pageSize: pageSize,
//             });
//           },
//           showSizeChanger: true,
//           showTotal: (total) => `Total ${total} items`,
//         }}
//       />
//       {visible && (
//         <AddItemModel
//           visible={visible}
//           setVisible={() => {
//             setVisible(!visible);
//           }}
//           type="EDIT"
//           id={id}
//         />
//       )}
//     </>
//   );
// }

// export default TicketsDataTable;
