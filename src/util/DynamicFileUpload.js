import axios from "axios";
import React, { useState } from "react";
import { message, Spin } from "antd";
import { apis, IMAGE_PATH } from "../properties";
import { DeleteOutlined } from "@ant-design/icons";
import Iframe from "react-iframe";
import { useUpFilesData } from "../store";

const DynamicFileUpload = ({ type, location, accept, index, prefix }) => {
  const [uploading, setUploading] = useState(false);

  const upFiles = useUpFilesData((state) => state.upFiles);
  const setUpFilesData = useUpFilesData((state) => state.setUpFilesData);

  const uploadFileChange = (event) => {
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
        if (response.status === 200) {
          upFiles[index].doc_url = response.data.data.file_path;
          setUpFilesData(upFiles);
          setUploading(false);
        }
      })
      .catch((error) => {
        document.getElementById(`file${index}`).value = null;
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
    upFiles[index].doc_url = null
    setUpFilesData([...upFiles]);
    message.success("File deleted successfully");
    document.getElementById(`file${index}`).value = null;
  };

  return (
    <>
      {upFiles.length !== 0 && (
        <Spin tip="Uploading..." spinning={uploading}>
          {!upFiles[index].doc_url && (
            <div class="upload-btn-wrapper">
              <button class="btn_up">Upload Here</button>
              <input
                type="file"
                accept={accept}
                id={`file${index}`}
                onChange={uploadFileChange}
              />
            </div>
          )}

          {upFiles[index].doc_url && (
            <div className="file_list">
              <DeleteOutlined onClick={() => deleteFile()} />

              {type === "image" ? (
                <img
                  className="up_image_view"
                  src={`${IMAGE_PATH}/${upFiles[index].doc_url}`}
                  alt=""
                />
              ) : (
                <Iframe
                  url={`${IMAGE_PATH}/${upFiles[index].doc_url}`}
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
      )}
    </>
  );
};

export default DynamicFileUpload;
