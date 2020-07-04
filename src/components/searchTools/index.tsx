import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import QuickToolCard from "components/searchTools/utilityCard/utilityCard";
import PreviewCard from "../cards/smallCard/smallCard";
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
        <div className="card-previews-section">
          <div className="card-previews-header">
            <h3>Previous Events</h3>
          </div>
          <div className="card-previews-container">
            <PreviewCard />
            <PreviewCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchTools;
