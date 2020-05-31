import React from "react";

import { Card, Skeleton } from "antd";

import "./index.css";

import { Event } from "types/props";
import DefaultImage from "assets/media/default-image.png";

interface Props {
    event?: Event;
    variant?: string;
    loading?: boolean;
    width?: string;
    size?: string;
    [key: string]: any;
}

const EventCard: React.FunctionComponent<Props> = (props) => {

  const {
    event,
    variant,
    loading = false,
    width = "auto",
    size,
    ...rest
  } = props;

  const imageSource = event?.media?.coverPhoto?.baseSrc || DefaultImage;
  let className = "event-card";
  if(size) className = `event-card-${size}`;

  if(event) {
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
        <Skeleton loading={true} title paragraph={false} active>
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
