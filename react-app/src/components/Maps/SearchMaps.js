// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";

// import { getKey } from "../../store/maps";
import { SearchMaps, GoogleMapsLoader } from "./Maps";

const SearchMapContainer = ({ restaurants }) => {
	return (
		<GoogleMapsLoader>
			<SearchMaps res={restaurants} />
		</GoogleMapsLoader>
	);
};

export default SearchMapContainer;
