 import type { Timer } from "../types";

type Props = {
	field: keyof Timer;
	value: string;
	isRunning: boolean;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
};

const placeholders: Record<keyof Timer, string> = {
	hour: "HH",
	minute: "MM",
	second: "SS",
};

export default function TimeInput({ field, value, isRunning, onChange, onFocus }: Props) {
	return (
		<input
			disabled={isRunning}
			type="text"
			onChange={onChange}
			onFocus={onFocus}
			name={field}
			value={value.padStart(2, "0")}
			className={`time-box ${field}`}
			placeholder={placeholders[field]}
		/>
	);
}
