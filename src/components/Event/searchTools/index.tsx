import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

// import UtilityCard from "components/Event/cards/utilityCard";
import SmallEventCard from "components/Event/cards/smallCard";

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

  const eventsArray = Object.values(events).slice(0, 5);

  return (
    <div className="quick-access">
      {/* FUTURE FEATURE */}
      {/* <div className="quick-access-container">
          {[0, 1, 2, 3].map((item) => {
            return <UtilityCard key={item} />;
          })}
        </div> */}
      <div className="card-previews-section">
        <div className="card-previews-header">
          <h3>Events Around You</h3>
        </div>
        <div className="card-previews-container">
          {eventsArray.slice(0, 3).map((event) => {
            return (
              <SmallEventCard
                event={event}
                key={event._id}
                onClick={() => {
                  history.push(`/event/${event._id}`);
                }}
              />
            );
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
