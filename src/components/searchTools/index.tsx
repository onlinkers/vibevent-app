import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import QuickToolCard from "./quickToolCard";
import PreviewCard from "./previewCard";
import { Event } from "types/props";
import { EventsPayload } from "types/store";
import "./index.scss";

interface Props {
  events: EventsPayload;
  loading?: boolean;
  errors?: {
    events?: string;
    eventCategories?: string;
  };
  fetchAllEvents?: Function;
}

const SearchTools: React.FunctionComponent<Props> = (props) => {
  const { events, loading, errors, fetchAllEvents } = props;

  return (
    <>
      <div className="search-tools">
        <div className="quick-access-container">
          <QuickToolCard />
          <QuickToolCard />
          <QuickToolCard />
          <QuickToolCard />
        </div>
        <div className="search-preview-container">
          <PreviewCard />
          <PreviewCard />
          <PreviewCard />
          <PreviewCard />
        </div>
      </div>
    </>
  );
};

export default SearchTools;
