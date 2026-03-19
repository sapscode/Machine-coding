import { useState } from "react";
import data from "./data.json";
import "./styles.css";
import { Checkboxes } from "./Components/Checkboxes";

export default function App() {
	const [list, setList] = useState(data);
	const [checked, setChecked] = useState({});

	const handleCheck = (isChecked, node) => {
		setChecked((prev) => {
			let newState = { ...prev };

			const updateChildren = (currentNode) => {
				newState[currentNode.id] = isChecked;

				if (currentNode.children?.length) {
					currentNode.children.forEach((childNode) => {
						updateChildren(childNode);
					});
					// Since `updateChildren` is already a function, and forEach applies a funtion to each element of the array, you can just write
					// currentNode.children.forEach(updateChildren)
				}
			};
			updateChildren(node);

			const updateParent = (currentNode) => {
				if (!currentNode.children?.length)
					return newState[currentNode.id] || false;

				const allChildrenChecked = currentNode.children.every(updateParent);
				newState[currentNode.id] = allChildrenChecked;
				return allChildrenChecked;
			};
			list.forEach(updateParent);

			return newState;
		});
	};

	return (
		<div className="App">
			<div className="container">
				<Checkboxes
					checkboxes={data}
					handleCheck={handleCheck}
					checked={checked}
				/>
			</div>
		</div>
	);
}
