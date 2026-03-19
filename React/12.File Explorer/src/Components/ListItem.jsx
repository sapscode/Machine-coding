import { useState } from "react";
import List from "./List";
import { useAddItemContext } from "../App";

const ListItem = ({ listItem }) => {
	// Access context functions from parent App
	const { addFile, addFolder, deleteItem } = useAddItemContext();

	// Controls whether child folders/files should be shown
	const [showChildren, setShowChilren] = useState(false);

	return (
		<div className="list-item" key={listItem.id}>
			<div className="folderHeader">
				<span className="title">
					{/* If it's a folder, show expand/collapse button */}
					{listItem.isFolder && (
						<button
							className="expandBtn"
							onClick={() => setShowChilren(!showChildren)}
						>
							{showChildren ? "🔽" : "🔼"}
						</button>
					)}

					{/* Display folder or file icon and name */}
					{`${listItem.isFolder ? "📂" : "📑"} ${listItem.name}`}
				</span>

				{/* Show Add buttons only for folders */}
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

				{/* Delete button for both files and folders */}
				<button className="deleteBtn" onClick={() => deleteItem(listItem.id)}>
					🗑️
				</button>
			</div>

			{/* Recursive rendering of children */}
			{/* When showChildren = true, render <List> for its children */}
			{listItem.children && showChildren && listItem.children?.length > 0 && (
				<List list={listItem.children} />
			)}
		</div>
	);
};
export default ListItem;
