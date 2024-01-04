import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { loadRestaurants } from "../../store/restaurants";
import "../GetAllRestaurants/GetAllRestaurants.css";
import "./ProfilePage.css";

function ProfilePage() {
	const dispatch = useDispatch();
	const restaurantsObj = useSelector((state) => state?.restaurant);
	const sessionUser = useSelector((state) => state?.session.user);

	console.log(restaurantsObj);

	useEffect(() => {
		dispatch(loadRestaurants(0, 0, 0));
	}, [dispatch]);

	// const restaurantsArr = sessionUser?.restaurants

	// let ownedId = []
	// restaurantsArr?.forEach(restaurant => {
	//     if (!ownedId.includes(restaurant.id)) {
	//         ownedId.push(restaurant.id)
	//     }
	// })
	const owned = [];
	Object.values(restaurantsObj).forEach((res) => {
		if (res?.owner_id === sessionUser?.id) {
			owned.push(res);
		}
	});

	let resId = [];
	sessionUser?.reviews.forEach((review) => {
		if (!resId.includes(review.restaurant_id)) {
			resId.push(review.restaurant_id);
		}
	});
	const visited = [];
	resId.forEach((id) => {
		visited.push(restaurantsObj[id]);
	});
	return (
		<div className="detail-body profile">
			<div className="profile">
				<div>
					<h1>My Restaurants</h1>
					{owned?.map((restaurant, index) => (
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

												{restaurant?.rating % 1 >=
													0.3 &&
													restaurant?.rating % 1 <=
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
														restaurant?.reviews
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
										<div id="center-dot-text">·</div>
										<div id="price-text">
											{restaurant?.price === 1
												? "$"
												: restaurant?.price === 2
												? "$$"
												: restaurant?.price === 3
												? "$$$"
												: restaurant?.price === 4
												? "$$$$"
												: ""}
										</div>
										<div id="center-dot-text">·</div>
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
											{restaurant?.reviews?.length > 0
												? restaurant.reviews.length > 1
													? `"${
															restaurant.reviews[
																restaurant
																	.reviews
																	.length - 1
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
				<div className="reviews-res">
					<h1>Reviewed Restaurants</h1>
					{visited?.map((restaurant, index) => (
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

												{restaurant?.rating % 1 >=
													0.3 &&
													restaurant?.rating % 1 <=
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
														restaurant?.reviews
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
										<div id="center-dot-text">·</div>
										<div id="price-text">
											{restaurant?.price === 1
												? "$"
												: restaurant?.price === 2
												? "$$"
												: restaurant?.price === 3
												? "$$$"
												: restaurant?.price === 4
												? "$$$$"
												: ""}
										</div>
										<div id="center-dot-text">·</div>
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
											{restaurant?.reviews?.length > 0
												? restaurant.reviews.length > 1
													? `"${
															restaurant.reviews[
																restaurant
																	.reviews
																	.length - 1
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
		</div>
	);
}

export default ProfilePage;
