import type { TagsProp } from "../types";

const Tag = ({ val, removeSelectVal }: TagsProp) => {
	const handleTagClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
		e.stopPropagation();
		removeSelectVal(val.id);
	};
	return (
		<span className="tag">
			{val.name}
			<button onClick={handleTagClick}>x</button>
		</span>
	);
};
export default Tag;
