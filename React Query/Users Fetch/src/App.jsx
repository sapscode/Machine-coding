import "./App.css";
import { useQuery } from "@tanstack/react-query";

const url = "https://dummyjson.com/products";
function App() {
	const { data, error, isError, isLoading } = useQuery({
		queryKey: ["products"],
		queryFn: async () => {
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error("Failed to fetch products");
			}
			const result = await response.json();
			return result.products; // Return only the required data (products array)
		},
		staleTime: 5 * 60 * 1000 // Data stays fresh for 5 minutes; no refetch during this time
	});

	if (isLoading) return <h1>Loading ...</h1>;
	if (isError) return <h1>{error.message}</h1>;

	return (
		<>
			<div>
				{data.map((product) => {
					return <h2 key={product.id}>{product.title}</h2>;
				})}
			</div>
		</>
	);
}

export default App;
