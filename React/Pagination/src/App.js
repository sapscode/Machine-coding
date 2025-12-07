import { useEffect, useState, useRef } from "react";
import PaginationBar from "./components/PaginationBar";
import Products from "./components/Products";
import "./styles.css";

const url = "https://dummyjson.com/products";
export default function App() {
	// Number of products to show per page
	const [limit, setLimit] = useState(10);

	// Stores all fetched products
	const [products, setProducts] = useState([]);

	// Index of the currently active page
	const [currentPage, setCurrentPage] = useState(0);

	// Compute slice boundaries for the current page
	const start = currentPage * limit;
	const end = start + limit;

	// Fetch all products once (500 total) and keep them in memory
	const fetchProducts = async () => {
		try {
			const data = await fetch(`${url}?limit=500`);
			const res = await data.json();
			setProducts(res.products);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	/*
  ============================== 🧱 OPTIONAL CACHE-BASED PAGINATION (ADVANCED) ==============================
	👉 This code block demonstrates an alternate approach:
	   Instead of fetching all 500 items at once, we only fetch a single page
	   (based on `limit` and `skip`) and cache it in memory to avoid re-fetching.

	const cacheRef = useRef({});

	const fetchProductsSkip = async (page = 0) => {
		console.log(cacheRef.current);

    // 1️⃣ If this page+limit combo exists in cache, use cached version
		if (cacheRef.current[limit]?.[page]) {
			setProducts(cacheRef.current[limit][page]);
			return;
		}

    // 2️⃣ Otherwise, fetch from API
		try {
			const data = await fetch(`${url}?limit=${limit}&skip=${page * limit}`);
			const res = await data.json();
			setProducts(res.products);

      // 3️⃣ Initialize cache structure if not exists
			if (!cacheRef.current[limit]) {
				cacheRef.current[limit] = {};
			}

      // 4️⃣ Store this page’s data
			cacheRef.current[limit][page] = res.products;
		} catch (err) {
			console.error(err);
		}
	};

  // 5️⃣ Fetch only current page when page changes
	 useEffect(() => {
		fetchProductsSkip(currentPage);
    }, [currentPage]); 
    */

	// Calculate total number of pages
	const totalPages = Math.ceil((products.length - 1) / limit);

	if (!products || !products.length) {
		return <h1>Something went wrong...</h1>;
	}

	return (
		<div className="App">
			<h3>PAGINATION</h3>

			{/* Slice product list to show current page items */}
			<Products products={products.slice(start, end)} />

			{/* Pagination controls */}
			<PaginationBar
				totalPages={totalPages}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
			/>
		</div>
	);
}
