import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import popup from "popup";

import { Button } from "antd";
import ImageUploader from "components/shared/form/inputs/imageUploader";

import { fetchAllEvents } from "store/actions/eventActions";
import eventService from "services/eventService";
import { Event } from "types/props";

interface Props {
  event: Event;
  fetchAllEvents: Function;
}
  
const EventEditImages: React.FunctionComponent<Props> = ({ event, fetchAllEvents }) => {

  const { _id: eventId } = event;
  const history = useHistory();

  const [coverPhoto, setCoverPhoto] = useState(event.media && event.media.coverPhoto ? {
    uid: "coverphoto",
    name: event.media?.coverPhoto.url.split("/")[-1], // to use actual name here
    type: `image/${event.media?.coverPhoto.url.split(".")[-1]}`, // to use actual type
    status: "done",
    response: "Photo load error",
    url: event.media?.coverPhoto?.url
  } : {});

  
  const onSubmit = async () => {

    const filename = `${coverPhoto.uid}.${coverPhoto.type?.split("/")[1]}`;
    const url = `${eventId}/cover/${filename}`;

    const payload: any = {
      ...event,
      media: {
        ...event.media,
        coverPhoto: { url }
      }
    };

    await eventService.setEvent({
      id: eventId,
      payload
    }).catch(() => {});

    fetchAllEvents();

    popup.success("Event images saved!");
    history.push(`/event/${eventId}`);

  };

  const onCancel = () => {

    history.push(`/event/${eventId}`);

  };

  return (
    <div className="Page">
      <ImageUploader
        collection="events"
        directory={`${eventId}/cover`}
        acceptedExtensions=".png,.jpg,.jpeg"
        onChange={([photo]) => setCoverPhoto(photo)}
        listType="picture-card"
        maxFiles={1}
        initialList={[coverPhoto]}
      />
      <Button type="primary" onClick={onSubmit}>Save</Button>
      <Button type="primary" onClick={onCancel}>Cancel</Button>
    </div>
  );
};


const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllEvents: () => dispatch(fetchAllEvents())
  };
};

export default connect(null, mapDispatchToProps)(EventEditImages);
