import React, { useEffect, useRef, useContext, useState } from "react";
import { MapContext } from "context/MapContext";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";

import EventMarker from "../markers/eventMarker";

import { Event } from "types/props";
import "./index.css";

// Most of the react mapbox wrappers need updating to accommodate for deprecating react functions & packages
// Although more tedious, it is more scalable to build our own wrapper component for Mapbox
// Good resource: https://blog.mapbox.com/mapbox-gl-js-react-764da6cc074a

interface MapboxProps {
	children?: React.ReactNode
	events: Event[] | []
}

// Map component is "memoized" to prevent unnecesseary re-rendering
// Re-rendering should only be deone when any of the data being passed in is "changed"
// A "TODO" is to determine how often this data needs to change (important for live events)
const Mapbox = React.memo<MapboxProps>(({ children, events = [] }) => {

	const { map, setMap } = useContext(MapContext);
	const mapContainer = useRef(null);
	const [center, setCenter] = useState([-123.1207, 49.2827]);
	const [zoom, setZoom] = useState(8);
    
	useEffect(() => {
        
		mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

		if(!map) {

			// mapbox initialization occurs here
			const mapObject = new mapboxgl.Map({
				container: mapContainer.current,
				style: "mapbox://styles/mapbox/streets-v11",
				center: center,
				zoom: zoom,
			});
			
			// any additional map functionality and listeners should be written
			// in this "useEffect" method
			mapObject.on("load", () => {
				setMap(mapObject);
				mapObject.resize();
			});

		}
			
		events.forEach((event) => {
			console.log({ event });
		});

	}, [center, zoom, map, setMap, events]);

	return (
		<div className="Mapbox" ref={mapContainer}>
			{map && children}
		</div>
	);

});

export default Mapbox;