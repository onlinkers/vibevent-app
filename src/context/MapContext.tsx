import React, { createContext, useState } from "react";
import { Map } from "mapbox-gl";

interface ContextProps {
  loaded: boolean;
  map: Map | null;
  setMap: Function;
  selectedCategories: string[];
  setSelectedCategories: Function;
}

interface ProviderProps {
  children: JSX.Element;
}

const MapContext = createContext<ContextProps>({
  loaded: false,
  map: null,
  setMap: () => {},
  selectedCategories: [],
  setSelectedCategories: () => {},
});

const MapProvider: React.FunctionComponent<ProviderProps> = ({ children }) => {
  // "map" stores the mapbox object itself
  // "loaded" stores a boolean that marks 'true' when the mapbox object is stored
  const [map, setMap] = useState<Map | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const value = {
    loaded: !!map,
    map,
    setMap,
    selectedCategories,
    setSelectedCategories
  };

  return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
};

export { MapContext, MapProvider };
