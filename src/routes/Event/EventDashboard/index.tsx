import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
// import { motion, useMotionValue, useTransform } from "framer-motion";

import QuickAccessMenu from "components/searchTools";
import EventCard from "components/cards/largeCard/eventCard";
import Sidebar from "components/layouts/sidebar/sidebar";

import "./index.scss";

import { EventsPayload } from "types/store";
import { fetchAllEvents } from "store/actions/eventActions";
import { Spin } from "antd";
import { ReloadOutlined } from "@ant-design/icons";

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

  const eventsArray = Object.values(events).slice(1, 5);

  const history = useHistory();

  const refreshPage = () => {
    history.push("/empty");
    history.goBack();
  };

  useEffect(() => {
    fetchAllEvents();
  }, []); // eslint-disable-line

  const hasErrors = errors.events || events.eventCategories;
  // const hasErrors = true;

  // const x = useMotionValue(0);
  // const opacityRight = useTransform(
  //   x,
  //   [0, (-window.innerWidth / 2) * 1.25 - 20, (-window.innerWidth / 2) * 1.25],
  //   [1, 1, 0]
  // );
  // const opacityLeft = useTransform(
  //   x,
  //   [0, 20, (-window.innerWidth / 2) * 1.25],
  //   [0, 1, 1]
  // );

  // TODO: Lazy loading (don't load all events, you'll die)
  return (
    <div className="Page EventDashboard">
      <Sidebar />
      {loading && (
        <div className="Page Error">
          <Spin />
        </div>
      )}
      {!loading &&
        (hasErrors ? (
          <React.Fragment>
            <div onClick={refreshPage} className="button--clickable">
              <ReloadOutlined />
            </div>
            <div className="text--unselectable">{errors.events}</div>
            <div className="text--unselectable">{errors.eventCategories}</div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="events-scroll">
              <div className="events-category">
                <h1 className="events-category__title">Online Experiences</h1>
                <div className="events-frame--no-scroll">
                  {eventsArray.map((event) => {
                    return (
                      <EventCard
                        event={event}
                        key={event._id}
                        className="event-card"
                      ></EventCard>
                    );
                  })}
                </div>
                {/* FUTURE FEATURE: do not delete */}
                {/* <div className="events-frame">
                  <motion.div
                    className="events-draggable"
                    drag="x"
                    dragConstraints={{
                      left: (-window.innerWidth / 2) * 1.25,
                      right: 0,
                    }}
                    dragTransition={{ bounceStiffness: 300, bounceDamping: 50 }}
                    style={{ x }}
                  >
                    {eventsArray.map((event) => {
                      return (
                        <EventCard
                          event={event}
                          key={event._id}
                          className="event-card"
                        ></EventCard>
                      );
                    })}
                  </motion.div>
                </div>
                <motion.div
                  className="gradient-fade gradient-fade-right"
                  style={{ opacity: opacityRight }}
                ></motion.div>
                <motion.div
                  className="gradient-fade gradient-fade-left"
                  style={{ opacity: opacityLeft }}
                ></motion.div> */}
              </div>
            </div>
            <QuickAccessMenu events={events} />
            <h1 className="page-label">
              Activity
              <br />
              Dashboard
            </h1>
          </React.Fragment>
        ))}
    </div>
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
