import type { squareProp } from "../types";

const Square = ({ value, handleClick }: squareProp) => {
	return (
		<button className="square" onClick={handleClick}>
			{value}
		</button>
	);
};
export default Square;
