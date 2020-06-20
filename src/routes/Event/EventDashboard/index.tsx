import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import ExploreBar from "components/layouts/exporeBar";
import { Col, Row } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import EventCard from "components/cards/eventCard";
import EventCardLD from "components/cards/eventCardLargeDesktop";

import "./index.css";

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
  console.log(eventsArray);

  const history = useHistory();

  const refreshPage = () => {
    history.push("/empty");
    history.goBack();
  };

  useEffect(() => {
    fetchAllEvents();
  }, []); // eslint-disable-line

  const [isDesktop, setisDesktop] = useState(false);

  const updateSize = () => {
    setisDesktop(window.innerWidth > 1400);
  };

  useEffect(() => {
    updateSize();
    window.addEventListener("resize", updateSize);
  }, [isDesktop]);

  const hasErrors = errors.events || events.eventCategories;

  // TODO: Lazy loading (don't load all events, you'll die)
  return (
    <React.Fragment>
      {loading && (
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
          <div className="Page EventDashboard">
            {/* <Row gutter={[16, 16]} className="dashboard-row">
              {eventsArray.map((event) => (
                <Col key={event._id} span={4} className="dashboard-col">
                  <EventCard
                    variant="detailed"
                    event={event}
                    refetch={fetchAllEvents}
                  />
                </Col>
              ))}
            </Row> */}
            {isDesktop ? (
              <>
                <h1>Online Experiences</h1>
                <div className="events-frame">
                  {eventsArray.map((event) => {
                    return (
                      <EventCardLD
                        event={event}
                        key={event._id}
                        className="event-card"
                      >
                        test
                      </EventCardLD>
                    );
                  })}
                  <div className="gradient-fade"></div>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        ))}
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
