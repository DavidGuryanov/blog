import React from "react";
import "./loading.css";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import "antd/dist/antd.css";

const icon = <LoadingOutlined style={{ fontSize: 86 }} spin />;

const Loading = () => {
  return (
    <div className={"loading-container"}>
      <Spin indicator={icon} size="large" />
    </div>
  );
};

export default Loading;
