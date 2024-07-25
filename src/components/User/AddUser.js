import { LeftOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, message, Radio, Row, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useBreadCrumb from "../../hooks/useBreadCrumb";
import axios from "axios";
import { DatePicker, Transfer } from 'antd';

const { Option } = Select;

function AddUser() {
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const [desData, setDesData] = useState("");
  const [issueCategories, setIssueCategories] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [issueTypes, setIssueTypes] = useState([]);
  const [emergencyLevels, setEmergencyLevels] = useState([]);
  const enableAllDates = () => false;
  const [targetKeys, setTargetKeys] = useState([]);

  const roles = [
    { key: '1', title: 'Admin' },
    { key: '2', title: 'Editor' },
    { key: '3', title: 'Viewer' },
    { key: '4', title: 'Contributor' },
    { key: '5', title: 'Manager' }
  ];

  const handleChange = (nextTargetKeys) => {
    setTargetKeys(nextTargetKeys);
  };

  useBreadCrumb("Create Ticket", location.pathname, "", "add");

  useEffect(() => {
    fetchInitialValues();
    fetchIPAddress();
    fetchStatuses();
    fetchEmergencyLevels();
    fetchIssueTypes();
    fetchIssueCategories();
  }, []);

  const fetchInitialValues = async () => {
    try {
      const response = await axios.get('http://localhost:8080/getUserDetailsForTicketByUsername/1428');
      const initialValues = response.data;
      form.setFieldsValue({
        location: initialValues.locationDes,
        branchDivision: initialValues.branchDivisionDes,
        statusDes: "New",
        status: 1
      });
    } catch (error) {
      message.error("Failed to load initial values");
    }
  };

  const fetchIssueTypes = async () => {
    try {
      const response = await axios.get('http://localhost:8080/getIssueTypes');
      setIssueTypes(response.data);
    } catch (error) {
      message.error("Failed to load issue types");
    }
  };

  const fetchIPAddress = async () => {
    try {
      const response = await axios.get('http://localhost:8080/getIPAddress');
      const ipAddress = response.data;
      form.setFieldsValue({
        ip: ipAddress,
      });
    } catch (error) {
      message.error("Failed to load IP address");
    }
  };

  const handlePcTypeChange = (e) => {
    if (e.target.value === "No") {
      form.setFieldsValue({
        ip: "",
      });
    } else {
      fetchIPAddress();
    }
  };

  const fetchIssueCategories = async (issueTypeId) => {
    try {
      const response = await axios.get(`http://localhost:8080/getIssueCategoriesByIssueType/${issueTypeId}`);
      setIssueCategories(response.data);
    } catch (error) {
      //message.error("Failed to load issue categories");
    }
  };

  const fetchStatuses = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/getStatuses`);
      setStatuses(response.data);
    } catch (error) {
      message.error("Failed to load statuses");
    }
  };

  const fetchEmergencyLevels = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/getEmergencyLevels`);
      setEmergencyLevels(response.data);
    } catch (error) {
      message.error("Failed to load emergency levels");
    }
  };


  const onFinishFailed = () => {
    message.error("Please fill all the details");
  };

  const submitForm = () => {
    form.validateFields().then((values) => {
      const data = {
        ...values,
        //issueDesAndRemarks: desData,
        lastUpdatedDateTime: new Date().toISOString(),
        lastUpdatedUser: "1428",
        sender: "1428",
        reportedDateTime: new Date().toISOString()

      };
      axios.post("http://localhost:8080/addTicket", data)
        .then((result) => {
          console.log(result.data);
          form.resetFields();
          message.success("Ticket details added successfully for ticket ID: " + result.data.ticketId);
          navigate('/tickets'); // Navigate back to tickets page after success
        })
        .catch((error) => {
          message.error(error.response?.data?.message || "Failed to add ticket");
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
          <p className="common_header">Create Ticket</p>
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
              <Form.Item label="Name" name="name" rules={[
                  {
                    required: true,
                    message: "Name cannot be empty!",
                  },
                ]}>
                <Input type="text" size="large" placeholder="Name" />
              </Form.Item>

              <Form.Item
                name="userRole"
                label="User Role"
                rules={[{ required: true, message: 'Please select at least one role!' }]}
              >
                <Transfer
                  dataSource={roles}
                  showSearch
                  listStyle={{
                    width: 250,
                    height: 300,
                  }}
                  targetKeys={targetKeys}
                  onChange={handleChange}
                  render={item => item.title}
                  titles={['Available Roles', 'Selected Roles']}
                />
              </Form.Item>


              <Form.Item label="EPF No" name="epf">
                <Input type="text" size="large" placeholder="EPF No" />
              </Form.Item>
              </Col>
              <Col span={12}>
              <Form.Item label="Designation" name="designation">
                <Input type="text" size="large" placeholder="Designation" />
              </Form.Item>
            
              <Form.Item
                label="Date of Birth"
                name="dob"
                rules={[{ required: true, message: 'Please select your date of birth!' }]}
              >
                <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" disabledDate={enableAllDates} />
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
                <Select allowClear placeholder="Select Location" size="large">
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
                </Select>
              </Form.Item>


            </Col>
          </Row>

          <div className="left_btn" style={{ display: 'flex', gap: '10px' }}>
            <Button type="primary" className="primary__btn" htmlType="submit">
              Add
            </Button>
            <Button type="secondary" className="secondary__btn" htmlType="back">
              <a href='http://localhost:3000/tickets' style={{ color: 'black', textDecoration: 'none' }}>
                Back
              </a>
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default AddUser;
