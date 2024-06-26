import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { loadRestaurants } from "../../store/restaurants";
import "../GetAllRestaurants/GetAllRestaurants.css";
import SearchMapContainerMapContainer from "../Maps/SearchMaps";

function GetAllRestaurantsPage() {
	const dispatch = useDispatch();
	let { name, price, category } = useParams();
	const restaurants = useSelector((state) => state.restaurant);

	useEffect(() => {
		if (name == 0) {
			name = parseInt(0);
		}
		if (category == 0) {
			category = parseInt(0);
		}
		price = parseInt(price);
		dispatch(loadRestaurants(name, price, category));
	}, [dispatch, name, price, category]);

	const restaurantsLooper = Object.values(restaurants);

	let priceFunc;
	const newPrice = restaurants?.price;
	if (price == 4) {
		priceFunc = "$$$$";
	} else if (price == 3) {
		priceFunc = "$$$";
	} else if (price == 2) {
		priceFunc = "$$";
	} else if (price == 1) {
		priceFunc = "$";
	}

	return (
		<>
			{restaurantsLooper?.length > 0 ? (
				<div className="master-container">
					<div className="res-detail-body">
						<div className="h1-lameo">
							Displaying restaurants below
						</div>
						<div className="all-restaurant-tiles">
							{restaurantsLooper?.map((restaurant, index) => (
								<NavLink
									key={restaurant?.id}
									to={`/restaurants/${restaurant?.id}`}
									className="indv-res-navlink"
								>
									<div className="indv-res-info-container">
										<div className="res-img-container">
											<img
												src={restaurant?.images[0]?.url}
												className="actl-res-img"
											></img>
										</div>
										<div className="res-info-container">
											<div id="res-name-text">
												{index + 1}. {restaurant?.name}
											</div>
											{restaurant?.reviews?.length ? (
												<div className="rating-div">
													<div className="stars-div">
														{[
															...Array(
																Math.floor(
																	restaurant?.rating
																)
															),
														].map((_, i) => (
															<i
																key={i}
																id="review-star"
																className="fa-solid fa-star"
															></i>
														))}

														{restaurant?.rating %
															1 >=
															0.3 &&
															restaurant?.rating %
																1 <=
																0.7 && (
																<i
																	id="review-star-half"
																	className="fa-solid fa-star"
																></i>
															)}
													</div>

													<div className="rating-text">
														{restaurant?.rating}{" "}
														<span id="num-reviews-text">
															(
															{
																restaurant
																	?.reviews
																	?.length
															}{" "}
															reviews)
														</span>
													</div>
												</div>
											) : null}

											<div className="category-price-container">
												<div id="cat-text">
													{restaurant?.category}
												</div>
												<div id="center-dot-text">
													·
												</div>
												<div id="price-text">
													{restaurant?.price === 1
														? "$"
														: restaurant?.price ===
														  2
														? "$$"
														: restaurant?.price ===
														  3
														? "$$$"
														: restaurant?.price ===
														  4
														? "$$$$"
														: ""}
												</div>
												<div id="center-dot-text">
													·
												</div>
												<div id="neighborhood-text">
													neighborhood
												</div>
											</div>
											<div className="latest-review-text">
												<div id="bubble-icon-container">
													<span
														id="review-bubble-icon"
														className="material-symbols-outlined"
													>
														chat_bubble
													</span>
												</div>
												<div id="review-text-search">
													{restaurant?.reviews
														?.length > 0
														? restaurant.reviews
																.length > 1
															? `"${
																	restaurant
																		.reviews[
																		restaurant
																			.reviews
																			.length -
																			1
																	]?.review
															  }"`
															: `"${restaurant.reviews[0]?.review}"`
														: '"This restaurant currently has no reviews, be the first one to tell us about your experience."'}
												</div>
											</div>
										</div>
									</div>
								</NavLink>
							))}
						</div>
					</div>
					<div className="goggle-maps">
						<SearchMapContainerMapContainer
							restaurants={restaurantsLooper}
						/>
					</div>
				</div>
			) : (
				<div id="no-res-text">Sorry no restaurants found..</div>
			)}
		</>
	);
}

export default GetAllRestaurantsPage;
