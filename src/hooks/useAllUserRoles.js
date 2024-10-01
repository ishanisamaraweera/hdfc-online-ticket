import { message } from "antd";
import { useEffect, useState } from "react";
import Progress from "react-progress-2";
import { apis } from "../properties";
import { useRefreshTable } from "../store";
import axios from "axios";

function useAllUserRoles() {
  const [state, setState] = useState([]);

  useEffect(() => {
    const getData = () => {     
      Progress.show();
      axios.get(`${apis.GET_ALL_USER_ROLES}`)
        .then((result) => {
          let responseJson = result;
          setState(responseJson.data);
          Progress.hide();
        })
        .catch((error) => {
          Progress.hide();
        });
    };
    getData();
  }, []);
  return state;
}

export default useAllUserRoles;