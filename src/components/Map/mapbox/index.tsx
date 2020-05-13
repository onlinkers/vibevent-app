import React, { useEffect, useRef, useContext, useState } from "react";
import ReactDOM from "react-dom";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "mapbox-gl-geocoder";

import { MapContext } from "context/MapContext";
import EventMarker from "../markers/eventMarker";

import { Event } from "types/props";
import "mapbox-gl/dist/mapbox-gl.css";
import "./index.css";

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

// Most of the react mapbox wrappers need updating to accommodate for deprecating react functions & packages
// Although more tedious, it is more scalable to build our own wrapper component for Mapbox
// Good resource: https://blog.mapbox.com/mapbox-gl-js-react-764da6cc074a

interface MapboxProps {
	children?: React.ReactNode
	functions?: any
	events: Event[] | []
}

interface EventFeature {
  place_name: string
  center: number[]
  place_type: string[]
  type: string
  properties: {
      title: string
      description: string
  }
  geometry: {
      coordinates: number[]
      type: "Point" | null
  }
}

// Map component is "memoized" to prevent unnecesseary re-rendering
// Re-rendering should only be deone when any of the data being passed in is "changed"
// A "TODO" is to determine how often this data needs to change (important for live events)
const Mapbox = React.memo<MapboxProps>(
  ({ children, functions, events = [] }) => {

    const { map, setMap } = useContext(MapContext);
    const mapContainer = useRef(null);
    const [center, setCenter] = useState([-123.1207, 49.2827]);
    const [zoom, setZoom] = useState(8);
    
    const formattedEvents = {
      features: events.map((event) => (event && {
        type: "Feature",
        properties: {
          title: event.name,
          description: event.description || "",
        },
        geometry: event.venue.location
      })),
      type: "FeatureCollection"
    };

    //  ___ _   _ _  _  ___ _____ ___ ___  _  _ ___
    // | __| | | | \| |/ __|_   _|_ _/ _ \| \| / __|
    // | _|| |_| | .` | (__  | |  | | (_) | .` \__ \
    // |_|  \___/|_|\_|\___| |_| |___\___/|_|\_|___/
    //

    /**
     * INITIALIZATION FUNCTION
     * Accompanies the mapbox-gl-geocoder search bar
     * The function is used to allow lookup of events from our database (stored in redux)
     * @param query - the query string entered into the search bar
     */
    const localEventGeocoder = (query) => {
      const matchingFeatures: EventFeature[] = [];
      formattedEvents.features.forEach((event) => {

        if(event.properties.title.toLowerCase().search(query.toLowerCase()) !== -1) {
          const feature = {
            ...event,
            "place_name": event.properties.title,
            "center": event.geometry.coordinates,
            "place_type": ["event"]
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
    const loadEventMarkers = (events) => {
      // load the event markers
      events.forEach((event) => {
        // load the react JSX as a DOM element
        const markerNode = document.createElement("div");
        ReactDOM.render(
          <EventMarker
            event={event}
            redirect={functions.redirectToEvent}
          />,
          markerNode
        );

        // Add the element to the map
        new mapboxgl.Marker(markerNode, {})
          .setLngLat(event.venue.location.coordinates)
          .addTo(map);
      });
    };

    /**
     * INITIALIZATION FUNCTION
     * Creates and instance of mapbox-gl-geocoder's search controller and adds it to the map
     * The mapbox-gl-geocoder controller takes the 'top-right' spot
     */
    const loadMapSearch = () => {
      const mapGeocoder = new MapboxGeocoder({
        accessToken: MAPBOX_TOKEN,
        placeholder: "Search for a place/event",
        // localGeocoder: localEventGeocoder,
        // localGeocoderOnly: true
        // mapboxgl: mapboxgl,
        // marker: true,
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

    // any additional map functionality and listeners should be written
    // in this "useEffect" method
    useEffect(() => {

      if(map) {
        loadEventMarkers(events);
        loadMapSearch();
      }

    }, [map]); // eslint-disable-line
    // (disable line to overcome exhaustive depts in the previous line)
    

    //    ___  ___ ___ ___    _ _____ ___ ___  _  _ ___ 
    //   / _ \| _ \ __| _ \  /_\_   _|_ _/ _ \| \| / __|
    //  | (_) |  _/ _||   / / _ \| |  | | (_) | .` \__ \
    //   \___/|_| |___|_|_\/_/ \_\_| |___\___/|_|\_|___/
    //

    // Write out map modification functions here
    

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
