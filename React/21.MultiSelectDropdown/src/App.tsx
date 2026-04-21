import { useState } from "react";
import "./App.css";
import data from "./data.json";
import type { Options } from "./types/index";
import DropdownVal from "./Components/DropdownVal";
import SelectBar from "./Components/SelectBar";

function App() {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [selectedVals, setSelectedVals] = useState<Options[]>([]);
	const [searchQuery, setSearchQuery] = useState<string>("");
  
	const filterdDropdownVals: Options[] = data.filter((val) =>
		val.name.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())
	);

	const removeSelectVal = (id: number): void => {
		setSelectedVals((prev) => {
			return [...prev].filter((val) => val.id !== id);
		});
	};

	return (
		<div className="contianer">
			<h1>Multiselect Dropdown</h1>
			<SelectBar
				selectedVals={selectedVals}
				removeSelectVal={removeSelectVal}
				isOpen={isOpen}
				setIsOpen={setIsOpen}
			/>
			{isOpen && (
				<div className="options-container">
					<input
						className="search-bar"
						type="text"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
					<div className="results">
						{filterdDropdownVals.map((val) => {
							return (
								<DropdownVal
									val={val}
									key={val.id}
									selectedVals={selectedVals}
									setSelectedVals={setSelectedVals}
								/>
							);
						})}
					</div>
				</div>
			)}
		</div>
	);
}

export default App;
