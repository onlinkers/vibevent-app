import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";
import ReactMarkdown from "markdown-to-jsx";

import QuickAccessMenu from "components/searchTools";
import Sidebar from "components/layouts/sidebar/sidebar";
import NotFound from "routes/NotFound";

import { Empty, Card, Avatar, Tag, Spin } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import "./index.scss";
import DefaultImage from "assets/media/default-image.png";

import { EventsPayload, EventCategoriesPayload } from "types/store";
import { User } from "types/props";
import { parse } from "utils";

interface Props {
  events: EventsPayload;
  eventCategories: EventCategoriesPayload;
  loading?: boolean;
}

const EventDetails: React.FunctionComponent<Props> = (props) => {

  const {
    events,
    eventCategories,
    loading,
  } = props;

  const history = useHistory();

  const { eventId } = useParams();
  const event = events[eventId];

  const redirectToRoom = (roomId) => {
    history.push(`/room/${roomId}`);
  };

  const generatePhotos = () => {

    // check if media exists
    if(!event?.media) return <img className="event__images__cover" alt="event-cover" src={DefaultImage}/>;
    
    const photos: any[] = [];

    // get cover photo
    photos.push(<div key="div-img-cover" className="event__images-host">
      <img src={event.media.coverPhoto?.baseSrc || DefaultImage} alt="event-cover" loading="lazy"/>
    </div>);

    // get 2 host photos
    const hostPhotos = ((event.media.hostPhotos?.length && event.media.hostPhotos.splice(0,2)) || []).map((photo, index) => {
      return <div key={`host-${index}`} className="event__images-image">
        <img src={photo.baseSrc} alt={`host-${index}`} loading="lazy"/>
      </div>;
    });
    photos.push(hostPhotos.length === 2 ? <div className="event__images-2-row">{hostPhotos}</div> : hostPhotos);
    
    // get 2 user photos
    const userPhotos = ((event.media.userPhotos?.length && event.media.userPhotos.splice(0,2)) || []).map((photo, index) => {
      return <div key={`user-${index}`} className="event__images-image">
        <img src={photo.baseSrc} alt={`user-${index}`} loading="lazy"/>
      </div>;
    });
    photos.push(userPhotos.length === 2 ? <div className="event__images-2-row">{userPhotos}</div> : userPhotos);

    return photos;
    
  };

  const generateHosts = () => {

    const hosts: any[] = [];

    (event.hosts as User[]).forEach((host) => {
      hosts.push(<Card.Meta
        key={host._id}
        avatar={ <Avatar src={host.profilePhoto?.baseSrc || DefaultImage} />}
        title={`${host.firstName} ${host.lastName || ""}`}
        description={host.description || ""}
      />);
    });

    return hosts;
  
  };

  const generateCategories = () => {

    const categories = event.categories.splice(0,3);

    const categoryObjects = categories.map((categoryKey) => 
      <Tag key={categoryKey}>{ eventCategories[categoryKey] }</Tag>);

    if(event.categories.length >= 3) categoryObjects.push(<Tag key="more" >...</Tag>);

    return categoryObjects;
    
  };


  const generateRooms = () => {

    const rooms: any[] = [];

    if(!event.rooms || !event.rooms.length) return <Empty description={false}>No Rooms found</Empty>;

    event.rooms && event.rooms.forEach((room, index) => {
      rooms.push(
        <div 
          key={room.roomId}
          onClick={() => redirectToRoom(room.roomId)}>
          <Card.Meta
            className="event__room-button"
            title={room.name || `Room ${index}`}
          />
        </div>);
    });

    return rooms;
  
  };

  return (
    <div className="Page EventDetails">
      <Sidebar />
      {loading && (
        <div className="Page--full Loader">
          <Spin />
        </div>
      )}
      {!loading && event && (
        <>
          <div className="events-details">
            <div className="back-button">
              <span className="button--clickable" onClick={() => {history.push("/event/dashboard");}}>
                <ArrowLeftOutlined /> Back
              </span>
            </div>

            <div className="event__images">
              {generatePhotos()}
            </div>


            <div className="event__categories">
              {generateCategories()}
            </div>

            <h1>{event.name}</h1>
            <div>
              <div>{moment(event.startDate).format("LLLL")} - {moment(event.endDate).format("LLLL")}</div>
              <div>Hosted at <strong>{event.venue.name}</strong></div>
              <div>Event is <strong>{event.price ? event.price : "free"}</strong></div>
              <br />
            </div>

            <div className="event__hosts">
              <h2>Your hosts:</h2>
              {generateHosts()}
            </div>

            <h2>About the event</h2>
            <p><ReactMarkdown>{parse(event.description || "")}</ReactMarkdown></p>

            <h2>Rooms:</h2>
            <div className="event__rooms">
              {generateRooms()}
            </div>
            
          </div>
          <QuickAccessMenu events={events} />
        </>
      )}
      { !loading && !event && <NotFound type="event"/> }
    </div>
  );
};


const mapStateToProps = ({ eventData }) => {
  return {
    events: eventData.events,
    eventCategories: eventData.eventCategories,
    loading: eventData.loading,
  };
};

export default connect(mapStateToProps, {})(EventDetails);
