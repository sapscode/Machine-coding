import { redirect } from "react-router-dom";
import { logout } from "../auth";

export async function logoutAction() {
	logout();
	return redirect("/login"); // when logout is clicked, redirect to login page
}
