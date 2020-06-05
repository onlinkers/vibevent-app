import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";

import {
  message,
  Button
} from "antd";
import ExploreBar from "components/layouts/exporeBar";
import EventForm from "components/forms/EventForm";

import "../index.css";
import { EventsPayload, EventCategoriesPayload } from "types/store";
import eventService from "services/eventService";

interface Props {
  events: EventsPayload;
  eventCategories: EventCategoriesPayload;
  loading: boolean;
  errors: {
    events?: string
    eventCategories?: string,
  };
  userId: string;
}

const EventEdit: React.FunctionComponent<Props> = (props) => {

  const { eventId } = useParams();
  const history = useHistory();

  const {
    events,
    eventCategories,
    loading,
    // errors,
    // userId
  } = props;

  const [eventLoaded, setEventLoaded] = useState(false);
  const [thisEvent, setThisEvent] = useState<any | null>(null);

  const handleSubmit = async (formValues) => {

    // TODO: A lot more fields (also for the form itself)
    const {
      coverPhoto: coverPhotoUrl,
      ticketLink: ticketLinkUrl,
      ...values
    } = formValues;

    const payload = {
      ...values,
      media: {},
      hosts: thisEvent.hosts
    };

    // TODO: Proper Image Uploading
    if(coverPhotoUrl) payload.media.coverPhoto = {
      baseSrc: coverPhotoUrl,
      size: {
        width: 100,
        height: 100
      }
    };

    // optional ticket link
    if(ticketLinkUrl) payload.links = {
      ticket: ticketLinkUrl
    };
    
    await eventService.setEvent({ id: eventId, payload });

    message.success("Event edited!");
    history.goBack();
  };

  useEffect(() => {
    if(eventId) {

      const searchEventInDB = async () => {
        const { data } = await eventService.getEventsByIds({ ids: [eventId] });
        const eventData = data ? Object.values(data)[0] : null;
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

  return eventLoaded ? (
    <React.Fragment>
      <ExploreBar />
      { thisEvent ? (
        <div className="Page--center Page--explore EventForm">
          <h1>Edit your event!</h1>
          <EventForm
            mode="EDIT"
            loading={loading}
            onSubmit={handleSubmit}
            eventCategories={eventCategories}
            initialValues={thisEvent ? {
              name: thisEvent.name,
              startDate: moment(thisEvent.startDate),
              endDate: moment(thisEvent.endDate),
              price: thisEvent.price,
              description: thisEvent.description,
              categories: thisEvent.categories,
              ticketLink: thisEvent.links?.ticket,
              venue: thisEvent.venue.name,
              venueCoordinates: thisEvent.venue.location,
              coverPhoto: thisEvent.media?.coverPhoto?.baseSrc,
              tags: thisEvent.tags?.hostTags
            } : {}}
          />
        </div>
      ) : (
        <div className="Page Error">
          <div className="text--unselectable">Data on the event you are trying to edit does not exist!</div>
          <Button type="primary" className="button--clickable" onClick={() => history.push("/event/create")}>Create a new event.</Button>
          <Button className="button--clickable" onClick={() => history.goBack()}>Go back.</Button>
        </div>
      )}
    </React.Fragment>
  ) : null;
};

const mapStateToProps = ({ eventData, userData }) => {
  return {
    events: eventData.events,
    eventCategories: eventData.eventCategories,
    loading: eventData.loading,
    errors: eventData.errors,
    userId: userData.user._id
  };
};

export default connect(mapStateToProps, null)(EventEdit);
