import { message } from "antd";
import { useEffect, useState } from "react";
import Progress from "react-progress-2";
import { apis } from "../properties";
import { useRefreshTable } from "../store";
import axiosInstance from "../util/axiosInstance";

function useAllGemOrigins(filterData) {
  const [state, setState] = useState([]);
  const { refreshTable } = useRefreshTable();

  useEffect(() => {
    const getData = () => {
      Progress.show();
      axiosInstance
        .get(
          apis.GEMSTONE_ORIGIN +
            `?page=${filterData.page}&pageSize=${filterData.pageSize}`
        )
        .then((result) => {
          let responseJson = result;
          setState(responseJson.data.data);
          Progress.hide();
        })
        .catch((error) => {
          message.error(error.response.statusText);
          Progress.hide();
        });
    };
    getData();
    // eslint-disable-next-line
  }, [filterData, refreshTable]);
  return state;
}

export default useAllGemOrigins;
