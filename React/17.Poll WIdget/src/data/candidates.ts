import { Candidate } from "../types";

// ─── STATIC DATA ─────────────────────────────────────────────────────────────
// Lives outside the component tree — defined once, never changes at runtime.
// Typed as Candidate[] to enforce the shape from types/index.ts.
// To add/remove candidates, only this file needs to change.
// usePoll.ts reads this to initialize React state.
const candidates: Candidate[] = [
	{ name: "Modi", color: "orange", icon: "🪷" },
	{ name: "Owesi", color: "green", icon: "🪁" },
	{ name: "Rahul", color: "greenyellow", icon: "✋🏼" },
	{ name: "Kejriwal", color: "yellow", icon: "🧹" }
];

export default candidates;
