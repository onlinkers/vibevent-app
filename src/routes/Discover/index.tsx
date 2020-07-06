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

// TODO: Adapt to events that don't have location specified (online/virtual)

const Discover: React.FunctionComponent<DispatchProps> = ({ eventData }) => {

  const {
    events: e,
    eventCategories,
    loading: eventsLoading,
    errors
  } = eventData;

  const events = errors.events ? {} : e;

  return (
    <MapProvider>
      <MapContext.Consumer>
        {({ loaded, selectedCategories, setSelectedCategories }) => (
          <div className="Discover Page">
            <ExploreBar />
            {!errors.eventCategories ? <CategoryFilter
              loaded={loaded && !eventsLoading}
              eventCategoryDefinitions={eventCategories}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            /> : null}
            <Map
              loaded={loaded && !eventsLoading}
              events={events}
              selectedCategories={selectedCategories}
              error={errors.events || null}
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
