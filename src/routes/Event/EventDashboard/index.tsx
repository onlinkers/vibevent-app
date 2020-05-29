import React from "react";
import { EventsPayload } from "types/store";

import ExploreBar from "components/layouts/exporeBar";

interface Props {
  events: EventsPayload;
}

const EventDashboard: React.FunctionComponent<Props> = ({ events }) => {
  
  const eventsArray = Object.values(events);

  return (
    <div>
      <ExploreBar/>
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
  );
};

export default EventDashboard;
