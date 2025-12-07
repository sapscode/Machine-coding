import "./App.css";
import Carousel from "./Carousel";
import ImageContainer from "./ImageContainer";
import { useEffect, useState } from "react";

const URL =
	"https://api.unsplash.com/photos/random?count=10&client_id=cSGN-8_NjnL1F7I-Yyd8LTObit3Dl-ztpv8SKRuy0vo";
function App() {
	// Holds the fetched image objects
	const [images, setImages] = useState([]);
	// Keeps track of which image is currently shown
	const [currentIndex, setCurrentIndex] = useState(0);
	// Handles loading and error states for UX feedback
	const [isLoading, setLoading] = useState(true);
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		async function fetchImages() {
			try {
				const res = await fetch(URL);
				const imageData = await res.json();
				const filteredData = imageData.map((data, index) => {
					return {
						id: index, // local ID to help with rendering
						alt: data.alt_description, // description text
						mainImage: data.urls.regular, // large image
						thumbNailImage: data.urls.small // smaller thumbnail for carousel
					};
				});
				setLoading(false);
				setImages(filteredData);
			} catch (error) {
				setLoading(false);
				setIsError(true);
				console.log(error);
			}
		}
		fetchImages();
	}, []);

	if (isLoading) {
		return <div className="container">Loading...</div>;
	}

	if (isError) {
		return <div className="container">Sorry Love There's an error...</div>;
	}

	return (
		<div className="container">
			{/* Displays the currently selected large image */}
			<ImageContainer
				currentImage={images[currentIndex].mainImage}
				currentIndex={currentIndex}
				setCurrentIndex={setCurrentIndex}
				totalImages={images.length}
			/>
			{/* Displays all image thumbnails below */}
			<Carousel images={images} setCurrentIndex={setCurrentIndex} />
		</div>
	);
}

export default App;
