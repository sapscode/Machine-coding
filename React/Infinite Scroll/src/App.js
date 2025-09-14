import { useState, useEffect, useMemo } from "react";
import "./styles.css";

const URL = "https://dummyjson.com/products";
const limit = 30;

export default function App() {
	const [products, setProducts] = useState([]);
	const [page, setPage] = useState(0);
	const [loading, setLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);

	function scrollToBottom() {
		if (
			!loading &&
			window.scrollY + window.innerHeight >=
				document.documentElement.scrollHeight - 400 &&
			hasMore
		) {
			setPage((prev) => prev + 1);
		}
	}

	useEffect(() => {
		setLoading(true);
		async function fetchItems() {
			try {
				const response = await fetch(
					`${URL}?limit=${limit}&skip=${limit * page}`
				);
				if (!response.ok) {
					throw new Error("Couldn't load items");
				}

				const result = await response.json();
				setProducts((prev) => [...prev, ...result.products]);

				if (products.length + result.products.length >= result.total) {
					setHasMore(false);
				}
			} catch (err) {
				throw new Error("Couldn't load items " + err);
			} finally {
				setLoading(false);
			}
		}
		if (hasMore) fetchItems();
	}, [page]);

	const throttle = (cb, delay) => {
		let lastCall = 0;
		let timeout;

		return function () {
			const now = Date.now();

			if (now - lastCall >= delay) {
				lastCall = now;
				cb();
			} else {
				clearTimeout(timeout);
				timeout = setTimeout(() => {
					lastCall = Date.now();
					cb();
				}, delay - (now - lastCall));
			}
		};
	};

	const throttledScroll = useMemo(() => throttle(scrollToBottom, 300), []);

	useEffect(() => {
		document.addEventListener("scroll", throttledScroll);
		return function () {
			document.removeEventListener("scroll", throttledScroll);
		};
	}, []);

	return (
		<div className="App">
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
				{loading && <p className="loading">Loading more...</p>}
				{!hasMore && <p className="end">No more products to show 🚀</p>}
			</div>
		</div>
	);
}
