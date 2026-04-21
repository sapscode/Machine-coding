import { useDispatch, useSelector } from "react-redux";
import TodoItem from "./TodoItem";
import { updateFilter, fetchTodos } from "../features/todos/todoSlice";
import { useEffect } from "react";

const TodoList = () => {
	const todos = useSelector((state) => state.todos.todos);
	const filter = useSelector((state) => state.todos.filter);
	const status = useSelector((state) => state.todos.status);
	const error = useSelector((state) => state.todos.error);

	const dispatch = useDispatch();

	const visibleTodos = todos.filter((todo) => {
		if (filter === "completed") return todo.completed;
		else if (filter === "uncompleted") return !todo.completed;
		return true;
	});

	const handleFilterChange = (e) => {
		dispatch(updateFilter(e.target.value));
	};

	useEffect(() => {
		dispatch(fetchTodos());
	}, []);

	if (error) return <div>Something went wrong {error}</div>;

	return (
		<div className="todo-list">
			<div className="list-header">
				<p className="list-title">Tasks</p>
				<select
					className="filter-dropdown"
					value={filter}
					onChange={handleFilterChange}
				>
					<option value="all">All</option>
					<option value="completed">Completed</option>
					<option value="uncompleted">Uncompleted</option>
				</select>
			</div>
			{status === "pending" ? (
				<p>Fetching Items...</p>
			) : (
				<div className="items">
					{visibleTodos.length ? (
						visibleTodos.map((todo) => {
							const { id } = todo;
							return <TodoItem {...todo} key={id} />;
						})
					) : (
						<p>No more tasks for the day...</p>
					)}
				</div>
			)}
		</div>
	);
};
export default TodoList;
