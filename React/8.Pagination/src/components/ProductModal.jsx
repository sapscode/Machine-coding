// Interview pattern: Modal component for displaying product details
// Receives product data as props and callback to close modal
const ProductModal = ({ title, thumbnail, closeModal }) => {
	const handleOverlayClick = (e) => {
		e.stopPropagation(); // since modal is child of product-container, which also has a click handler,
		// which will reopen the modal again, hence stopping the event bubbling here
		if (e.target === e.currentTarget) {
			closeModal();
		}
	};

	return (
		<div className="modal-overlay" onClick={handleOverlayClick}>
			<div className="modal">
				{/* Interview pattern: Close button with click handler */}
				{/* Calls closeModal callback to update parent state */}
				{/* Interview pattern: stopPropagation prevents triggering overlay close handler */}
				{/* Without it, click bubbles to overlay and triggers close immediately */}
				<button
					className="btn-close"
					onClick={(e) => {
						e.stopPropagation();
						closeModal();
					}}
				>
					x
				</button>
				<img src={thumbnail} alt="" className="modal-img" />
				<p>{title}</p>
			</div>
		</div>
	);
};
export default ProductModal;
