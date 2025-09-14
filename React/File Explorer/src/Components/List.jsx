import { useState } from "react";
import ListItem from "./ListItem";

const List = ({ list }) => {
	return (
		<div>
			{list.map((listItem) => {
				return <ListItem listItem={listItem} key={listItem.id} />;
			})}
		</div>
	);
};
export default List;
