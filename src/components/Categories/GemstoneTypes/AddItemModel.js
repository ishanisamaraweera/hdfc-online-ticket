import { Button, Form, Input, message, Modal, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { apis } from "../../../properties";
import { useRefreshTable } from "../../../store";
import axiosInstance from "../../../util/axiosInstance";
import FileUpload from "../../../util/FileUpload";

function AddItemModel({ visible, setVisible, type = "NEW", id }) {
  const [form] = Form.useForm();
  const [uploading, setUploading] = useState(false);
  const { refreshTable, setRefreshTable } = useRefreshTable();
  const [upImage, setUpImage] = useState();

  useEffect(() => {
    type === "NEW" && form.resetFields();
    if (type === "EDIT") {
      axiosInstance.get(apis.GEMSTONE_TYPE + `/${id}`).then((response) => {
        form.setFieldsValue({
          name: response.data.data.name,
          slug: response.data.data.slug,
        });
        setUpImage(response.data.data.image_path);
      });
    }
    // eslint-disable-next-line
  }, [visible]);

  const onFinishFailed = () => {
    message.error("Please fill all the details");
  };

  const submitForm = () => {
    form.validateFields().then((values) => {
      if (upImage) {
        setUploading(true);
        if (type === "NEW") {
          axiosInstance
            .post(apis.GEMSTONE_TYPE, {
              ...values,
              image_path: upImage,
            })
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
            .put(apis.GEMSTONE_TYPE + `/${id}`, {
              ...values,
              image_path: upImage,
            })
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
      } else {
        message.error("Please choose a file");
      }
    });
  };

  return (
    <Modal
      title="Gemstone Type"
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
                onChange={(e) => {
                  form.setFieldsValue({
                    slug: e.target.value.toLowerCase().split(" ").join("-"),
                  });
                }}
              />
            </Form.Item>
            <Form.Item
              name="slug"
              label="Slug"
              rules={[
                {
                  required: true,
                  message: "Required",
                },
              ]}
            >
              <Input
                type="text"
                placeholder="Enter Slug here"
                size="large"
                allowClear
              />
            </Form.Item>

            <Form.Item name="image" label="Upload Image">
              <FileUpload
                type="image"
                location="gem-types"
                imageUpload={upImage}
                setImageUpload={setUpImage}
                accept="image/png, image/jpeg"
                prefix="type"
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
