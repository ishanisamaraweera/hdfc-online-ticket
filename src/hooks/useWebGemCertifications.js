import { message } from "antd";
import { useEffect, useState } from "react";
import Progress from "react-progress-2";
import axiosInstance from "../util/axiosInstance";

function useWebGemCertifications() {
  const [state, setState] = useState([]);

  useEffect(() => {
    const getData = () => {
      axiosInstance
        .get("/api/gemstone-certificates")
        .then((result) => {
          let responseJson = result;
          setState(responseJson.data);
        })
        .catch((error) => {
          message.error(error.response.data.message);
          Progress.hide();
        });
    };
    getData();
    // eslint-disable-next-line
  }, []);
  return state;
}

export default useWebGemCertifications;
