import React, { useEffect, useRef, useContext } from "react";
import ReactDOM from "react-dom";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

import { MapContext } from "context/MapContext";
import EventMarker from "../markers/eventMarker";

import { Event } from "types/props";
import "mapbox-gl/dist/mapbox-gl.css";
import "./index.scss";

import { filterEventMarkersToDelete } from "utils";

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

// Most of the react mapbox wrappers need updating to accommodate for deprecating react functions & packages
// Although more tedious, it is more scalable to build our own wrapper component for Mapbox
// Good resource: https://blog.mapbox.com/mapbox-gl-js-react-764da6cc074a

interface MapboxProps {
  children?: React.ReactNode;
  functions?: any;
  events: Event[] | [];
}

interface EventFeature {
  place_name: string;
  center: number[];
  place_type: string[];
  type: string;
  properties: {
    title: string;
    description: string;
    maki?: string;
  };
  geometry: {
    coordinates: number[];
    type: "Point" | null;
  };
  [x: string]: any;
}

// Map component is "memoized" to prevent unnecesseary re-rendering
// Re-rendering should only be deone when any of the data being passed in is "changed"
// A "TODO" is to determine how often this data needs to change (important for live events)
const Mapbox = React.memo<MapboxProps>(
  ({ children, functions, events = [] }) => {
    const {
      map,
      setMap,
      eventMarkerObjects,
      setEventMarkerObjects,
    } = useContext(MapContext);
    const mapContainer = useRef(null);

    // TODO: create functions with mapbox listeners
    // const [center, setCenter] = useState([-123.1207, 49.2827]);
    // const [zoom, setZoom] = useState(8);
    const center = [-123.1207, 49.2827];
    const zoom = 8;
    // remove the two lines above after

    const formattedEvents = {
      features: events.map(
        (event) =>
          event && {
            type: "Feature",
            text: event.name,
            properties: {
              title: event.venue.name,
              description: event.description || "",
            },
            geometry: event.venue.location,
          }
      ),
      type: "FeatureCollection",
    };

    //  ___ _   _ _  _  ___ _____ ___ ___  _  _ ___
    // | __| | | | \| |/ __|_   _|_ _/ _ \| \| / __|
    // | _|| |_| | .` | (__  | |  | | (_) | .` \__ \
    // |_|  \___/|_|\_|\___| |_| |___\___/|_|\_|___/
    //
    // http://patorjk.com/software/taag/#p=display&f=Small&t=FUNCTIONS

    /**
     * INITIALIZATION FUNCTION
     * Accompanies the mapbox-gl-geocoder search bar
     * The function is used to allow lookup of events from our database (stored in redux)
     * @param query - the query string entered into the search bar
     */
    const localEventGeocoder = (query: string) => {
      const matchingFeatures: EventFeature[] = [];
      formattedEvents.features.forEach((event) => {
        // Search through both the event name and title
        const placeName = `${event.text} @ ${event.properties.title}`;
        if (placeName.toLowerCase().search(query.toLowerCase()) !== -1) {
          const feature = {
            ...event,
            place_name: placeName,
            place_name_exclude_text: event.properties.title,
            center: event.geometry.coordinates,
            place_type: ["custom_event"],
          };
          matchingFeatures.push(feature);
        }
      });
      return matchingFeatures;
    };

    /**
     * INITIALIZATION FUNCTION
     * Creates and loads event markers onto the map
     * @param events - array of events we want to load into the map
     */
    const loadEventMarkers = (events: Event[]) => {
      const markers = {};

      // load the event markers
      events.forEach((event) => {
        // load the react JSX as a DOM element
        const markerNode = document.createElement("div");
        markerNode.className = "custom-mapbox-event-marker";
        ReactDOM.render(
          <EventMarker event={event} redirect={functions.redirectToEvent} />,
          markerNode
        );

        // Add the element to the map
        const marker = new mapboxgl.Marker(markerNode, {})
          .setLngLat(event.venue.location.coordinates)
          .addTo(map);

        markers[event._id] = marker;
      });

      setEventMarkerObjects({ ...eventMarkerObjects, ...markers });
    };

    /**
     * INITIALIZATION FUNCTION
     * Creates and instance of mapbox-gl-geocoder's search controller and adds it to the map
     * The mapbox-gl-geocoder controller takes the 'top-right' spot
     */
    const loadMapSearch = () => {
      const mapGeocoder = new MapboxGeocoder({
        accessToken: MAPBOX_TOKEN,
        placeholder: "Search for events, locations, dates",
        localGeocoder: localEventGeocoder,
        mapboxgl: mapboxgl,
        marker: true,
        render: (item: EventFeature) => {
          // Check if an event or place
          const isEvent = item["place_type"].includes("custom_event");

          // for mapbox places, "place_name" tends to contain the text itself. remove to clean it.
          let locationString = item.place_name_exclude_text || item.place_name;
          if (!isEvent && item.text) {
            let locationArray: string[] = item.place_name.split(",");
            locationArray = locationArray.filter(
              (word) => word.toLowerCase() !== item.text.toLowerCase()
            );
            locationString = locationArray.join(", ");
          }

          // "maki" property is used to find the appripriate mapbox icon
          // TODO: better event icons
          const icon = isEvent ? "star" : item.properties.maki || "marker";

          // Need to return a string
          return `<div>
              <img class="geocoder-dropdown-icon" src="https://unpkg.com/@mapbox/maki@6.1.0/icons/${icon}-15.svg" />
              <strong>${item.text}</strong>
            </div>
            <div>${locationString}</div>`;
        },
      });

      map.addControl(mapGeocoder, "top-right");
    };

    //  ___ _  _ ___ _____ ___   _   _    ___ _______ ___  _  _ ___
    // |_ _| \| |_ _|_   _|_ _| /_\ | |  |_ _|_  /_ _/ _ \| \| / __|
    //  | || .` || |  | |  | | / _ \| |__ | | / / | | (_) | .` \__ \
    // |___|_|\_|___| |_| |___/_/ \_\____|___/___|___\___/|_|\_|___/
    //

    // This "useEffect" method is run on the first load simply to initialize the map
    useEffect(() => {
      mapboxgl.accessToken = MAPBOX_TOKEN;

      if (!map) {
        // mapbox initialization occurs here
        const mapObject = new mapboxgl.Map({
          container: mapContainer.current,
          style: "mapbox://styles/mapbox/streets-v11",
          center: center,
          zoom: zoom,
        });

        mapObject.on("load", () => {
          if (mapContainer.current) {
            setMap(mapObject);
            mapObject.resize();
          }
        });
      }
    }, []); // eslint-disable-line
    // (disable line to overcome exhaustive depts in the previous line)

    // any additional map functionality and initializations should be written
    // in this "useEffect" method
    useEffect(() => {
      if (map) {
        loadEventMarkers(events);
        loadMapSearch();
      }
    }, [map]); // eslint-disable-line
    // (disable line to overcome exhaustive depts in the previous line)

    //  _    ___ ___ _____ ___ _  _ ___ ___  ___
    // | |  |_ _/ __|_   _| __| \| | __| _ \/ __|
    // | |__ | |\__ \ | | | _|| .` | _||   /\__ \
    // |____|___|___/ |_| |___|_|\_|___|_|_\|___/
    //

    // Change markers according to event list
    useEffect(() => {
      if (!map) return;
      // look for markers to delete (reduce need to remove+re-add markers)
      // TODO: Instead of deleting, add some more logic to allow "hiding" and "showing" instead.
      const results = filterEventMarkersToDelete(eventMarkerObjects, events);

      let eventIdsToIgnore: string[] = [];

      if (results) {
        const { markersToDelete, markersLeft, eventIdsWithMarkers } = results;
        eventIdsToIgnore = eventIdsWithMarkers;
        // delete markers we don't want
        markersToDelete.forEach((marker) => {
          marker.remove();
        });
        // reset the marker objects
        setEventMarkerObjects(markersLeft);
      }
      // add new markers
      const eventsToAdd = events.filter(
        (event) => !eventIdsToIgnore.includes(event._id)
      );
      if (eventsToAdd.length) {
        loadEventMarkers(eventsToAdd);
      }
    }, [events]); // eslint-disable-line
    // (disable line to overcome exhaustive depts in the previous line)

    //  ___ ___ _  _ ___  ___ ___
    // | _ \ __| \| |   \| __| _ \
    // |   / _|| .` | |) | _||   /
    // |_|_\___|_|\_|___/|___|_|_\
    //

    return (
      <React.Fragment>
        <div className="Mapbox" ref={mapContainer} />
        {map && children}
      </React.Fragment>
    );
  }
);

export default Mapbox;
