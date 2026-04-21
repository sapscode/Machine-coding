/**
 * ERROR PAGE — catches errors thrown from route loaders or components
 *
 * HOW IT CONNECTS:
 *  1. App.jsx: { path: "users", errorElement: <ErrorPage /> }
 *  2. When usersLoader or userLoader throws, THIS renders instead of the page
 *  3. useRouteError() captures the thrown error object
 *
 * INTERVIEW KEY POINTS:
 *  - errorElement is React Router's route-level error boundary
 *    (works like React's <ErrorBoundary> but scoped to a specific route)
 *  - isRouteErrorResponse(error) checks if the error is a Response object
 *    → true when loader does: throw new Response("msg", { status: 404 })
 *    → false when it's a regular JS Error (e.g. network failure)
 *  - This distinction lets us show DIFFERENT UI:
 *    • 404 → "Not Found" + Go Home link
 *    • 401/403 → "Unauthorized" + Login link
 *    • 500 → "Server Error" + Retry button
 *    • JS Error → Generic message + Retry
 *  - Errors bubble UP the route tree until they hit an errorElement
 *    If no errorElement on the route, parent's errorElement catches it
 */
import { useRouteError, Link, isRouteErrorResponse } from "react-router-dom";

const ErrorPage = () => {
	// useRouteError() = the error thrown by the loader or component
	const error = useRouteError();

	let title = "Something went wrong";
	let message = "An unexpected error occurred.";
	let actions = [];

	// ROUTE ERRORS: thrown as new Response() in loaders → has .status
	if (isRouteErrorResponse(error)) {
		if (error.status === 404) {
			title = "Not Found";
			message = "The requested resource does not exist.";
			actions.push(<Link to="/">Go Home</Link>);
		}

		if (error.status === 401 || error.status === 403) {
			title = "Unauthorized";
			message = "You don’t have permission to access this page.";
			actions.push(<Link to="/login">Login</Link>);
		}

		if (error.status >= 500) {
			title = "Server Error";
			message = "We’re having trouble on our side.";
			actions.push(
				<button onClick={() => window.location.reload()}>Retry</button>
			);
		}
	}
	// JS ERRORS: regular Error objects (network failures, bugs)
	else if (error instanceof Error) {
		message = error.message || message;
		actions.push(
			<button onClick={() => window.location.reload()}>Retry</button>
		);
	}

	return (
		<div className="error-container">
			<h1>{title}</h1>
			<p>{message}</p>

			<div className="error-actions">
				{actions.map((action, i) => (
					<span key={i}>{action}</span>
				))}
			</div>
		</div>
	);
};

export default ErrorPage;
