import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";

import popup from "popup";
import EventForm from "components/Event/form";
import EventDetailsCard from "components/Event/cards/detailsCard";

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

  const { eventId } = useParams();
  const history = useHistory();

  const [thisEvent, setThisEvent] = useState(event);

  const handleSubmit = async (formValues) => {

    const { venueName, date, link, tags, room, ...rest } = formValues;

    // links need to be re-organized
    const links = {};
    if(link && link.length) link.forEach((l) => { links[l.type] = l.url; });

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

  return (
    <div className="Page EventForm">
      <div className="event-edit-form">
        <h1>Edit your event!</h1>
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
