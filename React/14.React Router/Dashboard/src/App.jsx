import "./App.css";
import {
	createBrowserRouter,
	Navigate,
	RouterProvider
} from "react-router-dom";

import { lazy, Suspense } from "react";
import RootLayout from "./layouts/RootLayout";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";

import ProtectedRoute from "./routes/ProtectedRoute";

const Dashboard = lazy(() => import("./layouts/DashboardLayout"));
const Overview = lazy(() => import("./pages/Overview"));
const Settings = lazy(() => import("./pages/Settings"));
const Reports = lazy(() => import("./pages/Reports"));
const Users = lazy(() => import("./pages/Users"));
const User = lazy(() => import("./pages/User"));

import { logoutAction } from "./actions/logoutAction";
import { loginAction } from "./actions/loginAction";

import { usersLoader } from "./loaders/usersLoader";
import { userLoader } from "./loaders/userLoader";

import ErrorPage from "./pages/UserError";

const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		children: [
			{
				index: true,
				element: <HomePage />
			},
			{
				path: "login",
				element: <Login />,
				action: loginAction
			},
			{
				path: "logout",
				action: logoutAction
			},
			{
				element: <ProtectedRoute />,
				children: [
					{
						path: "dashboard",
						element: (
							<Suspense fallback={<p>Loading Dashboard...</p>}>
								<Dashboard />
							</Suspense>
						),
						children: [
							{
								index: true,
								element: <Navigate to="overview" replace />
							},
							{
								path: "overview",
								element: <Overview />
							},
							{
								path: "settings",
								element: <Settings />
							},
							{
								path: "reports",
								element: <Reports />
							},
							{
								path: "users",
								loader: usersLoader,
								element: <Users />,
								errorElement: <ErrorPage />
							},
							{
								path: "users/:id",
								loader: userLoader,
								element: <User />,
								errorElement: <ErrorPage />
							}
						]
					}
				]
			}
		]
	}
]);
function App() {
	return <RouterProvider router={router}></RouterProvider>;
}

export default App;
