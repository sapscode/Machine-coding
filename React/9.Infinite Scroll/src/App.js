/**
 * INFINITE SCROLL — Interview Revision Notes
 *
 * KEY CONCEPTS:
 *  1. Scroll-position detection: scrollY + innerHeight >= scrollHeight - threshold
 *  2. Throttling scroll handler with useMemo to keep a single stable reference
 *  3. Paginated fetch: append new items via spread [...prev, ...new]
 *  4. "hasMore" flag to stop fetching once total is reached
 *  5. "loading" guard to prevent duplicate fetches during a pending request
 *
 * INTERVIEW TALKING POINTS:
 *  - Why throttle instead of debounce? Throttle gives periodic feedback while
 *    scrolling (fires at intervals), debounce would only fire after scrolling stops.
 *  - Trailing call in throttle ensures the last scroll position is always checked.
 *  - Alternative: IntersectionObserver on a sentinel element (avoids manual scroll math).
 *  - Stale closure: scrollToBottom captures current `loading` & `hasMore` at render
 *    time since throttledScroll is memoised with [] deps — this means it uses the
 *    values from the initial render. The guard `!loading` works because setLoading
 *    is async, but for production code prefer a ref for latest values.
 */
import { useState, useEffect, useMemo } from "react";
import "./styles.css";

const URL = "https://dummyjson.com/products";
const limit = 30;

export default function App() {
	// products: accumulates ALL loaded items across pages (append-only)
	const [products, setProducts] = useState([]);
	// page: drives the useEffect fetch — incrementing triggers next batch
	const [page, setPage] = useState(0);
	// loading: prevents duplicate fetches while one is in-flight
	const [loading, setLoading] = useState(false);
	// hasMore: false once products.length >= total from API → stops further fetches
	const [hasMore, setHasMore] = useState(true);

	/**
	 * SCROLL DETECTION — the core of infinite scroll
	 * scrollY: how far user has scrolled from top
	 * innerHeight: visible viewport height
	 * scrollHeight: total document height (visible + hidden)
	 *
	 * scrollY + innerHeight >= scrollHeight means user is at the very bottom.
	 * Subtracting 400 creates a threshold so we fetch BEFORE user hits bottom
	 * (better UX — content loads while user is still scrolling).
	 *
	 * Three guards: !loading (no duplicate), threshold met, hasMore items.
	 */
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

	/**
	 * FETCH EFFECT — runs whenever `page` changes
	 *
	 * Pagination via skip/limit: skip = limit * page (e.g. page 2 → skip 60)
	 * Append pattern: setProducts(prev => [...prev, ...new]) — never replace, always grow
	 *
	 * hasMore check uses `products.length + result.products.length` because
	 * setProducts is async — products hasn't updated yet inside this callback.
	 * API returns `total` field — compare accumulated length against it.
	 *
	 * NOTE: `products.length` here is stale (from the closure). For correctness,
	 * track total loaded in a ref or derive from pages: (page + 1) * limit.
	 */
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
				// Append new batch to existing products — spread keeps immutability
				setProducts((prev) => [...prev, ...result.products]);

				// Check if we've loaded everything the API has
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

	/**
	 * THROTTLE with trailing call — COMMON INTERVIEW QUESTION
	 *
	 * How it works:
	 *  - If enough time has passed (now - lastCall >= delay), fire immediately.
	 *  - Otherwise, schedule a trailing call for the remaining time.
	 *  - clearTimeout on each invocation ensures only ONE trailing call is pending.
	 *
	 * Why trailing matters: if user stops scrolling between intervals, the last
	 * scroll position still gets checked — avoids missing the "near bottom" state.
	 *
	 * Throttle vs Debounce:
	 *  - Throttle: fires at most once per interval (steady stream during scrolling)
	 *  - Debounce: fires once after events stop (waits for calm)
	 *  → Throttle is better for scroll because user needs progressive loading.
	 */
	const throttle = (cb, delay) => {
		let lastCall = 0;
		let timeout;

		return function () {
			const now = Date.now();

			if (now - lastCall >= delay) {
				// Enough time passed → execute immediately
				lastCall = now;
				cb();
			} else {
				// Too soon → schedule trailing call for remaining time
				clearTimeout(timeout);
				timeout = setTimeout(
					() => {
						lastCall = Date.now();
						cb();
					},
					delay - (now - lastCall)
				);
			}
		};
	};

	/**
	 * useMemo with [] deps → creates ONE throttled function for the component's lifetime.
	 * Without useMemo, a new throttled function would be created every render,
	 * resetting lastCall and timeout — defeating the throttle entirely.
	 */
	const throttledScroll = useMemo(() => throttle(scrollToBottom, 300), []);

	// Attach scroll listener once on mount, clean up on unmount.
	// Cleanup prevents memory leaks and stale callbacks after component unmounts.
	useEffect(() => {
		document.addEventListener("scroll", throttledScroll);
		return function () {
			document.removeEventListener("scroll", throttledScroll);
		};
	}, []);

	// Render: products grow over time via append, loading/end states shown conditionally
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
				{/* Show loading indicator while fetch is in-flight */}
				{loading && <p className="loading">Loading more...</p>}
				{/* Show end message once all items are loaded */}
				{!hasMore && <p className="end">No more products to show 🚀</p>}
			</div>
		</div>
	);
}
