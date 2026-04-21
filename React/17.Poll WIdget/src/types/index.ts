// ─── BASE TYPE ───────────────────────────────────────────────────────────────
// Describes the raw candidate data that lives in data/candidates.ts
// Only static info — what the candidate is, not how they're doing in the poll.
export interface Candidate {
	name: string;
	color: string; // used as the progress bar background color
  icon: string;
}

// ─── DERIVED TYPE ────────────────────────────────────────────────────────────
// Extends Candidate with live poll data.
// This is what lives in React state inside hooks/usePoll.ts.
// PollEntry = Candidate + runtime vote tracking fields.
export interface PollEntry extends Candidate {
	votes: number; // raw vote count for this candidate
	percentage: number; // votes / totalVotes * 100, recomputed on every vote
}
