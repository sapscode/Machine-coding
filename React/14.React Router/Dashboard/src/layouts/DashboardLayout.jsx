/**
 * DASHBOARD LAYOUT — nested layout with sidebar, visible only at /dashboard/*
 *
 * HOW IT CONNECTS:
 *  1. App.jsx: { path: "dashboard", element: <Suspense><Dashboard /></Suspense>, children: [...] }
 *  2. This is the SECOND level of nesting:
 *     RootLayout (header) → ProtectedRoute (auth gate) → DashboardLayout (sidebar)
 *  3. <Outlet /> here renders the dashboard sub-pages (Overview, Settings, Users, etc.)
 *  4. Lazy loaded → JS chunk only fetched when user first visits /dashboard
 *
 * NESTING VISUAL:
 *  ┌─────────────────────────────────────┐
 *  │  HEADER (RootLayout)               │
 *  ├─────────────────────────┬───────────┤
 *  │  CONTENT               │ SIDEBAR   │
 *  │  (DashboardLayout's    │ Overview  │
 *  │   <Outlet />)          │ Settings  │
 *  │                        │ Reports   │
 *  │  Overview / Users /    │ Users     │
 *  │  Settings renders here │           │
 *  └─────────────────────────┴───────────┘
 *
 * INTERVIEW KEY POINTS:
 *  - NavLink `to="overview"` is RELATIVE (no leading /) → appends to parent path
 *    i.e. resolves to /dashboard/overview automatically
 *  - NavLink auto-applies "active" class → can style with .sidebar-nav-link.active
 *  - This layout only mounts when /dashboard is matched AND auth passes
 *    → sidebar is never visible on /login or /
 */
import { NavLink, Outlet } from "react-router-dom";
import "./DashboardLayout.css";

const DashboardLayout = () => {
	return (
		<div className="dashboard-layout">
			{/* <Outlet /> = where sub-page components render (Overview, Users, etc.) */}
			<main className="dashboard-content">
				<Outlet />
			</main>
			{/* Sidebar: relative NavLinks resolve against /dashboard/ */}
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
