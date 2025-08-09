const Products = ({ products }) => {
	return (
		<div className="content">
			{products.map((product) => {
				const { id, title, thumbnail } = product;
				return (
					<div key={id} className="product-container">
						<img className="img" src={thumbnail} alt={title} />
						<p>{title}</p>
					</div>
				);
			})}
		</div>
	);
};

export default Products;
