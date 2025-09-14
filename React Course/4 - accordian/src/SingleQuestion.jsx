import { useState } from "react";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";

const SingleQuestion = ({ id, title, info, activeId, setActiveId }) => {
	const showQuestion = activeId === id;
	return (
		<div className="question">
			<header>
				<h5>{title}</h5>
				<button className="question-btn">
					{showQuestion ? (
						<FaMinusCircle
							onClick={() => {
								setActiveId(null);
							}}
						/>
					) : (
						<FaPlusCircle
							onClick={() => {
								setActiveId(id);
							}}
						/>
					)}
				</button>
			</header>
			{showQuestion && <p>{info}</p>}
		</div>
	);
};

export default SingleQuestion;
