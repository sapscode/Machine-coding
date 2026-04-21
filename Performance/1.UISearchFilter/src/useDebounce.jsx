import { useEffect, useState } from "react";

/**
 * useDebounce — delays updating a value until the input stops changing.
 *
 * PERF CONCEPT: Debouncing
 *   - Problem: some work (e.g. filtering, API calls) is expensive to run on every
 *     keystroke. Debouncing ensures it runs only after the user pauses.
 *   - Mechanism: each time `value` changes, a new setTimeout is scheduled. The
 *     cleanup function (returned from useEffect) cancels the PREVIOUS timer before
 *     the new one starts. Only the final timer (after the user stops typing) fires.
 *
 * Timeline example for input "jo" typed quickly:
 *   t=0ms   value="j"  → timer A scheduled for t=300ms
 *   t=80ms  value="jo" → timer A CANCELLED, timer B scheduled for t=380ms
 *   t=380ms             → debouncedValue updates to "jo" (filter runs once)
 *
 * TRADEOFF vs Throttling:
 *   - Debounce: fires ONCE after inactivity. Best for search filters.
 *   - Throttle: fires at most once per interval regardless of pausing.
 *     Better for scroll/resize handlers where you want periodic updates.
 */
const useDebounce = (value, delay = 300) => {
	// Mirrors `value` but updates only after `delay` ms of inactivity.
	// Initialized to `value` so the first render has a valid debouncedValue.
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		// Schedule the update. This will only commit if the component doesn't
		// re-render (i.e. `value` doesn't change again) within `delay` ms.
		const timer = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		// Cleanup — runs before the NEXT effect execution (i.e. before the next
		// keystroke triggers this effect again). Cancels the pending timer so
		// it never fires. This is the core mechanism that makes debouncing work.
		return () => clearTimeout(timer);
	}, [value, delay]); // Re-runs whenever the raw value or delay changes

	return debouncedValue;
};

export default useDebounce;
