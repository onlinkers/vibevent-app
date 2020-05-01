import React from "react";
import Mapbox from "./box";

interface Props {
    loaded: boolean
}

const Map: React.FunctionComponent<Props> = (loaded) => {
	return loaded ? (
		<Mapbox />
	) : (
		<div className="Page Loader">Loading...</div>
	);
};

export default Map;