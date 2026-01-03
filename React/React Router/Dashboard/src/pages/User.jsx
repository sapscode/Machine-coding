import { useLoaderData } from "react-router-dom";

const User = () => {
	const user = useLoaderData();
	return <div>{user.firstName}</div>;
};
export default User;
