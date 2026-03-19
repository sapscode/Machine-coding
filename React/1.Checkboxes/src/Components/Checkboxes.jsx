export const Checkboxes = ({ checkboxes, handleCheck, checked }) => {
	return (
		<div className="children-boxes">
			{checkboxes.map((checkbox) => {
				return (
					<>
						<div className="checkbox" key={checkbox.id}>
							<input
								className="check"
								id={checkbox.id}
								type="checkbox"
								checked={checked[checkbox.id] || false}
								onChange={(e) => handleCheck(e.target.checked, checkbox)}
							/>
							<label htmlFor={checkbox.id}>{checkbox.name}</label>
						</div>
						{checkbox.children?.length && (
							<Checkboxes
								checkboxes={checkbox.children}
								handleCheck={handleCheck}
								checked={checked}
							/>
						)}
					</>
				);
			})}
		</div>
	);
};
