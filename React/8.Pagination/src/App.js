import { useEffect, useState, useRef } from "react";
import PaginationBar from "./components/PaginationBar";
import Products from "./components/Products";
import "./styles.css";

const url = "https://dummyjson.com/products";
export default function App() {
	// Interview pattern: Fetch-once, paginate-in-memory strategy
	// Load all data upfront (500 products), then slice different pages on demand
	// Tradeoff: Higher initial load but instant pagination (no loading states)

	// Number of products to show per page - controls slicing window
	const [limit, setLimit] = useState(10);

	// Stores all fetched products in memory - the full dataset
	const [products, setProducts] = useState([]);

	// Currently active page index (0-based)
	// Interview concept: State-driven UI - changing this triggers slice computation
	const [currentPage, setCurrentPage] = useState(0);

	// Interview key concept: Array slicing for pagination
	// start = 0 * 10 = 0 (page 1: [0-9])
	// start = 1 * 10 = 10 (page 2: [10-19])
	// start = 2 * 10 = 20 (page 3: [20-29])
	const start = currentPage * limit;
	const end = start + limit;

	// Fetch all products at component mount (batches 500 items)
	// Interview pattern: Data fetching - load once, paginate on demand
	const fetchProducts = async () => {
		try {
			const data = await fetch(`${url}?limit=500`);
			const res = await data.json();
			setProducts(res.products); // Store full dataset in state
		} catch (err) {
			console.error(err);
		}
	};

	// Interview concept: useEffect dependency array optimization
	// Empty array [] means run once on mount - perfect for data fetching
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

	// Interview pattern: Derived state from data
	// Total pages = Math.ceil((total items - 1) / items per page)
	// -1 accounts for 0-based indexing in pagination logic
	const totalPages = Math.ceil((products.length - 1) / limit);

	if (!products || !products.length) {
		return <h1>Something went wrong...</h1>;
	}

	return (
		<div className="App">
			<h3>PAGINATION</h3>

			{/* Interview concept: Array.slice() creates new array without mutation
			    Passing only visible products to child avoids unnecessary renders */}
			<Products products={products.slice(start, end)} />

			{/* Props drilling: Passing page state & setter to pagination control */}
			{/* Interview pattern: Lifting state up - parent owns pagination state */}
			<PaginationBar
				totalPages={totalPages}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
			/>
		</div>
	);
}
