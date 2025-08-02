// components
import Navbar from "./Navbar";
import CartContainer from "./CartContainer";
import { useAppContext } from "./AppContext";

function App() {
	const { loading } = useAppContext();
	if (loading) {
		return (
			<main>
				<div className="loading" style={{ marginTop: "6rem" }}></div>
			</main>
		);
	}
	return (
		<main>
			<Navbar />
			<CartContainer />
		</main>
	);
}

export default App;
