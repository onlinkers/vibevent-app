import React from "react";
import { connect } from "react-redux";

import { MapContext, MapProvider } from "context/MapContext";
import Map from "components/Map";
import ExploreBar from "components/layouts/exporeBar";
// import CategoryFilter from "components/Map/filters/categoryFilter";
import { EventsState } from "types/store";

interface DispatchProps {
  eventData: EventsState;
}

const Discover: React.FunctionComponent<DispatchProps> = ({ eventData }) => {
  return (
    <MapProvider>
      <MapContext.Consumer>
        {({ loaded }) => (
          <div className="Discover Page">
            <ExploreBar />
            {/* <CategoryFilter /> */}
            <Map
              loaded={loaded && !eventData.loading}
              events={Object.values(eventData.events)}
            />
          </div>
        )}
      </MapContext.Consumer>
    </MapProvider>
  );
};

const mapStateToProps = ({ eventData }) => {
  return {
    eventData: eventData,
  };
};

export default connect(mapStateToProps)(Discover);
