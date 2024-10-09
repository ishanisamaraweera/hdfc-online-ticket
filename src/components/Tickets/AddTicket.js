import { LeftOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, message, Radio, Row, Select, Upload } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useBreadCrumb from "../../hooks/useBreadCrumb";
import axios from "axios";
import moment from 'moment';
import { apis } from "../../properties";

const { Option } = Select;

function AddTicket() {
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const [issueCategories, setIssueCategories] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [issueTypes, setIssueTypes] = useState([]);
  const [emergencyLevels, setEmergencyLevels] = useState([]);
  const [locations, setLocations] = useState([]);
  const [branchDivisions, setBranchDivisions] = useState([]);
  const [branchDivisionMap, setBranchDivisionMap] = useState({});
  const [fileList, setFileList] = useState([]);
  const [initialValues, setInitialValues] = useState({
    location: undefined,
    branchDivision: undefined,
    status: 1
  });
  const handleFileChange = (info) => {
    let fileList = [...info.fileList];
    fileList = fileList.slice(-1);
    setFileList(fileList);
  };

  useBreadCrumb("Add Ticket", location.pathname, "", "add");

  useEffect(() => {
    fetchInitialValues();
    fetchIPAddress();
    fetchStatuses('TICKET');
    fetchLocations();
    fetchBranchDivisions();
    fetchEmergencyLevels();
    fetchIssueTypes();
  }, []);

  const fetchInitialValues = async () => {
    try {
      const username = localStorage.getItem("username");
      const response = await axios.get(`${apis.GET_USER_DETAILS_FOR_TICKET_BY_USERNAME}/${username}`);
      const data = response.data;
      setInitialValues({
        location: data.locationId,
        branchDivision: data.branchDivisionId,
        status: 1
      });
      form.setFieldsValue({
        location: data.locationId,
        branchDivision: data.branchDivisionId,
        status: 1
      });
      fetchBranchDivisions(data.locationId);
    } catch (error) {
      message.error("Failed to load initial values");
    }
  };

  const fetchLocations = async () => {
    try {
      const response = await axios.get(`${apis.GET_LOCATIONS}`);
      setLocations(response.data);
    } catch (error) {
      message.error("Failed to load locations");
    }
  };

  const fetchBranchDivisions = async (locationId) => {
    try {
      const response = await axios.get(`${apis.GET_BRANCH_DIVISION_BY_LOCATION}/${locationId}`);
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

  const fetchIssueTypes = async () => {
    try {
      const response = await axios.get(`${apis.GET_ISSUE_TYPES}`);
      setIssueTypes(response.data);
    } catch (error) {
      message.error("Failed to load issue types");
    }
  };

  const fetchIPAddress = async () => {
    try {
      const response = await axios.get(`${apis.GET_IP_ADDRESS}`);
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
      const response = await axios.get(`${apis.GET_ISSUE_CATEGORIES_BY_ISSUE_TYPE}/${issueTypeId}`);
      setIssueCategories(response.data);
    } catch (error) {
      // message.error("Failed to load issue categories");
    }
  };

  const fetchStatuses = async (module) => {
    try {
      const response = await axios.get(`${apis.GET_STATUSES}/${module}`);
      setStatuses(response.data);
    } catch (error) {
      message.error("Failed to load statuses");
    }
  };

  const fetchEmergencyLevels = async () => {
    try {
      const response = await axios.get(`${apis.GET_EMERGENCY_LEVELS}`);
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
      const formData = new FormData();

      formData.append("reportedDateTime", moment().format('YYYY-MM-DDTHH:mm:ss'));
      formData.append("sender", localStorage.getItem("username"));
      formData.append("lastUpdatedDateTime", moment().format('YYYY-MM-DDTHH:mm:ss'));
      formData.append("lastUpdatedUser", localStorage.getItem("username"));

      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });

      if (fileList.length > 0) {
        formData.append("file", fileList[0].originFileObj);
      }

      axios.post(`${apis.ADD_TICKET}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Important for file uploads
        },
      })
        .then((result) => {
          console.log(result.data);
          form.resetFields();
          message.success("Ticket details added successfully for ticket ID: " + result.data.ticketId);
          navigate('/tickets');
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
          <p className="common_header">Add Ticket</p>
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
                label="Emergency Level"
                name="emergencyLevel"
                rules={[
                  {
                    required: true,
                    message: "Emergency Level cannot be empty!",
                  },
                ]}
              >
                <Select
                  allowClear
                  placeholder="Select Emergency Level"
                  size="large"
                >
                  {emergencyLevels.map(level => (
                    <Option key={level.levelId} value={level.levelId}>
                      {level.levelDes}
                    </Option>
                  ))}
                </Select>
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
                      {branchDivisionMap[branchDivision.branchDivisionId]}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Issue Type"
                name="issueType"
                rules={[
                  {
                    required: true,
                    message: "Issue Type cannot be empty!",
                  },
                ]}
              >
                <Select allowClear placeholder="Select Issue Type" size="large" onChange={fetchIssueCategories}>
                  {issueTypes.map(issueTypes => (
                    <Option key={issueTypes.issueTypeId} value={issueTypes.issueTypeId}>
                      {issueTypes.issueTypeDes}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Issue Category"
                name="issueCategory"
                rules={[
                  {
                    required: true,
                    message: "Issue Category cannot be empty!",
                  },
                ]}
              >
                <Select
                  allowClear
                  placeholder="Select Issue Category"
                  size="large"
                >
                  {issueCategories.map(category => (
                    <Option key={category.issueCategoryId} value={category.issueCategoryId}>
                      {category.issueCategoryDes}
                    </Option>
                  ))}
                </Select>
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
                <Select allowClear placeholder="Select Status" size="large" disabled>
                  {statuses.map(status => (
                    <Option key={status.statusId} value={status.statusId}>
                      {status.statusDes}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Contact No"
                name="contactNo"
                rules={[{ required: true, message: "Cannot be empty!" },
                {
                  pattern: /^[0-9]{10}$/,
                  message: "Contact No must be exactly 10 digits!"
                }
                ]}
              >
                <Input type="text" size="large" placeholder="Contact No" maxLength={10}
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Serial No" name="serialNo">
                <Input type="text" size="large" placeholder="Serial No" />
              </Form.Item>

              <Form.Item label="PC Type" name="isWorkingPc"
                rules={[
                  {
                    required: true,
                    message: "PC Type cannot be empty!",
                  },
                ]}>
                <Radio.Group onChange={handlePcTypeChange}>
                  <Radio value="Yes">Working PC</Radio>
                  <Radio value="No">Another PC</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                label="IP Address (Enter the IP address that belong to the issue if you have logged from another PC)"
                name="ip"
                rules={[
                  {
                    required: true,
                    message: "IP Address cannot be empty!",
                  },
                  {
                    pattern: /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
                    message: "Please enter a valid IP address!",
                  }
                ]}
              >
                <Input
                  type="text"
                  size="large"
                  placeholder="IP Address"
                  onKeyPress={(event) => {
                    const charCode = event.which ? event.which : event.keyCode;
                    if (
                      charCode !== 46 && // Full stop
                      (charCode < 48 || charCode > 57) // Digits
                    ) {
                      event.preventDefault();
                    }
                  }}
                />
              </Form.Item>

              <Form.Item
                label="Issue Description & Remarks"
                name="issueDesAndRemarks"
                rules={[
                  {
                    required: true,
                    message: "Issue Description & Remarks cannot be empty!",
                  },
                ]}
              >
                <TextArea rows={4} placeholder="Type explanation about the issue ..." />
              </Form.Item>
              <Upload
                beforeUpload={() => false} // Prevent automatic upload
                onChange={handleFileChange}
                fileList={fileList}
                multiple={false}
              >
                <Button icon={<UploadOutlined />}>Select File</Button>
              </Upload>
            </Col>
          </Row>

          <div className="left_btn" style={{ display: 'flex', gap: '10px' }}>
            <Button type="primary" className="primary__btn" htmlType="submit">
              Add
            </Button>
            <Button type="secondary" className="secondary__btn" htmlType="back">
              <a href={apis.TICKETS} style={{ color: 'black', textDecoration: 'none' }}>
                Back
              </a>
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default AddTicket;