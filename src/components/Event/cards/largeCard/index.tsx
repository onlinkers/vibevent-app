/* eslint-disable indent */
import React from "react";
import { Event } from "types/props";
import { motion } from "framer-motion";
import moment from "moment";

import DefaultImage from "assets/media/default-image.png";
import { Button } from "antd";

import "./index.scss";
import { User } from "types/props";

interface Props {
  event: Event;
  saved?: boolean;
  loading?: boolean;
  onClick?: Function;
  onSaveClick?: Function;
  [key: string]: any;
}

const EventLargeCard: React.FunctionComponent<Props> = (props) => {
  const {
    saved = null,
    event,
    onClick = () => {},
    onSaveClick = () => {},
  } = props;

  const month = moment(event.startDate).format("MMM").toUpperCase();
  const date = moment(event.startDate).format("DD");

  const hosts = (event.hosts as User[]).map((host) => `${host.firstName} ${host.lastName || ""}`);

  const link = (e) => {
    // dont launch event if the button was clicked
    if ((e.target as any).className.includes("btn") || (e.target as any).parentNode.className.includes("btn")) return;
    onClick();
  };

  return (
    <motion.div
      className="event-card-large"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.1 }}
      onClick={link}
    >
      <div className="event-coverphoto">
        <img
          src={event.media?.coverPhoto?.baseSrc || DefaultImage}
          alt=""
          className="event-coverphoto__img"
        />
      </div>
      <div className="event-description">
        <h3 className="description-date">
          <span className="description-date__month">{month}</span>
          <br />
          <span className="description-date__date">{date}</span>
        </h3>
        <div className="description-title-hosts">
          <p className="description-title">
            {event?.name}
          </p>
          <p className="description-host">
            {hosts.join(", ")}
          </p>
        </div>

        {saved !== null && (
          <Button
            type={saved ? "primary" : "default"}
            danger={!saved}
            className={"save-btn"}
            onClick={() => {
              onSaveClick(event._id, !saved);
            }}
          >
            {saved ? "Saved" : "Save"}
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default EventLargeCard;
