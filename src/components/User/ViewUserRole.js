import { LeftOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, message, Row, Select } from "antd";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useBreadCrumb from "../../hooks/useBreadCrumb";
import axios from "axios";

const { Option } = Select;

function ViewUserRole() {
    const [form] = Form.useForm();
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();
    const [desData, setDesData] = useState();
    const [statuses, setStatuses] = useState([]);
    const [users, setUsers] = useState([]);
    const [targetKeys, setTargetKeys] = useState([]);

    useBreadCrumb("View User Role", location.pathname, "", "add");

    useEffect(() => {
        const fetchData = async () => {
            await Promise.all([fetchUsers(), fetchStatuses()]);
            fetchUserRoleDetails();
        };
        fetchData();
    }, [id]);

    const handleChange = (nextTargetKeys) => {
        setTargetKeys(nextTargetKeys);
    };

    const fetchUserRolesForUser = async (username) => {
        try {
            const response = await axios.get(`http://localhost:8080/getUserRolesForUsername/${username}`);
            setTargetKeys(response.data);
        } catch (error) {
            message.error("Failed to load user roles for user");
        }
    };

    const fetchStatuses = async () => {
        try {
            const response = await axios.get('http://localhost:8080/getStatuses');
            setStatuses(response.data);
        } catch (error) {
            console.error('Error fetching statuses:', error);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/getAllUserDetails');            
            console.log("*****//\\**** User Details: " + JSON.stringify(response.data));
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const fetchUserRoleDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/getUserDetailsByUserRole/${id}`);
            const userRole = response.data;
            if (userRole) {
                const lastUpdatedUser = users.find(user => user.username === userRole.lastUpdatedUser);
                const createdUser = users.find(user => user.username === userRole.createdUser);
                form.setFieldsValue({
                    userRoleId: userRole.userRoleId,
                    userRoleDes: userRole.userRoleDes,
                    createdUser: userRole.createdUser,
                    createdUser: createdUser ? createdUser.displayName : userRole.createdUser,
                    createdDateTime: userRole.createdDateTime,
                    lastUpdatedUser: lastUpdatedUser ? lastUpdatedUser.displayName : userRole.lastUpdatedUser,
                    lastUpdatedDateTime: userRole.lastUpdatedDateTime,
                    status: userRole.status,
                });
            } else {
                message.error("No user role details found.!");
            }
        } catch (error) {
            message.error("Failed to load user role details");
        }
    };

    const onFinishFailed = () => {
        message.error("Please fill all the details");
    };

    const submitForm = () => {
        form.validateFields().then((values) => {
            const data = {
                ...values,
                description: desData,
                currency: "USD",
            };
            axios.put("http://localhost:8080/updateTicket", data)
                .then((result) => {
                    console.log(result.data);
                    setDesData("");
                    form.resetFields();
                    message.success(result.data.message);
                })
                .catch((error) => {
                    message.error(error.response.data.message);
                });
        });
    };

    return (
        <div className="dashboard">
            <div className="section_row">
                <div className="com_head">
                    <LeftOutlined onClick={() => navigate(-1)} />
                    <p className="common_header">View User Role</p>
                </div>

                <Form
                    autoComplete="off"
                    form={form}
                    onFinish={submitForm}
                    onFinishFailed={onFinishFailed}
                    initialValues={{ remember: true }}
                    layout="vertical"
                >
                    <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item
                                label="User Role ID"
                                name="userRoleId"
                                rules={[
                                    {
                                        required: true,
                                        message: "User role ID cannot be empty!",
                                    },
                                ]}
                            >
                                <Input type="text" size="large" placeholder="User Role ID" readOnly />
                            </Form.Item>
                            <Form.Item
                                label="User Role Description"
                                name="userRoleDes"
                                rules={[
                                    {
                                        required: true,
                                        message: "User role description cannot be empty!",
                                    },
                                ]}
                            >
                                <Input type="text" size="large" placeholder="User Role Description" readOnly />
                            </Form.Item>

                            <Form.Item
                                label="Created User"
                                name="createdUser"
                                rules={[
                                    {
                                        required: true,
                                        message: "Created user cannot be empty!",
                                    },
                                ]}
                            >
                                <Select allowClear placeholder="Select User" size="large" disabled >
                                    {users.map(user => (
                                        <Option key={user.username} value={user.username}>
                                            {user.displayName}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <Form.Item
                                label="Created Date-Time"
                                name="createdDateTime"
                                rules={[
                                    {
                                        required: true,
                                        message: "Created date-time cannot be empty!",
                                    },
                                ]}
                            >
                                <Input type="text" size="large" placeholder="Created Date-Time" readOnly />
                            </Form.Item>
                        </Col>
                        <Col span={12}>

                            <Form.Item
                                label="Last Updated User"
                                name="lastUpdatedUser"
                                rules={[
                                    {
                                        required: true,
                                        message: "Last updated user cannot be empty!",
                                    },
                                ]}
                            >
                                <Select allowClear placeholder="Select User" size="large" disabled >
                                    {users.map(user => (
                                        <Option key={user.username} value={user.username}>
                                            {user.displayName}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <Form.Item
                                label="Last Updated Date-Time"
                                name="lastUpdatedDateTime"
                                rules={[
                                    {
                                        required: true,
                                        message: "Last updated date-time cannot be empty!",
                                    },
                                ]}
                            >
                                <Input type="text" size="large" placeholder="Last Updated Date-Time" readOnly />
                            </Form.Item>

                            <Form.Item
                                label="Status"
                                name="status" readOnly
                                rules={[
                                    {
                                        required: true,
                                        message: "Status cannot be empty!",
                                    },
                                ]}
                            >
                                <Select allowClear placeholder="Select Status" size="large" disabled >
                                    {statuses.map(status => (
                                        <Option key={status.statusId} value={status.statusId}>
                                            {status.statusDes}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <div className="left_btn" style={{ display: 'flex', gap: '10px' }}>
                        <Button type="secondary" className="secondary__btn" htmlType="back">
                            <a href='http://localhost:3000/user/user-role' style={{ color: 'black', textDecoration: 'none' }}>
                                Back
                            </a>
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default ViewUserRole;