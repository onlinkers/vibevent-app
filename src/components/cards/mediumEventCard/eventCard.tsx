import React from "react";
import moment from "moment";

import "./index.scss";
import { Event } from "types/props";
import SaveButton from "components/svg/medium-event-card-option/SaveButton";

import shareIcon from "../../../assets/icons/share.svg";
// import bookmarkIcon from "../../../assets/icons/bookmark.svg";

interface Props {
  event: Event;
  saved?: boolean;
  onClick?: Function;
  onSaveClick?: Function;
}

const MediumEventCard: React.FunctionComponent<Props> = (props) => {
  const {
    event,
    // saved = null,
    onClick = () => {},
    // onSaveClick = () => {},
  } = props;
  const month = moment(event?.startDate).format("MMM DD");
  return (
    <>
      <div className="medium-card">
        <img
          className="medium-card-coverphoto"
          src={event?.media?.coverPhoto?.baseSrc}
          alt="eventCoverPhoto"
          onClick={() => onClick()}
        />
        <div className="medium-card-description">
          <div className="description-text" onClick={() => onClick()}>
            <p className="description-date">{month}</p>
            <p className="description-title">{event?.name}</p>
            <p className="description-host">UBC SISA</p>
          </div>
          <div className="description-options">
            <button className="share-button">
              <img src={shareIcon} alt="share-icon" />
            </button>
            {/* <button className="bookmark-button" onClick={() => onSaveClick()}>
              <img src={bookmarkIcon} />
            </button> */}
            <SaveButton />
          </div>
        </div>
      </div>
    </>
  );
};

export default MediumEventCard;
