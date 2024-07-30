import { LeftOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, message, Row, Select, DatePicker, Transfer } from "antd";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useBreadCrumb from "../../hooks/useBreadCrumb";
import axios from "axios";
import moment from 'moment';

const { Option } = Select;

function AddUser() {
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const [desData, setDesData] = useState("");
  const [statuses, setStatuses] = useState([]);
  const [userRoles, setUserRoles] = useState([]);
  const [locations, setLocations] = useState([]);
  const [branchDivision, setBranchDivision] = useState([]);
  const enableAllDates = () => false;
  const [targetKeys, setTargetKeys] = useState([]);

  useEffect(() => {
    fetchUserRoles();
    fetchLocations();
    fetchStatuses('USER');
  }, []);

  useEffect(() => {
    form.setFieldsValue({ branchDivision: undefined });
    fetchBranchDivisionByLocation(form.getFieldValue('location'));
  }, [form.getFieldValue('location')]);

  const fetchBranchDivisionByLocation = async (locationId) => {
    try {

      if (locationId) {
        const response = await axios.get(`http://localhost:8080/getBranchDivisionByLocation/${locationId}`);
        setBranchDivision(response.data);
      } else {
        setBranchDivision([]);
      }
    } catch (error) {
      message.error("Failed to load branch or divisions");
    }
  };

  const fetchLocations = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/getLocations`);
      setLocations(response.data);
    } catch (error) {
      message.error("Failed to load locations");
    }
  };

  const fetchUserRoles = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/getUserRoles`);
      setUserRoles(response.data.map(role => ({ key: role.userRoleId, title: role.userRoleDes })));
    } catch (error) {
      message.error("Failed to load user roles");
    }
  };


  const handleChange = (nextTargetKeys) => {
    setTargetKeys(nextTargetKeys);
  };

  useBreadCrumb("Create User", "Create User");

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
      const formattedDob = values.dob ? moment(values.dob).format('YYYY-MM-DD') : null;
      const data = {
        ...values,
        addedDateTime: moment().format('YYYY-MM-DD HH:mm:ss'),
        addedBy: "1428",
        lastUpdatedDateTime: moment().format('YYYY-MM-DD HH:mm:ss'),
        lastUpdatedUser: "1428",
        dob: formattedDob
      };


      axios.post("http://localhost:8080/addUser", data)
        .then((result) => {
          form.resetFields();
          message.success("User details added successfully for username: " + result.data.username);
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
          <p className="common_header">Create User</p>
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
              <Form.Item label="Name" name="displayName" rules={[
                {
                  required: true,
                  message: "Name cannot be empty!",
                },
              ]}>
                <Input type="text" size="large" placeholder="Enter Name" />
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
                />
              </Form.Item>


              <Form.Item label="EPF No" name="epf" rules={[{ required: true, message: 'EPF No cannot be empty!' }]}>
                <Input type="text" size="large" placeholder="Enter EPF No" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Designation" name="designation" rules={[{ required: true, message: 'Designation cannot be empty!' }]}>
                <Input type="text" size="large" placeholder="Enter Designation" />
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
                <Select allowClear placeholder="Select Location" size="large" onChange={value => fetchBranchDivisionByLocation(value)}>
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
                  size="large">
                  {branchDivision.map(branchDivision => (
                    <Option key={branchDivision.branchDivisionId} value={branchDivision.branchDivisionId}>
                      {branchDivision.branchDivisionDes}
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

export default AddUser;
