const ToastButtons = ({ buttons, setToasts }) => {
	/**
	 * Adds a new toast when a button is clicked
	 *
	 * Example generated toast values:
	 * "Success-0"
	 * "Error-1"
	 *
	 * The number ensures each toast has a unique key
	 */

	const handleClick = (button) => {
		const newToast = {
			id: Date.now(),
			type: button.toLowerCase(),
			message: `${button} alert`
		};

		setToasts((prev) => [...prev, newToast]);
	};
  
	return (
		<div className="buttons-container">
			{/* Render a button for each toast type */}
			{buttons.map((button, i) => {
				return (
					<button key={i} className="btn" onClick={() => handleClick(button)}>
						{button + " Toast"}
					</button>
				);
			})}
		</div>
	);
};
export default ToastButtons;
