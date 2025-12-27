import React from "react";

/**
 * Memoized because:
 * - Parent re-renders on list changes
 * - This should re-render only when input-related props change
 */
const FormInput = React.memo(({ submitInput, currentItem, setCurrentItem }) => {
	console.log("FormInput");

	return (
		<form onSubmit={submitInput}>
			<input
				type="text"
				value={currentItem}
				onChange={(e) => setCurrentItem(e.target.value)}
				placeholder="Add task..."
			/>

			<button className="btn add" type="submit">
				ADD
			</button>
		</form>
	);
});

export default FormInput;
