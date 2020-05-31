import React from "react";
import { connect } from "react-redux";

import ExploreBar from "components/layouts/exporeBar";

import "./index.css";

import { EventsPayload } from "types/store";

interface Props {
  events: EventsPayload;
}

const EventDashboard: React.FunctionComponent<Props> = ({ events }) => {
  
  const eventsArray = Object.values(events);

  return (
    <React.Fragment>
      <ExploreBar />
      <div className="Page Page--explore EventDashboard">
        <div>Dashboard</div>
        <ul>
          {eventsArray.map((event) => ( 
            <li key={event._id}>
              <div>{event.name}</div>
              <div>{event.description}</div>
              <div>{event.venue.name}</div>
              <div>{event.endDate}</div>
            </li>
          ))}
        </ul>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = ({ eventData }) => {
  return {
    events: eventData.events
  };
};

export default connect(mapStateToProps, null)(EventDashboard);
