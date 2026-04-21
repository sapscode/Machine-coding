import { createContext, useContext, useState } from "react";
import "./App.css";
import data from "./data.json";
import type { IComment, OpenRContext } from "./types";
import Comment from "./components/Comment";

// --- Context Setup ---
// We need to track which comment's reply box is open across the entire tree.
// Since comments are deeply nested, we use Context instead of prop drilling.
// Only one reply box should be open at a time — so we store a single `openReplyId`
// (the id of the currently open comment, or null if none is open).
export const OpenReplyContext = createContext<OpenRContext | null>(null);
// Custom hook so child components can consume the context cleanly
export const useOpenReply = () => useContext(OpenReplyContext)!;

function App() {
	// `comments` holds the entire nested comment tree (array of root-level comments)
	const [comments, setComments] = useState<IComment[]>(data);
	// Tracks which comment's reply input is currently open (by id). null = none open.
	const [openReplyId, setOpenReplyId] = useState<number | null>(null);

	// --- Add Comment ---
	// Recursively walks the tree to find the parent comment (by parentId)
	// and appends the new comment to its replies array — immutably.
	// Same pattern as the File Explorer: rebuild the path to the changed node,
	// return everything else unchanged.
	const addComment = (commentMessge: string, parentId: number) => {
		setComments((prev) => {
			const setComment = (list: IComment[]): IComment[] => {
				return list.map((item: IComment) => {
					// Found the parent — append the new comment to its replies
					if (item.id === parentId) {
						const newComment: IComment = {
							id: Date.now(),
							message: commentMessge,
							replies: []
						};
						return {
							...item,
							replies: [...(item.replies ?? []), newComment]
						};
					}

					// Not the target — but if it has replies, recurse deeper
					if (item.replies?.length) {
						return {
							...item,
							replies: setComment(item.replies)
						};
					}

					// Leaf node (file/comment with no replies) — return as-is
					return item;
				});
			};
			return setComment(prev);
		});
	};

	// --- Delete Comment ---
	// Recursively walks the tree, filters out the target comment at any depth,
	// and recursively cleans up children of remaining nodes.
	const deleteComment = (commentId: number) => {
		setComments((prev) => {
			const deleteComment = (list: IComment[]): IComment[] => {
				return (
					list
						// Step 1: Remove the target node at this level
						.filter((item) => {
							if (item.id !== commentId) return item;
						})
						// Step 2: For remaining nodes, recurse into their replies
						.map((item) => {
							if (item.replies?.length) {
								return {
									...item,
									replies: deleteComment(item.replies)
								};
							}

							return item;
						})
				);
			};

			return deleteComment(prev);
		});
	};

	return (
		// --- Render ---
		// OpenReplyContext wraps the entire tree so any Comment at any depth
		// can read/update which reply box is open — without prop drilling.
		<OpenReplyContext.Provider value={{ openReplyId, setOpenReplyId }}>
			<div className="comment-list">
				{comments.map((comment) => {
					return (
						<Comment
							comment={comment}
							addComment={addComment}
							deleteComment={deleteComment}
							key={comment.id}
						/>
					);
				})}
			</div>
		</OpenReplyContext.Provider>
	);
}

export default App;
