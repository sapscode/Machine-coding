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

			<form onSubmit={submitInput} aria-label="Add a new task">
				<label htmlFor="task-input" className="sr-only">New task</label>
				<input
					id="task-input"
					type="text"
					value={currentItem}
					onChange={(e) => setCurrentItem(e.target.value)}
					placeholder="Add task..."
					aria-required="true"
				/>
				<button className="btn add" type="submit">
					ADD
				</button>
			</form>

			<ul className="list" aria-label="Todo list" aria-live="polite">
				{items.map((item, i) => (
					<li
						key={i}
						className={`list-item ${item.completed ? "completed" : ""}`}
					>
						<input
							type="checkbox"
							id={`task-${i}`}
							checked={item.completed}
							onChange={(e) => completeTask(e, i)}
							aria-label={`Mark "${item.text}" as ${item.completed ? "incomplete" : "complete"}`}
						/>
						<label htmlFor={`task-${i}`} className="task-name">{item.text}</label>

						<button
							className="btn delete"
							onClick={() => removeTask(i)}
							aria-label={`Delete task: ${item.text}`}
						>
							DELETE
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}
