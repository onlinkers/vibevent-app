import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";

import {
  message,
  Button,
} from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import EventForm from "components/Event/form";
import EventDetailsCard from "components/Event/cards/detailsCard";
import Navbar from "components/layouts/navbar";

import "../form.scss";
import { EventsPayload, EventCategoriesPayload } from "types/store";
import { Event } from "types/props";
import eventService from "services/eventService";

interface Props {
  events: EventsPayload;
  eventCategories: EventCategoriesPayload;
  loading: boolean;
  errors: {
    events?: string
    eventCategories?: string,
  };
}

const EventEdit: React.FunctionComponent<Props> = (props) => {

  const { eventId } = useParams();
  const history = useHistory();

  const {
    events,
    eventCategories,
    loading,
    errors
  } = props;

  const [eventLoaded, setEventLoaded] = useState(false);
  const [thisEvent, setThisEvent] = useState<Event | null>(null);

  const refreshPage = () => {
    history.push("/empty");
    history.goBack();
  };

  const handleSubmit = async (formValues) => {

    const { venueName, date, link, tags, room, ...rest } = formValues;

    // links need to be re-organized
    const links = {};
    link.forEach((l) => { links[l.type] = l.url; });

    const payload = {
      ...thisEvent,
      ...rest,
      // venue needs its own object (including the coordinates)
      venue: {
        ...thisEvent?.venue,
        name: venueName
      },
      // Dates need to be in ISO form
      startDate: date[0].toISOString(),
      endDate: date[1].toISOString(),
      links,
      rooms: room,
      tags: {
        ...thisEvent?.tags,
        hostTags: tags
      },
    };

    delete payload._id;
    delete payload.hosts;
    delete payload.createdAt;
    delete payload.updatedAt;

    // TODO: Proper Image Uploading
    
    await eventService.setEvent({ id: eventId, payload });

    message.success("Event edited!");
    history.goBack();

  };

  const handleFormChange = (changedValues) => {

    // TODO: Find a way/or dont even bother render-ing link/room changes in the form
    if(changedValues.link) return;
    else if (changedValues.room) return;

    const {
      date = null,
      venueName = thisEvent?.venue.name,
      tags: hostTags = thisEvent?.tags?.hostTags,

      // name, price, description, categories
      ...rest
    } = changedValues;

    const startDate = (date && date[0]) || thisEvent?.startDate;
    const endDate = (date && date[1]) || thisEvent?.endDate;

    const newFormFields = {
      // hosts, rating, media
      ...thisEvent,
      ...rest,
      startDate,
      endDate,
      venue: {
        name: venueName
      },
      tags: {
        ...thisEvent?.tags,
        hostTags,
      }
    };

    setThisEvent(newFormFields);
    
  };

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
  }, []); // eslint-disable-line

  const hasErrors = errors.events || events.eventCategories;
  const loaded = eventLoaded && !loading;

  return (
    <div className="Page EventForm">
      <Navbar />
      {!loaded && <div className="Page--full Loader">Loading...</div>}
      {loaded && (hasErrors ? (
        <div className="Page--full Error">
          <div onClick={refreshPage} className="button--clickable"><ReloadOutlined /></div>
          <div className="t--unselectable">{errors[0]}</div>
          <div className="t--unselectable">{errors[1]}</div>
        </div>
      ) : (
        thisEvent ? (
          <>
            <div className="event-edit-form">
              <h1>Edit your event!</h1>
              <EventForm
                mode="EDIT"
                onChange={handleFormChange}
                onSubmit={handleSubmit}
                eventCategories={eventCategories}
                initialValues={{
                  name: thisEvent.name,
                  date: [moment(thisEvent.startDate), moment(thisEvent.endDate)],
                  price: thisEvent.price,
                  description: thisEvent.description,
                  categories: thisEvent.categories,
                  link: thisEvent.links && Object.entries(thisEvent.links).map(([type, url]) => ({ type, url })),
                  room: thisEvent.rooms,
                  venueName: thisEvent.venue.name,
                  // venueCoordinates: thisEvent.venue.location, // TODO
                  tags: thisEvent.tags?.hostTags
                }}
              />
            </div>
            <EventDetailsCard
              event={thisEvent}
              eventCategories={eventCategories}
              redirects={false}
            />
          </>
        ) : (
          <div className="Page--full Error">
            <div className="t--unselectable">Data on the event you are trying to edit does not exist!</div>
            <Button type="primary" className="button--clickable" onClick={() => history.push("/event/create")}>Create a new event.</Button>
            <Button className="button--clickable" onClick={() => history.goBack()}>Go back.</Button>
          </div>
        )))}
    </div>
  );
};

const mapStateToProps = ({ eventData }) => {
  return {
    events: eventData.events,
    eventCategories: eventData.eventCategories,
    loading: eventData.loading,
    errors: eventData.errors
  };
};

export default connect(mapStateToProps, null)(EventEdit);
