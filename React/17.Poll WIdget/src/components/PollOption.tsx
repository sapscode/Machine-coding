import { PollEntry } from "../types";

// ─── PROPS ───────────────────────────────────────────────────────────────────
// Extends PollEntry (name, color, votes, percentage) from types/index.ts
// and adds onVote — the callback passed down from App.tsx → usePoll.handleVote.
// This is a purely presentational component: no state, no side effects.
interface PollOptionProps extends PollEntry {
	onVote: (name: string) => void;
}

// ─── COMPONENT ───────────────────────────────────────────────────────────────
// Renders a single poll row: [Button] [========== Progress Bar ========]
// Width of the bar is driven by `percentage` prop — CSS transition in
// styles.css makes it animate smoothly on every update.
export default function PollOption({
	name,
	color,
	icon,
	votes,
	percentage,
	onVote
}: PollOptionProps) {
	return (
		<div className="vote">
			{/* Clicking calls onVote with this candidate's name */}
			<button className="btn" onClick={() => onVote(name)}>
				{name}
			</button>
			{/* Width is a % of the container, background matches candidate color */}
			<div
				className="poll"
				style={{ width: `${percentage}%`, background: color }}
			>
				({percentage.toFixed(1)}%)
			</div>

			<div>{icon}</div>
		</div>
	);
}
