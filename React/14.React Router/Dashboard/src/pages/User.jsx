/**
 * USER DETAIL PAGE — consumes data from userLoader via useLoaderData()
 *
 * HOW IT CONNECTS:
 *  1. Users.jsx: <NavLink to={`${id}`}> navigates to /dashboard/users/:id
 *  2. userLoader.js: fetches that specific user by params.id
 *  3. useLoaderData() returns the single user object here
 *
 * INTERVIEW NOTE:
 *  - No useParams() needed here because the loader already used params.id
 *    to fetch the right user. useLoaderData() gives us the resolved data.
 *  - useParams() would be needed only if the component itself needs the raw id
 *    (e.g. for conditional rendering or building another URL).
 */
import { useLoaderData } from "react-router-dom";

const User = () => {
	const user = useLoaderData();
	return <div>{user.firstName}</div>;
};
export default User;
