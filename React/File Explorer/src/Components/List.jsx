import { useState } from "react";
import ListItem from "./ListItem";

const List = ({ list }) => {
	return (
		<div>
			{list.map((listItem) => {
				/* For each folder or file, render ListItem component */
				return <ListItem listItem={listItem} key={listItem.id} />;
			})}
		</div>
	);
};
export default List;
