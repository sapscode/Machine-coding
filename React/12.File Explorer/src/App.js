import "./styles.css";
import data from "./data.json";
import { useState } from "react";
import List from "./Components/List";
import { createContext } from "react";
import { useContext } from "react";

// Create context to share add/delete functions across deeply nested components
const AddItemContext = createContext();
// Custom hook to use the context in child components
export const useAddItemContext = () => useContext(AddItemContext);

export default function App() {
	const [list, setList] = useState(data); // state holding the folder/file tree

	// Function to add a file to a given folder (based on id)
	const addFile = (id) => {
		const obj = {
			id: Date.now().toString(),
			name: prompt("Enter file name"),
			isFolder: false
		};
		addItem(id, obj); // reuse common addItem logic
	};

	// Function to add a folder inside another folder
	const addFolder = (id) => {
		const obj = {
			id: Date.now().toString(),
			name: prompt("Enter folder name"),
			isFolder: true,
			children: []
		};
		addItem(id, obj); // reuse common addItem logic
	};

	// Common function used by both addFile and addFolder
	// It finds the target folder (by ID) and adds the new object inside its children
	const addItem = (id, obj) => {
		setList((prev) => {
			// recursive helper function to update the tree structure
			const updateTree = (list) => {
				return list.map((item) => {
					// if the current item's id matches the target id,
					// this is the folder where we want to add the new item (obj)
					if (item.id === id) {
						return {
							...item, // keep other folder properties same
							children: [...item.children, obj] // add new file/folder to its children
						};
					}
					// if current item is a folder and has children,
					// we go deeper (recursively) inside that folder to search for the target id
					else if (item.isFolder && item.children?.length > 0) {
						return {
							...item, // keep folder data same
							children: updateTree(item.children) // recursive call on children list
						};
					}
					// if it's not the target folder and has no children (or not a folder),
					// just return the item unchanged (base case)
					return item;
				});
			};

			// start the recursion from root-level list
			return updateTree(prev);
		});
	};

	// Delete an item (folder or file) by ID
	const deleteItem = (id) => {
		setList((prev) => {
			// Recursive function to traverse the entire tree
			const updateTree = (list) => {
				// Step 1: Filter out the node we want to delete
				return (
					list
						.filter((item) => {
							if (item.id !== id) return item;
						})
						// Step 2: For each remaining item, if it's a folder, recursively update its children
						.map((item) => {
							if (item.isFolder && item.children?.length > 0) {
								return {
									...item,
									children: updateTree(item.children)
								};
							}
							return item; // return unchanged item (base case)
						})
				);
			};

			return updateTree(prev);
		});
	};

	return (
		<div className="App">
			<div className="container">
				{/* Provide the add/delete functions to child components using context */}
				<AddItemContext.Provider value={{ addFile, addFolder, deleteItem }}>
					<List list={list} />
				</AddItemContext.Provider>
			</div>
		</div>
	);
}
