import { redirect } from "react-router-dom";
import { login } from "../auth";

export async function loginAction({ request }) {
	const res = await request.formData();
	const username = res.get("username");
	const password = res.get("password");

	if (username && password) {
		login(); // saving in cache
		return redirect("/dashboard/overview"); // after login redirect to this page
	}
	return null;
}
