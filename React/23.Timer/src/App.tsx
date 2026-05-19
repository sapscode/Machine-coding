import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
	// `time` does not store milliseconds directly — it counts centiseconds (1 unit = 10ms).
	// We use centiseconds because updating every 1ms causes 1000 re-renders/sec (too expensive).
	// Updating every 10ms (100 re-renders/sec) gives smooth display without hammering the browser.
	// Unit conversions: 100 centiseconds = 1 second | 6000 centiseconds = 1 minute
	const [time, setTime] = useState<number>(0);
	const [running, setRunning] = useState<boolean>(false);

	// The interval ID is stored in a ref, not state.
	// If it were state, updating it would trigger a re-render — we don't want that.
	// Refs hold a mutable value that persists across renders without causing one.
	// We need this ID later to call clearInterval() when the user hits Stop or Reset.
	const intervelRef = useRef<number>(0);

	const [laps, setLaps] = useState<string[]>([]);

	// This effect runs whenever `running` changes (Start or Stop pressed).
	// When running is true, we kick off a setInterval that increments `time` every 10ms.
	// The cleanup function (return) runs in two situations:
	//   1. Before the effect re-runs (i.e. when `running` flips again) — clears the old interval
	//   2. When the component unmounts — prevents the interval from firing on a dead component
	// Without cleanup, hitting Start twice would create two overlapping intervals.
	useEffect(() => {
		if (running) {
			intervelRef.current = setInterval(() => {
				setTime((prev) => prev + 1);
			}, 10);
		}

		return () => {
			clearInterval(intervelRef.current);
		};
	}, [running]);

	// Converts the raw centisecond count into a human-readable MM:SS:cs string.
	// The trick is to use division to extract each unit, and modulo (%) to strip
	// out the larger unit so you're only left with the remainder.
	//
	// Math breakdown (example: time = 7350 centiseconds):
	//
	//   minutes      → floor(7350 / 6000)      = floor(1.225) = 1
	//                  (one full minute has passed)
	//
	//   seconds      → 7350 % 6000             = 1350  (centiseconds left after removing full minutes)
	//                  floor(1350 / 100)        = 13    (convert leftover centiseconds → seconds)
	//
	//   centiseconds → 7350 % 100              = 50    (leftover after removing full seconds)
	//
	//   final display: "01:13:50"
	//
	// padStart(2, "0") ensures single digits are displayed as "05" not "5"
	const currentTime = (): string => {
		const minutes = Math.floor(time / 6000)
			.toString()
			.padStart(2, "0");

		const seconds = Math.floor((time % 6000) / 100)
			.toString()
			.padStart(2, "0");

		const miliseconds = Math.floor(time % 100)
			.toString()
			.padStart(2, "0");

		return `${minutes}:${seconds}:${miliseconds}`;
	};

	// The guard `isStart !== running` prevents redundant state updates.
	// Without it, clicking Start while already running would call setRunning(true) again,
	// triggering the useEffect, creating a second interval on top of the existing one.
	const handlePlay = (isStart: boolean): void => {
		if (isStart !== running) {
			setRunning(isStart);
		}
	};

	const handleReset = () => {
		setTime(0);
		setRunning(false);
		setLaps([]);
	};

	// Captures the current display time as a formatted string and appends it to the laps list.
	// We compute the lap value before calling setLaps so the updater function
	// doesn't read `time` from a potentially stale closure.
	const addNewLap = () => {
		const newLap = currentTime();
		setLaps((prev) => [...prev, newLap]);
	};

	return (
		<div className="container">
			<div className="timer">
				<span>{currentTime()}</span>
			</div>
			<div className="buttons-container">
				<button className="btn start" onClick={() => handlePlay(true)}>
					Start
				</button>
				<button className="btn stop" onClick={() => handlePlay(false)}>
					Stop
				</button>
				<button className="btn reset" onClick={handleReset}>
					Reset
				</button>
				<button
					className={`btn newLap ${!running ? "btn-disabled" : ""}`}
					disabled={!running}
					onClick={addNewLap}
				>
					Lap
				</button>
			</div>
			<div className="laps">
				{laps.map((lap, i) => {
					return <div className="lap" key={i}>{`Lap - ${i + 1} : ${lap}`}</div>;
				})}
			</div>
		</div>
	);
}

export default App;
