export async function userLoader({ params }) {
	const { id } = params;

	const res = await fetch(`https://dummyjson.com/users/${id}`);
	if (!res.ok) {
		throw new Response("User not found", { status: 404 });
	}
  
	const user = await res.json();
	return user;
}
