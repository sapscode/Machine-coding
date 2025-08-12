import { useEffect, useState, useRef } from "react";
import "./styles.css";

const url = "https://dummyjson.com/recipes/search?q=";
export default function App() {
	const [searchTerm, setSearchTerm] = useState("");
	const [result, setResult] = useState([]);
	const [showResult, setShowResult] = useState(false);
	const [highlight, setHighlight] = useState(-1);
	const cache = useRef({});

	const searchRecipes = async () => {
		if (cache.current[searchTerm]) {
			setResult(cache.current[searchTerm]);
			return;
		}
		try {
			const data = await fetch(`${url}${searchTerm}`);
			const res = await data.json();
			const names = res.recipes.map((recipe) => recipe.name);
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
				setHighlight((prev) => (prev + 1) % result.length);
				break;
			case "ArrowUp":
				e.preventDefault();
				setHighlight((prev) => (prev - 1 + result.length) % result.length);
				break;
			case "Enter":
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
		const timer = setTimeout(() => {
			searchRecipes();
			setHighlight(-1);
		}, 300);
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
						onBlur={() => setShowResult(false)}
						onFocus={() => setShowResult(true)}
						onKeyDown={handleKeyDown}
					/>
					<button className="btn" onClick={() => setSearchTerm("")}>
						x
					</button>
				</div>
				{searchTerm.length > 0 && result.length > 0 && showResult && (
					<ul className="result-container">
						{result.map((res, i) => {
							return (
								<li
									key={i}
									className={`result ${i === highlight ? "highlight" : ""}`}
									onClick={() => {
										setSearchTerm(res);
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
