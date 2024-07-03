import { LeftOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, message, Radio, Row, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useBreadCrumb from "../../hooks/useBreadCrumb";
import { apis } from "../../properties";
import axiosInstance from "../../util/axiosInstance";
import axios from "axios";

const { Option } = Select;

function ViewTicket() {
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [desData, setDesData] = useState();

  useBreadCrumb("View Ticket", location.pathname, "", "add");

  useEffect(() => {
    fetchTicketDetails();
  }, [id]);

  const fetchTicketDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/getTicketByID/${id}`);
      const ticket = response.data;
      form.setFieldsValue({
        ticketNo: ticket.ticketNo,
        emergencyLevel: ticket.emergencyLevel,
        location: ticket.location,
        branchOrDivision: ticket.branchOrDivision,
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
          <p className="common_header">Edit Ticket</p>
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
                label="Ticket No"
                name="ticketNo" readOnly
                rules={[
                  {
                    required: true,
                    message: "Ticket No cannot be empty!",
                  },
                ]}
              >
                <Input type="text" size="large" placeholder="Ticket No" />
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
                  <Option value="High">High</Option>
                  <Option value="Medium">Medium</Option>
                  <Option value="Low">Low</Option>
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
                  <Option value="Head Office">Head Office</Option>
                  <Option value="Branch/Division">Branch/Division</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Branch/Division"
                name="branchOrDivision"
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
                  <Option value="Galle">Galle</Option>
                  <Option value="Mathara">Mathara</Option>
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
                  <Option value="Hardware">Hardware</Option>
                  <Option value="Software">Software</Option>
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
                  <Option value="UPS Issue">UPS Issue</Option>
                  <Option value="Printer Issue">Printer Issue</Option>
                  <Option value="PC Issue">PC Issue</Option>
                  <Option value="DMS Issue">DMS Issue</Option>
                  <Option value="CBS Issue">CBS Issue</Option>
                  <Option value="LOS Issue">LOS Issue</Option>
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
                  <Option value="New">New</Option>
                  <Option value="Pending">Pending</Option>
                  <Option value="In Progress">In Progress</Option>
                  <Option value="Completed">Completed</Option>
                  <Option value="Closed">Closed</Option>
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
