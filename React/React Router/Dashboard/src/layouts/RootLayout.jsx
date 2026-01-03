import { Form, Link, NavLink, Outlet } from "react-router-dom";
import reactLogo from "../assets/react.svg";
import "./Rootlayout.css";
import { isAuthenticated } from "../auth";

const RootLayout = () => {
	return (
		<>
			<header className="header">
				<nav className="navbar">
					<div className="logo-section">
						<Link to="/" className="logo">
							<img src={reactLogo} />
						</Link>
						<p>Saps Router</p>
					</div>
					<div className="nav-links">
						<NavLink to="dashboard" className="nav-link">
							Dashboard
						</NavLink>
						{isAuthenticated() ? (
							// Logout is POST, not navigation, as we do action, i.e remove auth from cache
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
			<main>
				<Outlet />
			</main>
		</>
	);
};
export default RootLayout;
