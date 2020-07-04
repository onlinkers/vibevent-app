import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import QuickToolCard from "components/searchTools/utilityCard/utilityCard";
import SmallCard from "../cards/smallCard/smallCard";
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

const QuickAccessMenu: React.FunctionComponent<Props> = (props) => {
  const { events, loading, errors, fetchAllEvents } = props;
  const eventsArray = Object.values(events).slice(1, 5);

  return (
    <>
      <div className="quick-access">
        <div className="quick-access-container">
          <QuickToolCard />
          <QuickToolCard />
          <QuickToolCard />
          <QuickToolCard />
        </div>
        <div className="card-previews-section">
          <div className="card-previews-header">
            <h3>Previously Viewed</h3>
          </div>
          <div className="card-previews-container">
            <SmallCard event={eventsArray[0]} />
            <SmallCard event={eventsArray[1]} />
          </div>
        </div>
      </div>
    </>
  );
};

export default QuickAccessMenu;
