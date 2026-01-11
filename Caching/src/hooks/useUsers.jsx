// hooks/useUsers.js

import { useEffect, useState } from "react";
import { getUsers } from "../api/usersApi";

/*
  =====================================================
  useUsers HOOK
  =====================================================

  🔹 Q1: Prevent refetch on every render (useEffect [])
  🔹 Q7: Loading / error / success states
  🔹 Q8: Avoid loader flicker when cache exists
  🔹 Q9: Conditional fetching
*/
export function useUsers(enabled = true) {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (!enabled) return; // 🔹 Q9

		let mounted = true;

		getUsers()
			.then((data) => {
				if (mounted) setUsers(data);
			})
			.catch((err) => {
				if (mounted) setError(err);
			})
			.finally(() => {
				if (mounted) setLoading(false);
			});

		return () => {
			mounted = false;
		};
	}, [enabled]);

	return { users, loading, error };
}
