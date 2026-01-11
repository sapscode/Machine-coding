// api/usersApi.js

const USERS_URL = "https://dummyjson.com/users";

/*
  =====================================================
  SHARED IN-MEMORY CACHE (MODULE SCOPE)
  =====================================================

  🔹 Q3: Cache API response in memory
  🔹 Q2: Prevent duplicate API calls (via usersPromise)
*/

let usersCache = null; // cached GET response
let usersPromise = null; // in-flight request
let lastFetchedAt = 0;

const STALE_TIME = 5000; // 5 seconds

/*
  =====================================================
  GET USERS (Stale-While-Revalidate)
  =====================================================

  🔹 Q1: Fetch data without refetching on re-render
  🔹 Q2: Deduplicate requests
  🔹 Q3: Use in-memory cache
  🔹 Q5: Stale-while-revalidate
*/
export async function getUsers() {
	const now = Date.now();

	// ✅ Serve cached data immediately
	if (usersCache) {
		// 🔹 Q5: Background revalidation if stale
		if (now - lastFetchedAt > STALE_TIME) {
			revalidateUsers();
		}
		return usersCache;
	}

	// 🔹 Q2: Prevent duplicate API calls
	if (!usersPromise) {
		usersPromise = fetch(USERS_URL)
			.then((res) => res.json())
			.then((data) => {
				usersCache = data.users;
				lastFetchedAt = Date.now();
				return usersCache;
			})
			.finally(() => {
				usersPromise = null;
			});
	}

	return usersPromise;
}

/*
  =====================================================
  BACKGROUND REVALIDATION
  =====================================================

  🔹 Q5: Stale-while-revalidate
*/
async function revalidateUsers() {
	if (usersPromise) return;

	usersPromise = fetch(USERS_URL)
		.then((res) => res.json())
		.then((data) => {
			usersCache = data.users;
			lastFetchedAt = Date.now();
		})
		.finally(() => {
			usersPromise = null;
		});
}

/*
  =====================================================
  PREFETCH USERS
  =====================================================

  🔹 Q6: Prefetch data
*/
export function prefetchUsers() {
	if (usersCache || usersPromise) return;

	usersPromise = fetch(USERS_URL)
		.then((res) => res.json())
		.then((data) => {
			usersCache = data.users;
			lastFetchedAt = Date.now();
			return usersCache;
		})
		.finally(() => {
			usersPromise = null;
		});
}

/*
  =====================================================
  POST USER (MUTATION)
  =====================================================

  🔹 Q4: Invalidate cached data after POST
*/
export async function createUser(newUser) {
	const res = await fetch(USERS_URL, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(newUser)
	});

	const createdUser = await res.json();

	// 🔥 Q4: Cache invalidation
	usersCache = null;
	lastFetchedAt = 0;

	return createdUser;
}

/*
  =====================================================
  🔹 Q10: React Query Concept Mapping
  =====================================================

  usersCache     → query cache
  usersPromise   → request deduplication
  STALE_TIME     → staleTime
  revalidateUsers → background refetch
  createUser     → invalidateQueries
*/
