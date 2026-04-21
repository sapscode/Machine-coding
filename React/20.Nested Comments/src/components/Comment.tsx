import { useEffect, useRef, useState } from "react";
import type { ICommnetProp } from "../types";
import { useOpenReply } from "../App";

// Comment is a recursive component — it renders itself for each reply,
// creating the nested thread structure.
// Props come from the parent Comment (or App for root-level comments).
const Comment = ({ comment, addComment, deleteComment }: ICommnetProp) => {
	const { id, message, replies } = comment;

	// --- Reply box open/close (via Context) ---
	// Instead of local boolean state, we use a shared context that holds the id
	// of whichever comment currently has its reply box open.
	// This ensures only one reply box is open at a time across the entire tree.
	const { openReplyId, setOpenReplyId } = useOpenReply();
	const openReply = openReplyId === id; // derived: true only for this comment

	// Controlled input state for the reply text
	const [replyMessage, setReplyMessage] = useState<string>("");

	// Ref to the reply input — used to auto-focus it when the reply box opens
	const inputRef = useRef<HTMLInputElement>(null);

	// Toggle this comment's reply box.
	// If it's already open (openReplyId === id), close it (set to null).
	// Otherwise, open this one — which automatically closes any other open reply box
	// because openReplyId is a single shared value.
	const handleReply = () => {
		setOpenReplyId(openReplyId === id ? null : id);
	};

	// Sync input value as user types
	const handleReplyMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
		setReplyMessage(e.target.value);
	};

	const handleDelete = () => {
		deleteComment(id);
	};

	// Post the reply — calls addComment in App which recursively updates the tree
	const postReply = () => {
		if (replyMessage.trim() !== "") {
			addComment(replyMessage, id);
			setReplyMessage("");
		}
		inputRef.current?.focus();
	};

	// Allow submitting reply with Enter key
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			e.preventDefault();
			postReply();
		}
	};

	// Auto-focus the input whenever the reply box opens.
	// We can't focus inside the click handler because the input hasn't rendered yet
	// at that point — useEffect runs after the DOM has updated.
	useEffect(() => {
		if (openReply === true) inputRef.current?.focus();
	}, [openReply]);

	return (
		<div className="comment">
			<div className="comment-section">
				<div className="message">{message}</div>
				<div className="btn-group">
					<button className="btn" onClick={handleReply}>
						Reply
					</button>
					<button className="btn" onClick={handleDelete}>
						Delete
					</button>
				</div>
			</div>

			{/* Reply input box — only rendered when this comment's reply is open */}
			{openReply && (
				<div className="reply">
					<input
						ref={inputRef}
						className="input-ele"
						type="text"
						onChange={handleReplyMessage}
						onKeyDown={handleKeyDown}
						value={replyMessage}
					/>
					<button onClick={postReply}>Comment</button>
				</div>
			)}

			{/* Recursive rendering — each reply renders a Comment, which can have its own replies */}
			<div className="replies">
				{replies?.map((reply) => {
					return (
						<Comment
							comment={reply}
							addComment={addComment}
							deleteComment={deleteComment}
							key={reply.id}
						/>
					);
				})}
			</div>
		</div>
	);
};
export default Comment;
