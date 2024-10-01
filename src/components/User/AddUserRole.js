import { LeftOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, message, Row, Select, DatePicker, Transfer } from "antd";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useBreadCrumb from "../../hooks/useBreadCrumb";
import axios from "axios";
import moment from 'moment';
import { apis } from "../../properties";

const { Option } = Select;

function AddUserRole() {
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const [desData, setDesData] = useState("");
  const [statuses, setStatuses] = useState([]);
  const [targetKeys, setTargetKeys] = useState([]);

  useEffect(() => {
    fetchStatuses('USERROLE');
  }, []);

    const handleChange = (nextTargetKeys) => {
    setTargetKeys(nextTargetKeys);
  };

  useBreadCrumb("Create User Role", location.pathname, "User Role");

  const fetchStatuses = async (module) => {
    console.log("Fetching statuses for module:", module);
    try {
      const response = await axios.get(`${apis.GET_STATUSES}/${module}`);
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
        createdUser: localStorage.getItem("username"),
        lastUpdatedDateTime: moment().format('YYYY-MM-DD HH:mm:ss'),
        lastUpdatedUser: localStorage.getItem("username"),
      };

      axios.post(`${apis.ADD_USER_ROLE}`, data)
        .then((result) => {
          form.resetFields();
          message.success("User role details added successfully for user role ID: " + result.data.userRoleId);
          navigate('/dashboard');
        })
        .catch((error) => {
          message.error(error.response?.data?.message || "Failed to add user");
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
          <p className="common_header">Create User Role</p>
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
              <Form.Item label="User Role ID" name="userRoleId" rules={[
                {
                  required: true,
                  message: "User Role ID cannot be empty!",
                },
              ]}>
                <Input type="text" size="large" placeholder="Enter User Role ID" />
              </Form.Item>

              <Form.Item label="User Role Description" name="userRoleDes" rules={[
                {
                  required: true,
                  message: "User Role Description cannot be empty!",
                },
              ]}>
                <Input type="text" size="large" placeholder="Enter User Role Description" />
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

export default AddUserRole;
