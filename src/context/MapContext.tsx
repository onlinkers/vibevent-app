import React, { createContext, useState } from "react";
import PropTypes from "prop-types";
import { Map } from "mapbox-gl";

interface ContextProps {
  setMap: Function
  map: Map | null
  loaded: boolean
}

const MapContext = createContext<ContextProps>({
	setMap: () => {},
	map: null,
	loaded: false,
});

const MapProvider: React.FunctionComponent = ({ children }) => {

	// "map" stores the mapbox object itself
	// "loaded" stores a boolean that marks 'true' when the mapbox object is stored
	const [map, setMap] = useState<Map | null>(null);
	const value = { setMap, map, loaded: !!map };

	return (
		<MapContext.Provider value={value}>
			{children}
		</MapContext.Provider>
	);
};

MapProvider.propTypes = { children: PropTypes.node };
export { MapContext, MapProvider };
