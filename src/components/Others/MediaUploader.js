import React from "react";
import { message } from "antd";
import { uploadFileToS3 } from "../../util/s3-upload";

export const MediaUploader = ({
  mediaList,
  setMediaList,
  accept,
  location,
}) => {
  const uploadFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const extension = file.name.split(".").pop();
        const newName = `${Date.now()}.${extension}`;
        const typeName = file.type.split("/")[0];
        const typeUpper = typeName.toUpperCase();
        const key = location + newName;
        message.loading("Uploading...", 0.5);
        const res = await uploadFileToS3(file, key);
        if (res) {
          setMediaList([
            ...mediaList,
            {
              url: res,
              resourceType: typeUpper,
              isFeatured: mediaList.length === 0 ? true : false,
            },
          ]);
          message.success("File Uploaded Successfully");
        }
      } catch (error) {
        console.log("error", error);
        message.error("Error Uploading File");
      }
    }
  };

  return (
    <div className="upload-btn-wrapper">
      <button className="btn_up">Upload Here</button>
      <input
        type="file"
        id={`file`}
        onChange={uploadFileChange}
        accept={accept}
      />
    </div>
  );
};
