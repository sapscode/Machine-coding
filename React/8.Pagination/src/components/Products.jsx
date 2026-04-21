// Interview pattern: Presentational component - receives filtered product list

import { useState } from "react";
import ProductModal from "./ProductModal";

// Responsibility: Only render passed products (already paginated by parent)
const Products = ({ products }) => {
	// Interview pattern: Track which product's modal is open by ID
	// Instead of boolean showModal, use selectedProductId to show only one modal at a time
	const [selectedProductId, setSelectedProductId] = useState(null);

	return (
		<div className="content">
			{/* Interview pattern: Array.map() to render lists in React
			    Each item must have unique 'key' prop for reconciliation */}
			{products.map((product) => {
				// Destructuring: Extract only needed props
				const { id, title, thumbnail } = product;
				return (
					<div
						key={id}
						className="product-container"
						onClick={() => setSelectedProductId(id)}
					>
						{/* Thumbnail image with alt text for accessibility */}
						<img className="img" src={thumbnail} alt={title} />
						<p>{title}</p>
						{/* Interview pattern: Conditional render - only show if this product is selected */}
						{/* Ensures only one modal opens, prevents all modals showing together */}
						{selectedProductId === id && (
							<ProductModal
								title={title}
								thumbnail={thumbnail}
								closeModal={() => setSelectedProductId(null)}
							/>
						)}
					</div>
				);
			})}
		</div>
	);
};

export default Products;
