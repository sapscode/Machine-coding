import "./App.css";
import Carousel from "./Carousel";
import ImageContainer from "./ImageContainer";
import { useEffect, useState } from "react";

const URL =
	"https://api.unsplash.com/photos/random?count=10&client_id=cSGN-8_NjnL1F7I-Yyd8LTObit3Dl-ztpv8SKRuy0vo";
function App() {
	const [images, setImages] = useState([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isLoading, setLoading] = useState(true);
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		async function fetchImages() {
			try {
				const res = await fetch(URL);
				const imageData = await res.json();
				const filteredData = imageData.map((data, index) => {
					return {
						id: index,
						alt: data.alt_description,
						mainImage: data.urls.regular,
						thumbNailImage: data.urls.small
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
			<ImageContainer
				currentImage={images[currentIndex].mainImage}
				currentIndex={currentIndex}
				setCurrentIndex={setCurrentIndex}
				totalImages={images.length}
			/>
			<Carousel images={images} setCurrentIndex={setCurrentIndex} />
		</div>
	);
}

export default App;
