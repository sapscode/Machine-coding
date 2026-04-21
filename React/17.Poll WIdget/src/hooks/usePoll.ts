import { useState } from "react";
import candidates from "../data/candidates";
import { PollEntry } from "../types";

// ─── CUSTOM HOOK ─────────────────────────────────────────────────────────────
// Owns ALL poll state and logic. App.tsx is kept logic-free by consuming this.
// Pattern: extract stateful logic into a hook → easy to test, reuse, and read.
export function usePoll() {
	// Initialize state from static candidates data.
	// Lazy initializer (() => ...) means this runs only once on mount, not every render.
	// Spreads Candidate fields (name, color) and adds runtime fields (votes, percentage).
	const [pollState, setPollState] = useState<PollEntry[]>(() =>
		candidates.map((candidate) => ({
			...candidate,
			votes: 0,
			percentage: 0
		}))
	);

	// Derived value — not state. Recomputed on every render from pollState.
	// O(candidates) not O(votes), so always cheap regardless of vote count.
	const totalVotes = pollState.reduce((acc, curr) => acc + curr.votes, 0);

	const handleVote = (name: string) => {
		// Capture the new total BEFORE setState runs (state is still stale here).
		// Starting reduce with 1 accounts for the vote being cast right now. (Same thing as starting with 0, and finally adding 1 to count the current vote)
		// This gives us the correct denominator for percentage calculation.
		const newTotal = pollState.reduce((acc, curr) => acc + curr.votes, 1);

		// Functional updater form: prev => ... ensures we work off the latest state,
		// avoiding stale closure issues if multiple updates queue up.
		setPollState((prev) =>
			prev.map((entry) => {
				const newVote = entry.name === name ? entry.votes + 1 : entry.votes;
				return {
					...entry, // preserve name, color, and any other fields
					votes: newVote,
					percentage: (newVote / newTotal) * 100
				};
			})
		);
	};

	// Expose only what consumers need — keeps the hook's internal details private.
	return { pollState, totalVotes, handleVote };
}
