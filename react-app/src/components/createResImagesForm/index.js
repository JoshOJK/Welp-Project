import React, { useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createRestaurantImage } from "../../store/restaurants";
import "../createResImagesForm/createResImagesForm.css";
import { useModal } from "../../context/Modal";
import { loadRestaurantDetails } from "../../store/restaurants";

function CreateRestaurantImage({ restaurantId }) {
	const dispatch = useDispatch();
	const { closeModal } = useModal();
	const history = useHistory();
	const [images, setImages] = useState(["", ""]);
	const [errors, setErrors] = useState({});
	const [imageLoading, setImageLoading] = useState(false);
	const [submitted, setSubmitted] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const errors = {};
		// if (images?.length > 0) {
		//     if (!images[0].match(/\.(png|jpe?g)$/) || !images[0]) {
		//         errors.images = "Image URL must end in .png, .jpg, or .jpeg!";
		//     }
		// }
		if (!images) {
			errors.images = "Add at least one Image URL";
		}
		setErrors(errors);

		if (Object.values(errors).length === 0) {
			setSubmitted(true);

			try {
				images?.forEach(async (url) => {
					if (url) {
						const formData = new FormData();
						formData.append("url", url);
						await dispatch(
							createRestaurantImage(formData, restaurantId)
						);
					}
					await dispatch(loadRestaurantDetails(restaurantId));
					closeModal();
				});
			} catch (error) {
				console.error("Error creating Image:", error);
				if (error instanceof Response) {
					const responseJson = await error.json();
					console.error("Server response:", responseJson);
				}
			}
		}
	};

	return (
		<div id="create-images-form-modal">
			<h2 className="create-review-title">
				Add Photos to Your Restaurant
			</h2>
			<form onSubmit={handleSubmit}>
				<div className="review-content-main">
					<div className="images-master-parent">
						{images.map((url, index) => (
							<div key={index} className="form-row-images">
								{index === 0 && errors.images && (
									<span className="create-review-image-error">
										⚠︎ {errors.images}
									</span>
								)}
								<div className="attch-photos-txt2">
									Attach Photos
								</div>
								<div className="review-url-container">
									{images[index]?.name && (
										<div id="image-name2">
											Selected files:{" "}
											{images[index]?.name}
										</div>
									)}
									<label className="create-image-label">
										<div className="upload-img-icon-container">
											<div
												id="upload-image-icon"
												className="material-symbols-outlined"
											>
												add_a_photo
											</div>
											<input
												type="file"
												accept="image/png, image/jpeg, image/jpg"
												placeholder="Image URL"
												onChange={(e) => {
													const newImages = [
														...images,
													];
													newImages[index] =
														e.target.files[0];
													setImages(newImages);
												}}
												className="create-image-input"
											/>
										</div>
									</label>
								</div>
							</div>
						))}
					</div>
					<br />
					<button
						type="submit"
						className="add-photos-submit-button"
						disabled={submitted}
					>
						Add Photos
					</button>
				</div>
			</form>
		</div>
	);
}

export default CreateRestaurantImage;
