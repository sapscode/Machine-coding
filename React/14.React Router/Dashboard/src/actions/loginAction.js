import { redirect } from "react-router-dom";
import { login } from "../auth";

/**
 * LOGIN ACTION — handles <Form method="post"> submission from Login.jsx
 *
 * HOW IT CONNECTS:
 *  1. Login.jsx renders <Form method="post"> (no action prop → posts to current route)
 *  2. Route config in App.jsx: { path: "login", element: <Login />, action: loginAction }
 *  3. When form submits, React Router intercepts and calls THIS function
 *  4. On success → login() sets localStorage, redirect() navigates to dashboard
 *
 * INTERVIEW KEY POINTS:
 *  - `request.formData()` — Web API FormData, same as native forms
 *  - `redirect()` from react-router-dom returns a Response that triggers navigation
 *  - This is the "action" pattern: form mutations happen OUTSIDE components
 *    → no useState for form handling, no onSubmit handler needed
 *  - Returning null means "stay on current page" (validation failed)
 *
 * IMPROVEMENT: Could return { error: "..." } and use useActionData() in Login.jsx
 * to show validation errors inline.
 */
export async function loginAction({ request }) {
	// request.formData() reads the submitted form — matches <input name="..."> values
	const res = await request.formData();
	const username = res.get("username");
	const password = res.get("password");

	if (username && password) {
		login(); // → auth.js: sets localStorage("auth", "true")
		return redirect("/dashboard/overview"); // triggers navigation, not a page reload
	}
	return null; // stay on login page (e.g. empty fields)
}
