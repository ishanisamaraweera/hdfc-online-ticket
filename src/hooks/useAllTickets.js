import { message } from "antd";
import { useEffect, useState } from "react";
import Progress from "react-progress-2";
import { apis } from "../properties";
import { useRefreshTable } from "../store";
import axiosInstance from "../util/axiosInstance";
import axios from "axios";

function useAllTickets() {
  const [state, setState] = useState([]);  
  const [username] = useState(localStorage.getItem("username"));

  useEffect(() => {
    const getData = () => {
     
      Progress.show();
      axios.get(`http://localhost:8080/getTicket/${username}`)
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

export default useAllTickets;
