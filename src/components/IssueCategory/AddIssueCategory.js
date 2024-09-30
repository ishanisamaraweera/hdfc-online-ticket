import { LeftOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, message, Row, Select } from "antd";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useBreadCrumb from "../../hooks/useBreadCrumb";
import axios from "axios";

const { Option } = Select;

function AddIssueCategory() {
    const [form] = Form.useForm();
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();
    const [desData, setDesData] = useState();
    const [statuses, setStatuses] = useState([]);
    const [users, setUsers] = useState([]);
    const [issueTypes, setIssueTypes] = useState([]);
    const [targetKeys, setTargetKeys] = useState([]);

    useBreadCrumb("Add Issue Category", location.pathname, "Issue Category");

    useEffect(() => {
        const fetchData = async () => {
            await Promise.all([fetchIssueTypes(), fetchStatuses(), fetchUsers()]);
        };
        fetchData();
    }, [id]);

    const handleChange = (nextTargetKeys) => {
        setTargetKeys(nextTargetKeys);
    };

    const fetchStatuses = async () => {
        try {
            const response = await axios.get('http://localhost:8080/getStatuses/ISSUECATEGORY');
            setStatuses(response.data);
        } catch (error) {
            console.error('Error fetching statuses:', error);
        }
    };

    const fetchIssueTypes = async () => {
        try {
            const response = await axios.get('http://localhost:8080/getIssueTypes');
            setIssueTypes(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/getAllUserDetails');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
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
                createdUser: localStorage.getItem("username"),
            };
            axios.post("http://localhost:8080/addIssueCategory", data)
                .then((result) => {
                    setDesData("");
                    form.resetFields();
                    message.success("Issue category details added successfully");
                    navigate('/issue-category');
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
                    <p className="common_header">Add Issue Category</p>
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
                                label="Issue Category Description"
                                name="issueCategoryDes"
                                rules={[
                                    {
                                        required: true,
                                        message: "Issue Category Description cannot be empty!",
                                    },
                                ]}
                            >
                                <Input type="text" size="large" placeholder="Issue Category Description" />
                            </Form.Item>

                            <Form.Item
                                label="Issue Type"
                                name="issueType"
                                rules={[
                                    {
                                        required: true,
                                        message: "Issue type cannot be empty!",
                                    },
                                ]}
                            >
                                <Select allowClear placeholder="Select Issue Type" size="large" >
                                    {issueTypes.map(issueType => (
                                        <Option key={issueType.issueTypeId} value={issueType.issueTypeId}>
                                            {issueType.issueTypeDes}
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
                            Add
                        </Button>
                        <Button type="secondary" className="secondary__btn" htmlType="back">
                            <a href='http://localhost:3000/issue-category' style={{ color: 'black', textDecoration: 'none' }}>
                                Back
                            </a>
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default AddIssueCategory;