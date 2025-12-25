const Modal = ({ children, onClose }) => {
	return (
		<>
			{/*
        Backdrop is part of the Modal itself.
        This makes Modal fully self-contained and reusable.
      */}
			<div
				className="backdrop"
				onClick={onClose} /* Clicking outside modal closes it */
			>
				{/*
          Modal container.
          stopPropagation prevents backdrop click from firing
          when clicking inside the modal.
        */}
				<div className="modal" onClick={(e) => e.stopPropagation()}>
					{/*
            Close button is modal responsibility
          */}
					<button className="btn close" onClick={onClose}>
						X
					</button>

					{/*
            Modal content area.
            `children` allows any JSX to be rendered here,
            making this modal reusable for:
            - confirmations
            - forms
            - messages
            - custom layouts
          */}
					<div className="content">{children}</div>
				</div>
			</div>
		</>
	);
};

export default Modal;
