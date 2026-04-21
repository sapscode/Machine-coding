import { useEffect, useState, useRef } from "react";
import "./styles.css";

const url = "https://dummyjson.com/recipes/search?q=";
export default function App() {
	// Holds the current input text - updates on every keystroke
	const [searchTerm, setSearchTerm] = useState("");

	// Stores fetched recipe names (search results) to display in dropdown
	const [result, setResult] = useState([]);

	// Controls visibility of the dropdown result list
	// Hidden on blur to prevent visual clutter, shown on focus
	const [showResult, setShowResult] = useState(false);

	// Tracks which result item is currently highlighted via keyboard
	// Set to -1 when no item is highlighted, 0+ for the highlighted index
	const [highlight, setHighlight] = useState(-1);

	// Cache object to avoid refetching the same search term
	// useRef persists across renders (unlike state) - perfect for caching
	// Pattern: Interview question: "How would you optimize API calls?"
	const cache = useRef({});

	// Fetches recipes based on the current searchTerm
	// Interview pattern: Client-side caching to reduce API calls
	const searchRecipes = async () => {
		// Check cache first - if we've already fetched this term, return cached result
		if (cache.current[searchTerm]) {
			setResult(cache.current[searchTerm]);
			return;
		}

		try {
			const data = await fetch(`${url}${searchTerm}`);
			const res = await data.json();

			// Transform API response: extract only recipe names for dropdown suggestions
			const names = res.recipes.map((recipe) => recipe.name);

			// Store in cache for future lookups (immutability with spread operator)
			cache.current = { ...cache.current, [searchTerm]: names };
			setResult(names);
		} catch (err) {
			console.error(err);
		}
	};

	// Keyboard event handler - manages arrow navigation and Enter submission
	// Interview pattern: Keyboard accessibility and enhanced UX
	const handleKeyDown = (e) => {
		if (!result || !result.length) return;
		switch (e.key) {
			case "ArrowDown":
				e.preventDefault();
				// Cycle down through results with modulo (wraps to 0 after last item)
				// (prev + 1) % result.length creates circular navigation
				setHighlight((prev) => (prev + 1) % result.length);
				break;

			case "ArrowUp":
				e.preventDefault();
				// Cycle up through results with safe negative handling
				// (prev - 1 + result.length) ensures index never goes below 0
				setHighlight((prev) => (prev - 1 + result.length) % result.length);
				break;

			case "Enter":
				// Only submit if a result is actually highlighted (highlight >= 0)
				if (highlight >= 0 && highlight < result.length) {
					e.preventDefault();
					setSearchTerm(result[highlight]); // Fill input with selected suggestion
					setHighlight(-1); // Reset highlight after selection
					setShowResult(true);
				}
				break;

			default:
				break;
		}
	};

	useEffect(() => {
		// Interview pattern: Debouncing to reduce API calls
		// Wait 300ms after user stops typing before fetching
		// Prevents excessive API calls (e.g., 5-10 calls per second while typing)
		const timer = setTimeout(() => {
			searchRecipes();
			setHighlight(-1); // Reset highlight when new search starts
		}, 300);

		// Cleanup: Clear previous timeout if user types again before 300ms elapsed
		// This ensures only the LAST keystroke triggers the API call
		// Essential for performance optimization
		return function () {
			clearTimeout(timer);
		};
	}, [searchTerm]); // Re-run whenever searchTerm changes

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
						onBlur={() => setShowResult(false)} // Hide dropdown when focus leaves
						onFocus={() => setShowResult(true)} // Show dropdown when focus entered
						onKeyDown={handleKeyDown} // Handle arrow keys and Enter
					/>

					{/* Clear button - resets search and hides results */}
					<button className="btn" onClick={() => setSearchTerm("")}>
						x
					</button>
				</div>

				{/* Dropdown suggestion list - only shows when:
					1. searchTerm is not empty
					2. results exist from API
					3. showResult is true (focus or not blurred)
				*/}
				{searchTerm.length > 0 && result.length > 0 && showResult && (
					<ul className="result-container">
						{result.map((res, i) => {
							return (
								<li
									key={i}
									// Dynamic class: highlight class added when index matches highlight state
									className={`result ${i === highlight ? "highlight" : ""}`}
									onClick={() => {
										setSearchTerm(res); // Fill input with clicked suggestion
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
