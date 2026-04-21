import { useDispatch } from "react-redux";
import { addTodo } from "../features/todos/todoSlice";
import { useState } from "react";

const TodoInput = () => {
	const [task, setTask] = useState("");

	const dispatch = useDispatch();

	const handleChange = (e) => {
		setTask(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (task.trim() !== "") {
			dispatch(addTodo({ id: Date.now(), name: task, completed: false }));
			setTask("");
		}
	};

	return (
		<div className="todo-input">
			<input
				type="text"
				placeholder="add task"
				value={task}
				onChange={handleChange}
			/>
			<button className="btn input" onClick={handleSubmit}>
				Add Task
			</button>
		</div>
	);
};
export default TodoInput;
