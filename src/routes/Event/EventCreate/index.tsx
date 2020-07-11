import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import {
  message,
} from "antd";
import Navbar from "components/layouts/navbar";
import EventForm from "components/Event/form";
import EventDetailsCard from "components/Event/cards/detailsCard";

import "../form.scss";
import { EventCategoriesPayload } from "types/store";
import { User, Event } from "types/props";
import eventService from "services/eventService";

interface Props {
  eventCategories: EventCategoriesPayload;
  loading: boolean;
  errors: string
  user: User;
}

const EventCreate: React.FunctionComponent<Props> = (props) => {

  const {
    eventCategories,
    loading,
    user
  } = props;

  const history = useHistory();
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
    links: {},
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

    const { venueName, date, link, ...rest } = formValues;

    // links need to be re-organized
    const links = {};
    link.forEach((l) => { links[l.type] = l.url; });

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
      links
    };

    // TODO: Proper Image Uploading

    await eventService.createEvent(payload);

    message.success("Event created!");
    history.goBack();

  };

  const handleFormChange = (changedValues) => {

    // TODO: Find a way/or dont even bother render-ing link changes in the form
    if(changedValues.link) return;

    const newFormFields = {
      ...previewValues,
      // name, price, description, categories
      ...changedValues,
      startDate: (changedValues.date && changedValues.date[0]) || previewValues.startDate,
      endDate: (changedValues.date && changedValues.date[1]) || previewValues.startDate,
      venue: {
        name: changedValues.venue || previewValues.venue.name
      },
      tags: {
        hostTags: changedValues.tags || previewValues.tags?.hostTags
      }
    };

    setPreviewValues(newFormFields);
    
  };

  return (
    <div className="Page EventForm">
      <Navbar />
      {loading && <div className="Page--full Loader">Loading...</div>}
      {!loading && (
        <>
          <div className="event-create-form">
            <h1>Create Your Event!</h1>
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
        </>
      )}
    </div>
  );
};

const mapStateToProps = ({ eventData, userData }) => {
  return {
    eventCategories: eventData.eventCategories,
    loading: eventData.loading,
    errors: eventData.errors.eventCategories,
    user: userData.user
  };
};

export default connect(mapStateToProps, null)(EventCreate);
