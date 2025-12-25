import { useState } from "react";
import "./App.css";
import useDebounce from "./useDebounce";

function App() {
	const [searchText, setSearchText] = useState("");
	const debouncedText = useDebounce(searchText, 300);
	return (
		<>
			<input
				type="text"
				value={searchText}
				onChange={(e) => setSearchText(e.target.value)}
			/>
			<div>{debouncedText}</div>
		</>
	);
}

export default App;
