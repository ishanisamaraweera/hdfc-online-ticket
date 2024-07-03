import { Button, Form, Input, message, Modal, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { apis } from "../../../properties";
import { useRefreshTable } from "../../../store";
import axiosInstance from "../../../util/axiosInstance";

function AddItemModel({ visible, setVisible, type = "NEW", id }) {
  const [form] = Form.useForm();
  const [uploading, setUploading] = useState(false);
  const { refreshTable, setRefreshTable } = useRefreshTable();

  useEffect(() => {
    type === "NEW" && form.resetFields();
    if (type === "EDIT") {
      axiosInstance.get(apis.GEMSTONE_TREATMENT + `/${id}`).then((response) => {
        form.setFieldsValue({
          name: response.data.data.name,
        });
      });
    }
    // eslint-disable-next-line
  }, [visible]);

  const onFinishFailed = () => {
    message.error("Please fill all the details");
  };

  const submitForm = () => {
    form.validateFields().then((values) => {
      setUploading(true);
      if (type === "NEW") {
        axiosInstance
          .post(apis.GEMSTONE_TREATMENT, values)
          .then((response) => {
            form.resetFields();
            setVisible(false);
            message.success(response?.data?.message);
            setRefreshTable(!refreshTable);
            setUploading(false);
          })
          .catch((error) => {
            setUploading(false);
            message.error(error.response.data.message);
          });
      } else {
        axiosInstance
          .put(apis.GEMSTONE_TREATMENT + `/${id}`, values)
          .then((response) => {
            form.resetFields();
            setVisible(false);
            message.success(response?.data?.message);
            setRefreshTable(!refreshTable);
            setUploading(false);
          })
          .catch((error) => {
            setUploading(false);
            message.error(error.response.data.message);
          });
      }
    });
  };

  return (
    <Modal
      title="Gemstone Treatments"
      centered
      open={visible}
      onCancel={() => setVisible(false)}
      footer={null}
      width={500}
    >
      <Spin tip="Uploading..." spinning={uploading}>
        <div className="step_model_body">
          <Form
            autoComplete="off"
            form={form}
            onFinish={submitForm}
            onFinishFailed={onFinishFailed}
            layout="vertical"
          >
            <Form.Item
              name="name"
              label="Name"
              rules={[
                {
                  required: true,
                  message: "Required",
                },
              ]}
            >
              <Input
                type="text"
                placeholder="Enter Name here"
                size="large"
                allowClear
              />
            </Form.Item>
            <div className="left_btn">
              <Button type="primary" className="primary__btn" htmlType="submit">
                Submit
              </Button>
            </div>
          </Form>
        </div>
      </Spin>
    </Modal>
  );
}

export default AddItemModel;
