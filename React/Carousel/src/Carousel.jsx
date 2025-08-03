const Carousel = ({ setCurrentIndex, images }) => {
	return (
		<div className="carousel">
			{images.map(({ thumbNailImage, id, alt }) => {
				return (
					<img
						key={id}
						src={thumbNailImage}
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
