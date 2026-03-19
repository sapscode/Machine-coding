import { useRouteError, Link, isRouteErrorResponse } from "react-router-dom";

const ErrorPage = () => {
	const error = useRouteError();

	let title = "Something went wrong";
	let message = "An unexpected error occurred.";
	let actions = [];

	// Route errors (Response)
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
	// JS errors
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
