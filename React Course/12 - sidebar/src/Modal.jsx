import { useGlobalContext } from "./AppProvider";
import { FaTimes } from "react-icons/fa";

const Modal = () => {
	const { showModal, setShowModal } = useGlobalContext();

	return (
		<div className={showModal ? "modal-overlay show-modal" : "modal-overlay"}>
			<div className="modal-container">
				<h3>This is a modal</h3>
				<button
					className="close-modal-btn"
					onClick={() => setShowModal(!showModal)}
				>
					<FaTimes />
				</button>
			</div>
		</div>
	);
};
export default Modal;
