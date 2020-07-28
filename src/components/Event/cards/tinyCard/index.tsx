import React from "react";

import { Card, Skeleton } from "antd";
import "./index.scss";

import { Event } from "types/props";
import DefaultImage from "assets/media/default-image.png";

interface Props {
  event: Event;
  loading?: boolean;
  [key: string]: any;
}

const EventTinyCard: React.FunctionComponent<Props> = (props) => {
  const {
    event,
    loading = false,
    ...rest
  } = props;

  const imageSource = event?.media?.coverPhoto?.baseSrc || DefaultImage;

  return (
    <Card
      hoverable
      className="event-card-tiny"
      cover={imageSource && <img src={imageSource} alt="event-coverimage" />}
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
};

export default EventTinyCard;
