import React, { useState, useContext, useMemo } from "react";
import { useHistory, useParams } from "react-router-dom";
import { connect } from "react-redux";
import momentz from "moment-timezone";

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
import { arrayEqualCheck } from "utils";

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

  const eventHostIds = useMemo(() => event.hosts.map((host) => host._id), [event]);

  const handleSubmit = async (formValues) => {

    const { venueName, date, links = [], tags, rooms, ...rest } = formValues;

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
      rooms,
      tags: {
        ...thisEvent?.tags,
        hostTags: tags
      },
    };

    // TODO: Proper Image Uploading

    await eventService.setEvent({ id: eventId, payload });

    // check if hosts need to be updated (order matters)
    if(!arrayEqualCheck(formValues.hosts, eventHostIds, true)) {
      await eventService.updateEventHost({ id: eventId, payload: { hosts: formValues.hosts } });
    }

    fetchAllEvents();

    popup.success("Event changes saved!");
    history.push(`/event/${eventId}`);

  };

  const handleDelete = async () => {

    const eventId = thisEvent._id;
    
    await eventService.deleteEvent({ id: eventId });
    fetchAllEvents();

    popup.success("Event deleted!");
    history.push("/event/dashboard");

  };

  const handleCancel = async () => {

    history.push(`/event/${eventId}`);

  };

  const handleFormChange = (changedValues, allValues) => {

    const {
      date = null,
      venueName = thisEvent?.venue.name,
      tags: hostTags = thisEvent?.tags?.hostTags,

      // name, price, description, categories
      ...rest
    } = changedValues;

    let links = thisEvent.links|| [];
    if(changedValues.links && allValues.links) links = allValues.links;

    let rooms = thisEvent.rooms|| [];
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
          onCancel={handleCancel}
          onDelete={handleDelete}
          eventCategories={eventCategories}
          eventHosts={thisEvent.hosts}
          initialValues={{
            hosts: eventHostIds,
            name: thisEvent.name,
            date: [momentz(thisEvent.startDate), momentz(thisEvent.endDate)],
            price: thisEvent.price,
            description: thisEvent.description,
            categories: thisEvent.categories,
            links: thisEvent.links,
            rooms: thisEvent.rooms,
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
