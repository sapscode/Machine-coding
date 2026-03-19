import { useState } from "react";
import "./App.css";
import { initialState, reducer } from "./Reducers/ListReducer";
import { useReducer } from "react";

export default function App() {
	const [state, dispatch] = useReducer(reducer, initialState);
	const [currentItem, setCurrentItem] = useState("");

	const submitInput = (e) => {
		e.preventDefault();

		if (currentItem.trim() === "") return;

		dispatch({ type: "ADD_TASK", payload: currentItem.trim() });
		setCurrentItem("");
	};

	const completeTask = (taskId) => {
		dispatch({ type: "COMPLETE_TASK", payload: taskId });
	};

	const removeTask = (taskId) => {
		dispatch({ type: "REMOVE_TASK", payload: taskId });
	};

	return (
		<div className="App">
			<h1>TODO List</h1>

			<form onSubmit={submitInput}>
				<input
					type="text"
					value={currentItem}
					onChange={(e) => setCurrentItem(e.target.value)}
					placeholder="Add task..."
				/>

				<button className="btn add" type="submit">
					ADD
				</button>
			</form>

			<ul className="list">
				{state.map((item) => (
					<li
						key={item.id}
						className={`list-item ${item.completed ? "completed" : ""}`}
					>
						<input
							type="checkbox"
							checked={item.completed}
							onChange={(e) => completeTask(item.id)}
						/>

						<span className="task-name">{item.text}</span>

						<button className="btn delete" onClick={() => removeTask(item.id)}>
							DELETE
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}
