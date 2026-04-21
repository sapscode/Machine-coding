import "./App.css";
import Carousel from "./Carousel";
import ImageContainer from "./ImageContainer";
import { useEffect, useState } from "react";

// Unsplash API endpoint - fetches 10 random images
const URL =
	"https://api.unsplash.com/photos/random?count=10&client_id=cSGN-8_NjnL1F7I-Yyd8LTObit3Dl-ztpv8SKRuy0vo";

function App() {
	// Array of image objects transformed from API response
	// Each image has: id, alt, mainImage (large), thumbNailImage (small)
	const [images, setImages] = useState([]);
	
	// Tracks currently displayed image index - single source of truth
	// Passed down to both ImageContainer (main display) and Carousel (thumbnails)
	const [currentIndex, setCurrentIndex] = useState(0);
	
	// Loading and error states for UX feedback
	// Interview pattern: Always show loading/error states for better UX
	const [isLoading, setLoading] = useState(true);
	const [isError, setIsError] = useState(false);

	// Fetch images on component mount
	// Empty dependency array ensures this runs only once
	useEffect(() => {
		async function fetchImages() {
			try {
				const res = await fetch(URL);
				const imageData = await res.json();
				
				// Transform API response to application structure
				// Separate mainImage and thumbNailImage for optimization
				const filteredData = imageData.map((data, index) => {
					return {
						id: index, // local ID for React keys
						alt: data.alt_description, // accessible alt text
						mainImage: data.urls.regular, // large image for hero display
						thumbNailImage: data.urls.small // small image for carousel
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
			{/* Main image display with left/right navigation buttons */}
			<ImageContainer
				currentImage={images[currentIndex].mainImage}
				currentIndex={currentIndex}
				setCurrentIndex={setCurrentIndex}
				totalImages={images.length}
			/>
			{/* Thumbnail carousel - clicking updates main image */}
			<Carousel images={images} setCurrentIndex={setCurrentIndex} />
		</div>
	);
}

export default App;
