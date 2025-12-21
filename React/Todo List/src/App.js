import { useState } from "react";
import "./styles.css";

export default function App() {
	// State to store the list of todo items
	const [items, setItems] = useState([]);

	// State to store the current value of the input field
	const [currentItem, setCurrentItem] = useState("");

	const submitInput = (e) => {
		// Prevents page reload on form submit
		e.preventDefault();

		// Do not add empty or whitespace-only tasks
		if (currentItem.trim() === "") return;

		// Add a new task object to the items array (immutably)
		// Each item has the shape: { text: string, completed: boolean }
		setItems((prev) => [
			...prev,
			{
				text: currentItem.trim(),
				completed: false
			}
		]);

		// Clear the input field after adding the task
		setCurrentItem("");
	};


	const completeTask = (e, i) => {
		setItems((prev) =>
			prev.map((task, id) =>
				// If this is the task being toggled
				id === i
					? {
							// Copy all existing properties of the task
							...task,
							// Update only the completed flag
							completed: e.target.checked
					  }
					: // Otherwise, return the task unchanged, as we always need to return from .map
					  task
			)
		);
	};

	// Removes a task based on its index
	const removeTask = (taskId) => {
		setItems((prev) => prev.filter((_, i) => i !== taskId));
	};

	return (
		<div className="App">
			<h1>TODO List</h1>

			{/* Form for adding new tasks */}
			<form onSubmit={submitInput}>
				<input
					type="text"
					value={currentItem}
					onChange={(e) => setCurrentItem(e.target.value)}
					placeholder="Add task..."
				/>

				{/* Submit button for the form */}
				<button className="btn add" type="submit">
					ADD
				</button>
			</form>

			{/* List of todo items */}
			<ul className="list">
				{items.map((item, i) => (
					<li
						key={i}
						className={`list-item ${item.completed ? "completed" : ""}`}
					>
						{/* Checkbox to mark task as completed */}
						<input
							type="checkbox"
							checked={item.completed}
							onChange={(e) => completeTask(e, i)}
						/>

						{/* Task text */}
						<span className="task-name">{item.text}</span>

						{/* Button to delete the task */}
						<button className="btn delete" onClick={() => removeTask(i)}>
							DELETE
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}
