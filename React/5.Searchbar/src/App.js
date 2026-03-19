import { useEffect, useState, useRef } from "react";
import "./styles.css";

const url = "https://dummyjson.com/recipes/search?q=";
export default function App() {
	// Holds the current input text
	const [searchTerm, setSearchTerm] = useState("");

	// Stores fetched recipe names (search results)
	const [result, setResult] = useState([]);

	// Controls visibility of the dropdown result list
	const [showResult, setShowResult] = useState(false);

	// Tracks which result item is currently highlighted (for keyboard navigation)
	const [highlight, setHighlight] = useState(-1);

	// Cache object to avoid refetching the same search term (persists across renders)
	const cache = useRef({});

	// Fetches recipes based on the current searchTerm
	const searchRecipes = async () => {
		// If results are already cached for this term, use them directly
		if (cache.current[searchTerm]) {
			setResult(cache.current[searchTerm]);
			return;
		}

		try {
			const data = await fetch(`${url}${searchTerm}`);
			const res = await data.json();
			// Extract only recipe names for displaying in suggestions
			const names = res.recipes.map((recipe) => recipe.name);

			// Store in cache to prevent redundant API calls
			cache.current = { ...cache.current, [searchTerm]: names };
			setResult(names);
		} catch (err) {
			console.error(err);
		}
	};

	const handleKeyDown = (e) => {
		if (!result || !result.length) return;
		switch (e.key) {
			case "ArrowDown":
				e.preventDefault();
				// Move highlight down (loop back to top)
				setHighlight((prev) => (prev + 1) % result.length);
				break;

			case "ArrowUp":
				e.preventDefault();
				// Move highlight up (loop back to bottom)
				setHighlight((prev) => (prev - 1 + result.length) % result.length);
				break;

			case "Enter":
				// When user presses Enter on a highlighted suggestion
				if (highlight >= 0 && highlight < result.length) {
					e.preventDefault();
					setSearchTerm(result[highlight]);
					setHighlight(-1);
					setShowResult(true);
				}
				break;
			default:
				break;
		}
	};

	useEffect(() => {
		// Debounce: wait 300ms before fetching (avoids API spam)
		const timer = setTimeout(() => {
			searchRecipes();
			setHighlight(-1);
		}, 300);

		// Cleanup old timeout on every new keystroke
		return function () {
			clearTimeout(timer);
		};
	}, [searchTerm]);

	return (
		<div className="App">
			<h2>Search for recipes</h2>
			<div className="container">
				<div className="input-container">
					<input
						className="search-input"
						type="text"
						key="search"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						onBlur={() => setShowResult(false)} // hide list when input loses focus
						onFocus={() => setShowResult(true)} // show list when input is focused
						onKeyDown={handleKeyDown} // handle arrow keys and Enter
					/>

					<button className="btn" onClick={() => setSearchTerm("")}>
						x
					</button>
				</div>

				{/* Dropdown suggestion list */}
				{searchTerm.length > 0 && result.length > 0 && showResult && (
					<ul className="result-container">
						{result.map((res, i) => {
							return (
								<li
									key={i}
									className={`result ${i === highlight ? "highlight" : ""}`}
									onClick={() => {
										setSearchTerm(res); // set input to selected value
										setHighlight(-1);
										setShowResult(true);
									}}
								>
									{res}
								</li>
							);
						})}
					</ul>
				)}
			</div>
		</div>
	);
}
