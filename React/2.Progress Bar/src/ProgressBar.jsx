import { useEffect, useState } from "react";

const ProgressBar = ({ progress }) => {
	// Separate state for animation: delays width update by 100ms
	// This allows CSS transition to animate smoothly instead of jumping instantly
	// If we used `progress` directly, no animation would occur
	const [animatedLoad, setAnimatedLoad] = useState(0);

	useEffect(() => {
		// 100ms delay ensures CSS transition fires as the width property changes
		// Without the delay, DOM batch updates prevent the transition from triggering
		const timer = setTimeout(() => setAnimatedLoad(progress), 100);

		// Cleanup: prevent state update if component unmounts/progress changes
		// Prevents memory leaks and unnecessary renders
		return () => clearTimeout(timer);
	}, [progress]); // Re-run whenever progress prop changes

	return (
		<div className="progressBar">
			<div className="progress" style={{ width: `${animatedLoad}%` }}>
				{/* Display current progress percentage */}
				{`${progress}%`}
			</div>
		</div>
	);
};

export default ProgressBar;
