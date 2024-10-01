import { LeftOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, message, Row, Select } from "antd";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useBreadCrumb from "../../hooks/useBreadCrumb";
import axios from "axios";
import { apis } from "../../properties";

const { Option } = Select;

function ViewFunction() {
    const [form] = Form.useForm();
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();
    const [desData, setDesData] = useState();
    const [statuses, setStatuses] = useState([]);
    const [users, setUsers] = useState([]);
    const [targetKeys, setTargetKeys] = useState([]);

    useBreadCrumb("View Function", location.pathname, "Function");

    useEffect(() => {
        const fetchData = async () => {
            await Promise.all([fetchUsers(), fetchStatuses()]);
            fetchFunctionDetails();
        };
        fetchData();
    }, [id]);

    const handleChange = (nextTargetKeys) => {
        setTargetKeys(nextTargetKeys);
    };

    const fetchStatuses = async () => {
        try {
            const response = await axios.get(`${apis.GET_STATUSES}/FUNCTION`);
            setStatuses(response.data);
        } catch (error) {
            console.error('Error fetching statuses:', error);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${apis.GET_ALL_USER_DETAILS}`);
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const fetchFunctionDetails = async () => {
        try {
            const response = await axios.get(`${apis.GET_FUNCTION_DETAILS_BY_ID}/${id}`);
            const userFunction = response.data;
            if (userFunction) {
                const lastUpdatedUser = users.find(user => user.username === userFunction.lastUpdatedUser);
                const createdUser = users.find(user => user.username === userFunction.createdUser);
                form.setFieldsValue({
                    userFunctionId: userFunction.userFunctionId,
                    userFunctionDes: userFunction.userFunctionDes,
                    createdUser: createdUser ? createdUser.displayName : userFunction.createdUser,
                    createdDateTime: userFunction.createdDateTime,
                    lastUpdatedUser: lastUpdatedUser ? lastUpdatedUser.displayName : userFunction.lastUpdatedUser,
                    lastUpdatedDateTime: userFunction.lastUpdatedDateTime,
                    status: userFunction.status,
                });
            } else {
                message.error("No user details found.!");
            }
        } catch (error) {
            message.error("Failed to load user details");
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
                lastUpdatedUser: localStorage.getItem("username"),
            };
            axios.put(`${apis.UPDATE_FUNCTION}`, data)
                .then((result) => {
                    setDesData("");
                    form.resetFields();
                    message.success("Function details updated successfully");
                    navigate('/user/function');
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
                                label="Function ID"
                                name="userFunctionId"
                                rules={[
                                    {
                                        required: true,
                                        message: "Function ID cannot be empty!",
                                    },
                                ]}
                            >
                                <Input type="text" size="large" placeholder="User Role ID" readOnly/>
                            </Form.Item>
                            <Form.Item
                                label="Function Description"
                                name="userFunctionDes"
                                rules={[
                                    {
                                        required: true,
                                        message: "User role description cannot be empty!",
                                    },
                                ]}
                            >
                                <Input type="text" size="large" placeholder="User Role Description" />
                            </Form.Item>

                            <Form.Item
                                label="Status"
                                name="status" 
                                rules={[
                                    {
                                        required: true,
                                        message: "Status cannot be empty!",
                                    },
                                ]}
                            >
                                <Select allowClear placeholder="Select Status" size="large" >
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
                        <Button type="primary" className="primary__btn" htmlType="submit">
                            Update
                        </Button>
                        <Button type="secondary" className="secondary__btn" htmlType="back">
                            <a href={apis.FUNCTION} style={{ color: 'black', textDecoration: 'none' }}>
                                Back
                            </a>
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default ViewFunction;