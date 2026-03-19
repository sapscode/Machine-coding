import { useEffect } from "react";

const ToastMessages = ({ toast, removeToast }) => {
	/**
	 * Extract the type of toast
	 *
	 * Example:
	 * "Success-0" -> "Success"
	 * "Error-2" -> "Error"
	 *
	 * Used for styling and display
	 */
	const toastType = toast.split("-")[0];

	/**
	 * Auto-remove toast after 5 seconds
	 *
	 * Important:
	 * - Timer is created when component mounts
	 * - Cleanup prevents memory leaks if component unmounts early
	 */
	useEffect(() => {
		const timer = setTimeout(() => removeToast(toast), 5000);

		return () => clearTimeout(timer);
	}, []);

	return (
		<div className={`toast-message ${toastType}`}>
			{toastType + " alert"}
			{/* Manual close button */}
			<button className="close-btn" onClick={() => removeToast(toast)}>
				x
			</button>
		</div>
	);
};
export default ToastMessages;
