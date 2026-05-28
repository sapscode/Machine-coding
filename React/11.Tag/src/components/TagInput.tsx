import { useEffect, useRef, useState } from "react";
import type { Tag, TagInputProp } from "../types";

const TagInput = ({ tags, setTags }: TagInputProp) => {
	// tracks what the user is currently typing in the input box
	const [tagInput, setTagInput] = useState<string>("");

	/*
	 * useRef gives us a direct reference to the DOM input element.
	 * Unlike useState, updating a ref does NOT re-render the component —
	 * it's just a pointer to the real DOM node, used here to call .focus() on it.
	 */
	const inputRef = useRef<HTMLInputElement>(null);

	/*
	 * useEffect with an empty [] dependency array runs exactly once —
	 * after the component first renders and the DOM is ready.
	 * The ?. (optional chaining) guards against inputRef.current being null
	 * in case the element hasn't mounted yet (rare, but safe practice).
	 */
	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		const val = e.key; // the key the user pressed, e.g. "Enter", ",", "Backspace"
		const input = tagInput.trim(); // strip leading/trailing spaces before using the value

		if ((val === "Enter" || val === ",") && input !== "") {
			/*
			 * e.preventDefault() stops the browser's default behavior for these keys:
			 * - "Enter" would submit the form if this input is inside a <form>
			 * - "," would type a comma character into the input box
			 * We want neither — we're hijacking these keys to add a tag instead.
			 */
			e.preventDefault();

			/*
			 * Case-insensitive duplicate check.
			 * .toLowerCase() on both sides ensures "React" and "react" are treated as the same tag.
			 * tags.find() returns the first match or undefined — so if duplicate is truthy, skip adding.
			 */
			const duplicate = tags.find(
				(tag) => tag.name.toLowerCase() === input.toLowerCase()
			);

			if (!duplicate) {
				const newTag: Tag = {
					id: Date.now(), // Date.now() gives a unique ms timestamp — good enough as an id for a single add
					name: input
				};
				setTags((prev) => [...prev, newTag]); // spread prev to avoid mutating state directly
				setTagInput(""); // clear the input for the next tag
			}
		}

		/*
		 * Backspace on an empty input removes the last tag — a common UX pattern in tag inputs.
		 * We check input === "" (after trim) so a field with just spaces also triggers this.
		 * slice(0, -1) returns all elements except the last one — non-mutating.
		 */
		if (val === "Backspace" && input === "") {
			e.preventDefault();
			if (tags.length) {
				setTags((prev) => prev.slice(0, -1));
			}
		}
	};

	const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
		/*
		 * Without e.preventDefault(), the browser pastes the raw text into the input box first,
		 * THEN our handler runs — causing a flicker where pasted text briefly appears.
		 * Calling it here blocks that default paste behavior so we fully control what happens.
		 */
		e.preventDefault();

		// e.clipboardData.getData("text") reads the raw text from the clipboard
		const data = e.clipboardData.getData("text");

		const newTags = data
			.split(",") // "react, node, ts" → ["react", " node", " ts"]
			.filter((d) => d.trim() !== "") // drop empty strings from double commas like "react,,node"
			.map((d) => ({
				/*
				 * Date.now() alone would give every tag in this map the same id
				 * since they all run within the same millisecond.
				 * Adding Math.random() makes each id unique within this batch.
				 */
				id: Date.now() + Math.random(),
				name: d.trim()
			}));

		// spread both prev tags and new ones — never mutate state directly
		setTags((prev) => [...prev, ...newTags]);
	};

	return (
		<input
			type="text"
			ref={inputRef} // connects this DOM element to inputRef so we can call .focus()
			value={tagInput}
			onChange={(e) => setTagInput(e.target.value)}
			onKeyDown={handleKeyDown}
			onPaste={handlePaste}
		/>
	);
};
export default TagInput;
