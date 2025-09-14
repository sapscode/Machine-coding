import "./styles.css";
import data from "./data.json";
import { useState } from "react";
import List from "./Components/List";
import { createContext } from "react";
import { useContext } from "react";

const AddItemContext = createContext();
export const useAddItemContext = () => useContext(AddItemContext);

export default function App() {
	const [list, setList] = useState(data);

	const addFile = (id) => {
		const obj = {
			id: Date.now().toString(),
			name: prompt("Enter file name"),
			isFolder: false
		};
		addItem(id, obj);
	};

	const addFolder = (id) => {
		const obj = {
			id: Date.now().toString(),
			name: prompt("Enter folder name"),
			isFolder: true,
			children: []
		};
		addItem(id, obj);
	};

	const deleteItem = (id) => {
		setList((prev) => {
			const updateTree = (list) => {
				return list
					.filter((item) => {
						if (item.id !== id) return item;
					})
					.map((item) => {
						if (item.isFolder && item.children?.length > 0) {
							return {
								...item,
								children: updateTree(item.children)
							};
						}
						return item;
					});
			};

			return updateTree(prev);
		});
	};

	const addItem = (id, obj) => {
		setList((prev) => {
			const updateTree = (list) => {
				return list.map((item) => {
					if (item.id === id) {
						return {
							...item,
							children: [...item.children, obj]
						};
					} else if (item.isFolder && item.children?.length > 0) {
						return {
							...item,
							children: updateTree(item.children)
						};
					}
					return item;
				});
			};

			return updateTree(prev);
		});
	};

	return (
		<div className="App">
			<div className="container">
				<AddItemContext.Provider value={{ addFile, addFolder, deleteItem }}>
					<List list={list} />
				</AddItemContext.Provider>
			</div>
		</div>
	);
}
