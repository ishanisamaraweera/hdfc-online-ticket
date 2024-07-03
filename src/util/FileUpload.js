import axios from "axios";
import React, { useState } from "react";
import { message, Spin } from "antd";
import { apis, IMAGE_PATH } from "../properties";
import { DeleteOutlined } from "@ant-design/icons";
import Iframe from "react-iframe";

const FileUpload = ({
  type,
  location,
  imageUpload,
  setImageUpload,
  accept,
  prefix,
}) => {
  const [uploading, setUploading] = useState(false);

  const uploadFileChange = (event) => {
    console.log(event.target.files[0]);
    var formData = new FormData();
    formData.append("file", event.target.files[0]);
    formData.append("type", type);
    formData.append("location", location);
    formData.append("prefix", prefix);
    setUploading(true);
    axios
      .post(apis.FILE_UPLOAD, formData, {
        headers: {
          token: "dad#lecture#Charger#lot7",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        document.getElementById("file").value = null;
        if (response.status === 200) {
          setImageUpload(response.data.data.file_path);
          setUploading(false);
        }
      })
      .catch((error) => {
        document.getElementById("file").value = null;
        setUploading(false);
        if (error.response.status === 422) {
          const errors = error.response.data.error.file;
          errors.forEach((error) => {
            message.error(error);
          });
        } else {
          message.error(error.response.data.message);
        }
      });
  };

  const deleteFile = () => {
    setImageUpload("");
    message.success("File deleted successfully");
    document.getElementById("file").value = null;
  };

  return (
    <>
      <Spin tip="Uploading..." spinning={uploading}>
        {!imageUpload && (
          <div class="upload-btn-wrapper">
            <button class="btn_up">Upload Here</button>
            <input
              type="file"
              accept={accept}
              id="file"
              onChange={uploadFileChange}
            />
          </div>
        )}

        {imageUpload && (
          <div className="file_list">
            <DeleteOutlined onClick={() => deleteFile()} />
            {type === "image" ? (
              <img
                className="up_image_view"
                src={`${IMAGE_PATH}/${imageUpload}`}
                alt=""
              />
            ) : (
              <Iframe
                url={`${IMAGE_PATH}/${imageUpload}`}
                className="up_image_view"
                display="unset"
                scrolling="no"
                position="relative"
                overflow="hidden"
              />
            )}
          </div>
        )}
      </Spin>
    </>
  );
};

export default FileUpload;
