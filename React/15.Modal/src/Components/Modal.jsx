import { useRef } from "react";
import useClickOutside from "../hooks/clickOutside";

const Modal = ({ setShowModal, children }) => {
	/*
	============================================
	APPROACH 1: Using Custom Hook (Commented Out)
	============================================
	// Interview pattern: Custom React hook for UX enhancement
	// Closes modal when user clicks anywhere outside of it
	// Hook follows React convention: called directly like useState, useEffect, etc.
	// Encapsulates event listener logic and cleanup within hook
	// Uses mousedown event to avoid race condition with modal opening click
	
	const modalRef = useRef();

	useClickOutside(modalRef, () => setShowModal(false));
	
	return (
		<div className="modal-container" ref={modalRef}>
			<button className="btn-close" onClick={(e) => {
				e.stopPropagation();
				setShowModal(false);
			}}>
				x
			</button>
			{children}
		</div>
	);
	*/

	// =============================================
	// APPROACH 2: Overlay Click Handler (Active)
	// =============================================
	// Interview pattern: Direct overlay click detection
	// e.target is the overlay, e.currentTarget is the modal container
	// Only close if click is on overlay (outside the modal content)
	const handleOverlayClick = (e) => {
		if (e.target === e.currentTarget) {
			setShowModal(false);
		}
	};

	return (
		<div className="modal-overlay" onClick={handleOverlayClick}>
			<div className="modal">
				{/* Interview pattern: Close button with stopPropagation */}
				{/* Prevents click from bubbling to overlay and triggering overlay's close handler */}
				<button
					className="btn-close"
					onClick={(e) => {
						e.stopPropagation();
						setShowModal(false);
					}}
				>
					x
				</button>
				{/* Interview pattern: Children prop for flexible modal content */}
				{/* Allows reusing this modal component with different content */}
				{children}
			</div>
		</div>
	);
};

export default Modal;
