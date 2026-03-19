import { NavLink, Outlet } from "react-router-dom";
import "./DashboardLayout.css";

const DashboardLayout = () => {
	return (
		<div className="dashboard-layout">
			<main className="dashboard-content">
				<Outlet />
			</main>
			<aside className="sidebar">
				<nav className="sidebar-nav">
					<NavLink to="overview" className="sidebar-nav-link">
						Overview
					</NavLink>
					<NavLink to="settings" className="sidebar-nav-link">
						Settings
					</NavLink>
					<NavLink to="reports" className="sidebar-nav-link">
						Reports
					</NavLink>
					<NavLink to="users" className="sidebar-nav-link">
						Users
					</NavLink>
				</nav>
			</aside>
		</div>
	);
};
export default DashboardLayout;
