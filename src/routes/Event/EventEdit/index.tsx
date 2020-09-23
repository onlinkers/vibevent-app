import React, { useState, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";

import popup from "popup";
import { Divider } from "antd";
import EventForm from "components/Event/form";
import EventDetailsCard from "components/Event/cards/detailsCard";

import { ThemeContext } from "context/ThemeContext";

import "../form.scss";
import { Event } from "types/props";
import { EventCategoriesPayload } from "types/store";

import eventService from "services/eventService";
import { fetchAllEvents } from "store/actions/eventActions";

interface Props {
  event: Event;
  eventCategories: EventCategoriesPayload;
  fetchAllEvents: Function;
}

const EventEdit: React.FunctionComponent<Props> = ({ event, eventCategories, fetchAllEvents }) => {

  const { eventId } = useParams() as { eventId: string };
  const history = useHistory();
  const { breakpoint } = useContext(ThemeContext);

  const [thisEvent, setThisEvent] = useState(event);

  const handleSubmit = async (formValues) => {

    const { venueName, date, links = [], tags, room, ...rest } = formValues;

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
    fetchAllEvents();

    popup.success("Event changes saved!");
    history.goBack();

  };

  const handleDelete = async () => {

    const eventId = thisEvent._id;
    
    await eventService.deleteEvent({ id: eventId });
    fetchAllEvents();

    popup.success("Event deleted!");
    history.push("/event/dashboard");

  };

  const handleFormChange = (changedValues, allValues) => {

    const {
      date = null,
      venueName = thisEvent?.venue.name,
      tags: hostTags = thisEvent?.tags?.hostTags,

      // name, price, description, categories
      ...rest
    } = changedValues;

    let links = [];
    if(changedValues.links && allValues.links) links = allValues.links;

    let rooms = [];
    if(changedValues.rooms && allValues.rooms) rooms = allValues.rooms;

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
      },
      links,
      rooms
    };

    setThisEvent(newFormFields);
    
  };

  return (
    <div className="Page EventForm">
      {breakpoint === "mobile" && <div className="mobile-title"><h1>Edit Your Event!</h1></div>}
      <div className="event-edit-form">
        {breakpoint !== "mobile" && <><h1>Edit Your Event!</h1><Divider/></>}
        <EventForm
          mode="EDIT"
          onChange={handleFormChange}
          onSubmit={handleSubmit}
          onDelete={handleDelete}
          eventCategories={eventCategories}
          initialValues={{
            name: thisEvent.name,
            date: [moment(thisEvent.startDate), moment(thisEvent.endDate)],
            price: thisEvent.price,
            description: thisEvent.description,
            categories: thisEvent.categories,
            links: thisEvent.links,
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
    </div>
  );
};

const mapStateToProps = ({ eventData }) => {
  return {
    eventCategories: eventData.eventCategories
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllEvents: () => dispatch(fetchAllEvents())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventEdit);
