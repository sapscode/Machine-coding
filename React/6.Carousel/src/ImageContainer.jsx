const ImageContainer = ({ currentImage, setCurrentIndex, totalImages }) => {
	// Handle previous button: (prev - 1 + totalImages) ensures we wrap around to last image when at index 0
	const previousImage = () => {
		setCurrentIndex((prev) => (prev - 1 + totalImages) % totalImages);
	};

	// Handle next button: modulo wraps back to 0 after reaching last image
	const nextImage = () => {
		setCurrentIndex((prev) => (prev + 1) % totalImages);
	};

	return (
		<div className="image-container">
			<button className="previous" onClick={previousImage}>
				◀️
			</button>
			{/* Display the currently selected main image */}
			<img src={currentImage} className="img" />
			<button className="next" onClick={nextImage}>
				▶️
			</button>
		</div>
	);
};
export default ImageContainer;
