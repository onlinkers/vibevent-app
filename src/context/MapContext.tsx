import React, { createContext, useState } from "react";
import { Map } from "mapbox-gl";

interface ContextProps {
  setMap: Function
  map: Map | null
  loaded: boolean
}

const MapboxContext = createContext<ContextProps>({
	setMap: () => {},
	map: null,
	loaded: false,
});

const MapboxProvider: React.FunctionComponent = (children) => {

	const [map, setMap] = useState<Map | null>(null);
	const value = { setMap, map, loaded: !!map };

	return (
		<MapboxContext.Provider value={value}>
			{children}
		</MapboxContext.Provider>
	);
};

export { MapboxContext, MapboxProvider };
