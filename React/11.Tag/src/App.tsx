import { useState } from "react";
import "./App.css";
import TagInput from "./components/TagInput";

import type { Tag } from "./types/index";

function App() {
	// source of truth for all tags — passed down to TagInput to read and update
	const [tags, setTags] = useState<Tag[]>([]);

	// removes a tag by its unique id when × is clicked
	const removeTag = (id: number) => {
		setTags((prev) => prev.filter((tag) => tag.id !== id));
	};

	return (
		// tagContainer wraps both the tag chips and the input in one styled box
		<div className="tagContainer">
			{tags.map((tag) => {
				return (
					<div className="tag" key={tag.id}>
						{tag.name}
						<button className="btn" onClick={() => removeTag(tag.id)}>
							x
						</button>
					</div>
				);
			})}
			{/* TagInput handles: typing, Enter/comma to add, Backspace to remove last, paste */}
			<TagInput tags={tags} setTags={setTags} />
		</div>
	);
}

export default App;
