/* dependencies */
import React, { useEffect, useState, Dispatch } from "react";
import { connect } from "react-redux";

/* components */
import { MapContext, MapProvider } from "context/MapContext";
import Map from "components/Map";
import ExploreBar from "components/layouts/exporeBar";
import { Event } from "types/props";
import { EventListLoading } from "types/store";

interface DispatchProps {
  queryAllEvents: () => void;
  eventData: EventListLoading;
}

const Discover: React.FunctionComponent<DispatchProps> = (props) => {
  const { eventData } = props;

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

const mapStateToProps = (state) => {
  return {
    eventData: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Discover);
