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
    
    const {
      coverPhoto: coverPhotoUrl,
      ticketLink: ticketLinkUrl,
      ...values
    } = formValues;

    const payload = {
      ...values,
      // We need to set the user that creates the event as "host"
      hosts: [user._id],
      // Venue object must contain the coordiantes as well
    };

    // TODO: Proper Image Uploading
    if(coverPhotoUrl) payload.coverPhoto = {
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

    await eventService.createEvent(payload);

    message.success("Event created!");
    history.goBack();
  };

  const handleFormChange = (changedValues) => {

    // TODO: Find a way/or not to render link changes in the form
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
