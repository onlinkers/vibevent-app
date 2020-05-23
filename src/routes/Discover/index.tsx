import React from "react";
import { connect } from "react-redux";

import { MapContext, MapProvider } from "context/MapContext";
import Map from "components/Map";
import ExploreBar from "components/layouts/exporeBar";
import { EventListLoading } from "types/store";

interface DispatchProps {
  eventData: EventListLoading;
}

const Discover: React.FunctionComponent<DispatchProps> = ({ eventData }) => {
  return (
    <MapProvider>
      <MapContext.Consumer>
        {({ loaded }) => (
          <div className="Discover Page">
            <ExploreBar />
            <Map
              loaded={loaded && !eventData.loading}
              events={eventData.events}
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

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Discover);
