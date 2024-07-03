import { Tooltip } from "antd";
import React from "react";
import { MdOutlineRefresh } from "react-icons/md";
import { useRefreshTable } from "../store";

const RefreshTable = () => {
  const setRefreshTable = useRefreshTable((state) => state.setRefreshTable);
  const refreshTable = useRefreshTable((state) => state.refreshTable);

  return (
    <Tooltip placement="bottom" title="Refresh">
      <MdOutlineRefresh
        className="refreshBtn"
        onClick={() => setRefreshTable(!refreshTable)}
      />
    </Tooltip>
  );
};

export default RefreshTable;
