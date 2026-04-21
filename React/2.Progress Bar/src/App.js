import ProgressBar from "./ProgressBar";
import "./styles.css";

export default function App() {
	const values = [10, 90, 50, 42]; // Different progress values to render multiple bars
	return (
		<div className="App">
			<h1>Progress Bar</h1>
			<div>
				{/*
        Render a ProgressBar for each value
        */}
				{values.map((value, i) => {
					return <ProgressBar progress={value} key={i} />;
				})}
			</div>
		</div>
	);
}
