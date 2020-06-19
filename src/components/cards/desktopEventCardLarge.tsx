import React, { useState } from "react";

const DesktopEventCardLarge = () => {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <div className="event-card-desktop--large">
      <div className="event-description">
        <h3 className="event-date">
          <span className="month">June</span>
          <br />
          <span className="date">1</span>
        </h3>
        <div className="title-tags">
          <h3 className="event-title">Italian Breakfast Masterclass</h3>
          <p className="event-tags">Online • Cuisines • Creative</p>
        </div>
        <button
          className={"save-btn " + (isSaved ? "save-btn--active" : "")}
          onClick={(e) => {
            console.log(isSaved);
            setIsSaved(!isSaved);
          }}
        >
          {isSaved ? "Saved" : "Save"}
        </button>
      </div>
    </div>
  );
};

export default DesktopEventCardLarge;
