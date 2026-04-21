import { useState, useCallback } from "react";
import data from "./data.json";
import "./styles.css";
import { Checkboxes } from "./Components/Checkboxes";

/*
Tree Checkbox Problem

Goal:
- Selecting a parent → selects ALL children
- Unselecting a parent → unselects ALL children
- If ALL children are selected → parent becomes selected
- If ANY child is unselected → parent becomes unselected

State:
- list    → original tree data
- checked → object storing checkbox state { id: true/false }
    Example:
    {
      "1": true,   // parent
      "2": true,   // child
      "3": false   // child
    }
*/
export default function App() {
	const [checked, setChecked] = useState({});

	/*
	Main handler when a checkbox is clicked

	isChecked → true/false
	node      → current node clicked
	*/
	const handleCheck = useCallback((isChecked, node) => {
		setChecked((prev) => {
			let newState = { ...prev }; // copy previous state (IMPORTANT: avoid mutation)

			/*
			STEP 1: Update all children recursively

			If a node is checked → all its children should also be checked
			If unchecked → all children unchecked

      How recursion works here:
			- Start from clicked node
			- Update current node
			- Then call same function for each child
			- This continues until leaf nodes
			*/
			const updateChildren = (currentNode) => {
				newState[currentNode.id] = isChecked;

				// recursively update all children
				if (currentNode.children?.length) {
					currentNode.children.forEach((childNode) => {
						updateChildren(childNode);
					});
					// Since `updateChildren` is already a function, and forEach applies a funtion to each element of the array, you can just write
					// currentNode.children.forEach(updateChildren)
				}
			};
			updateChildren(node); // start from clicked node

			/*
			STEP 2: Update parent nodes

			A parent is checked ONLY if ALL its children are checked

      How recursion works:
			- Start from root nodes
			- Go all the way down to leaf nodes
			- While coming back up, compute parent state

			Key idea:
			- children.every(updateParent)
			→ ensures ALL children must return true
			*/
			const updateParent = (currentNode) => {
				if (!currentNode.children?.length)
					// If Leaf node → just return its checked state
					return newState[currentNode.id] || false;

				// For non-leaf nodes recursively check all children
				const allChildrenChecked = currentNode.children.every(updateParent);
				newState[currentNode.id] = allChildrenChecked; // update parent based on children
				return allChildrenChecked; // return the state for current node
			};
			data.forEach(updateParent); // run upward recursion for entire tree

			return newState;
		});
	}, []); // stable reference — no external deps

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
