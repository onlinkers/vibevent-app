import React from "react";
import { connect } from "react-redux";

import { MapContext, MapProvider } from "context/MapContext";
import Map from "components/Map";
import ExploreBar from "components/layouts/exporeBar";
import CategoryFilter from "components/Map/filters/categoryFilter";

import { EventDataState } from "types/store";

interface DispatchProps {
  eventData: EventDataState;
}

const Discover: React.FunctionComponent<DispatchProps> = ({ eventData }) => {
  console.log({ eventData });

  const {
    events,
    eventCategories,
    loading: eventsLoading
  } = eventData;

  return (
    <MapProvider>
      <MapContext.Consumer>
        {({ loaded, selectedCategories, setSelectedCategories }) => (
          <div className="Discover Page">
            <ExploreBar />
            <CategoryFilter 
              eventCategoryDefinitions={eventCategories}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />
            <Map
              loaded={loaded && !eventsLoading}
              events={Object.values(events)}
            />
          </div>
        )}
      </MapContext.Consumer>
    </MapProvider>
  );
};

const mapStateToProps = ({ eventData }) => {
  return { eventData };
};

export default connect(mapStateToProps)(Discover);
