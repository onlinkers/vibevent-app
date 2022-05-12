import React from "react";
import momentz from "moment-timezone";
import ReactMarkdown from "markdown-to-jsx";
import { Link } from "react-router-dom";

import { Empty, Card, Avatar, Tag, Button, Divider, Popover } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import DefaultImage from "assets/media/default-image.png";
import Image from "components/shared/image";

import { User, Event } from "types/props";
import { EventCategoriesPayload } from "types/store";
import { parse } from "utils";

import "./index.scss";

interface Props {
    event: Event;
    eventCategories: EventCategoriesPayload;
    redirectToRoom?: (any:any) => void;
    redirectBack?: (any:any) => void;
    redirects?: boolean;
    allowEdit?: boolean;
}

const EventDetailsCard: React.FunctionComponent<Props> = (props) => {

  const {
    event,
    eventCategories,
    redirectToRoom = () => {},
    redirectBack = () => {},
    redirects = true,
    allowEdit = false,
  } = props;

  const generatePhotos = () => {

    // check if media exists
    if(!event?.media) return <Image collection="events" src={DefaultImage} alt="event-cover" className="event__images__cover"/>;
        
    const photos: any[] = [];
    
    // get cover photo
    photos.push(<div key="div-img-cover" className="event__images-host">
      <Image collection="events" src={event.media.coverPhoto?.url || DefaultImage} alt="event-cover" loading="lazy"/>
    </div>);
    
    // get 2 host photos
    const hostPhotos = ((event.media.hostPhotos?.length && event.media.hostPhotos.slice(0,2)) || []).map((photo, index) => {
      return <div key={`host-${index}`} className="event__images-image">
        <Image collection="events" src={photo.url} alt={`host-${index}`} loading="lazy"/>
      </div>;
    });
    photos.push(hostPhotos.length === 2 ? <div key="host-col" className="event__images-2-row">{hostPhotos}</div> : hostPhotos);
        
    // get 2 user photos
    let userPhotos: any = [];
    // if user photos exist
    if(event.media.userPhotos?.length) {
      userPhotos = event.media.userPhotos.slice(0,2);
    }
    // if there are extra host photos
    else if(event.media.hostPhotos && event.media.hostPhotos.length >= 3) {
      const remainingHostPhotos = event.media.hostPhotos.slice(2);
      if(remainingHostPhotos.length >= 2) remainingHostPhotos.splice(0,2);
      userPhotos = remainingHostPhotos;
    }
    // turn user photos into DOM objects
    userPhotos = userPhotos.map((photo, index) => {
      return <div key={`user-${index}`} className="event__images-image">
        <Image collection="events" src={photo.url} alt={`user-${index}`} loading="lazy"/>
      </div>;
    });

    photos.push(userPhotos.length === 2 ? <div key="user-col" className="event__images-2-row">{userPhotos}</div> : userPhotos);
    
    return photos;
        
  };
    
  const generateHosts = () => {
    
    const hosts: any[] = [];
    
    (event.hosts as User[]).forEach((host, index) => {
      hosts.push(<Card.Meta
        key={host._id || "host" + index}
        avatar={ <Avatar src={host.profilePhoto?.url || DefaultImage} />}
        title={`${host.firstName} ${host.lastName || ""}`}
        description={host.description || ""}
      />);
    });
    
    return hosts;
      
  };
    
  const generateCategories = () => {
    
    const categories = event.categories.slice(0,3);    
    const categoryObjects = categories.map((categoryKey) => 
      <Tag key={categoryKey}>{ eventCategories[categoryKey] }</Tag>);
    
    if(event.categories.length >= 3) categoryObjects.push(<Tag key="more" >...</Tag>);
    
    return categoryObjects;
        
  };
    
    
  const generateRooms = () => {
    
    // filter out event rooms that are "empty" or without urls
    const eventRooms = event.rooms && event.rooms.length && event.rooms.filter((r) => r && r.url);
    // display "no rooms" if none
    if(!eventRooms || !eventRooms.length) return <Empty description={false}>No Rooms found</Empty>;
    
    const rooms: any[] = [];
    
    eventRooms.forEach((room, index) => {

      if(room.type === "zoom") {
        rooms.push(
          <a 
            key={`room-${index}`}
            href={room.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Card.Meta
              className="event__room-button"
              title={room.name ? "Join " + room.name : `Join Room ${index}`}
            />
          </a>);
      } else {
        rooms.push(
          <div 
            key={room.url}
            onClick={() => redirectToRoom(room.url)}>
            <Card.Meta
              className="event__room-button"
              title={room.name ? "Join " + room.name : `Join Room ${index}`}
            />
          </div>);
      }

    });
    
    return rooms;
      
  };

  return (
    <div className="event-details-card">
      <div className="back-button">
        {redirects && <span className="button--clickable" onClick={redirectBack}>
          <ArrowLeftOutlined /> Back
        </span>}
      </div>

      <div className="event__images">
        {generatePhotos()}
      </div>

      <div className="event__misc">
        <div className="event__categories">
          {generateCategories()}
        </div>
        <div className="event__links">
          {event.links.length ? (event.links as any).map((link) => link && (
            <Button
              key={link.name}
              type="primary"
              className="event__link t--capitalize"
              href={redirects ? link.url : ""}
            >{link.name}
            </Button>
          )) : null}
        </div>
      </div>

      <h1>{event.name}</h1>
      <div >
        <Popover placement="right" content={`Your timezone: ${momentz.tz.guess()} (${momentz.tz(momentz.tz.guess()).format("z")})`}>
          <div className="event__dates">
            Event starts <strong>{momentz(event.startDate).format("LLLL")}</strong> <br/>
            Event ends <strong>{momentz(event.endDate).format("LLLL [(GMT]Z[)]")}</strong>
          </div>
        </Popover>
        <br />
        <div>Hosted on <strong>{event.venue.name}</strong></div>
        <div>Event is <strong>${event.price ? `${event.price}.00` : "free"}</strong></div>
        <br />
      </div>

      <Divider />

      <div className="event__hosts">
        <h2>Your hosts:</h2>
        {generateHosts()}
      </div>

      <Divider />

      <h2>About the event</h2>
      <div><ReactMarkdown>{parse(event.description || "")}</ReactMarkdown></div>

      <Divider />

      <h2>Rooms:</h2>
      <div className="event__rooms">
        {generateRooms()}
      </div>

      {allowEdit && <Link to={`${event._id}/edit`} className="event__edit_button">
        <Button type="primary">Edit this event</Button>
      </Link>}
      {allowEdit && <Link to={`${event._id}/images`} className="event__edit_button">
        <Button type="link">Edit event photos</Button>
      </Link>}
            
    </div>
  );
};

export default EventDetailsCard;
