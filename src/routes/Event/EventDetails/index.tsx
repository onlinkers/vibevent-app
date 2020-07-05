import React from "react";
import { useParams, Link } from "react-router-dom";
import { connect } from "react-redux";

import { Button } from "antd";

import { EventsPayload, EventCategoriesPayload } from "types/store";

interface Props {
  events: EventsPayload;
  eventCategories: EventCategoriesPayload;
  loading: boolean;
  errors: {
    events?: string
    eventCategories?: string,
  };
}

const EventDetails: React.FunctionComponent<Props> = (props) => {

  const {
    events,
    eventCategories,
    loading,
    errors
  } = props;

  const { eventId } = useParams();
  
  const event = events[eventId];

  return event ? (
    <div>
      Event Details for event: {eventId}
      <h1>{event.name}</h1>
      <p>{event.description}</p>
      <div>
        <div>{event.startDate} - {event.endDate}</div>
        <div>{event.venue.name}</div>
      </div>
      Categories:
      <ul>
        {event.categories.map((category) =>
          <li key={category} className="t--capitalize">{eventCategories[category]}</li>
        )}
      </ul>
      Rooms:
      <ul>
        {event.rooms?.map((room) =>
          <li key={room.roomId}>
            <Link to={`/event/${eventId}/room/${room.roomId}`} target="_blank">
              <Button>{room.name || "Event Room"}</Button>
            </Link>
          </li>
        )}
      </ul>
    </div>
  ) : <div>Event not found</div>;
};


const mapStateToProps = ({ eventData }) => {
  return {
    events: eventData.events,
    eventCategories: eventData.eventCategories,
    loading: eventData.loading,
    errors: eventData.errors
  };
};

export default connect(mapStateToProps, {})(EventDetails);
