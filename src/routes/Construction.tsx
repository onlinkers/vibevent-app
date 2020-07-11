import React from "react";
import { useHistory } from "react-router-dom";
import { Button, Empty } from "antd";

import Sidebar from "components/layouts/Sidebar";

const Construction = () => {
  const history = useHistory();
  return (
    <div className="Page--full--center" style={{ flexDirection: "column" }}>
      <Sidebar />
      <Empty description={false}>
        Page is Under Construction!!
      </Empty>
      <br />
      <Button type="primary" onClick={() => history.push("/")}>Home</Button>
      <Button type="default" onClick={() => history.goBack()}>Go Back</Button>
    </div>
  );
};

export default Construction;
