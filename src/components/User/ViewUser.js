import { LeftOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, message, Transfer, Row, Select } from "antd";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useBreadCrumb from "../../hooks/useBreadCrumb";
import axios from "axios";

const { Option } = Select;

function ViewUser() {
    const [form] = Form.useForm();
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();
    const [desData, setDesData] = useState();
    const [statuses, setStatuses] = useState([]);
    const [locations, setLocations] = useState([]);
    const [branchDivisions, setBranchDivisions] = useState([]);
    const [branchDivisionMap, setBranchDivisionMap] = useState({});
    const [targetKeys, setTargetKeys] = useState([]);
    const [userRoles, setUserRoles] = useState([]);

    useBreadCrumb("View User", location.pathname, "", "add");

    useEffect(() => {
        fetchUserDetails();
        fetchStatuses();
        fetchLocations();
        fetchBranchDivisions();
        fetchUserRoles();
    }, [id]);

    const handleChange = (nextTargetKeys) => {
        setTargetKeys(targetKeys);
    };

    const fetchUserRoles = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/getUserRoles`);
            setUserRoles(response.data.map(role => ({ key: role.userRoleId, title: role.userRoleDes })));
        } catch (error) {
            message.error("Failed to load user roles");
        }
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


    const fetchLocations = async () => {
        try {
            const response = await axios.get('http://localhost:8080/getLocations');
            setLocations(response.data);
        } catch (error) {
            message.error("Failed to load locations");
        }
    };

    const fetchBranchDivisions = async (locationId) => {
        try {
            const response = await axios.get(`http://localhost:8080/getBranchDivisionByLocation/${locationId}`);
            const branchDivisionsData = response.data;
            const branchDivisionMap = branchDivisionsData.reduce((acc, branchDivision) => {
                acc[branchDivision.branchDivisionId] = branchDivision.branchDivisionDes;
                return acc;
            }, {});
            setBranchDivisions(branchDivisionsData);
            setBranchDivisionMap(branchDivisionMap);
        } catch (error) {
            message.error("Failed to load branch divisions");
        }
    };

    const fetchUserDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/getUserDetailsByUsername/${id}`);
            const user = response.data;
            if (user) {
                form.setFieldsValue({
                    username: user.username,
                    displayName: user.displayName,
                    epf: user.epf,
                    email: user.email,
                    designation: user.designation,
                    dob: user.dob,
                    location: user.location,
                    branchDivision: user.branchDivision,
                    status: user.status,
                });
                fetchBranchDivisions(user.location);
                fetchUserRolesForUser(user.username);
            } else {
                message.error("No user details found.!")
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
                    <p className="common_header">View User</p>
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
                                label="Username"
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: "Username cannot be empty!",
                                    },
                                ]}
                            >
                                <Input type="text" size="large" placeholder="Username" readOnly />
                            </Form.Item>
                            <Form.Item
                                label="Name"
                                name="displayName"
                                rules={[
                                    {
                                        required: true,
                                        message: "Name cannot be empty!",
                                    },
                                ]}
                            >
                                <Input type="text" size="large" placeholder="Name" readOnly />
                            </Form.Item>
                            <Form.Item
                                name="userRoles"
                                label="User Role"
                                rules={[{ required: true, message: 'Please select at least one role!' }]}
                            >
                                <Transfer
                                    dataSource={userRoles}
                                    showSearch
                                    listStyle={{
                                        width: 250,
                                        height: 300,
                                    }}
                                    targetKeys={targetKeys}
                                    onChange={handleChange}
                                    render={item => item.title}
                                    titles={['Available Roles', 'Selected Roles']}
                                    disabled
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: "Email cannot be empty!",
                                    },
                                ]}
                            >
                                <Input type="text" size="large" placeholder="Email" readOnly />
                            </Form.Item>

                            <Form.Item
                                label="Designation"
                                name="designation"
                                rules={[
                                    {
                                        required: true,
                                        message: "Designation cannot be empty!",
                                    },
                                ]}
                            >
                                <Input type="text" size="large" placeholder="Designation" readOnly />
                            </Form.Item>

                            <Form.Item
                                label="EPF"
                                name="epf"
                                rules={[
                                    {
                                        required: true,
                                        message: "EPF cannot be empty!",
                                    },
                                ]}
                            >
                                <Input type="text" size="large" placeholder="EPF" readOnly />
                            </Form.Item>

                            <Form.Item
                                label="Date of Birth"
                                name="dob"
                                rules={[
                                    {
                                        required: true,
                                        message: "Date of birth cannot be empty!",
                                    },
                                ]}
                            >
                                <Input type="text" size="large" placeholder="Date of Birth" readOnly />
                            </Form.Item>

                            <Form.Item
                                label="Location"
                                name="location"
                                rules={[
                                    {
                                        required: true,
                                        message: "Location cannot be empty!",
                                    },
                                ]}
                            >
                                <Select allowClear placeholder="Select Location" size="large" disabled>
                                    {locations.map(location => (
                                        <Option key={location.locationId} value={location.locationId}>
                                            {location.locationDes}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <Form.Item
                                label="Branch/Division"
                                name="branchDivision"
                                rules={[
                                    {
                                        required: true,
                                        message: "Branch/Division cannot be empty!",
                                    },
                                ]}
                            >
                                <Select
                                    allowClear
                                    placeholder="Select Branch/Division"
                                    size="large" disabled
                                >
                                    {branchDivisions.map(branchDivision => (
                                        <Option key={branchDivision.branchDivisionId} value={branchDivision.branchDivisionId}>
                                            {branchDivision.branchDivisionDes}
                                        </Option>
                                    ))}
                                </Select>
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
                            <a href='http://localhost:3000/user' style={{ color: 'black', textDecoration: 'none' }}>
                                Back
                            </a>
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default ViewUser;