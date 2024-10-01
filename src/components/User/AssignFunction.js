import { LeftOutlined } from "@ant-design/icons";
import { Button, Col, Form, message, Row, Select, Transfer } from "antd";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useBreadCrumb from "../../hooks/useBreadCrumb";
import axios from "axios";
import { useStore } from "../../store";
import { apis } from "../../properties";

const { Option } = Select;

function AssignFunction() {
    const [form] = Form.useForm();
    const location = useLocation();
    const navigate = useNavigate();
    const [desData, setDesData] = useState("");
    const [userRoles, setUserRoles] = useState([]);
    const [targetKeys, setTargetKeys] = useState([]);
    const [functions, setFunctions] = useState([]);
    const { actionPrivileges } = useStore();

    useEffect(() => {
        fetchUserRoles();
        fetchFunctions();
    }, []);

    const fetchUserRoles = async () => {
        try {
            const response = await axios.get(`${apis.GET_USER_ROLES}`);
            setUserRoles(response.data.map(role => ({ key: role.userRoleId, title: role.userRoleDes })));
        } catch (error) {
            message.error("Failed to load user roles");
        }
    };

    const fetchFunctions = async () => {
        try {
            const response = await axios.get(`${apis.GET_FUNCTIONS}`);
            setFunctions(response.data.map(functions => ({ key: functions.userFunctionId, title: functions.userFunctionDes })));
        } catch (error) {
            message.error("Failed to load user functions");
        }
    };

    const fetchUserRoleFunctions = async (userRoleId) => {
        try {
            const response = await axios.get(`${apis.GET_USER_ROLE_FUNCTIONS}/${userRoleId}`);
            setTargetKeys(response.data.map(func => func.functionId));
        } catch (error) {
            message.error("Failed to load user role functions");
        }
    };

    const handleRoleChange = (value) => {
        form.setFieldsValue({ userRole: value });
        fetchUserRoleFunctions(value);
    };

    const handleChange = (nextTargetKeys) => {
        setTargetKeys(nextTargetKeys);
    };

    useBreadCrumb("Assign Functions", "Assign Functions");

    const onFinishFailed = () => {
        message.error("Please fill all the details");
    };

    const submitForm = () => {
        form.validateFields().then((values) => {
            const data = {
                ...values,
                functions: targetKeys
            };

            console.log("***************" + JSON.stringify(values))

            axios.post(`${apis.ASSIGN_FUNCTION}`, data)
                .then((result) => {
                    form.resetFields();
                    message.success("User functions assigned successfully for user role: " + data.userRole);
                    navigate('/dashboard');
                })
                .catch((error) => {
                    message.error(error.response?.data?.message || "Failed to assigned function");
                });
        }).catch(() => {
            message.error("Validation failed, please check the fields and try again.");
        });
    };

    return (
        <div className="dashboard">
            <div className="section_row">
                <div className="com_head">
                    <LeftOutlined onClick={() => navigate(-1)} />
                    <p className="common_header">Assign Functions</p>
                </div>

                <Form
                    autoComplete="on"
                    form={form}
                    onFinish={submitForm}
                    onFinishFailed={onFinishFailed}
                    initialValues={{ remember: true }}
                    layout="vertical"
                >
                    <Row gutter={24}>
                        <Col span={12}>

                            <Form.Item
                                label="User Role"
                                name="userRole"
                                rules={[
                                    {
                                        required: true,
                                        message: "User Role cannot be empty!",
                                    },
                                ]}
                            >
                                <Select allowClear placeholder="Select User Role" size="large" onChange={handleRoleChange}>
                                    {userRoles.map(userRole => (
                                        <Option key={userRole.key} value={userRole.key}>
                                            {userRole.title}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <Form.Item
                                name="functions"
                                label="Functions"
                                rules={[{ required: true, message: 'Please select at least one function!' }]}
                            >
                                <Transfer
                                    dataSource={functions}
                                    showSearch
                                    listStyle={{
                                        width: 250,
                                        height: 300,
                                    }}
                                    targetKeys={targetKeys}
                                    onChange={handleChange}
                                    render={item => item.title}
                                    titles={['Available Functions', 'Selected Functions']}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <div className="left_btn" style={{ display: 'flex', gap: '10px' }}>
                        {actionPrivileges.includes("ASSIGN_FUNCTION") && (
                            <Button type="primary" className="primary__btn" htmlType="submit">
                                Save
                            </Button>
                        )}

                        <Button type="secondary" className="secondary__btn" htmlType="back">
                            <a href={apis.DASHBOARD} style={{ color: 'black', textDecoration: 'none' }}>
                                Back
                            </a>
                        </Button>
                    </div>

                </Form>
            </div>
        </div>
    );
}

export default AssignFunction;