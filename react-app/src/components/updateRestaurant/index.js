import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
	updateRestaurant,
	loadRestaurantDetails,
} from "../../store/restaurants";
import "./UpdateRestaurant.css";
import Autocomplete from "react-google-autocomplete";
import { getKey } from "../../store/maps";

const UpdateForm = () => {
	const { restaurantId } = useParams();
	const dispatch = useDispatch();
	const history = useHistory();
	const restaurant = useSelector((state) => state.restaurant[restaurantId]);
	const [validSubmit, setValidSubmit] = useState(false);
	const [errors, setErrors] = useState({});
	const [invalidAddyError, setInvalidAddyError] = useState("");
	const [originalAddress, setOriginalAddress] = useState(restaurant?.address);
	const [originalCity, setOriginalCity] = useState(restaurant?.city);
	const [originalState, setOriginalState] = useState(restaurant?.state);
	const [originalCountry, setOriginalCountry] = useState(restaurant?.country);
	const [originalPostalcode, setOriginalPostalcode] = useState(
		restaurant?.postalcode
	);
	const [originalLat, setOriginalLat] = useState(restaurant?.lat);
	const [originalLng, setOriginalLng] = useState(restaurant?.lng);
	const [postalcode, setPostalCode] = useState(restaurant?.postalcode);
	const [country, setCountry] = useState(restaurant?.country);
	const [address, setAddress] = useState(restaurant?.address);
	const [city, setCity] = useState(restaurant?.city);
	const [state, setState] = useState(restaurant?.state);
	const [lat, setLat] = useState(restaurant?.lat);
	const [lng, setLng] = useState(restaurant?.lng);
	const [data, setData] = useState({
		name: "",
		category: "",
		price: "",
	});

	const key = useSelector((state) => state.maps.key);

	useEffect(() => {
		if (restaurant) {
			setData({
				name: restaurant.name,
				category: restaurant.category,
				price: restaurant.price,
			});
		} else {
			dispatch(loadRestaurantDetails(restaurantId))
				.then((data) => {
					setData({
						name: data.name,
						category: data.category,
						price: data.price,
					});
				})
				.catch((err) => console.error(err));
		}
	}, [dispatch, restaurantId, restaurant]);

	useEffect(() => {
		if (!key) {
			dispatch(getKey());
		}
	}, [dispatch, key]);

	if (!key) {
		return null;
	}

	const handleStringData = (e) => {
		setData({
			...data,
			[e.target.name]: e.target.value,
		});
	};

	const handleNumberData = (e) => {
		setData({
			...data,
			[e.target.name]: parseInt(e.target.value),
		});
	};

	const handleAutocompleteChange = (event) => {
		const inputAddress = event.target.value;
		if (!inputAddress) {
			setAddress(originalAddress);
			setCity(originalCity);
			setState(originalState);
			setCountry(originalCountry);
			setPostalCode(originalPostalcode);
			setLat(originalLat);
			setLng(originalLng);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const errors = {};
		if (!data.name) {
			errors.name = "Name is required";
		}
		if (!data.category) {
			errors.category = "Category is required";
		}
		if (!data.price) {
			errors.price = "Price is required";
		}
		if (invalidAddyError) {
			errors.invalidAddyError = "Please enter a valid address!";
		}
		setErrors(errors);

		if (Object.values(errors).length === 0) {
			setValidSubmit(true);

			const submitData = {
				country: country,
				address: address,
				city: city,
				state: state,
				name: data.name,
				category: data.category,
				price: data.price,
				postalcode: postalcode,
				lat: lat,
				lng: lng,
			};

			try {
				dispatch(updateRestaurant(restaurantId, submitData)).then(
					() => {
						history.push(`/restaurants/${restaurantId}`);
					}
				);
			} catch (error) {
				console.error("Could not update your restaurant:", error);
			}
		}
	};

	return (
		<div className="create-wrapper-master">
			<div className="create-restaurant-container">
				<form
					onSubmit={handleSubmit}
					className="create-restaurant-form"
				>
					<div className="within-form-master-container">
						<div className="form-heading-create">
							Update Your Restaurant's Information Below.
						</div>
						<div className="res-name-price-cat-container">
							<div className="form-group restName">
								<div htmlFor="restaurantName">
									Restaurant name
								</div>
								<input
									type="string"
									id="restaurantName"
									placeholder="Enter restaurant name"
									name="name"
									value={data?.name}
									onChange={handleStringData}
									className={`input-field ${
										errors.name ? "error" : ""
									}`}
								/>
								{errors.name && (
									<p className="error-message-name">
										⚠︎ {errors.name}
									</p>
								)}
							</div>
							<div className="form-group category">
								<div
									className="create-small-boxers"
									htmlFor="category-create"
								>
									Category
								</div>
								<select
									id="category-create"
									onChange={handleStringData}
									name="category"
									className={`input-field ${
										errors.city ? "error" : ""
									}`}
									required
								>
									<option value="0">{data?.category}</option>
									<option value="Mexican">Mexican</option>
									<option value="Korean">Korean</option>
									<option value="American">American</option>
									<option value="Japanese">Japanese</option>
									<option value="French">French</option>
									<option value="Indian">Indian</option>
								</select>
								{errors.category && (
									<p className="error-message">
										⚠︎ {errors.category}
									</p>
								)}
							</div>
							<div className="form-group price">
								<div
									className="create-small-boxers"
									htmlFor="price-create"
								>
									Average Price
								</div>
								<select
									id="price-create"
									onChange={handleNumberData}
									name="price"
									className={`input-field ${
										errors.city ? "error" : ""
									}`}
									required
								>
									<option value="0">
										{restaurant?.price === 4
											? "$$$$"
											: restaurant?.price === 3
											? "$$$"
											: restaurant?.price === 2
											? "$$"
											: restaurant?.price === 1
											? "$"
											: null}{" "}
									</option>
									<option value="1">$</option>
									<option value="2">$$</option>
									<option value="3">$$$</option>
									<option value="4">$$$$</option>
								</select>
								{errors.price && (
									<p className="error-message">
										⚠︎ {errors.price}
									</p>
								)}
							</div>
						</div>
						<div className="auto-complete-container">
							<div
								id="res-address-create"
								htmlFor="auto-complete-box"
							>
								Restaurant Address
							</div>
							<Autocomplete
								id="auto-complete-box"
								apiKey={key}
								placeholder={
									originalAddress +
									", " +
									originalCity +
									", " +
									originalState +
									", " +
									originalCountry
								}
								onPlaceSelected={(place) => {
									if (place?.address_components) {
										setAddress(
											place?.address_components[0]
												?.short_name +
												" " +
												place?.address_components[1]
													?.short_name
										);
										if (place?.geometry?.location) {
											setLng(
												place.geometry.location.lng()
											);
											setLat(
												place.geometry.location.lat()
											);
										}
										place?.address_components.forEach(
											(component) => {
												if (
													component?.types[0] ===
													"locality"
												) {
													setCity(
														component?.short_name
													);
												}
												if (
													component?.types[0] ===
													"administrative_area_level_1"
												) {
													setState(
														component?.short_name
													);
												}
												if (
													component?.types[0] ===
													"country"
												) {
													setCountry(
														component?.short_name
													);
												}
												if (
													component?.types[0] ===
													"postal_code"
												) {
													setPostalCode(
														component?.short_name
													);
												}
											}
										);
									}
									if (!place?.address_components) {
										setInvalidAddyError(
											"Please enter a valid address!"
										);
									} else {
										setInvalidAddyError("");
									}
								}}
								onChange={handleAutocompleteChange}
								options={{
									fields: ["ALL"],
									componentRestrictions: { country: "US" },
									types: ["address"],
								}}
							/>
							{invalidAddyError && (
								<p className="error-message-invalidAddy">
									⚠︎ {invalidAddyError}
								</p>
							)}
						</div>
						<div className="create-res-btn-container">
							<button
								type="submit"
								className="create-restaurant-btn"
								disabled={validSubmit}
							>
								Update Restaurant
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default UpdateForm;
