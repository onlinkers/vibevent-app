import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./index.scss";
import CalendarIcon from "./../../../assets/icons/calendar.svg";

interface Props {
  // title?: string;
  // width?: string;
  // size?: string;
  // refetch?: Function;
  // icon?: string;
  // [key: string]: any;
}

const UtilityCard: React.FunctionComponent<Props> = () => {
  return (
    <>
      <div className="quick-access-card">
        <h3 className="qa-card__title">Search by Date</h3>
        <div className="qa-card__icon">
          <img src={CalendarIcon} alt="" />
        </div>
      </div>
    </>
  );
};

export default UtilityCard;
