import { LeftOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, message, Row, Select, DatePicker, Transfer } from "antd";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useBreadCrumb from "../../hooks/useBreadCrumb";
import axios from "axios";
import moment from 'moment';

const { Option } = Select;

function AddFunction() {
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const [desData, setDesData] = useState("");
  const [statuses, setStatuses] = useState([]);
  const [targetKeys, setTargetKeys] = useState([]);

  useEffect(() => {
    fetchStatuses('FUNCTION');
  }, []);

    const handleChange = (nextTargetKeys) => {
    setTargetKeys(nextTargetKeys);
  };

  useBreadCrumb("Create Function" , "Create Function");

  const fetchStatuses = async (module) => {
    console.log("Fetching statuses for module:", module);
    try {
      const response = await axios.get(`http://localhost:8080/getStatuses/${module}`);
      setStatuses(response.data);
    } catch (error) {
      message.error("Failed to load statuses");
    }
  };

  const onFinishFailed = () => {
    message.error("Please fill all the details");
  };

  const submitForm = () => {
    form.validateFields().then((values) => {
      const data = {
        ...values,
        createdDateTime: moment().format('YYYY-MM-DD HH:mm:ss'),
        createdUser: "1428",
        lastUpdatedDateTime: moment().format('YYYY-MM-DD HH:mm:ss'),
        lastUpdatedUser: "1428",
      };

      axios.post("http://localhost:8080/addFunction", data)
        .then((result) => {
          form.resetFields();
          message.success("Function details added successfully for function ID: " + result.data.userFunctionId);
          navigate('/dashboard');
        })
        .catch((error) => {
          message.error(error.response?.data?.message || "Failed to add function");
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
          <p className="common_header">Create Function</p>
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
              <Form.Item label="Function ID" name="userFunctionId" rules={[
                {
                  required: true,
                  message: "Function ID cannot be empty!",
                },
              ]}>
                <Input type="text" size="large" placeholder="Enter Function ID" />
              </Form.Item>

              <Form.Item label="Function Description" name="userFunctionDes" rules={[
                {
                  required: true,
                  message: "Function Description cannot be empty!",
                },
              ]}>
                <Input type="text" size="large" placeholder="Enter Function Description" />
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
                <Select
                  allowClear
                  placeholder="Select Status"
                  size="large">
                  {Array.isArray(statuses) &&  statuses.map(status => (
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
              <a href='http://localhost:3000/dashboard' style={{ color: 'black', textDecoration: 'none' }}>
                Back
              </a>
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default AddFunction;
