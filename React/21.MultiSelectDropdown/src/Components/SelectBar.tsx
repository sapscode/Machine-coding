import type { SelectBarProp } from "../types";
import Tag from "./Tag";

const SelectBar = ({
	selectedVals,
	removeSelectVal,
	isOpen,
	setIsOpen
}: SelectBarProp) => {
	return (
		<div className="select-bar" onClick={() => setIsOpen((prev) => !prev)}>
			<span className="tags">
				{selectedVals?.length
					? selectedVals.map((val) => (
							<Tag val={val} removeSelectVal={removeSelectVal} key={val.id} />
						))
					: "Select options ..."}
			</span>
			<span className="arrow">{isOpen ? "🔽" : "🔼"}</span>
		</div>
	);
};
export default SelectBar;
