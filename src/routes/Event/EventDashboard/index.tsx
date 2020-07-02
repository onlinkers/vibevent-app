import React, { useEffect, useState, useRef } from "react";

import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  motion,
  useElementScroll,
  useMotionValue,
  useTransform,
} from "framer-motion";

import ExploreBar from "components/layouts/exporeBar";
import { Col, Row } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import EventCard from "components/cards/eventCard";
import SearchTools from "components/searchTools";
import EventCardLD from "components/cards/eventCardLargeDesktop";
import Sidebar from "components/layouts/sidebar/sidebar";

import "./index.scss";

import { EventsPayload } from "types/store";
import { fetchAllEvents } from "store/actions/eventActions";

interface Props {
  events: EventsPayload;
  loading: boolean;
  errors: {
    events?: string;
    eventCategories?: string;
  };
  fetchAllEvents: Function;
}

const EventDashboard: React.FunctionComponent<Props> = (props) => {
  const { events, loading, errors, fetchAllEvents } = props;

  const eventsArray = Object.values(events);

  const history = useHistory();

  const refreshPage = () => {
    history.push("/empty");
    history.goBack();
  };

  useEffect(() => {
    fetchAllEvents();
  }, []); // eslint-disable-line

  const hasErrors = errors.events || events.eventCategories;

  const x = useMotionValue(100);
  const opacity = useTransform(
    x,
    [0, -window.innerWidth / 2 - 0.1, -window.innerWidth / 2],
    [1, 1, 0]
  );

  // TODO: Lazy loading (don't load all events, you'll die)
  return (
    <React.Fragment>
      {/* {loading && (
        <div className="Page EventDashboard">
          <Row gutter={[16, 16]} className="dashboard-row">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <Col key={num} span={4} className="dashboard-col">
                <EventCard variant="detailed" loading={true} />
              </Col>
            ))}
          </Row>
        </div>
      )}
      {!loading &&
        (hasErrors ? (
          <div className="Page Error">
            <div onClick={refreshPage} className="button--clickable">
              <ReloadOutlined />
            </div>
            <div className="text--unselectable">{errors.events}</div>
            <div className="text--unselectable">{errors.eventCategories}</div>
          </div>
        ) : (
          ""
        ))} */}
      <div className="Page EventDashboard">
        <Sidebar />
        <div className="events-scroll">
          <div className="events-category">
            <h1 className="events-category__title">Online Experiences</h1>
            <div className="events-frame">
              <motion.div
                className="events-draggable"
                drag="x"
                dragConstraints={{
                  left: (-window.innerWidth / 2) * 1.2,
                  right: 0,
                }}
                dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
                style={{ x }}
              >
                {eventsArray.map((event) => {
                  return (
                    <EventCardLD
                      event={event}
                      key={event._id}
                      className="event-card"
                    ></EventCardLD>
                  );
                })}
              </motion.div>
              {/* <motion.div
                className="gradient-fade"
                style={{ opacity }}
              ></motion.div> */}
            </div>
          </div>
        </div>
        <div className="events-search">
          <SearchTools />
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = ({ eventData }) => {
  return {
    events: eventData.events,
    loading: eventData.loading,
    errors: eventData.errors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllEvents: () => dispatch(fetchAllEvents()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventDashboard);
