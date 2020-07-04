import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./index.scss";
import { Event } from "types/props";

interface Props {
  // event: Event;
  // favorited?: boolean;
  // variant?: "detailed" | "brief";
  // loading?: boolean;
  // width?: string;
  // size?: string;
  // refetch?: Function;
  // [key: string]: any;
}

const SmallCard: React.FunctionComponent<Props> = () => {
  return (
    <>
      <div className="small-card">
        <img className="small-card-thumbnail" src={""} />
        <div className="small-card-description">
          <p className="description-date">Jun 10</p>
          <p className="description-title">Digital Marketing for Dummies</p>
          <p className="description-host">UBC SISA</p>
        </div>
      </div>
    </>
  );
};

export default SmallCard;
