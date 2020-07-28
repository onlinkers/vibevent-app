import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { connect } from "react-redux";

import EventDetailsCard from "components/Event/cards/detailsCard";
import QuickAccessMenu from "components/Event/searchTools";
import Navbar from "components/layouts/navbar";
import NotFound from "routes/NotFound";

import { Spin } from "antd";
import "./index.scss";

import { EventsPayload, EventCategoriesPayload } from "types/store";

interface Props {
  events: EventsPayload;
  eventCategories: EventCategoriesPayload;
  loading?: boolean;
  userId: string;
}

const EventDetails: React.FunctionComponent<Props> = (props) => {

  const {
    userId,
    events,
    eventCategories,
    loading,
  } = props;

  const history = useHistory();

  const { eventId } = useParams();
  const event = events[eventId];

  const roomHandler = (roomId) => {
    history.push(`/room/${roomId}`);
  };

  return (
    <div className="Page EventDetails">
      <Navbar />
      {loading && (
        <div className="Page--full Loader">
          <Spin />
        </div>
      )}
      {!loading && event && (
        <>
          <EventDetailsCard
            event={event}
            eventCategories={eventCategories}
            redirectToRoom={roomHandler}
            redirectBack={() => { history.push("/event/dashboard"); }}
            allowEdit={event.hosts.map((host) => host._id).includes(userId)}
          />
          <QuickAccessMenu events={events} />
        </>
      )}
      { !loading && !event && <NotFound type="event"/> }
    </div>
  );
};


const mapStateToProps = ({ eventData, userData }) => {
  return {
    userId: userData.user._id,
    events: eventData.events,
    eventCategories: eventData.eventCategories,
    loading: eventData.loading,
  };
};

export default connect(mapStateToProps, {})(EventDetails);
