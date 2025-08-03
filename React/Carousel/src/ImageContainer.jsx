const ImageContainer = ({ currentImage, setCurrentIndex, totalImages }) => {
	const previousImage = () => {
		setCurrentIndex((prev) => (prev - 1 + totalImages) % totalImages);
	};
	const nextImage = () => {
		setCurrentIndex((prev) => (prev + 1) % totalImages);
	};

	return (
		<div className="image-container">
			<button className="previous" onClick={previousImage}>
				◀️
			</button>
			<img src={currentImage} className="img" />
			<button className="next" onClick={nextImage}>
				▶️
			</button>
		</div>
	);
};
export default ImageContainer;
