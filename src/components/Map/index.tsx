import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import Mapbox from "./mapbox";

import { ReloadOutlined } from "@ant-design/icons";
import { Event } from "types/props";
import { filterEventsByCategoryKeys } from "utils";

interface Props {
	loaded: boolean
	events: { [key: string]: Event}
	selectedCategories: string[]
	error: string | null
}

// The "Map" component will serve as a wrapper that handles higher-order view logic
// Specifically, the component should handle loading logic, filters, and rendering
const Map = React.memo<Props>(({ loaded, events, selectedCategories, error }) => {

  const [filteredEvents, setFilteredEvents] = useState(Object.values(events));

  // Allow redirecting from componenets of the map
  const history = useHistory();

  const redirectToEvent = (eventId: string) => {
    history.push(`/event/${eventId}`); 
  };

  const refreshPage = () => {
    // A lil react-router hack to refresh the page
    history.push("/");
    history.goBack();
  };

  useEffect(() => {
    const eventsArray = Object.values(events);
    setFilteredEvents(filterEventsByCategoryKeys(eventsArray, selectedCategories));
	}, [events, selectedCategories]); // eslint-disable-line
  // (disable line to overcome exhaustive depts in the previous line)
	
  return (
    <React.Fragment>
      {!loaded && <div className="Page Loader">Loading...</div>}
      {loaded && error && <div className="Page Error">
        <div onClick={refreshPage}><ReloadOutlined /></div>
        <div>{error}</div>
      </div>}
      <Mapbox
        events={filteredEvents}
        functions={{
          redirectToEvent
        }}
      />
    </React.Fragment>
  );
});

export default Map;