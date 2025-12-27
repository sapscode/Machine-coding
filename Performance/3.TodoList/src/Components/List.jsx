import React from "react";
import ListItem from "./ListItem";

/**
 * Memoized list container
 * - Re-renders when items array reference changes
 * - Child items decide individually whether to re-render
 */
const List = React.memo(({ items, completeTask, removeTask }) => {
	console.log("List");

	return (
		<ul className="list">
			{items.map((item) => (
				<ListItem
					key={item.id} // key is for React reconciliation only
					item={item}
					completeTask={completeTask}
					removeTask={removeTask}
				/>
			))}
		</ul>
	);
});

export default List;
