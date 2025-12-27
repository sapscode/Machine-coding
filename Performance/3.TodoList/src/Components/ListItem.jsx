import React from "react";

/**
 * Memoized list item
 * - Re-renders only when its own item object changes
 * - Other items stay untouched
 */
const ListItem = React.memo(({ item, completeTask, removeTask }) => {
	console.log("ListItem:", item.text);

	return (
		<li className={`list-item ${item.completed ? "completed" : ""}`}>
			<input
				type="checkbox"
				checked={item.completed}
				onChange={(e) => completeTask(e, item.id)}
			/>

			<span className="task-name">{item.text}</span>

			<button className="btn delete" onClick={() => removeTask(item.id)}>
				DELETE
			</button>
		</li>
	);
});

export default ListItem;
