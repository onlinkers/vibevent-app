import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./index.scss";
import { Event } from "types/props";

interface Props {
    event: Event;
    favorited?: boolean;
    variant?: "detailed" | "brief";
    loading?: boolean;
    width?: string;
    size?: string;
    refetch?: Function;
    [key: string]: any;
}

export default class PreviewCard extends React.Component {
  render() {
    return (
      <div className="preview-card">
        <img className="preview-card-thumbnail" src=""/>
        <p className="preview-card-date">Jun 10</p>
        <p className="preview-card-title">Digital Marketing for Dummies</p>
        <p className="preview-card-tags">Online Experiences • Marketing • Technology</p>
      </div>
    );
  }
}

