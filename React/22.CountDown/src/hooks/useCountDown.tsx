import { useEffect, useRef, useState } from "react";
import { limits, type Timer } from "../types";

function useCountDown() {
	const [isRunning, setIsRunning] = useState<boolean>(false);
	const [timer, setTimer] = useState<Timer>({
		hour: "0",
		minute: "0",
		second: "0"
	});
	const [snapShots, setSnapshots] = useState<string[]>([]);
	const intervalRef = useRef<number | undefined>(undefined);

	const handleValChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = e.target;
		const field = name as keyof Timer;

		// Allow clearing the field while editing
		if (value === "") {
			setTimer((prev) => ({ ...prev, [field]: "" }));
			return;
		}

		// Reject anything that isn't digits
		if (isNaN(Number(value))) return;

		// Clamp between 0 and the field's max
		const clamped = Math.min(Math.max(0, Number(value)), limits[field]);
		setTimer((prev) => ({ ...prev, [field]: String(clamped) }));
	};

	const handleBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
		const field = e.target.name as keyof Timer;
		// Default empty field to "0" when the user leaves it
		if (e.target.value === "") {
			setTimer((prev) => ({ ...prev, [field]: "0" }));
		}
	};

	const handleFocus = (e: React.FocusEvent<HTMLInputElement>): void => {
		e.target.select();
	};

	const checkIfZero = (): boolean => {
		return Object.values(timer).every((val) => val === "" || val === "0");
	};

	const resetTimer = (): void => {
		if (checkIfZero()) return;

		const currTime = `${timer.hour}h ${timer.minute}m ${timer.second}s`;
		setSnapshots((prev) => {
			let arr = [...prev];
			if (arr.length === 5) {
				arr.shift();
			}
			arr.push(currTime);
			return arr;
		});
		setTimer({ hour: "0", minute: "0", second: "0" });
	};

	useEffect(() => {
		if (checkIfZero()) return;

		if (isRunning) {
			intervalRef.current = window.setInterval(() => {
				setTimer((prev) => {
					let hour = Number(prev.hour);
					let minute = Number(prev.minute);
					let second = Number(prev.second);
					second--;
					if (second < 0) {
						second = 59;
						minute--;
						if (minute < 0) {
							minute = 59;
							hour--;
							if (hour < 0) {
								clearInterval(intervalRef.current);
								setIsRunning(false);
								return { hour: "0", minute: "0", second: "0" };
							}
						}
					}

					return {
						hour: String(hour),
						minute: String(minute),
						second: String(second)
					};
				});
			}, 1000);
		}

		return () => clearInterval(intervalRef.current);
	}, [isRunning]);
	return {
		timer,
		isRunning,
		snapShots,
		handleValChange,
		handleBlur,
		handleFocus,
		resetTimer,
		setIsRunning
	};
}
export default useCountDown;
