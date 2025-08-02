import { FcNext, FcPrevious } from "react-icons/fc";
import { BiSolidQuoteAltRight } from "react-icons/bi";

const Card = ({ name, job, image, text, index, setIndex, length }) => {
	const randomPerson = () => {
		let randomNumber = Math.floor(Math.random() * length);
		if (randomNumber === index) {
			randomNumber = index + 1;
		}
		const newIndex = randomNumber % length;
		setIndex(newIndex);
	};
	return (
		<article className="review">
			<div className="img-container">
				<img className="person-img" src={image} alt="" />
				<BiSolidQuoteAltRight className="quote-icon" />
			</div>
			<h4 className="author">{name}</h4>
			<p className="job">{job}</p>
			<p className="info">{text}</p>
			<div className="btn-container">
				<FcPrevious
					className="prev-btn"
					onClick={() => setIndex((index - 1 + length) % length)}
				/>
				<FcNext
					className="next-btn"
					onClick={() => setIndex((index + 1) % length)}
				/>
				<button className="btn btn-block" onClick={randomPerson}>
					Surprise Me!
				</button>
			</div>
		</article>
	);
};

export default Card;
