import React from "react";

// import UtilityCard from "components/searchTools/utilityCard/utilityCard";
import SmallEventCard from "components/cards/smallCard/eventCard";
import { EventsPayload } from "types/store";
import "./index.scss";
import VibeventNameLogo from "components/svg/vibevent-name-logo/VibeventNameLogo";

interface Props {
  events: EventsPayload;
  loading?: boolean;
  errors?: {
    events?: string;
    eventCategories?: string;
  };
  fetchAllEvents?: Function;
}

const SearchTools: React.FunctionComponent<Props> = (props) => {
  const { events } = props;
  const eventsArray = Object.values(events).slice(1, 5);

  return (
    <div className="quick-access">
      <div className="vibevent-logo-container">
        <VibeventNameLogo />
      </div>
      {/* FUTURE FEATURE */}
      {/* <div className="quick-access-container">
          {[0, 1, 2, 3].map((item) => {
            return <UtilityCard key={item} />;
          })}
        </div> */}
      <div className="card-previews-section">
        <div className="card-previews-header">
          <h3>Previously Viewed</h3>
        </div>
        <div className="card-previews-container">
          {eventsArray.slice(0, 2).map((item) => {
            return <SmallEventCard event={item} key={item._id} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchTools;
