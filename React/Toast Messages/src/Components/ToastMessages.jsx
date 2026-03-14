import { useEffect } from "react";

const ToastMessages = ({ toast, removeToast }) => {
	const toastType = toast.split("-")[0];
	useEffect(() => {
		const timer = setTimeout(() => removeToast(toast), 5000);

		return () => clearTimeout(timer);
	}, []);
	return (
		<div className={`toast-message ${toastType}`}>
			{toastType + " alert"}
			<button className="close-btn" onClick={() => removeToast(toast)}>
				x
			</button>
		</div>
	);
};
export default ToastMessages;
