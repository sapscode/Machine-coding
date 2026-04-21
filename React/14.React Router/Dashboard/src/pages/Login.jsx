/**
 * LOGIN PAGE — uses React Router's <Form> for submission
 *
 * HOW IT CONNECTS:
 *  1. Route config: { path: "login", element: <Login />, action: loginAction }
 *  2. <Form method="post"> submits to the CURRENT route's action (loginAction.js)
 *  3. No onSubmit handler, no useState, no e.preventDefault() needed!
 *     React Router intercepts the form POST and calls loginAction instead.
 *  4. `name` attributes on inputs match what loginAction reads via formData.get()
 *
 * INTERVIEW KEY POINTS:
 *  - React Router <Form> vs native <form>:
 *    • Native <form> causes a full page reload
 *    • Router <Form> intercepts submission, calls the route action, stays in SPA
 *  - No action prop on <Form> = "submit to current route's action"
 *  - Could add useActionData() here to display server-side validation errors
 *    returned from loginAction (e.g. return { error: "Invalid credentials" })
 */
import { Form } from "react-router-dom";
import "./Login.css";

const Login = () => {
	return (
		<div className="login-container">
			{/* method="post" → triggers loginAction in App.jsx route config */}
			<Form className="login-form" method="post">
				<label htmlFor="username">Username:</label>
				{/* name="username" → loginAction reads via formData.get("username") */}
				<input id="username" name="username" />
				<label htmlFor="password">Password:</label>
				<input type="password" id="password" name="password" />
				<button type="submit">Submit</button>
			</Form>
		</div>
	);
};
export default Login;
