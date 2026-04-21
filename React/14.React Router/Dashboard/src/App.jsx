/**
 * REACT ROUTER v6 DASHBOARD — Interview Revision Notes
 *
 * THIS IS THE CENTRAL FILE — the entire route tree lives here.
 * Every other file connects back to this configuration.
 *
 * KEY CONCEPTS DEMONSTRATED:
 *  1. createBrowserRouter — data router (modern v6 pattern, enables loaders/actions)
 *  2. Nested routes & layout routes — <Outlet /> renders child route's element
 *  3. Protected routes — pathless layout route that acts as a guard
 *  4. Lazy loading — React.lazy + Suspense for route-level code splitting
 *  5. Route loaders — fetch data BEFORE component renders (no useEffect needed)
 *  6. Route actions — handle form submissions (login/logout) without useState
 *  7. errorElement — route-level error boundaries
 *  8. Index routes — default child when parent path matches exactly
 *
 * ROUTE TREE VISUAL:
 *  /                     → RootLayout (header + Outlet)     ← always visible
 *  ├── (index)           → HomePage
 *  ├── login             → Login          + loginAction     ← Form POST triggers action
 *  ├── logout            → (no element)   + logoutAction    ← action-only route
 *  └── [ProtectedRoute]  → guard (no path — layout route)   ← checks auth, renders Outlet or redirects
 *      └── dashboard     → DashboardLayout (sidebar + Outlet) ← lazy loaded
 *          ├── (index)   → Navigate → overview              ← redirect default
 *          ├── overview  → Overview
 *          ├── settings  → Settings
 *          ├── reports   → Reports
 *          ├── users     → Users    + usersLoader           ← data fetched by router
 *          └── users/:id → User     + userLoader            ← dynamic param route
 *
 * INTERVIEW TALKING POINTS:
 *  - Why createBrowserRouter over <BrowserRouter>?
 *    → Enables data APIs: loaders, actions, errorElement. The old <BrowserRouter>
 *      doesn't support these — you'd need useEffect + useState instead.
 *  - Why is ProtectedRoute a pathless route (no `path` key)?
 *    → It's a "layout route" — doesn't add a URL segment, just wraps children.
 *      If auth fails, it renders <Navigate>; if auth passes, it renders <Outlet>.
 *  - Why lazy load only dashboard routes?
 *    → Login/Home are small & needed immediately. Dashboard is heavy & behind auth,
 *      so it only loads when the user actually navigates there.
 *  - Why `replace` in <Navigate to="overview" replace>?
 *    → Without replace, /dashboard stays in history. User pressing back would
 *      land on /dashboard again → redirect again → infinite loop feeling.
 */
import "./App.css";
import {
	createBrowserRouter,
	Navigate,
	RouterProvider
} from "react-router-dom";

import { lazy, Suspense } from "react";
// Eagerly loaded: small, needed on first paint
import RootLayout from "./layouts/RootLayout";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";

// → See ProtectedRoute.jsx: pathless layout route that redirects if !authenticated
import ProtectedRoute from "./routes/ProtectedRoute";

/**
 * LAZY LOADING — React.lazy + dynamic import()
 * Each lazy() call creates a separate JS chunk at build time.
 * The chunk is fetched ONLY when the route is first visited.
 * Suspense wraps the lazy component and shows fallback while chunk loads.
 */
const Dashboard = lazy(() => import("./layouts/DashboardLayout"));
const Overview = lazy(() => import("./pages/Overview"));
const Settings = lazy(() => import("./pages/Settings"));
const Reports = lazy(() => import("./pages/Reports"));
const Users = lazy(() => import("./pages/Users"));
const User = lazy(() => import("./pages/User"));

// ACTIONS: handle form POSTs — see loginAction.js and logoutAction.js
import { logoutAction } from "./actions/logoutAction";
import { loginAction } from "./actions/loginAction";

// LOADERS: fetch data BEFORE render — see usersLoader.js and userLoader.js
import { usersLoader } from "./loaders/usersLoader";
import { userLoader } from "./loaders/userLoader";

// ERROR ELEMENT: catches errors thrown in loaders — see UserError.jsx
import ErrorPage from "./pages/UserError";

const router = createBrowserRouter([
	{
		// ROOT layout: always rendered, header is always visible
		// Every page renders inside RootLayout's <Outlet />
		path: "/",
		element: <RootLayout />,
		children: [
			{
				// INDEX ROUTE: renders when URL is exactly "/"
				// "index: true" means this is the default child — no extra path segment
				index: true,
				element: <HomePage />
			},
			{
				// LOGIN: renders <Login /> form + attaches loginAction
				// When <Form method="post"> submits inside Login.jsx,
				// React Router calls loginAction (not a page reload!)
				path: "login",
				element: <Login />,
				action: loginAction
			},
			{
				// LOGOUT: action-only route (no element to render)
				// Triggered by <Form method="post" action="/logout"> in RootLayout's header
				// Action clears auth from localStorage and redirects to /login
				path: "logout",
				action: logoutAction
			},
			{
				// PROTECTED ROUTE — no `path` key = "layout route"
				// Doesn't contribute to URL, just wraps children with auth check.
				// If !authenticated → renders <Navigate to="login" />
				// If authenticated → renders <Outlet /> which shows the matched child
				element: <ProtectedRoute />,
				children: [
					{
						// DASHBOARD layout: sidebar + Outlet for sub-pages
						// Wrapped in Suspense because Dashboard is lazy loaded
						path: "dashboard",
						element: (
							<Suspense fallback={<p>Loading Dashboard...</p>}>
								<Dashboard />
							</Suspense>
						),
						children: [
							{
								// /dashboard (exact) → redirect to /dashboard/overview
								// `replace` prevents /dashboard from polluting history stack
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
								// USERS LIST: loader fetches ALL users BEFORE component renders
								// Data accessed in Users.jsx via useLoaderData()
								// If loader throws → errorElement catches it (no blank screen)
								path: "users",
								loader: usersLoader,
								element: <Users />,
								errorElement: <ErrorPage />
							},
							{
								// USER DETAIL: :id is a dynamic param
								// loader receives { params: { id } } and fetches that user
								// Data accessed in User.jsx via useLoaderData()
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

/**
 * RouterProvider: connects the router config to React's render tree.
 * This is the "data router" pattern — replaces the old <BrowserRouter> + <Routes>.
 */
function App() {
	return <RouterProvider router={router}></RouterProvider>;
}

export default App;
