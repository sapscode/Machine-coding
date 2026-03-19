import { useState } from "react";

const Stars = ({ totalStars, rating, setRating }) => {
	// temporary rating shown while hovering
	const [hoverRating, setHoverRating] = useState(0);

	// Keyboard accessibility
	const handleKeydown = (e, i) => {
		if (e.key === "Enter" || e.key === " ") {
			setRating(i + 1);
		}

		if (e.key === "ArrowRight") {
			setRating((prev) => Math.min(prev + 1, totalStars));
		}

		if (e.key === "ArrowLeft") {
			setRating((prev) => Math.max(prev - 1, 0));
		}
	};

	return (
		<>
			{/* Create an array of length totalStars */}
			{Array.from({ length: totalStars }, (_, i) => {
				return (
					<span
						key={i}
						role="button"
						tabIndex={0}
						aria-label={`Rate ${i + 1} star`}
						/*
            If star index is less than current display rating
            → highlight the star
            hoverRating overrides rating while hovering
            */
						className={i < (hoverRating || rating) ? "star gold" : "star"}
						onClick={() => setRating(i + 1)}
						onMouseEnter={() => setHoverRating(i + 1)} // update hover state (temp rating) rating while mouse is over star
						onMouseLeave={() => setHoverRating(0)} // Remove hover preview when leaving the star
						onKeyDown={(e) => handleKeydown(e, i)}
					>
						&#9733;
					</span>
				);
			})}
		</>
	);
};
export default Stars;
