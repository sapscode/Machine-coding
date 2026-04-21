// Displays the main carousel image with navigation controls (arrow buttons)
// Interview pattern: Component receives data and callback functions as props
const ImageContainer = ({ currentImage, setCurrentIndex, totalImages }) => {
	// Handle previous button: circular navigation using modulo arithmetic
	// (prev - 1 + totalImages) ensures index wraps from 0 to last image
	// Example: if at index 0, prev becomes -1, adding totalImages wraps to last index
	const previousImage = () => {
		setCurrentIndex((prev) => (prev - 1 + totalImages) % totalImages);
	};

	// Handle next button: modulo wraps back to 0 after reaching last image
	// Example: at last index, (prev + 1) % totalImages returns 0
	// Interview pattern: Circular navigation common in carousels, sliders, tabs
	const nextImage = () => {
		setCurrentIndex((prev) => (prev + 1) % totalImages);
	};

	return (
		<div className="image-container">
			<button className="previous" onClick={previousImage}>
				◀️
			</button>
			{/* Display hero image from current index */}
			<img src={currentImage} className="img" />
			<button className="next" onClick={nextImage}>
				▶️
			</button>
		</div>
	);
};
export default ImageContainer;
