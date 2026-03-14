const ToastButtons = ({ buttons, setToasts }) => {
	const handleClick = (button) => {
		setToasts((prev) => {
			const arr = [...prev];
			arr.push(`${button}-${arr.length}`);
			console.log(arr);
			return arr;
		});
	};
	return (
		<div className="buttons-container">
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
