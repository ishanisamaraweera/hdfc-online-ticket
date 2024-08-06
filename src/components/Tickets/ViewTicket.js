import { LeftOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, message, Radio, Row, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useBreadCrumb from "../../hooks/useBreadCrumb";
import { apis } from "../../properties";
import axios from "axios";

const { Option } = Select;

function ViewTicket() {
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [desData, setDesData] = useState();
  const [statuses, setStatuses] = useState([]);
  const [issueTypes, setIssueTypes] = useState([]);
  const [emergencyLevels, setEmergencyLevels] = useState([]);
  const [locations, setLocations] = useState([]);
  const [branchDivisions, setBranchDivisions] = useState([]);
  const [branchDivisionMap, setBranchDivisionMap] = useState({});
  const [issueCategories, setIssueCategories] = useState([]);

  useBreadCrumb("View Ticket", location.pathname, "", "add");

  useEffect(() => {
    fetchTicketDetails();
    fetchStatuses();
    fetchLocations();
    fetchBranchDivisions();
    fetchEmergencyLevels();
    fetchIssueTypes();
    fetchIssueCategories();
    fetchAllIssueCategories();
  }, [id]);


    const fetchStatuses = async () => {
        try {
            const response = await axios.get('http://localhost:8080/getStatuses');
            setStatuses(response.data);
        } catch (error) {
            console.error('Error fetching statuses:', error);
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
  
    const fetchIssueTypes = async () => {
      try {
        const response = await axios.get('http://localhost:8080/getIssueTypes');
        setIssueTypes(response.data);
      } catch (error) {
        message.error("Failed to load issue types");
      }
    };

    const fetchIssueCategories = async (issueTypeId) => {
      try {
        const response = await axios.get(`http://localhost:8080/getIssueCategoriesByIssueType/${issueTypeId}`);
        setIssueCategories(response.data);
      } catch (error) {
        // message.error("Failed to load issue categories");
      }
    };

    const fetchAllIssueCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8080/getAllIssueCategories");
        setIssueCategories(response.data);
      } catch (error) {
        //message.error("Failed to load issue categories");
        }
    };

  const fetchTicketDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/getTicketByID/${id}`);
      const ticket = response.data;
      console.log(ticket);
      form.setFieldsValue({
        ticketId: ticket.ticketId,
        emergencyLevel: ticket.emergencyLevel,
        location: ticket.location,
        branchDivision: ticket.branchDivision,
        issueType: ticket.issueType,
        issueCategory: ticket.issueCategory,
        status: ticket.status,
        contactNo: ticket.contactNo,
        serialNo: ticket.serialNo,
        isWorkingPc: ticket.isWorkingPc,
        ip: ticket.ip,
        issueDesAndRemarks: ticket.issueDesAndRemarks,
      });
      setDesData(ticket.issueDesAndRemarks);
      fetchIssueCategories(ticket.issueType);
      fetchBranchDivisions(ticket.location);
    } catch (error) {
      message.error("Failed to load ticket details");
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
        // slug: values.slug.trim()
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
          <p className="common_header">View Ticket</p>
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
                label="Ticket ID"
                name="ticketId" 
                rules={[
                  {
                    required: true,
                    message: "Ticket ID cannot be empty!",
                  },
                ]}
              >
                <Input type="text" size="large" placeholder="Ticket ID" readOnly />
              </Form.Item>
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
                  size="large" disabled
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
                      {branchDivision.branchDivisionDes}
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
                <Select allowClear placeholder="Select Issue Type" size="large" disabled>
                {issueTypes.map(issueTypes => (
                    <Option key={issueTypes.issueTypeId} value={issueTypes.issueTypeId}>
                      {issueTypes.issueTypeDes}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Issue Category"
                name="issueCategory" readOnly
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
                  size="large" disabled
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
            <Col span={12}>
              <Form.Item
                label="Contact No"
                name="contactNo" readOnly
                rules={[{ required: true, message: "Cannot be empty!" }]}
              >
                <Input type="text" size="large" placeholder="Contact No" readOnly />
              </Form.Item>

              <Form.Item label="Serial No" name="serialNo"  >
                <Input type="text" size="large" placeholder="Serial No" readOnly />
              </Form.Item>

              <Form.Item label="PC Type" name="isWorkingPc" readOnly
                rules={[
                  {
                    required: true,
                    message: "PC Type cannot be empty!",
                  },
                ]}>
                <Radio.Group  >
                  <Radio value="Yes" disabled >Working PC </Radio>
                  <Radio value="No" disabled >Another PC</Radio>

                </Radio.Group>

              </Form.Item>

              <Form.Item
                label="IP Address"
                name="ip"
                rules={[
                  {
                    required: true,
                    message: "IP Address cannot be empty!",
                  },
                ]}
              >
                <Input type="text" size="large" placeholder="IP Address" readOnly />
              </Form.Item>
              <Form.Item
                label="Issue Description & Remarks"
                name="issueDesAndRemarks"
                rules={[
                  {
                    required: true,
                    message: "IP Address cannot be empty!",
                  },
                ]}
              >
                <TextArea rows={4} placeholder="Type here ..." readOnly />
              </Form.Item>
            </Col>
          </Row>

          <div className="left_btn" style={{ display: 'flex', gap: '10px' }}>
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

export default ViewTicket;
