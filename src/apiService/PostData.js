import { message } from "antd";
import axios from "axios";
import Progress from "react-progress-2";

export function PostData(url, userData) {
  const headers = {
    "Content-Type": "application/json",
  };
  return new Promise((resolve, reject) => {
    axios
      .post(url, userData, {
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
          errors.forEach((error) => {
            message.error(error.detail);
          });
        } else {
          message.error(error.response.data.message);
        }
        reject(error);
      });
  });
}

export function PostDataAuth(url, userData) {
  const headersAuth = {
    "Content-Type": "application/json",
    Authorization:
      "Bearer " +
      JSON.parse(localStorage.getItem("atml")).state.accessToken,
  };

  return new Promise((resolve, reject) => {
    axios
      .post(url, userData, {
        headers: headersAuth,
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
        console.log(error.response);
        if (error.response.status === 422) {
          const errors = error.response.data.errors;
          errors.forEach((error) => {
            message.error(error.detail);
          });
        } else if (error.response.status === 400) {
          const errorNew = error.response.data.error;
          for (let key in errorNew) {
            console.log(key);
            message.error(errorNew[key]);
          }
        } else {
          message.error(error.response.data.message);
        }
        reject(error);
      });
  });
}
