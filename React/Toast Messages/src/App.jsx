import { useEffect, useState } from "react";
import "./App.css";
import ToastButtons from "./Components/ToastButtons";
import ToastMessages from "./Components/ToastMessages";

const buttons = ["Success", "Warning", "Info", "Error"];
function App() {
	const [toasts, setToasts] = useState([]);
	const removeToast = (tst) => {
		setToasts((prev) => prev.filter((toast) => toast !== tst));
	};
	return (
		<>
			<ToastButtons buttons={buttons} setToasts={setToasts} />
			<div className="toast-container">
				{toasts.map((toast) => {
					return (
						<ToastMessages
							key={toast}
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
