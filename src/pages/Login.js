import { Button, Form, Input, message, Select } from "antd";
import moment from "moment";
import React, { useState, useEffect } from "react";
import Progress from "react-progress-2";
import Auth from "../auth/Auth";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store";
import axios from "axios";
import { apis } from "../properties";

const { Option } = Select;
const SESSION_TIMEOUT = 1 * 60 * 1000; 

export default function Login() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { setLogUser, setActiveRoute } = useStore();
  const [loading, setLoading] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  const resetTimeout = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);  
    }

    const id = setTimeout(() => {
      handleLogout();
    }, SESSION_TIMEOUT);

    setTimeoutId(id);
  };

  const handleLogout = () => {
    message.warning("Session timed out. Logging out...");
    localStorage.clear();  // Clear user data
    setLogUser(false, null, null);  // Reset user context
    navigate("/login");  // Redirect to login page
  };

  const startSessionTimeout = () => {
    resetTimeout();
    // Event listeners to reset timeout on user activity
    window.addEventListener("mousemove", resetTimeout);
    window.addEventListener("click", resetTimeout);
    window.addEventListener("keypress", resetTimeout);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeoutId);  // Cleanup on component unmount
      window.removeEventListener("mousemove", resetTimeout);
      window.removeEventListener("click", resetTimeout);
      window.removeEventListener("keypress", resetTimeout);
    };
  }, [timeoutId]);


  const onFinishFailed = () => {
    message.error("Please fill all the details");
  };

  const userLogin = async () => {
    try {
      Progress.show();
      setLoading(true);
      const values = await form.validateFields();
      console.log("JSON String:" +  JSON.stringify(values));
      const response = await axios.get(`${apis.AUTHENTICATE_USER}`, {
        params: values
      });

      if (response.data) {
        message.success("Login Successful");
        localStorage.setItem("username", values.username);        
        setLogUser(true, values.username, values.password);
        setActiveRoute("dashboard");
        Auth.login(() => {
          navigate("/dashboard");
          startSessionTimeout();
        });
      } else {
        message.error("Invalid username or password or user deactivated");
      }
    }
    catch
      (error){
        message.error("Validation failed, please check the fields and try again.");
      } finally {
        Progress.hide();
        setLoading(false);
      }
    };

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
