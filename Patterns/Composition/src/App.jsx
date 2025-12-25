import { useState } from "react";
import Modal from "./Modal";
import Content from "./Content";
import "./App.css";

function App() {
	// Single source of truth for modal visibility
	// Keeping this in the parent avoids hidden state inside Modal
	const [showModal, setShowModal] = useState(false);

	// Toggles modal open/close
	// Passed to Modal so it can request closing itself
	const toggleModal = () => {
		setShowModal((prev) => !prev);
	};

	return (
		<>
			{/* Button that triggers opening the modal */}
			<button className="btn" onClick={toggleModal}>
				Show Modal
			</button>

			{/* 
        Modal is conditionally rendered.
        When showModal is false, Modal does not exist in the DOM.
      */}
			{showModal && (
				<Modal onClose={toggleModal}>
					{/* 
            Content is injected using composition.
            Modal does NOT know or care what this content is.
          */}
					<Content />
				</Modal>
			)}
		</>
	);
}

export default App;
