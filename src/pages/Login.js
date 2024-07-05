import { Button, Form, Input, message, Select } from "antd";
import moment from "moment";
import React, { useState } from "react";
import Progress from "react-progress-2";
import Auth from "../auth/Auth";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store";

const { Option } = Select;

export default function Login() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { setLogUser, setActiveRoute } = useStore();
  const [loading, setLoading] = useState(false);

  const onFinishFailed = () => {
    message.error("Please fill all the details");
  };

  const userLogin = () => {
    Progress.show();
    setLoading(true);
    form.validateFields().then((values) => {
      setTimeout(() => {
        if (values.username === "1428" && values.password === "admin") {
          message.success("Login Successful");
          setLogUser(true, "1428", "admin");
          setActiveRoute("dashboard");
          Auth.login(() => {
            navigate("/dashboard");
          });
        } else {
          message.error("Invalid username or password");
        }
        Progress.hide();
        setLoading(false);
      }, 2000);
    }).catch(() => {
      Progress.hide();
      setLoading(false);
      message.error("Validation failed, please check the fields and try again.");
    });
  };

  // const userLogin = async () => {
  //   Progress.show();
  //   setLoading(true);
  //   const formValues = await form.validateFields();
  //   const login = await axios.post('http://localhost:3001/login', formValues);
  //   console.log(login);
  //   if (login.data.success) {
  //     message.success("Login Successful");
  //     setLogUser(true, "1428", "admin");
  //     setActiveRoute("dashboard");
  //     Auth.login(() => {
  //       navigate("/dashboard");
  //     });
  //   } else {
  //     message.error("Invalid Credentials");
  //   }
  // };

  return (
    <div className="outer__container">
      <div className="outer_box">
        <div className="outer_side_banner"></div>
        <div className="outer_side_content">
          <div className="outer_logo">
            <img src="/images/hdfc-bank-logo.png" alt="logo" />
            <h1>HDFC Online Ticket Reporting System</h1>
          </div>
          <div className="content">
            <div className="login_title">
              <h1>Login</h1>
              <p>Login to the Dashboard</p>
            </div>
            <Form
              autoComplete="off"
              form={form}
              onFinish={userLogin}
              onFinishFailed={onFinishFailed}
              initialValues={{ remember: true }}
              layout="vertical"
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  { required: true, message: "Username cannot be empty!" },
                ]}
              >
                <Input type="text" size="large" placeholder="Username" />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Password cannot be empty!" },
                ]}
              >
                <Input.Password size="large" placeholder="Password" />
              </Form.Item>
              <Button
                type="primary"
                size="large"
                className="primary__btn full_width"
                htmlType="submit"
                loading={loading}
              >
                Login
              </Button>
            </Form>
          </div>
        </div>
      </div>
      <div className="footer">
        <p> &copy; {moment().year()} HDFC. All rights reserved.</p>
      </div>
    </div>
  );
}
