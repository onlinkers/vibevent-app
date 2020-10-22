import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import popup from "popup";

import { Button, Divider } from "antd";
import ImageUploader from "components/shared/form/inputs/imageUploader";

import { fetchAllEvents } from "store/actions/eventActions";
import eventService from "services/eventService";
import { Event } from "types/props";
import { createImageUrl, getImageExtensionFromUrl, getImageNameFromUrl, isUrl } from "utils";
import "./index.scss";

interface Props {
  event: Event;
  fetchAllEvents: Function;
}
  
const EventEditImages: React.FunctionComponent<Props> = ({ event, fetchAllEvents }) => {

  const { _id: eventId } = event;
  const history = useHistory();

  const [coverPhoto, setCoverPhoto] = useState(event.media && event.media.coverPhoto ? {
    uid: "coverphoto",
    name: getImageNameFromUrl(event.media?.coverPhoto.url), // to use actual name here
    type: `image/${getImageExtensionFromUrl(event.media?.coverPhoto.url)}`, // TODO: use actual type
    status: "done",
    response: "Photo load error",
    url: createImageUrl({ src: event.media?.coverPhoto?.url, collection: "events" })
  } : {});

  const [hostPhotos, setHostPhotos] = useState(event.media && event.media.hostPhotos ? event.media.hostPhotos.map((photo) => ({
    uid: photo.url,
    name: getImageNameFromUrl(photo.url), // to use actual name here
    type: `image/${getImageExtensionFromUrl(photo.url)}`, // TODO: use actual type
    status: "done",
    response: "Photo load error",
    url: createImageUrl({ src: photo.url, collection: "events" })
  })) : []);

  const [userPhotos, setUserPhotos] = useState(event.media && event.media.userPhotos ? event.media.userPhotos.map((photo) => ({
    uid: photo.url,
    name: getImageNameFromUrl(photo.url), // to use actual name here
    type: `image/${getImageExtensionFromUrl(photo.url)}`, // TODO: use actual type
    status: "done",
    response: "Photo load error",
    url: createImageUrl({ src: photo.url, collection: "events" })
  })) : []);
  
  const onSubmit = async () => {

    let cpUrl = coverPhoto.url;
    if(!cpUrl || !isUrl(cpUrl)) {
      const cpFilename = `${coverPhoto.uid}.${coverPhoto.type?.split("/")[1]}`;
      cpUrl = `${eventId}/cover/${cpFilename}`;
    }
    
    const hPhotos = hostPhotos.map((photo) => {
      // if url already exists
      if(photo.url && isUrl(photo.url)) return { url: photo.url };
      // otherwise, create the url 
      const filename = `${photo.uid}.${photo.type?.split("/")[1]}`;
      return { url: `${eventId}/host/${filename}` };
    });

    const uPhotos = userPhotos.map((photo) => {
      // if url already exists
      if(photo.url && isUrl(photo.url)) return { url: photo.url };
      // otherwise, create the url 
      const filename = `${photo.uid}.${photo.type?.split("/")[1]}`;
      return { url: `${eventId}/user/${filename}` };
    });

    const payload: any = {
      ...event,
      media: {
        ...event.media,
        coverPhoto: { url: cpUrl },
        hostPhotos: hPhotos,
        userPhotos: uPhotos
      }
    };

    await eventService.setEvent({
      id: eventId,
      payload
    }).catch(() => {});

    fetchAllEvents();

    popup.success("Event photos saved!");
    history.push(`/event/${eventId}`);

  };

  const onCancel = () => {

    history.push(`/event/${eventId}`);

  };

  return (
    <div className="Page--center ImageEdit">
      <Divider orientation="left">Cover Photo</Divider>
      <ImageUploader
        collection="events"
        directory={`${eventId}/cover`}
        acceptedExtensions=".png,.jpg,.jpeg"
        onChange={([photo]) => setCoverPhoto(photo)}
        listType="picture-card"
        maxFiles={1}
        initialList={[coverPhoto]}
      />
      <Divider orientation="left">Photos Uploaded By Hosts</Divider>
      <ImageUploader
        collection="events"
        directory={`${eventId}/host`}
        acceptedExtensions=".png,.jpg,.jpeg"
        onChange={(photos) => setHostPhotos(photos)}
        listType="picture-card"
        initialList={hostPhotos}
      />
      <Divider orientation="left">Photos Uploaded By Users</Divider>
      <ImageUploader
        collection="events"
        directory={`${eventId}/user`}
        acceptedExtensions=".png,.jpg,.jpeg"
        onChange={(photos) => setUserPhotos(photos)}
        listType="picture-card"
        initialList={userPhotos}
        disableUpload={true}
      />
      <br />
      <Button type="primary" onClick={onSubmit}>Save</Button>
      <Button type="primary" onClick={onCancel}>Cancel</Button>
      <br />

    </div>
  );
};


const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllEvents: () => dispatch(fetchAllEvents())
  };
};

export default connect(null, mapDispatchToProps)(EventEditImages);
