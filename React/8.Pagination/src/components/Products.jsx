const Products = ({ products }) => {
	return (
		<div className="content">
			{/* Render all visible products for the current page */}
			{products.map((product) => {
				const { id, title, thumbnail } = product;
				return (
					<div key={id} className="product-container">
						{/* Thumbnail preview */}
						<img className="img" src={thumbnail} alt={title} />
						<p>{title}</p>
					</div>
				);
			})}
		</div>
	);
};

export default Products;
