import { useEffect, useState } from "react";
import "./App.css";
import ToastButtons from "./Components/ToastButtons";
import ToastMessages from "./Components/ToastMessages";

const buttons = ["Success", "Warning", "Info", "Error"];
function App() {
	const [toasts, setToasts] = useState([]);
	/**
	 * Removes a toast from the list
	 * We use functional state update to avoid stale state problems
	 * (important when multiple updates happen quickly)
	 */
	const removeToast = (tst) => {
		setToasts((prev) => prev.filter((toast) => toast !== tst));
	};
	return (
		<>
			{/* Renders buttons that create new toasts */}
			<ToastButtons buttons={buttons} setToasts={setToasts} />
      
			{/* Container that holds all toast messages */}
			<div className="toast-container">
				{toasts.map((toast) => {
					return (
						<ToastMessages
							key={toast} // Using toast string as key because it is unique
							toast={toast}
							removeToast={removeToast}
						/>
					);
				})}
			</div>
		</>
	);
}

export default App;
