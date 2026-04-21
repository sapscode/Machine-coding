/**
 * AUTH MODULE — fake auth state using localStorage
 *
 * CONNECTED TO:
 *  - loginAction.js  → calls login() after form validation
 *  - logoutAction.js → calls logout() then redirects
 *  - ProtectedRoute.jsx → calls isAuthenticated() to gate /dashboard/*
 *  - RootLayout.jsx  → calls isAuthenticated() to toggle Login/Logout button
 *
 * INTERVIEW NOTE:
 *  In production, auth state would be in a context/store + HTTP-only cookies.
 *  localStorage is used here to keep the focus on React Router patterns.
 *  The key insight: auth check is a simple function — ProtectedRoute calls it
 *  at render time to decide Navigate vs Outlet.
 */
export const isAuthenticated = () => localStorage.getItem("auth") === "true";

export const login = () => localStorage.setItem("auth", "true");

export const logout = () => localStorage.removeItem("auth");
