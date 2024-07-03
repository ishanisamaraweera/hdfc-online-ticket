import { message } from "antd";
import { useEffect, useState } from "react";
import Progress from "react-progress-2";
import { apis } from "../properties";
import { useRefreshTable } from "../store";
import axiosInstance from "../util/axiosInstance";
import axios from "axios";

function useAllTickets() {
  const [state, setState] = useState([]);

  useEffect(() => {
    const getData = () => {
     
      Progress.show();
      axios.get("http://localhost:8080/getTicket")
        .then((result) => {
          let responseJson = result;
          setState(responseJson.data);
          Progress.hide();
        })
        .catch((error) => {
          // message.error(error.response.data.message);
          console.log(error);
          Progress.hide();
        });
    };
    getData();
    // eslint-disable-next-line
  }, []);
  return state;
}

export default useAllTickets;
