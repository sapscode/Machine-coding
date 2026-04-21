import { useEffect } from "react";

// Interview pattern: Custom React hook for click-outside detection
// Follows React hook naming convention: useClickOutside
// Hook encapsulates side effect logic and can be reused across components
export default function useClickOutside(elementRef, handler) {
	useEffect(() => {
		// Interview pattern: Early return for invalid refs (defensive programming)
		if (!elementRef?.current) return;

		// Interview pattern: Event delegation - listen at document level
		// Check if click is outside the element to trigger handler
		const cb = (e) => {
			// Interview key concept: Element.contains() checks if element is in click path
			// If element does NOT contain the target, user clicked outside
			if (!elementRef.current.contains(e.target)) {
				handler();
			}
		};

		// Interview pattern: Using mousedown instead of click
		// Why? mousedown fires BEFORE React re-renders, avoids race condition
		// With click: Button opens modal → React re-renders → listener attaches → same click bubbles and closes modal
		// With mousedown: Fires earlier in event cycle, doesn't interfere with modal opening/closing separately
		document.addEventListener("mousedown", cb);

		// Interview pattern: Cleanup function prevents memory leaks
		// Remove event listener when component unmounts or dependencies change
		return () => {
			document.removeEventListener("mousedown", cb);
		};
	}, [elementRef, handler]);
}
