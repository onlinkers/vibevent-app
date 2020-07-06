import React from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import {
  message,
} from "antd";
import Sidebar from "components/layouts/sidebar/sidebar";
import EventForm from "components/forms/EventForm";

import "../form.scss";
import { EventCategoriesPayload } from "types/store";
import eventService from "services/eventService";

interface Props {
  eventCategories: EventCategoriesPayload;
  loading: boolean;
  errors: string
  userId: string;
}

const EventCreate: React.FunctionComponent<Props> = (props) => {

  const history = useHistory();

  const {
    eventCategories,
    loading,
    userId
  } = props;

  const handleSubmit = async (formValues) => {
    
    const {
      coverPhoto: coverPhotoUrl,
      ticketLink: ticketLinkUrl,
      ...values
    } = formValues;

    const payload = {
      ...values,
      // We need to set the user that creates the event as "host"
      hosts: [userId],
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

  return (
    <div className="Page--center EventForm">
      <Sidebar />
      {loading && <div className="Page Loader">Loading...</div>}
      {!loading && (
        <React.Fragment>
          <h1>Create Your Event!</h1>
          <EventForm
            mode="CREATE"
            onSubmit={handleSubmit}
            eventCategories={eventCategories}
          />
        </React.Fragment>
      )}
    </div>
  );
};

const mapStateToProps = ({ eventData, userData }) => {
  return {
    eventCategories: eventData.eventCategories,
    loading: eventData.loading,
    errors: eventData.errors.eventCategories,
    userId: userData.user._id
  };
};

export default connect(mapStateToProps, null)(EventCreate);
