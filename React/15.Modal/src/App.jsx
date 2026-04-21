import { useState } from "react";
import "./App.css";
import Modal from "./Components/Modal";

function App() {
	// Interview pattern: Modal visibility controlled by parent state
	// Allows showing/hiding modal and passing close handler to child
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			{/* Trigger button - toggles modal visibility */}
			<button onClick={() => setShowModal(true)}>Show Modal</button>

			{/* Interview pattern: Conditional rendering - modal only added to DOM when needed */}
			{/* Passes setShowModal to child so it can close itself via overlay click or close button */}
			{/* Interview pattern: Children prop allows flexible modal content */}
			{showModal && (
				<Modal setShowModal={setShowModal}>
					<p>
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat,
						maiores nobis impedit eius incidunt praesentium voluptatibus,
						debitis placeat tenetur inventore sint aperiam dolores excepturi,
						porro aliquid aut natus commodi? Iure! Maxime delectus ipsam
						officiis excepturi ipsa quia tenetur ipsum doloribus eos, inventore
						nam fuga neque enim mollitia sapiente voluptatem dolorem quis id
						provident voluptas aspernatur dolore reiciendis.
					</p>
				</Modal>
			)}
		</>
	);
}

export default App;
