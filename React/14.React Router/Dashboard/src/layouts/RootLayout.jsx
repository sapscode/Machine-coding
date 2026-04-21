/**
 * ROOT LAYOUT — the outermost shell, visible on EVERY page
 *
 * HOW IT CONNECTS:
 *  1. App.jsx: { path: "/", element: <RootLayout />, children: [...] }
 *  2. Every route is a child of this layout → <Outlet /> renders the matched child
 *  3. Header is OUTSIDE <Outlet />, so it's always visible (login, home, dashboard)
 *
 * LAYOUT ROUTE PATTERN:
 *  RootLayout  = header + <Outlet />       ← always visible
 *  DashboardLayout = sidebar + <Outlet />  ← visible only under /dashboard/*
 *  This nesting is what makes "persistent UI" work without re-rendering headers.
 *
 * INTERVIEW KEY POINTS:
 *  - <Link> for simple navigation (no styling based on active route)
 *  - <NavLink> automatically gets an "active" class when route matches
 *    → use className callback: className={({isActive}) => isActive ? "active" : ""}
 *  - <Form method="post" action="/logout"> triggers the logout ACTION route
 *    → It's a POST, not a GET navigation. Router calls logoutAction, not a page render.
 *  - <Outlet /> is the "slot" where child route elements render
 *    → Think of it as {children} but for routes instead of components
 */
import { Form, Link, NavLink, Outlet } from "react-router-dom";
import reactLogo from "../assets/react.svg";
import "./Rootlayout.css";
import { isAuthenticated } from "../auth";

const RootLayout = () => {
	return (
		<>
			{/* Header: always visible regardless of which child route is active */}
			<header className="header">
				<nav className="navbar">
					<div className="logo-section">
						{/* Link: simple navigation, no active state tracking */}
						<Link to="/" className="logo">
							<img src={reactLogo} />
						</Link>
						<p>Saps Router</p>
					</div>
					<div className="nav-links">
						{/* NavLink: adds "active" class automatically when at /dashboard */}
						<NavLink to="dashboard" className="nav-link">
							Dashboard
						</NavLink>
						{isAuthenticated() ? (
							// Logout = <Form POST> targeting the action-only "/logout" route
							// NOT a <Link> because logout is a mutation, not a navigation
							<Form method="post" action="/logout">
								<button>Logout</button>
							</Form>
						) : (
							<NavLink to="login" className="nav-link">
								Login
							</NavLink>
						)}
					</div>
				</nav>
			</header>
			{/* <Outlet /> = where child routes render (HomePage, Login, DashboardLayout) */}
			<main>
				<Outlet />
			</main>
		</>
	);
};
export default RootLayout;
