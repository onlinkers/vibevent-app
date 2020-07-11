import React from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import {
  message,
} from "antd";
import EventForm from "components/Event/form";
import EventDetailsCard from "components/Event/cards/detailsCard";
import Sidebar from "components/layouts/Sidebar";

import "../form.scss";
import { EventCategoriesPayload } from "types/store";
import { User } from "types/props";
import eventService from "services/eventService";

interface Props {
  eventCategories: EventCategoriesPayload;
  loading: boolean;
  errors: string
  user: User;
}

const EventCreate: React.FunctionComponent<Props> = (props) => {

  const history = useHistory();

  const {
    eventCategories,
    loading,
    user
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

  return (
    <div className="Page EventForm">
      <Sidebar />
      {loading && <div className="Page--full Loader">Loading...</div>}
      {!loading && (
        <>
          <div className="event-create-form">
            <h1>Create Your Event!</h1>
            <EventForm
              mode="CREATE"
              onSubmit={handleSubmit}
              eventCategories={eventCategories}
            />
          </div>
          <EventDetailsCard
            event={{
              _id: "new-event",
              hosts: [user],
              name: "random-event",
              startDate: new Date(),
              endDate: new Date(),
              venue: {
                name: "Place"
              },
              description: "hello",
              categories: [],
              links: {
                register: "yey"
              },
              media: {
                coverPhoto: { baseSrc: "https://picsum.photos/id/237/200/300" },
                hostPhotos: [
                  { baseSrc: "https://picsum.photos/id/237/200/300" },
                  { baseSrc: "https://picsum.photos/id/237/200/300" }
                ]
              },
              tags: {
                hostTags: ["dog", "new", "template"],
                userTags: []
              }
            }}
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
