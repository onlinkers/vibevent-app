import React, { useEffect } from "react";
import { connect } from "react-redux";

import ExploreBar from "components/layouts/exporeBar";
import { Col, Row } from "antd";
import EventCard from "components/cards/eventCard";

import "./index.css";

import { EventsPayload } from "types/store";
import { fetchAllEvents } from "store/actions/eventActions";

interface Props {
  events: EventsPayload;
  loading: boolean;
  errors: {
    events?: string;
    eventCategories?: string;
  }
  fetchAllEvents: Function;
}

const EventDashboard: React.FunctionComponent<Props> = (props) => {
  
  const {
    events,
    loading,
    errors,
    fetchAllEvents
  } = props;

  // Netlify temporary fix for when events and eventcategories are strings
  const eventsArray = typeof events === "object" && events !== null ? Object.values(events) : [];
  const { events: eventsError } = errors;

  useEffect(() => {
    fetchAllEvents();
  }, []); // eslint-disable-line

  // TODO: Lazy loading (don't load all events, you'll die)
  return (
    <React.Fragment>
      <ExploreBar />
      <div className="Page Page--explore EventDashboard">
        <Row gutter={[16, 16]} className="dashboard-row">
          {eventsArray.map((event) => ( 
            <Col key={event._id} span={4} className="dashboard-col">
              <EventCard
                variant="detailed"
                event={event}
                loading={!!eventsError || loading}
                refetch={fetchAllEvents}
              />
            </Col>
          ))}
        </Row>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = ({ eventData }) => {
  return {
    events: eventData.events,
    loading: eventData.loading,
    errors: eventData.errors
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllEvents: () => dispatch(fetchAllEvents()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventDashboard);
