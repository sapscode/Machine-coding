import { useDispatch, useSelector } from "react-redux";
import { removeTodo, updateTodo } from "../features/todos/todoSlice";

const TodoItem = ({ id, name, completed }) => {
	const dispatch = useDispatch();

	const handleClick = (e) => {
		dispatch(removeTodo(id));
	};
	const handleChange = (e) => {
		dispatch(updateTodo({ id, completed: e.target.checked }));
	};
	return (
		<div className="todo-item">
			<div className="left-section">
				<input
					className="completed-checkbox"
					type="checkbox"
					checked={completed}
					onChange={handleChange}
				/>
				<div className={`task-name ${completed ? "completed" : ""}`}>
					{name}
				</div>
			</div>
			<div className="right-section">
				<button className="btn remove" onClick={handleClick}>
					Remove
				</button>
			</div>
		</div>
	);
};

export default TodoItem;
