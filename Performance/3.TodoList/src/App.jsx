import { useCallback, useState } from "react";
import "./App.css";
import List from "./Components/List";
import FormInput from "./Components/FormInput";

export default function App() {
	const [items, setItems] = useState([]);
	const [currentItem, setCurrentItem] = useState("");

	/**
	 * Submit handler
	 * - Reads currentItem → must be in useCallback deps
	 * - Creates new item immutably
	 */
	const submitInput = useCallback(
		(e) => {
			e.preventDefault();

			if (currentItem.trim() === "") return;

			setItems((prev) => [
				...prev,
				{
					id: Date.now(), // stable id for keys
					text: currentItem.trim(),
					completed: false
				}
			]);

			setCurrentItem("");
		},
		[currentItem]
	);

	/**
	 * Toggle completion
	 * - Uses functional update
	 * - Does not read external state → empty deps safe
	 */
	const completeTask = useCallback((e, taskId) => {
		setItems((prev) =>
			prev.map((task) =>
				task.id === taskId ? { ...task, completed: e.target.checked } : task
			)
		);
	}, []);

	/**
	 * Remove item by id
	 * - Functional update keeps reference stability
	 */
	const removeTask = useCallback((taskId) => {
		setItems((prev) => prev.filter((task) => task.id !== taskId));
	}, []);

	return (
		<div className="App">
			<h1>TODO List</h1>

			<FormInput
				submitInput={submitInput}
				currentItem={currentItem}
				setCurrentItem={setCurrentItem}
			/>

			<List items={items} completeTask={completeTask} removeTask={removeTask} />
		</div>
	);
}
