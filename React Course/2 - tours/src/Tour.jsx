import { useState } from "react";
const Tour = ({ tour, removeTour }) => {
	const [showMore, setShowMore] = useState(false);
	return (
		<article key={tour.id} className="single-tour">
			<img className="img" src={tour.image} alt={tour.name} />
			<span className="tour-price">${tour.price}</span>
			<div className="tour-info">
				<h5>{tour.name}</h5>
				{showMore === true ? (
					<p>
						{tour.info}
						<button className="info-btn" onClick={() => setShowMore(!showMore)}>
							Read Less
						</button>
					</p>
				) : (
					<p>
						{tour.info.substr(0, 200)}...
						<button className="info-btn" onClick={() => setShowMore(!showMore)}>
							Read More
						</button>
					</p>
				)}
			</div>
			<button
				className="btn delete-btn btn-block"
				onClick={() => removeTour(tour.id)}
			>
				Not interested
			</button>
		</article>
	);
};

export default Tour;
