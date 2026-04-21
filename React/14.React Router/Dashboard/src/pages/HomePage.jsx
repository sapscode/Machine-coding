// HOME PAGE — renders inside RootLayout's <Outlet /> when URL is exactly "/"
// This is the index route: { index: true, element: <HomePage /> } in App.jsx
const HomePage = () => {
	return (
		<section>
			<h1>Welcome to the App</h1>
			<p>This is the home page.</p>
		</section>
	);
};
export default HomePage;
