import React, { useEffect, useRef, useContext, useState } from "react";
import PropTypes from "prop-types";

import { MapContext } from "context/MapContext";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import "./index.css";

// Most of the react mapbox wrappers need updating to accommodate for deprecating react functions & packages
// Although more tedious, it is more scalable to build our own wrapper component for Mapbox
// Good resource: https://blog.mapbox.com/mapbox-gl-js-react-764da6cc074a

interface MapboxProps {
	children?: React.ReactNode
}

const Mapbox: React.FunctionComponent<MapboxProps> = ({ children }) => {

	const { map, setMap } = useContext(MapContext);
	const mapContainer = useRef(null);
	const [center, setCenter] = useState([-123.1207, 49.2827]);
	const [zoom, setZoom] = useState(8);
    
	useEffect(() => {
        
		mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

		if(!map) {

			const mapObject = new mapboxgl.Map({
				container: mapContainer.current,
				style: "mapbox://styles/mapbox/streets-v11",
				center: center,
				zoom: zoom,
			});
            
			mapObject.on("load", () => {
				setMap(mapObject);
				mapObject.resize();
			});

		}

	}, [center, zoom, map, setMap]);

	return (
		<div className="Mapbox" ref={mapContainer}>
			{map && children}
		</div>
	);

};

Mapbox.propTypes = { children: PropTypes.node };
export default Mapbox;