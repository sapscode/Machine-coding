import { useState } from "react";
import List from "./List";
import { useAddItemContext } from "../App";

const ListItem = ({ listItem }) => {
	const { addFile, addFolder, deleteItem } = useAddItemContext();
	const [showChildren, setShowChilren] = useState(false);
	return (
		<div className="list-item" key={listItem.id}>
			<div className="folderHeader">
				<span className="title">
					{listItem.isFolder && (
						<button
							className="expandBtn"
							onClick={() => setShowChilren(!showChildren)}
						>
							{showChildren ? "🔽" : "🔼"}
						</button>
					)}
					{`${listItem.isFolder ? "📂" : "📑"} ${listItem.name}`}
				</span>
				{listItem.isFolder && (
					<div className="btn-contianer">
						<button
							className="btn add-folder"
							title="Add folder"
							onClick={() => addFolder(listItem.id)}
						>
							⁺📂
						</button>
						<button
							className="btn add-file"
							title="Add file"
							onClick={() => addFile(listItem.id)}
						>
							⁺📑
						</button>
					</div>
				)}
				<button className="deleteBtn" onClick={() => deleteItem(listItem.id)}>
					🗑️
				</button>
			</div>
			{listItem.children && showChildren && listItem.children?.length > 0 && (
				<List list={listItem.children} />
			)}
		</div>
	);
};
export default ListItem;
