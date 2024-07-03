import { message } from "antd";

export const ErrorCommon = (errors) => {
  errors.forEach((data) => {
    message.error(data.detail);
  });
};
