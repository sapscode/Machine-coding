// OVERVIEW PAGE — renders inside DashboardLayout's <Outlet /> at /dashboard/overview
// Also the redirect target: /dashboard (index) → Navigate to "overview"
// Lazy loaded via React.lazy() in App.jsx
const Overview = () => {
	return (
		<main className="dashboard-content">
			<h1>Dashboard</h1>
		</main>
	);
};
export default Overview;
