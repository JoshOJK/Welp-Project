// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";

// import { getKey } from "../../store/maps";
import { Maps, GoogleMapsLoader } from "./Maps";

const MapContainer = ({ resLat, resLng }) => {
	return (
		<GoogleMapsLoader>
			<Maps latty={resLat} lngy={resLng} />
		</GoogleMapsLoader>
	);
};

export default MapContainer;
