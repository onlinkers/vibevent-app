import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
// import { motion, useMotionValue, useTransform } from "framer-motion";

import QuickAccessMenu from "components/Event/searchTools";
import LargeEventCard from "components/Event/cards/largeCard";
import MediumEventCard from "components/Event/cards/mediumCard";
import SmallEventCard from "components/Event/cards/smallCard";

import "./index.scss";

import { EventsPayload } from "types/store";
import { User } from "types/props";
import { ThemeContext } from "context/ThemeContext";
import { saveUserData } from "store/actions/userActions";
import userService from "services/userService";

interface Props {
  user: User;
  events: EventsPayload;
  saveUserData: Function;
}

const EventDashboard: React.FunctionComponent<Props> = (props) => {
  const {
    events,
    saveUserData,
    user,
  } = props;
  const { breakpoint } = useContext(ThemeContext);

  const eventsArray = Object.values(events);

  const history = useHistory();

  const redirectToEvent = (eventId) => {
    history.push(`/event/${eventId}`);
  };

  const saveEvent = async (eventId, save) => {
    let newSavedEvents = user.eventsSaved || [];
    let newSavedEventIds = user.eventsSaved
      ? user.eventsSaved.map((savedEvent) => savedEvent._id)
      : [];
    if (save && !newSavedEventIds.includes(eventId)) {
      newSavedEventIds.push(eventId);
      newSavedEvents.push(events[eventId]);
    } else {
      newSavedEventIds = newSavedEventIds.filter((id) => id !== eventId);
      newSavedEvents = newSavedEvents.filter((e) => e._id !== eventId);
    }

    await userService.saveEvent({
      id: user._id,
      payload: { eventsSaved: newSavedEventIds },
    });
    saveUserData({ ...user, eventsSaved: newSavedEvents });
  };

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
      {breakpoint === "mobile" ? (
        <div className="mobile-view">
          <div className="page-header">
            <h1>Dashboard</h1>
          </div>
          <div className="page-contents">
            <div className="events-category">
              <h5>Suggested For You</h5>
              <div className="events-frame">
                {eventsArray.map((event) => {
                  return (
                    <MediumEventCard
                      event={event}
                      key={event._id}
                      onClick={() => {
                        redirectToEvent(event._id);
                      }}
                      saved={
                        user.eventsSaved &&
                          !!user.eventsSaved.find(
                            (savedEvent) => String(event._id) === savedEvent._id
                          )
                      }
                      onSaveClick={saveEvent}
                    ></MediumEventCard>
                  );
                })}
              </div>
            </div>
            <div className="events-category">
              <h5>Online Experiences</h5>
              <div className="events-frame">
                {eventsArray.map((event) => {
                  return (
                    <SmallEventCard
                      event={event}
                      key={event._id}
                      onClick={() => {
                        redirectToEvent(event._id);
                      }}
                    ></SmallEventCard>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="desktop-view">
          <div className="events-scroll">
            <div className="events-category">
              <h1 className="events-category__title">Online Experiences</h1>
              <div className="events-frame--no-scroll">
                {eventsArray.map((event) => {
                  return (
                    <LargeEventCard
                      event={event}
                      key={event._id}
                      saved={
                        user.eventsSaved &&
                          !!user.eventsSaved.find(
                            (savedEvent) => String(event._id) === savedEvent._id
                          )
                      }
                      className="event-card"
                      onClick={() => {
                        redirectToEvent(event._id);
                      }}
                      onSaveClick={saveEvent}
                    ></LargeEventCard>
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
          <h1 className="page-label">Activity<br />Dashboard</h1>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({ eventData, userData }) => {
  return {
    user: userData.user,
    events: eventData.events
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveUserData: (userData) => dispatch(saveUserData(userData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventDashboard);
