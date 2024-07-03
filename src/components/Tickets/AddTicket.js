import { LeftOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, message, Radio, Row, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useBreadCrumb from "../../hooks/useBreadCrumb";
import axios from "axios";

const { Option } = Select;

function AddTicket() {
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const [desData, setDesData] = useState("");

  useBreadCrumb("Create Ticket", location.pathname, "", "add");

  const onFinishFailed = () => {
    message.error("Please fill all the details");
  };

  const submitForm = () => {
    form.validateFields().then((values) => {
      const data = {
        ...values,
        //issueDesAndRemarks: desData,
        lastUpdatedDateTime: new Date().toISOString(),
        lastUpdatedUser: "admin",
        sender: "admin",
        reportedDateTime: new Date().toISOString()
        
      };
      axios.post("http://localhost:8080/addTicket", data)
        .then((result) => {
          console.log(result.data);
          form.resetFields();
          message.success("Ticket details added successfully");
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
              {/* <Form.Item
                label="Ticket No"
                name="ticketNo" 
                rules={[
                  {
                    required: true,
                    message: "Ticket No cannot be empty!",
                  },
                ]}
              >
                <Input type="text" size="large" placeholder="Ticket No" readOnly />
              </Form.Item> */}

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
                <Select allowClear placeholder="Select Location" size="large">
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
                  size="large"
                >
                  <Option value="Galle">Galle</Option>
                  <Option value="Mathara">Mathara</Option>
                  <Option value="IT Division">IT Division</Option>
                  <Option value="Front Office">Front Office</Option>
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
                <Select allowClear placeholder="Select Issue Type" size="large">
                  <Option value="Hardware">Hardware</Option>
                  <Option value="Software">Software</Option>
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
                name="status"
                rules={[
                  {
                    required: true,
                    message: "Status cannot be empty!",
                  },
                ]}
              >
                <Select allowClear placeholder="Select Status" size="large">
                  <Option value="New">New</Option>
                  <Option value="In Progress">In Progress</Option>
                  <Option value="Pending">Pending</Option>
                  <Option value="Completed">Completed</Option>
                  <Option value="Closed">Closed</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Contact No"
                name="contactNo"
                rules={[{ required: true, message: "Cannot be empty!" }]}
              >
                <Input type="text" size="large" placeholder="Contact No" />
              </Form.Item>

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
                <Radio.Group>
                  <Radio value="Yes">Working PC</Radio>
                  <Radio value="No">Another PC</Radio>
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
                <Input type="text" size="large" placeholder="IP Address" />
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
                <TextArea rows={4} placeholder="Type here ..." />
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

export default AddTicket;
