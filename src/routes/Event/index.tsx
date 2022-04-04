import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect, useHistory, useParams } from "react-router-dom";
import Navbar from "components/layouts/navbar";

import AuthRoute from "../AuthRoute";
import EventDashboard from "./EventDashboard";
import EventDetails from "./EventDetails";
import EventCreate from "./EventCreate";
import EventEdit from "./EventEdit";
import EventEditImages from "./EventEdit/images";
import Loading from "../Loading";
import NotFound from "../NotFound";
import QuickAccessMenu from "components/Event/searchTools";

// import { ReloadOutlined } from "@ant-design/icons";
import { Event } from "types/props";
import { EventsPayload } from "types/store";

import eventService from "services/eventService";
import { fetchAllEvents } from "store/actions/eventActions";

// const ErrorWithData = ({ refreshPage, errors }) => (
//   <div className="Page--full Error">
//     <div onClick={refreshPage} className="button--clickable"><ReloadOutlined /></div>
//     <div className="t--unselectable">{errors[0]}</div>
//     <div className="t--unselectable">{errors[1]}</div>
//   </div>
// );

interface Props2 {
  events: EventsPayload;
  userId: string;
}

const EventRoutesWithId: React.FunctionComponent<Props2> = (props) => {

  const { userId, events } = props;
  const { eventId } = useParams() as { eventId: string };
  const history = useHistory();

  const [eventLoaded, setEventLoaded] = useState(false);
  const [event, setThisEvent] = useState<Event | null>(null);

  useEffect(() => {
    if(eventId) {

      const searchEventInDB = async () => {
        const { data } = await eventService.getEventsByIds({ ids: [eventId] });
        const eventData = data ? (Object.values(data)[0] as Event) : null;
        if(!eventData) throw new Error("Data on the event you are trying to edit does not exist!");
        return eventData;
      };
      
      const reduxEvent = events[eventId];

      if(reduxEvent) { // if the event is found in redux
        setThisEvent(reduxEvent);
        setEventLoaded(true);
      }
      else { // if the event is not found in redux
        searchEventInDB()
          .then(setThisEvent)
          .catch(() => setThisEvent(null))
          .finally(() => setEventLoaded(true));
      }

    }    
  }, [eventId]); // eslint-disable-line

  return !eventLoaded ? <Loading /> : (
    event ? (
      <Switch>
        <AuthRoute path="/event/:eventId/edit" component={
          // Check if the user is permitted to edit the event
          event.hosts.map(host => host._id).includes(userId) ? (
            <EventEdit event={event} />
          ) : (
            <Redirect to="/forbidden"/>
          )
        } />
        <AuthRoute path="/event/:eventId/images" component={
          // Check if the user is permitted to edit the event's images
          event.hosts.map(host => host._id).includes(userId) ? (
            <EventEditImages event={event} />
          ) : (
            <Redirect to="/forbidden"/>
          )
        } />
        <Route path="/event/:eventId" render={() => <>
          <EventDetails event={event}/>
          <QuickAccessMenu events={events} />
        </>} />
      </Switch>
    ) : (
      <NotFound
        type="event"
        redirectString="Create an event!"
        redirectFunction={() => history.push("/event/create")}
        returnFunction={() => history.goBack()}
      />
    )
  );
};

const mapStateToProps2 = ({ eventData, userData }) => {
  return {
    userId: userData.user._id,
    events: eventData.events
  };
};

interface Props {
  loading: boolean;
  errors: {
    events?: string
    eventCategories?: string,
  };
}

const ConnectedEventRoutesWithId: React.FunctionComponent<Props> = connect(mapStateToProps2, null)(EventRoutesWithId);

const Events = (props) => {

  const {
    loading,
    // errors,
    fetchAllEvents,
  } = props;
  // const history = useHistory();

  // const hasErrors = errors.events || errors.eventCategories;

  // const refreshPage = () => {
  //   history.push("/empty");
  //   history.goBack();
  // };

  // Dashboard needs refreshing when opened
  useEffect(() => {
    fetchAllEvents();
  }, []); // eslint-disable-line

  return <>
    <Navbar/>
    {loading ? <Loading /> : (
      // hasErrors ? (
      //   <ErrorWithData refreshPage={refreshPage} errors={Object.values(errors)} />
      // ) : (
      <Switch>
        <Route path="/event/dashboard" component={EventDashboard} />
        <AuthRoute path="/event/create" component={<EventCreate />} />
        <Route path="/event/:eventId" component={ConnectedEventRoutesWithId} />
      </Switch>
      // )
    )}
  </>;
};

const mapStateToProps = ({ eventData }) => {
  return {
    loading: eventData.loading,
    errors: eventData.errors
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllEvents: () => dispatch(fetchAllEvents())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Events);
