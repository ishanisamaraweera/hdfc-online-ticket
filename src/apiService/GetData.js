import { message } from "antd";
import axios from "axios";
import Progress from "react-progress-2";

export function GetData(url) {
  const headers = {
    "Content-Type": "application/json",
  };

  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        headers: headers,
      })
      .then((response) => {
        if (response.status === 200 && response.statusText === "OK") {
          resolve(response.data);
        } else if (response.status === "error") {
          message.error(response.message);
        }
      })
      .catch((error) => {
        Progress.hide();
        if (error.response.status === 422) {
          const errors = error.response.data.errors;
          errors.forEach(error => {
            message.error(error.detail);
          });
        } else {
          message.error(error.response.data.message);
        }
        reject(error);
      });
  });
}

export function GetDataAuth(url) {
  const headersAuth = {
    "Content-Type": "application/json",
    Authorization:
      "Bearer " +
      JSON.parse(localStorage.getItem("atml")).state.accessToken,
  };

  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        headers: headersAuth,
      })
      .then((response) => {
        if (response.status === 200 && response.statusText === "OK") {
          resolve(response.data);
        } else {
          message.error(response.message);
        }
      })
      .catch((error) => {
        Progress.hide();
        if (error.response.status === 422) {
          const errors = error.response.data.errors;
          errors.forEach(error => {
            message.error(error.detail);
          });
        } else {
          message.error(error.response.data.message);
        }
        reject(error);
      });
  });
}
