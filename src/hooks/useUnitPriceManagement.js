import { message } from "antd";
import { useEffect, useState } from "react";
import Progress from "react-progress-2";
import { PostDataAuth } from "../apiService/PostData";
import { apis } from "../properties";
import { useRefreshTable } from "../store";

function useUnitPriceManagement(filterData) {
  const [state, setState] = useState([]);
  const refreshTable = useRefreshTable((state) => state.refreshTable);

  useEffect(() => {
    const getData = () => {
      Progress.show();
      PostDataAuth(apis.UNIT_PRICE_MANAGE_LIST, filterData).then((result) => {
        let responseJson = result;
        if (responseJson.status === "success") {
          setState(responseJson.data);
          Progress.hide();
        } else if (responseJson.status === "error") {
          message.error(responseJson.message);
          Progress.hide();
        }
      });
    };
    getData();
    // eslint-disable-next-line
  }, [filterData,refreshTable]);
  return state;
}

export default useUnitPriceManagement;
