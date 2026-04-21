import "./styles.css";
import PollOption from "./components/PollOption";
import { usePoll } from "./hooks/usePoll";

// ─── ROOT COMPONENT ──────────────────────────────────────────────────────────
// Intentionally logic-free. All state and business logic lives in usePoll.
// App's only job: call the hook, pass data down to PollOption.
//
// Data flow:
//   data/candidates.ts  →  hooks/usePoll.ts  →  App.tsx  →  PollOption.tsx
//   (static config)         (state + logic)     (layout)     (single row UI)
export default function App() {
	// Destructure everything we need from the hook.
	// handleVote is passed as onVote prop to each PollOption.
	const { pollState, totalVotes, handleVote } = usePoll();

	return (
		<div className="App">
			<div className="buttons">
				<div className="header">
					<p>Poll Widget</p>
					{/* totalVotes is derived in the hook, not stored as separate state */}
					<p className="total-votes">Total votes: {totalVotes}</p>
				</div>
				{/* key={entry.name} — stable unique key, avoids index-as-key anti-pattern */}
				{/* {...entry} spreads name, color, votes, percentage as individual props */}
				{pollState.map((entry) => (
					<PollOption key={entry.name} {...entry} onVote={handleVote} />
				))}
			</div>
		</div>
	);
}
