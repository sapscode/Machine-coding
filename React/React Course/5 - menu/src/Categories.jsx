import data from "./data";

const Categories = ({ filterItems }) => {
	const categories = ["All", ...new Set(data.map((i) => i.category))];
	return (
		<div className="btn-container">
			{categories.map((category, i) => {
				return (
					<button key={i} className="btn" onClick={() => filterItems(category)}>
						{category}
					</button>
				);
			})}
		</div>
	);
};
export default Categories;
