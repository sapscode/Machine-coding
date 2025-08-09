import { useEffect, useState, useRef } from "react";
import PaginationBar from "./components/PaginationBar";
import Products from "./components/Products";
import "./styles.css";

const url = "https://dummyjson.com/products";
export default function App() {
	const [limit, setLimit] = useState(10);
	const [products, setProducts] = useState([]);
	const [currentPage, setCurrentPage] = useState(0);

	const start = currentPage * limit;
	const end = start + limit;

	const fetchProducts = async () => {
		const data = await fetch(`${url}?limit=500`);
		const res = await data.json();
		setProducts(res.products);
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	/*
	const cacheRef = useRef({});

	const fetchProductsSkip = async (page = 0) => {
		console.log(cacheRef.current);
		if (cacheRef.current[limit]?.[page]) {
			setProducts(cacheRef.current[limit][page]);
			return;
		}

		try {
			const data = await fetch(`${url}?limit=${limit}&skip=${page * limit}`);
			const res = await data.json();
			setProducts(res.products);

			if (!cacheRef.current[limit]) {
				cacheRef.current[limit] = {};
			}
			cacheRef.current[limit][page] = res.products;
		} catch (err) {
			console.error(err);
		}
	};

	 useEffect(() => {
		fetchProductsSkip(currentPage);
    }, [currentPage]); 
    */

	const totalPages = Math.ceil((products.length - 1) / limit);

	return (
		<div className="App">
			<Products products={products.slice(start, end)} />
			<PaginationBar
				totalPages={totalPages}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
			/>
		</div>
	);
}
