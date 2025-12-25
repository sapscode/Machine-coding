import { useEffect, useState } from "react";

const useDebounce = ({ value, delay }) => {
	const [debouncedText, setDebouncedText] = useState("");
  
	useEffect(() => {
		let timeout = setTimeout(() => {
			setDebouncedText(value);
		}, delay);

		return function () {
			clearTimeout(timeout);
		};
	}, [value]);

	return debouncedText;
};
export default useDebounce;
