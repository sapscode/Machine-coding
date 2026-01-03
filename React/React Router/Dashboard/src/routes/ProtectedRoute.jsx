import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../auth";

const ProtectedRoute = () => {
	if (!isAuthenticated()) {
		return <Navigate to="login" replace />; //Navigate to login
	}
	return <Outlet />; // allow rendering of protected routes
};
export default ProtectedRoute;
