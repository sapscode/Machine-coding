import { NavLink, useLoaderData } from "react-router-dom";
import "./Users.css";

const Users = () => {
	const { users } = useLoaderData();
	return (
		<div className="users-list">
			{users.map((user) => {
				const { id, firstName, lastName, age } = user;
				return (
					<div key={id} className="user">
						{<NavLink to={`${id}`}>{`${firstName} ${lastName}`}</NavLink>}
					</div>
				);
			})}
		</div>
	);
};

export default Users;
