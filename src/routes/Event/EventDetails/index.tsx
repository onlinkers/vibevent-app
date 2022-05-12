import React from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import EventDetailsCard from "components/Event/cards/detailsCard";
import Navbar from "components/layouts/navbar";

import "./index.scss";

import { Event } from "types/props";
import { EventCategoriesPayload } from "types/store";

interface Props {
  event: Event;
  eventCategories: EventCategoriesPayload;
  userId: string;
}

const EventDetails: React.FunctionComponent<Props> = (props) => {

  const {
    // userId,
    event,
    eventCategories,
  } = props;

  const history = useHistory();

  const roomHandler = (link) => {
    history.push(`/room/${link}`);
  };

  return (
    <div className="Page EventDetails">
      <Navbar />
      <EventDetailsCard
        event={event}
        eventCategories={eventCategories}
        redirectToRoom={roomHandler}
        redirectBack={() => { history.push("/event/dashboard"); }}
        // allowEdit={event.hosts.map((host) => host._id).includes(userId)}
        allowEdit={true}
      />
    </div>
  );
};

const mapStateToProps = ({ eventData, userData }) => {
  return {
    eventCategories: eventData.eventCategories,
    userId: userData.user._id
  };
};

export default connect(mapStateToProps, {})(EventDetails);
