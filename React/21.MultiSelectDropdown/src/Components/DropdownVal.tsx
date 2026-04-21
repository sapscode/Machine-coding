import { useState } from "react";
import type { DropdownValProp } from "../types";

const DropdownVal = ({
	val,
	selectedVals,
	setSelectedVals
}: DropdownValProp) => {
	const [checked, setChecked] = useState<boolean>(false);
	const { id, name, label } = val;

	const handleCheckbox = () => {
		if (checked === false) {
			setSelectedVals([...selectedVals, val]);
		} else {
			setSelectedVals(selectedVals.filter((v) => v.id !== id));
		}
		setChecked((prev) => !prev);
	};
	return (
		<div className="option">
			<input type="checkbox" checked={checked} onChange={handleCheckbox} />
			<span>{name}</span>
		</div>
	);
};
export default DropdownVal;
