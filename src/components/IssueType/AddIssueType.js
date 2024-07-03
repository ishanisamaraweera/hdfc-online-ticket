import { Button, Col, Divider, Form, Input, message, Row, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useBreadCrumb from "../../hooks/useBreadCrumb";
import { apis, ckeditorConfig, IMAGE_PATH } from "../../properties";
import { LeftOutlined } from "@ant-design/icons";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { MediaList } from "../Others/MediaList";
import { MediaUploader } from "../Others/MediaUploader";
import useWebGemShapes from "../../hooks/useWebGemShapes";
import useWebGemTreatments from "../../hooks/useWebGemTreatments";
import useWebGemOrigins from "../../hooks/useWebGemOrigins";
import useWebGemCertifications from "../../hooks/useWebGemCertifications";
import useWebGemTypes from "../../hooks/useWebGemTypes";
import useWebGemColors from "../../hooks/useWebGemColors";
import axiosInstance from "../../util/axiosInstance";

const { Option } = Select;

function AddIssueType({ type }) {
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const [mediaList, setMediaList] = useState([]);
  const [desData, setDesData] = useState();

  useBreadCrumb("Create Rings", location.pathname, "", "add");

  const webGemShapes = useWebGemShapes();
  const webGemTreatments = useWebGemTreatments();
  const webGemOrigins = useWebGemOrigins();
  const webGemCertifications = useWebGemCertifications();
  const webGemTypes = useWebGemTypes();
  const webGemColors = useWebGemColors();

  const onFinishFailed = () => {
    message.error("Please fill all the details");
  };

  const submitForm = () => {
    if (mediaList.length === 0) {
      message.error("Please upload media");
      return;
    }
    form.validateFields().then((values) => {
      const data = {
        ...values,
        description: desData,
        mediaList: mediaList,
        currency: "USD",
        slug: values.slug.trim(),
      };
      axiosInstance
        .post(apis.GEMSTONE, data)
        .then((result) => {
          console.log(result.data);
          setMediaList([]);
          setDesData("");
          form.resetFields();
          message.success(result.data.message);
        })
        .catch((error) => {
          message.error(error.response.data.message);
        });
    });
  };

  function convertToSlug(Text) {
    return Text.toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  }

  useEffect(() => {
    if (type === "FIXED_SLUG") {
      form.setFieldsValue({
        slug: params.slug,
      });
    }
    // eslint-disable-next-line
  }, [type]);

  function uploadAdapter(loader) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then((file) => {
            body.append("file", file);
            body.append("location", "ckeditor-images");
            fetch(`${apis.CKEDITOR_UPLOAD}`, {
              method: "post",
              body: body,
            })
              .then((res) => res.json())
              .then((res) => {
                resolve({ default: `${IMAGE_PATH}/${res.data.file_path}` });
              })
              .catch((err) => {
                reject(err);
              });
          });
        });
      },
    };
  }

  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }

  const deleteFile = (index) => {
    const newList = [...mediaList];
    newList.splice(index, 1);
    setMediaList(newList);
  };

  const changeFeatured = (index) => {
    const newList = [...mediaList];
    newList.map((item, i) => {
      if (i === index) {
        item.isFeatured = !item.isFeatured;
      } else {
        item.isFeatured = false;
      }
      return item;
    });
    setMediaList(newList);
  };

  return (
    <div className="dashboard">
      <div className="section_row">
        <div className="com_head">
          <LeftOutlined onClick={() => navigate(-1)} />
          <p className="common_header">Create Rings</p>
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
                label="Product Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Name cannot be empty!",
                  },
                ]}
              >
                <Input
                  type="text"
                  size="large"
                  placeholder="Content title"
                  onChange={(e) => {
                    if (type !== "FIXED_SLUG") {
                      form.setFieldsValue({
                        slug: convertToSlug(e.target.value),
                      });
                    }
                  }}
                />
              </Form.Item>
              <Form.Item
                label="Slug"
                name="slug"
                rules={[{ required: true, message: "Slug cannot be empty!" }]}
              >
                <Input
                  type="text"
                  size="large"
                  placeholder="slug"
                  disabled={type === "FIXED_SLUG" ? true : false}
                />
              </Form.Item>
              <Form.Item label="Descriptions">
                <CKEditor
                  config={{
                    extraPlugins: [uploadPlugin],
                    placeholder: "Content description",
                    toolbar: ckeditorConfig.toolbar,
                  }}
                  editor={ClassicEditor}
                  data={desData}
                  onReady={(editor) => {
                    editor.editing.view.change((writer) => {
                      writer.setStyle(
                        "height",
                        "300px",
                        editor.editing.view.document.getRoot()
                      );
                      writer.setStyle(
                        "z-index",
                        "999999 !important",
                        editor.editing.view.document.getRoot()
                      );
                    });
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setDesData(data);
                  }}
                />
              </Form.Item>
              <Form.Item
                label="Price"
                name="price"
                rules={[{ required: true, message: "Price cannot be empty!" }]}
              >
                <Input type="text" size="large" placeholder="Price" />
              </Form.Item>
              <Form.Item label="Upload Media">
                <Row gutter={[8, 8]}>
                  {mediaList.map((item, index) => (
                    <Col key={index}>
                      <MediaList
                        item={item}
                        index={index}
                        deleteFile={deleteFile}
                        changeFeatured={changeFeatured}
                      />
                    </Col>
                  ))}
                  <Col>
                    <MediaUploader
                      setMediaList={setMediaList}
                      mediaList={mediaList}
                      location={"upload/gemstone/"}
                    />
                  </Col>
                </Row>
              </Form.Item>
              ˝
            </Col>
            <Col span={12}>
              <Form.Item
                label="Gemstone SKU"
                name="SKU"
                rules={[{ required: true, message: "Cannot be empty!" }]}
              >
                <Input type="text" size="large" placeholder="Gemstone SKU" />
              </Form.Item>

              <Form.Item
                label="Gemstone Carat"
                name="carat"
                rules={[{ required: true, message: "Cannot be empty!" }]}
              >
                <Input type="text" size="large" placeholder="Gemstone Carat" />
              </Form.Item>

              <Form.Item label="Gemstone Shape" name="gem_shape_id">
                <Select
                  allowClear
                  placeholder="Select Gemstone Shape"
                  size="large"
                >
                  {webGemShapes?.map((item, index) => (
                    <Option key={index} value={item.id}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item label="Gemstone Treatment" name="gem_treatment_id">
                <Select
                  allowClear
                  placeholder="Select Gemstone Treatment"
                  size="large"
                >
                  {webGemTreatments?.map((item, index) => (
                    <Option key={index} value={item.id}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item label="Gemstone Transparency" name="transparency">
                <Select
                  allowClear
                  placeholder="Select Gemstone Transparency"
                  size="large"
                >
                  <Option value="Yes">Yes</Option>
                  <Option value="No">No</Option>
                </Select>
              </Form.Item>

              <Form.Item label="Gemstone Origin" name="gem_origin_ids">
                <Select
                  allowClear
                  placeholder="Select Gemstone Origin"
                  size="large"
                  mode="multiple"
                >
                  {webGemOrigins?.map((item, index) => (
                    <Option key={index} value={item.id}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Gemstone Certification"
                name="gem_certificate_ids"
              >
                <Select
                  allowClear
                  placeholder="Select Gemstone Certification"
                  size="large"
                  mode="multiple"
                >
                  {webGemCertifications?.map((item, index) => (
                    <Option key={index} value={item.id}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item label="Gemstone Type" name="gem_type_id">
                <Select
                  allowClear
                  placeholder="Select Gemstone Type"
                  size="large"
                >
                  {webGemTypes?.map((item, index) => (
                    <Option key={index} value={item.id}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item label="Gemstone Color" name="gem_color_id">
                <Select
                  allowClear
                  placeholder="Select Gemstone Color"
                  size="large"
                >
                  {webGemColors?.map((item, index) => (
                    <Option key={index} value={item.id}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Weight"
                name="weight"
                rules={[
                  {
                    required: true,
                    message: "Weight cannot be empty!",
                  },
                ]}
              >
                <Input type="text" size="large" placeholder="Weight" />
              </Form.Item>

              <Form.Item
                label="Gemstone Visibility Status"
                name="gemVisibilityStatus"
              >
                <Select
                  allowClear
                  placeholder="Select Visibility Status"
                  size="large"
                >
                  <Option value="GEM_AND_RING">GEM & RING</Option>
                  <Option value="RING_ONLY">GEM ONLY</Option>
                  <Option value="GEM_ONLY">GEM ONLY</Option>
                </Select>
              </Form.Item>

              <Divider plain>SEO Information</Divider>
              <Form.Item
                label="SEO title"
                name="seo_title"
                rules={[
                  {
                    required: true,
                    message: "SEO title cannot be empty!",
                  },
                ]}
              >
                <Input type="text" size="large" placeholder="SEO title" />
              </Form.Item>
              <Form.Item
                label="SEO description"
                name="seo_description"
                rules={[
                  {
                    required: true,
                    message: "SEO description cannot be empty!",
                  },
                ]}
              >
                <Input type="text" size="large" placeholder="SEO description" />
              </Form.Item>
              <Form.Item
                label="SEO keywords"
                name="seo_keywords"
                rules={[
                  {
                    required: true,
                    message: "SEO keywords cannot be empty!",
                  },
                ]}
              >
                <Input type="text" size="large" placeholder="SEO keywords" />
              </Form.Item>
            </Col>
          </Row>

          <div className="left_btn">
            <Button type="primary" className="primary__btn" htmlType="submit">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default AddIssueType;
