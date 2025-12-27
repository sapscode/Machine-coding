import { useEffect, useState } from "react";

const useDebounce = (value, delay = 300) => {
	// Holds the debounced value
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		// Schedule update after delay
		const timer = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		// Cleanup:
		// - Runs before next effect
		// - Cancels previous timeout
		return () => clearTimeout(timer);
	}, [value, delay]);

	return debouncedValue;
};

export default useDebounce;
