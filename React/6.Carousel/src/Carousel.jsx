// Displays thumbnail carousel - clicking any thumbnail updates the main image
// Interview pattern: Child component calls parent's setState function via callback
const Carousel = ({ setCurrentIndex, images }) => {
	return (
		<div className="carousel">
			{/* Render each image thumbnail - extract only needed properties */}
			{images.map(({ thumbNailImage, id, alt }) => {
				return (
					<img
						key={id}
						src={thumbNailImage}
						// Clicking thumbnail directly sets that image as main display
						// This demonstrates prop drilling: parent's setState passed down as callback
						onClick={() => setCurrentIndex(id)}
						alt={alt}
						className="carousel-thumbnail"
					/>
				);
			})}
		</div>
	);
};
export default Carousel;
