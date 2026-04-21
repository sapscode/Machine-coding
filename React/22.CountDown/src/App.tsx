import { useEffect, useRef, useState } from "react";
import "./styles.css";
import useCountDown from "./hooks/useCountDown";
import TimeInput from "./components/TimeInput";

export default function App() {
	const { timer, isRunning, snapShots, ...handlers } = useCountDown();

	return (
		<div className="App">
			<h1>Coundtown Timer</h1>
			<div className="time">
				<TimeInput
					field="hour"
					value={timer.hour}
					isRunning={isRunning}
					onChange={handlers.handleValChange}
					onFocus={handlers.handleFocus}
				/>
				:
				<TimeInput
					field="minute"
					value={timer.minute}
					isRunning={isRunning}
					onChange={handlers.handleValChange}
					onFocus={handlers.handleFocus}
				/>
				:
				<TimeInput
					field="second"
					value={timer.second}
					isRunning={isRunning}
					onChange={handlers.handleValChange}
					onFocus={handlers.handleFocus}
				/>
			</div>
			<div className="buttons">
				<button
					className="btn start-btn"
					onClick={() => setIsRunning((prev) => !prev)}
				>
					{isRunning ? "Stop" : "Start"}
				</button>
				<button className="btn reset-btn" onClick={resetTimer}>
					Reset
				</button>
			</div>
			<div className="snpashots">
				{snapShots.map((snapshot, idx) => {
					return (
						<div className="snapshot" key={idx}>
							{snapshot}
						</div>
					);
				})}
			</div>
		</div>
	);
}
