import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../auth";

/**
 * PROTECTED ROUTE — the auth gate for /dashboard/*
 *
 * HOW IT CONNECTS:
 *  1. App.jsx: used as a PATHLESS layout route wrapping the dashboard children
 *     { element: <ProtectedRoute />, children: [{ path: "dashboard", ... }] }
 *  2. No `path` = "layout route" — doesn't add a URL segment
 *  3. Calls isAuthenticated() from auth.js at render time
 *  4. If false → <Navigate to="login" replace /> redirects before children render
 *  5. If true → <Outlet /> renders the matched child (DashboardLayout)
 *
 * INTERVIEW KEY POINTS:
 *  - <Navigate> is a component that triggers navigation during render
 *    (equivalent to useNavigate() inside useEffect, but declarative)
 *  - `replace` prevents the protected URL from entering history
 *    → user can't press back to reach the protected page again
 *  - <Outlet /> here acts as a "pass-through" — it renders whatever child
 *    route matched inside this layout route's children array
 *  - This pattern is reusable: wrap ANY group of routes with a ProtectedRoute
 *
 * IMPROVEMENT: Preserve redirect intent with:
 *    <Navigate to="login" state={{ from: location }} replace />
 *    Then in loginAction, read location.state.from and redirect there.
 */
const ProtectedRoute = () => {
	if (!isAuthenticated()) {
		return <Navigate to="login" replace />;
	}
	return <Outlet />;
};
export default ProtectedRoute;
