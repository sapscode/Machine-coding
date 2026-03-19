export async function usersLoader() {
	const res = await fetch("https://dummyjson.com/users");

	if (!res.ok) {
		throw new Response("Failed to fetch users", { status: 500 });
	}

	return res.json();
}
