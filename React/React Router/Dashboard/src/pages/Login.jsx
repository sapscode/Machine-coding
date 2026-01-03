import { Form } from "react-router-dom";
import "./Login.css";

const Login = () => {
	return (
		<div className="login-container">
			<Form className="login-form" method="post">
				<label htmlFor="username">Username:</label>
				<input id="username" name="username" />
				<label htmlFor="password">Password:</label>
				<input type="password" id="password" name="password" />
				<button type="submit">Submit</button>
			</Form>
		</div>
	);
};
export default Login;
