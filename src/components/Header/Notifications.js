import { BellOutlined } from "@ant-design/icons";
import { Badge } from "antd";
import React, { useState } from "react";

const Notifications = () => {

  const [notifications, setNotifications] = useState(0);

  // const [filterData] = useState({
  //   page: 1,
  //   pageSize: 10,
  //   status: 13,
  //   dataTable: true,
  // });

  // useEffect(() => {
  //     if (coursesList.length !== 0) {
  //       setNotifications(coursesList.total);
  //     }
  // }, [coursesList]);
  return (
    <>
      <Badge size="small" count={notifications}>
        <BellOutlined />
      </Badge>
    </>
  );
};

export default Notifications;
