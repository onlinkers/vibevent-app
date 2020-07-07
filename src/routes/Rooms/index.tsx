import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Sidebar from "components/layouts/sidebar/sidebar";
import NotFound from "routes/NotFound";

import { Spin } from "antd";

interface Props {

}

const Room: React.FunctionComponent<Props> = () => {

  const { roomId } = useParams();

  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {

    // eslint-disable-next-line
    console.log("roomId", { roomId });
    setLoaded(true);
    if(!roomId) setError(true);

  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="Page EventDetails">
      <Sidebar />
      {!loaded && (
        <div className="Page--full Loader">
          <Spin />
        </div>
      )}
      {loaded && (
        error ? (
          <NotFound type="room"/>
        ) : (
          <>Entering room with id {roomId}</>
        )
      )}
    </div>
  );
};

export default Room;
