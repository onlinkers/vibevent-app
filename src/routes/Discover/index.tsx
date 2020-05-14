import React, { useEffect, useState, Dispatch } from "react";
import { connect } from "react-redux";

import { MapContext, MapProvider } from "context/MapContext";
import { Event } from "types/props";

import Map from "components/Map";
import ExploreBar from "components/layouts/exporeBar";
import { fetchAllEvents } from "store/actions/eventActions";

interface DispatchProps {
  queryAllEvents: () => void;
}

const Discover: React.FunctionComponent<DispatchProps> = (props) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [eventsLoaded, setEventsLoaded] = useState<boolean>(false);

  useEffect(() => {
    console.log(props);
  });

  return (
    <MapProvider>
      <MapContext.Consumer>
        {({ loaded }) => (
          <div className="Discover Page">
            <ExploreBar />
            <Map loaded={loaded && eventsLoaded} events={events} />
          </div>
        )}
      </MapContext.Consumer>
    </MapProvider>
  );
};

const mapStateToProps = (state) => {
  return {
    events: state.events,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // queryAllEvents: () => {
    //   dispatch(fetchAllEvents());
    // },
    // queryAllEvents: fetchAllEvents(),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Discover);
