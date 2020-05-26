import React from "react";
import { connect } from "react-redux";
import { EventListLoading } from "types/store";

interface DispatchProps {
  eventData: EventListLoading;
}

const Dashboard: React.FunctionComponent<DispatchProps> = ({ eventData }) => {
  console.log(eventData);
  const eventList = eventData.events.map((event) => {
    return (
      <li key={event._id}>
        {event.name}
        <ul>
          <li>{event.description}</li>
          <li>{event.venue.name}</li>
          <li>{event.endDate}</li>
        </ul>
      </li>
    );
  });
  return (
    <div>
      <div>dashboard</div>
      <ul>{eventList}</ul>
    </div>
  );
};

const mapStateToProps = ({ eventData }) => {
  return {
    eventData: eventData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
