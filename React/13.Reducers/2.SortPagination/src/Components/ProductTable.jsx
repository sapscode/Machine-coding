const ProductTable = ({ products, sortCol, isAscending, currentSort }) => {
	return (
		<table>
			<thead>
				<tr>
					<th onClick={() => sortCol("name")}>
						{`Name ${
							currentSort === "name" ? (isAscending ? "🔼" : "🔽") : ""
						}`}
					</th>

					<th onClick={() => sortCol("price")}>
						{`Price ${
							currentSort === "price" ? (isAscending ? "🔼" : "🔽") : ""
						}`}
					</th>

					<th onClick={() => sortCol("rating")}>
						{`Rating ${
							currentSort === "rating" ? (isAscending ? "🔼" : "🔽") : ""
						}`}
					</th>
				</tr>
			</thead>

			<tbody>
				{products.map(({ id, name, price, rating }) => (
					<tr key={id}>
						<td>{name}</td>
						<td>{price}</td>
						<td>{rating}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default ProductTable;
