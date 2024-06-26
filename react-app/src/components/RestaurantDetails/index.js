import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { loadRestaurantDetails } from "../../store/restaurants";
import "../RestaurantDetails/RestaurantDetails.css";
import DetailsModalButton from "../OpenModalButton/indexv4";
import DeleteForm from "../DeleteConfirmation";
import DeleteReviewForm from "../DeleteReview";
import ImagesFormModal from "../GetAllImagesModal";
import ImagesModalButton from "../OpenModalButton/indexv3";
import CreateRestaurantImage from "../createResImagesForm";
import UpdateResImgFunc from "../ManageResPhotos";
import MapContainer from "../Maps/index";

function RestaurantDetailsPage() {
	const history = useHistory();
	const dispatch = useDispatch();
	const { restaurantId } = useParams();
	const restaurant = useSelector((state) => state?.restaurant[restaurantId]);
	const sessionUser = useSelector((state) => state?.session.user);

	useEffect(() => {
		dispatch(loadRestaurantDetails(restaurantId));
	}, [dispatch, restaurantId]);

	const images = [];
	const resImages = [];

	if (restaurant?.images?.length) {
		restaurant?.images?.forEach((image) => {
			images?.push(image?.url);
			resImages.push(image);
		});
	}
	if (restaurant?.reviews?.length) {
		restaurant?.reviews?.forEach((review) => {
			if (review?.images?.length) {
				review?.images?.forEach((image) => {
					images?.push(image?.url);
				});
			}
		});
	}

	let priceFunc;
	const price = restaurant?.price;
	if (price === 4) {
		priceFunc = "$$$$";
	} else if (price === 3) {
		priceFunc = "$$$";
	} else if (price === 2) {
		priceFunc = "$$";
	} else if (price === 1) {
		priceFunc = "$";
	}

	return (
		<div className="detail-body">
			<div id="res-img">
				{restaurant?.images?.length > 0 && (
					<img
						className="img-tile"
						src={restaurant?.images[0]?.url}
					/>
				)}
				<div className="info-thing">
					<div id="restaurant-name"> {restaurant?.name}</div>
					{restaurant?.reviews?.length ? (
						<div className="rating-div">
							<div className="stars-div">
								{[...Array(Math.floor(restaurant?.rating))].map(
									(_, i) => (
										<i
											key={i}
											id="review-star-detail"
											className="fa-solid fa-star"
										></i>
									)
								)}

								{restaurant?.rating % 1 >= 0.3 &&
									restaurant?.rating % 1 <= 0.7 && (
										<i
											id="review-star-half-detail"
											className="fa-solid fa-star"
										></i>
									)}
							</div>

							<div className="rating-text-detail">
								{restaurant?.rating}{" "}
								<span id="num-reviews-text-detail">
									({restaurant?.reviews?.length} reviews)
								</span>
							</div>
						</div>
					) : null}
					<div id="restaurant-cat">
						<div id="restaurant-price">
							{priceFunc} · {restaurant?.category}
						</div>
						<ImagesModalButton
							buttonText="See all photos"
							modalComponent={
								<ImagesFormModal
									images={images}
									name={restaurant?.name}
								/>
							}
						/>
					</div>
				</div>
			</div>
			<div id="res-details">
				<div id="option-buttons">
					{sessionUser?.id !== restaurant?.owner.id &&
						sessionUser?.id && (
							<button
								onClick={() =>
									history.push(
										`/restaurants/${restaurant?.id}/new-review`
									)
								}
							>
								Write a review
							</button>
						)}
					{sessionUser?.id === restaurant?.owner?.id && (
						<div id="manage-buttons">
							<button
								onClick={() =>
									history.push(
										`/restaurants/edit/${restaurant?.id}`
									)
								}
							>
								Update Restaurant Info
							</button>
							<DetailsModalButton
								buttonText="Add Photos"
								modalComponent={
									<CreateRestaurantImage
										restaurantId={restaurant?.id}
									/>
								}
							/>
							<DetailsModalButton
								buttonText="Manage Restaurant Photos"
								modalComponent={
									<UpdateResImgFunc
										resImages={resImages}
										name={restaurant?.name}
										restaurantId={restaurantId}
									/>
								}
							/>
							<DetailsModalButton
								buttonText="Delete Restaurant"
								modalComponent={
									<DeleteForm restaurantId={restaurant?.id} />
								}
							/>
						</div>
					)}
					<div id="res-location">
						<div id="location-tag">Location:</div>
						<div>
							{" "}
							{restaurant?.address}, {restaurant?.city},{" "}
							{restaurant?.state}, {restaurant?.country}
						</div>
					</div>
				</div>
				<div className="res-details-map-container">
					<MapContainer
						resLat={restaurant?.lat}
						resLng={restaurant?.lng}
					/>
				</div>
				<div id="all-da-reviews">
					<div id="rec-review-text">Recommended Reviews</div>
					{restaurant?.reviews?.map((review) => (
						<div id="res-details-rev-info" key={review?.id}>
							<div id="rev-prof-header">
								<div id="prof-stars">
									<span
										id="profile-icon-2"
										className="material-symbols-outlined"
									>
										account_circle
									</span>
									<div id="reviewer-username">
										{review?.reviewer?.username}
										<div id="reviewer-stars">
											{[...Array(review?.stars)].map(
												(_, i) => (
													<i
														key={i}
														id="review-star-homepage"
														className="fa-solid fa-star"
													></i>
												)
											)}
										</div>
									</div>
								</div>
								{review?.reviewer?.id === sessionUser?.id && (
									<div id="manage-rev-buttons">
										<button
											onClick={() =>
												history.push(
													`/restaurants/${restaurant?.id}/review/${review?.id}/edit`
												)
											}
										>
											Update Review
										</button>
										<button
											onClick={() =>
												history.push(
													`/restaurants/${restaurant?.id}/review/${review?.id}/images/edit`
												)
											}
										>
											Manage Photos
										</button>
										<DetailsModalButton
											buttonText="Delete Review"
											modalComponent={
												<DeleteReviewForm
													reviewId={review?.id}
													restaurantId={
														restaurant?.id
													}
												/>
											}
										/>
									</div>
								)}
							</div>
							<div id="details-review-text">{review?.review}</div>
							{review?.images?.length > 0 && (
								<div id="rev-imgs-container">
									{review.images.map((image) => (
										<img key={image?.id} src={image.url} />
									))}
								</div>
							)}
						</div>
					))}
				</div>
			</div>
			<div id="footer">
					<h1 id="footer-title">Creators</h1>
					<div id="footer-wrapper">
					<div id="gino-footer">
						<div id="link-wrapper">
						<a target="_blank" href="https://github.com/JustAMan22">
            				<div className="footer-button">
                				<div className="github-icon">
                					<i class="fa fa-github"></i>
                				</div>

            				</div>
            			</a>
						<a target="_blank" href="https://www.linkedin.com/in/gino-farfaglia-5513b9186/">
            				<div className="footer-button">
                				<div className="linkedin-icon">
                					<i class="fa fa-linkedin-square"></i>
                				</div>

            				</div>
            			</a>
						</div>
						<p>Gino Farfaglia</p>
					</div>
					<div id="josh-footer">
					<div id="link-wrapper">
						<a target="_blank" href="https://github.com/JoshOJK">

            				<div className="footer-button">
                				<div className="github-icon">
                					<i class="fa fa-github"></i>
                				</div>

            				</div>
            			</a>
						<a target="_blank" href="https://www.linkedin.com/in/joshuajk/">
            				<div className="footer-button">
                				<div className="linkedin-icon">
                					<i class="fa fa-linkedin-square"></i>
                				</div>

            				</div>
            			</a>
						</div>
						<p>Josh Krienke</p>
					</div>
					<div id="stephen-footer">
					<div id="link-wrapper">
					<a target="_blank" href="https://github.com/srsy12">
            				<div className="footer-button">
                				<div className="github-icon">
                					<i class="fa fa-github"></i>
                				</div>

            				</div>
            			</a>
						<a target="_blank" href="https://www.linkedin.com/in/srsly12/">
            				<div className="footer-button">
                				<div className="linkedin-icon">
                					<i class="fa fa-linkedin-square"></i>
                				</div>

            				</div>
            			</a>
						</div>
						<p>Stephen Sy</p>
					</div>
					</div>
				</div>
		</div>
	);
}

export default RestaurantDetailsPage;
