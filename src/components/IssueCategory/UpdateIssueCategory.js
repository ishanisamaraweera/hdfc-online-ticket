import { LeftOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, message, Row, Select } from "antd";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useBreadCrumb from "../../hooks/useBreadCrumb";
import axios from "axios";

const { Option } = Select;

function UpdateIssueCategory() {
    const [form] = Form.useForm();
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();
    const [desData, setDesData] = useState();
    const [statuses, setStatuses] = useState([]);
    const [users, setUsers] = useState([]);
    const [issueTypes, setIssueTypes] = useState([]);
    const [targetKeys, setTargetKeys] = useState([]);

    useBreadCrumb("Update Issue Category", location.pathname, "Issue Category");

    useEffect(() => {
        const fetchData = async () => {
            await Promise.all([fetchIssueTypes(), fetchStatuses(), fetchUsers()]);
            fetchIssueCategoryDetails();
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

    const fetchIssueCategoryDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/getIssueCategoryDetailsById/${id}`);
            const issueCategory = response.data;
            if (issueCategory) {
                const lastUpdatedUser = users.find(user => user.username === issueCategory.lastUpdatedUser);
                const createdUser = users.find(user => user.username === issueCategory.createdUser);
                form.setFieldsValue({
                    issueCategoryId: issueCategory.issueCategoryId,
                    issueCategoryDes: issueCategory.issueCategoryDes,
                    issueType: issueCategory.issueType,
                    createdUser: createdUser ? createdUser.displayName : issueCategory.createdUser,
                    createdDateTime: issueCategory.createdDateTime,
                    lastUpdatedUser: lastUpdatedUser ? lastUpdatedUser.displayName : issueCategory.lastUpdatedUser,
                    lastUpdatedDateTime: issueCategory.lastUpdatedDateTime,
                    status: issueCategory.status,
                });
            } else {
                message.error("No issue category details found.!");
            }
        } catch (error) {
            message.error("Failed to load issue category details");
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
            axios.put("http://localhost:8080/updateIssueCategory", data)
                .then((result) => {
                    setDesData("");
                    form.resetFields();
                    message.success("Issue category details updated successfully");
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
                    <p className="common_header">Update Issue Category</p>
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
                                label="Issue Category ID"
                                name="issueCategoryId"
                                rules={[
                                    {
                                        required: true,
                                        message: "Issue Category ID cannot be empty!",
                                    },
                                ]}
                            >
                                <Input type="text" size="large" placeholder="Issue Category ID" readOnly />
                            </Form.Item>

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
                            Update
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

export default UpdateIssueCategory;