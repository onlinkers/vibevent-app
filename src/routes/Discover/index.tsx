import React from "react";
import Map from "components/Map";
import { MapContext, MapProvider } from "context/MapContext";

interface Props {}

const Discover: React.FunctionComponent<Props> = () => {
  return (
    <MapProvider>
      <MapContext.Consumer>
        {({ loaded }) => (
          <div className="Discover Page">
            <Map loaded={loaded} />
          </div>
        )}
      </MapContext.Consumer>
    </MapProvider>
  );
};

export default Discover;
