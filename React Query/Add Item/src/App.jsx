import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import "./App.css";

const PRODUCTS_URL = "https://dummyjson.com/products";
const ADD_PRODUCT_URL = "https://dummyjson.com/products/add";

function App() {
	const [newProduct, setNewProduct] = useState("");
	const queryClient = useQueryClient();

	// ---- Fetch products ----
	const { data, isError, error, isLoading } = useQuery({
		queryKey: ["products"],
		queryFn: async () => {
			const res = await fetch(PRODUCTS_URL);
			if (!res.ok) throw new Error("Failed to load products");
			const data = await res.json();
			return data.products;
		},
		staleTime: 50_000
	});

	// ---- Add product mutation ----
	const { mutate: addProduct, isPending } = useMutation({
		mutationFn: async (product) => {
			const res = await fetch(ADD_PRODUCT_URL, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(product)
			});
			if (!res.ok) throw new Error("Failed to add product");
			return res.json();
		},
		onSuccess: (createdProduct) => {
			// queryClient.invalidateQueries({ queryKey: ["products"] }); // invalidating the queries, will cause refetch, page will reload with fresh data
			queryClient.setQueryData(["products"], (oldProducts) => [
				...oldProducts,
				createdProduct
			]);
			setNewProduct("");
		}
	});

	if (isLoading) return <h1>Loading...</h1>;
	if (isError) return <h1>{error.message}</h1>;

	const handleAdd = () => {
		if (!newProduct.trim()) return;
		addProduct({ title: newProduct });
	};

	return (
		<div>
			<input
				type="text"
				placeholder="enter product name"
				value={newProduct}
				onChange={(e) => setNewProduct(e.target.value)}
			/>
			<button onClick={handleAdd} disabled={isPending}>
				{isPending ? "Adding..." : "Submit"}
			</button>

			{data.map((product) => (
				<div key={product.id}>{product.title}</div>
			))}
		</div>
	);
}

export default App;
