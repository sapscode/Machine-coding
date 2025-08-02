import { useState } from "react";
import questions from "./data";
import SingleQuestion from "./SingleQuestion";

const App = () => {
	const [activeId, setActiveId] = useState(null);

	return (
		<main>
			<div className="container">
				<h1>Questions</h1>
				{questions.map((question) => (
					<SingleQuestion
						key={question.id}
						{...question}
						activeId={activeId}
						setActiveId={setActiveId}
					/>
				))}
			</div>
		</main>
	);
};
export default App;
