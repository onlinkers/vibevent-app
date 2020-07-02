import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import QuickToolCard from "./quickToolCard";
import PreviewCard from "./previewCard";
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

export default class SearchTools extends React.Component {
  render() {
    return (
      <div className="search-tools">
        <QuickToolCard />
        <PreviewCard />
      </div>
    );
  }
}

