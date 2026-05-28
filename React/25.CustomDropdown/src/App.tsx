import { useEffect, useRef, useState } from "react";
// import { List } from "react-window";
// import type { RowComponentProps } from "react-window";
import "./App.css";
import { dropdownVals } from "./data.js";

// ─── REACT-WINDOW VERSION (for study) ────────────────────────────────────────
//
// Extra props we pass down to each row beyond what react-window provides (index, style)
// type RowProps = {
// 	onItemClick: (val: string) => void;
// 	itemRefs: React.RefObject<(HTMLLIElement | null)[]>;
// };
//
// Defined outside App so it doesn't get recreated on every render.
// react-window calls this for each visible row — only renders what fits on screen.
// const RowComponent = ({
// 	index,
// 	style, // must be spread onto the element — react-window uses this to absolutely position each row
// 	onItemClick,
// 	itemRefs,
// }: RowComponentProps<RowProps>) => (
// 	<li
// 		style={style}
// 		className="list-item"
// 		role="option"
// 		tabIndex={-1}
// 		onClick={() => onItemClick(dropdownVals[index])}
// 		ref={(el) => {
// 			itemRefs.current[index] = el;
// 		}}
// 	>
// 		{dropdownVals[index]}
// 	</li>
// );
// ─────────────────────────────────────────────────────────────────────────────

function App() {
	const [dropdownValue, setDropdownValue] = useState<string>("");
	const [isOpen, setIsOpen] = useState<boolean>(false);

	// Array of refs to each <li> — used to programmatically move focus during keyboard nav
	const listRef = useRef<(HTMLLIElement | null)[]>([]);
	// Ref to the trigger button — used to return focus when dropdown closes
	const buttonRef = useRef<HTMLButtonElement | null>(null);
	// Tracks which item is currently highlighted — stored in a ref (not state) to avoid re-renders
	const currentHighlighted = useRef<number>(0);

	const handleListItemClick = (val: string) => {
		setDropdownValue(val);
		handleDropDownClose();
	};

	// When the dropdown opens, move focus to the currently highlighted item (starts at 0).
	// Using useEffect ensures the <li> elements are mounted in the DOM before we call .focus()
	useEffect(() => {
		if (!isOpen) buttonRef.current?.focus();
		else listRef.current[currentHighlighted.current]?.focus();
	}, [isOpen]);

	// Auto-focus the trigger button on first render
	useEffect(() => {
		buttonRef.current?.focus();
	}, []);

	const handleListKeydown = (e: React.KeyboardEvent<HTMLUListElement>) => {
		// Prevent Tab from moving focus outside the dropdown (focus trap)
		if (e.key === "Tab") {
			e.preventDefault();
			return;
		}
		// e.preventDefault() stops the browser from firing a click on the button
		// when Enter is pressed (since focus moves to the button after selection)
		if (e.key === "Enter") {
			e.preventDefault();
			handleListItemClick((e.target as HTMLElement).textContent?.trim() ?? "");
		}
		if (e.key === "Escape") {
			handleDropDownClose();
		}
		// Cyclic navigation: % wraps around when reaching the last item
		if (e.key === "ArrowDown") {
			currentHighlighted.current =
				(currentHighlighted.current + 1) % dropdownVals.length;
			listRef.current[currentHighlighted.current]?.focus();
		}
		// + dropdownVals.length before % prevents negative modulo in JS
		if (e.key === "ArrowUp") {
			currentHighlighted.current =
				(currentHighlighted.current - 1 + dropdownVals.length) %
				dropdownVals.length;
			listRef.current[currentHighlighted.current]?.focus();
		}
	};

	const handleDropDownClose = () => {
		setIsOpen(false);
		currentHighlighted.current = 0; // reset so next open always starts at first item
	};

	return (
		<div className="container">
			<div className="head">
				<input type="text" value={dropdownValue} readOnly />
				<button
					ref={buttonRef}
					aria-expanded={isOpen} // tells screen readers whether the dropdown is open
					aria-controls="menu" // links this button to the dropdown it controls
					onClick={() => setIsOpen((prev) => !prev)}
				>
					{isOpen ? "hide" : "show"}
				</button>
			</div>
			{isOpen && (
				<ul
					id="menu"
					role="listbox"
					className="dropdown-container"
					onKeyDown={handleListKeydown}
				>
					{dropdownVals.map((val: string, i: number) => (
						<li
							className="list-item"
							role="option"
							key={i}
							tabIndex={-1}
							onClick={() => handleListItemClick(val)}
							ref={(el) => {
								listRef.current[i] = el;
							}}
						>
							{val}
						</li>
					))}
				</ul>

				// ─── REACT-WINDOW VERSION ─────────────────────────────────────────────
				// Replaces the <ul> above. Only renders rows visible in the 240px window.
				// <List
				// 	id="menu"
				// 	role="listbox"
				// 	className="dropdown-container"
				// 	tagName="ul"            // renders outer container as <ul> instead of default <div>
				// 	rowComponent={RowComponent}
				// 	rowCount={dropdownVals.length}
				// 	rowHeight={36}          // each <li> is exactly 36px tall — must match .list-item in CSS
				// 	rowProps={{ onItemClick: handleListItemClick, itemRefs: listRef }}
				// 	style={{ height: 240 }} // visible height — ~6-7 items at a time
				// 	onKeyDown={handleListKeydown}
				// />
				// ─────────────────────────────────────────────────────────────────────
			)}
		</div>
	);
}

export default App;
