import { useState, useEffect } from "react";
import "./App.css";
import ProductTable from "./Components/ProductTable";
import PaginationBar from "./Components/PaginationBar";
import { useMemo } from "react";

// API endpoint to fetch products
const url = "https://dummyjson.com/products?limit=194";
const totalItems = 194;
const PAGE_SIZE = 10;

function App() {
	// Holds the list of products displayed in the table
	const [products, setProducts] = useState([]);

	const [currentPage, setCurrentPage] = useState(1);
	const start = (currentPage - 1) * PAGE_SIZE;
	const end = start + PAGE_SIZE;

	// Tracks current sort direction
	// true  -> ascending
	// false -> descending
	const [isAscending, setIsAscending] = useState();

	// Stores which column is currently being sorted
	// Example: "price", "name", "rating"
	const [currentSort, setCurrrentSort] = useState();

	// Fetch products once when the component mounts
	useEffect(() => {
		const fetchProducts = async () => {
			try {
				// Fetch raw response
				const data = await fetch(url);

				// Convert response to JSON
				const res = await data.json();

				// Normalize API data to only what the table needs
				const updatedProducts = res.products.map((product) => ({
					id: product.id,
					name: product.title,
					price: product.price,
					rating: product.rating
				}));

				// Store products in state
				setProducts(updatedProducts);
			} catch (err) {
				console.error(err);
			}
		};

		fetchProducts();
	}, []);

	const sortedProducts = useMemo(() => {
		// Create a copy of products before sorting
		// as sort() mutates the original(state) array
		return [...products].sort((a, b) => {
			const valA = a[currentSort];
			const valB = b[currentSort];

			// String sorting (for "name")
			if (typeof valA === "string") {
				return isAscending
					? valA.localeCompare(valB) // A → Z
					: valB.localeCompare(valA); // Z → A
			}

			// Number sorting (for "price" and "rating")
			return isAscending ? valA - valB : valB - valA;
		});
	}, [products, isAscending, currentSort]);

	// Handles sorting logic when a column header is clicked
	const sortCol = (coloumn) => {
		setCurrentPage(1); //moving to first page when sort is changed

		// If user clicked the SAME column:
		// toggle the sort direction
		if (coloumn === currentSort) {
			setIsAscending((prev) => !prev);
		}

		// If user clicked a NEW column:
		// reset sorting direction to ascending and set the new coloumn
		else {
			// Store the new sort direction
			setIsAscending(true);

			// Store which column is currently clicked
			setCurrrentSort(coloumn);
		}
	};

	return (
		<>
			<ProductTable
				products={sortedProducts.slice(start, end)}
				sortCol={sortCol}
				currentSort={currentSort}
				isAscending={isAscending}
			/>
			<PaginationBar
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
				totalPages={totalItems / PAGE_SIZE}
			/>
		</>
	);
}

export default App;
