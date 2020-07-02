import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./index.css";
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
      <div>
        <p>preview card</p>
      </div>
    );
  }
}

