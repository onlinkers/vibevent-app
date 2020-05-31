import React from "react";
import { useHistory } from "react-router-dom";

import { Card, Skeleton, Popconfirm } from "antd";
import {
  ExpandOutlined,
  EditOutlined,
  DeleteOutlined,
  HeartOutlined,
  HeartFilled,
  PushpinFilled,
  ClockCircleFilled,
  StarFilled,
  InfoCircleFilled,
} from "@ant-design/icons";

import "./index.css";

import { Event } from "types/props";
import DefaultImage from "assets/media/default-image.png";
import eventService from "services/eventService";

interface Props {
  event?: Event;
  favorited?: boolean;
  variant?: "detailed" | "brief" | "template";
  loading?: boolean;
  width?: string;
  size?: string;
  refetch?: Function;
  [key: string]: any;
}

const EventCard: React.FunctionComponent<Props> = (props) => {

  const {
    event,
    favorited = false,
    variant,
    loading = false,
    width = "auto",
    size,
    refetch,
    ...rest
  } = props;

  const history = useHistory();

  const redirectToEvent = (eventId: string) => {
    history.push(`/event/${eventId}`); 
  };

  const editEvent = (eventId) => {
    history.push(`/event/${eventId}/edit`);
  };

  const deleteEvent = async (eventId) => {
    await eventService.deleteEvent({ id: eventId });
    refetch && await refetch();
  };

  const imageSource = event?.media?.coverPhoto?.baseSrc || DefaultImage;
  let className = "event-card";
  if(size) className = `event-card-${size}`;

  if(event && variant === "detailed") {
    return (
      <Card
        hoverable
        className={className}
        style={{ width, minWidth: width }}
        cover={imageSource && <img src={imageSource} alt="event-cover"/>}
        {...rest}
        title={event.name}
        extra={favorited ? <HeartFilled/> : <HeartOutlined/>}
        actions={[
          <ExpandOutlined key="open" onClick={() => redirectToEvent(event._id)}/>,
          <EditOutlined key="edit" onClick={() => editEvent(event._id)}/>,
          <Popconfirm
            key="delete"
            title="Are you sure delete this event?"
            onConfirm={() => deleteEvent(event._id)}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined key="setting"/>
          </Popconfirm>
        ]}
      >
        <Skeleton loading={loading} active>
          <Card.Meta
            description={
              <React.Fragment>
                <div><ClockCircleFilled />&nbsp;{event.startDate}</div>
                <div><PushpinFilled />&nbsp;{event.venue.name}</div>
                <div><StarFilled />&nbsp;{event.rating}</div>
                <br />
                <div><InfoCircleFilled />&nbsp;{event.description}</div>
              </React.Fragment>
            }
          />
        </Skeleton>
      </Card>
    );
  }
  else if(event && variant === "brief") {
    return (
      <Card
        hoverable
        className={className}
        style={{ width, minWidth: width }}
        cover={imageSource && <img src={imageSource} alt="event-cover"/>}
        {...rest}
      >
        <Skeleton loading={loading} active>
          <Card.Meta
            title={event?.name}
            description={event?.description}
          ></Card.Meta>
        </Skeleton>
      </Card>
    );
  }
  else if(variant === "template") {
    return (
      <Card
        className={className}
        style={{ width, minWidth: width }}
        cover={imageSource && <img src={imageSource} alt="event-cover"/>}
        {...rest}
      >
        <Skeleton loading={true} title paragraph={false}>
          <Card.Meta
            title="template"
          ></Card.Meta>
        </Skeleton>
      </Card>
    );
  }
  else { // Allow adding more options here
    return (
      <Card
        className={className}
        style={{ width, minWidth: width }}
        cover={imageSource && <img src={imageSource} alt="event-cover"/>}
        {...rest}
      >
        <Skeleton loading={true} title paragraph={false} active>
          <Card.Meta
            title="template"
          ></Card.Meta>
        </Skeleton>
      </Card>
    );
  };
};

export default EventCard;
