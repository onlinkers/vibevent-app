import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import popup from "popup";
import { Divider } from "antd";
import EventForm from "components/Event/form";
import EventDetailsCard from "components/Event/cards/detailsCard";

import { ThemeContext } from "context/ThemeContext";

import "../form.scss";
import { EventCategoriesPayload } from "types/store";
import { User, Event } from "types/props";

import eventService from "services/eventService";
import { fetchAllEvents } from "store/actions/eventActions";

interface Props {
  eventCategories: EventCategoriesPayload;
  user: User;
  fetchAllEvents: Function;
}

const EventCreate: React.FunctionComponent<Props> = (props) => {

  const {
    eventCategories,
    user,
    fetchAllEvents
  } = props;

  const history = useHistory();
  const { breakpoint } = useContext(ThemeContext);

  const [previewValues, setPreviewValues] = useState<Event>({
    _id: "new-event",
    hosts: [user],
    name: "",
    startDate: new Date(),
    endDate: new Date(),
    venue: {
      name: ""
    },
    description: "",
    categories: [],
    links: [],
    media: {
      coverPhoto: { baseSrc: "" },
      hostPhotos: []
    },
    tags: {
      hostTags: [],
      userTags: []
    }
  });

  const handleSubmit = async (formValues) => {

    const { venueName, date, link, room, ...rest } = formValues;

    // links need to be re-organized
    const links = link;

    const payload = {
      ...rest,
      // We need to set the user that creates the event as "host"
      hosts: [user._id],
      // venue needs its own object (including the coordinates)
      venue: {
        name: venueName,
      },
      // Dates need to be in ISO form
      startDate: date[0].toISOString(),
      endDate: date[1].toISOString(),
      links,
      rooms: room
    };

    // TODO: Proper Image Uploading

    await eventService.createEvent(payload);
    fetchAllEvents();

    popup.success("Event created!");
    history.goBack();

  };

  const handleFormChange = (changedValues) => {

    // TODO: Find a way/or dont even bother render-ing link/room changes in the form
    if(changedValues.link) return;
    else if(changedValues.room) return;

    const {
      date = null,
      venueName = previewValues.venue.name,
      tags: hostTags = previewValues.tags?.hostTags,

      // name, price, description, categories
      ...rest
    } = changedValues;

    const startDate = (date && date[0]) || previewValues.startDate;
    const endDate = (date && date[1]) || previewValues.endDate;

    const newFormFields = {
      // hosts, rating, media
      ...previewValues,
      ...rest,
      startDate,
      endDate,
      venue: {
        name: venueName
      },
      tags: {
        ...previewValues.tags,
        hostTags,
      }
    };

    setPreviewValues(newFormFields);
    
  };

  return (
    <div className="Page EventForm">
      {breakpoint === "mobile" && <div className="mobile-title"><h1>Create Your Event!</h1></div>}
      <div className="event-create-form">
        {breakpoint !== "mobile" && <><h1>Create Your Event!</h1><Divider/></>}
        <EventForm
          mode="CREATE"
          onChange={handleFormChange}
          onSubmit={handleSubmit}
          eventCategories={eventCategories}
        />
      </div>
      <EventDetailsCard
        event={previewValues}
        eventCategories={eventCategories}
        redirects={false}
      />
    </div>
  );
};

const mapStateToProps = ({ eventData, userData }) => {
  return {
    eventCategories: eventData.eventCategories,
    user: userData.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllEvents: () => dispatch(fetchAllEvents())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventCreate);
