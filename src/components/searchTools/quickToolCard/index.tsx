import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./index.scss";
import CalendarIcon from "./../../../assets/icons/calendar.svg";

interface Props {
    title: string;
    width?: string;
    size?: string;
    refetch?: Function;
    icon?: string;
    [key: string]: any;
}

export default class QuickToolCard extends React.Component {
  render() {
    return (
      <div>
        <div className="card">
          <h3 className="card-title">Search by Date</h3>
          <div className="card-icon">
            <img src={CalendarIcon} alt="calendar-logo" />
          </div>
        </div>
      </div>
    );
  }
}