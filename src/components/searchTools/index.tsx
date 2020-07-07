import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

// import UtilityCard from "components/searchTools/utilityCard/utilityCard";
import SmallEventCard from "components/cards/smallCard/eventCard";
import VibeventNameLogo from "components/svg/vibevent-name-logo/VibeventNameLogo";

import { EventsPayload } from "types/store";
import "./index.scss";

interface Props {
  events: EventsPayload;
  loading?: boolean;
  errors?: {
    events?: string;
    eventCategories?: string;
  };
}

const SearchTools: React.FunctionComponent<Props> = (props) => {
  
  const { events = {} } = props;
  const history = useHistory();

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
          {eventsArray.slice(0, 2).map((event) => {
            return <SmallEventCard
              event={event}
              key={event._id}
              onClick={() => { history.push(`/event/${event._id}`)}}
            />;
          })}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ eventData }) => {
  return {
    events: eventData.events,
    loading: eventData.loading,
    errors: eventData.errors,
  };
};

export default connect(mapStateToProps, {})(SearchTools);
