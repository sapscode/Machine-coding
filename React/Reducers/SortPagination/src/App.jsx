import { useEffect, useMemo, useReducer, useState } from "react";
import "./App.css";
import ProductTable from "./Components/ProductTable";
import PaginationBar from "./Components/PaginationBar";
import { initialState, reducer } from "./Reducers/TableReducer";

const url = "https://dummyjson.com/products?limit=194";
const PAGE_SIZE = 10;

function App() {
	// Raw data
	const [products, setProducts] = useState([]);

	// UI state (sort + pagination)
	const [state, dispatch] = useReducer(reducer, initialState);

	// Fetch once
	useEffect(() => {
		const fetchProducts = async () => {
			const res = await fetch(url);
			const data = await res.json();

			const normalized = data.products.map((p) => ({
				id: p.id,
				name: p.title,
				price: p.price,
				rating: p.rating
			}));

			setProducts(normalized);
		};

		fetchProducts();
	}, []);

	// Derived: global sort
	const sortedProducts = useMemo(() => {
		if (!state.sortBy) return products;

		return [...products].sort((a, b) => {
			const valA = a[state.sortBy];
			const valB = b[state.sortBy];

			if (typeof valA === "string") {
				return state.isAscending
					? valA.localeCompare(valB)
					: valB.localeCompare(valA);
			}

			return state.isAscending ? valA - valB : valB - valA;
		});
	}, [products, state.sortBy, state.isAscending]);

	// Derived: pagination
	const start = (state.currentPage - 1) * PAGE_SIZE;
	const end = start + PAGE_SIZE;

	const paginatedProducts = sortedProducts.slice(start, end);
	const totalPages = Math.ceil(sortedProducts.length / PAGE_SIZE);

	// Intent handlers
	const handleSort = (column) => {
		dispatch({ type: "SORT_COLUMN", payload: column });
	};

	const handlePageChange = (page) => {
		dispatch({ type: "SET_PAGE", payload: page });
	};

	return (
		<>
			<ProductTable
				products={paginatedProducts}
				sortCol={handleSort}
				currentSort={state.sortBy}
				isAscending={state.isAscending}
			/>

			<PaginationBar
				currentPage={state.currentPage}
				handlePageChange={handlePageChange}
				totalPages={totalPages}
			/>
		</>
	);
}

export default App;
