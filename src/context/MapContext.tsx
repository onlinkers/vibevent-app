import { createContext } from "react";
import { Map } from "mapbox-gl";

interface ContextProps {
  setMap: Function | null
  map: Map | null
  loaded: boolean
}

const MapboxContext = createContext<ContextProps>({
	setMap: null,
	map: null,
	loaded: false,
});

export default MapboxContext;
