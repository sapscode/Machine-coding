import { redirect } from "react-router-dom";
import { logout } from "../auth";

/**
 * LOGOUT ACTION — handles <Form method="post" action="/logout"> from RootLayout header
 *
 * HOW IT CONNECTS:
 *  1. RootLayout.jsx: <Form method="post" action="/logout"><button>Logout</button></Form>
 *  2. Route config in App.jsx: { path: "logout", action: logoutAction } (no element!)
 *  3. Form POST triggers this action → clears auth → redirects to login
 *
 * INTERVIEW KEY POINT:
 *  - This route has NO element — it's an "action-only" route.
 *    It only exists to handle the POST. After the action returns redirect(),
 *    the router navigates to /login.
 *  - Why <Form method="post"> instead of a <Link> or navigate()?
 *    → Mutations should be POST (REST semantics). Logout changes server state.
 *    → Using Form ensures the router's action pipeline runs (revalidation etc.)
 */
export async function logoutAction() {
	logout(); // → auth.js: removes "auth" from localStorage
	return redirect("/login");
}
