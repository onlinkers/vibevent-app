import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";

import "./index.scss";
import { Event } from "types/props";

interface Props {
  event: Event;
  // favorited?: boolean;
  // variant?: "detailed" | "brief";
  // loading?: boolean;
  // width?: string;
  // size?: string;
  // refetch?: Function;
  // [key: string]: any;
}

const SmallCard: React.FunctionComponent<Props> = (props) => {
  const { event } = props;
  const month = moment(event?.startDate).format("MMM DD");
  return (
    <>
      <div className="small-card">
        <img className="small-card-thumbnail" src={""} />
        <div className="small-card-description">
          <p className="description-date">{month}</p>
          <p className="description-title">
            {event?.name.slice(0, 35) + (event?.name.length > 35 ? "..." : "")}
          </p>
          <p className="description-host">UBC SISA</p>
        </div>
      </div>
    </>
  );
};

export default SmallCard;
