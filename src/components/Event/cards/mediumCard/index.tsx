import React from "react";
import moment from "moment";

import "./index.scss";
import { Event, User } from "types/props";
import SaveButton from "components/shared/buttons/saveButton";

// import shareIcon from "../../../assets/icons/share.svg";

interface Props {
  event: Event;
  saved?: boolean;
  onClick?: Function;
  onSaveClick?: Function;
}

const EventMediumCard: React.FunctionComponent<Props> = (props) => {
  const {
    event,
    saved = null,
    onClick = () => {},
    onSaveClick = () => {},
  } = props;

  const month = moment(event?.startDate).format("MMM DD");
  const hosts = (event.hosts as User[]).map((host) => `${host.firstName} ${host.lastName || ""}`);
  
  const handleSaveClick = () => {
    onSaveClick(event._id, !saved);
  };

  return (
    <div className="event-card-medium">
      <img
        className="event-coverphoto"
        src={event?.media?.coverPhoto?.baseSrc}
        alt="eventCoverPhoto"
        onClick={() => onClick()}
      />
      <div className="event-description">
        <div className="description-text" onClick={() => onClick()}>
          <p className="description-date">{month}</p>
          <p className="description-title">{event?.name}</p>
          <p className="description-host">{hosts.join(", ")}</p>
        </div>
        <div className="description-options">

          {/* TODO: Share functionality */}
          {/* <button className="share-button">
              <img src={shareIcon} alt="share-icon" />
            </button> */}
          {saved !== null && <SaveButton saved={saved} onClick={handleSaveClick} />}
        </div>
      </div>
    </div>
  );
};

export default EventMediumCard;
