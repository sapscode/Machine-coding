import User from "./User";

const List = ({ users }) => {
	return (
		<section>
			{users.map((user) => {
				return <User key={user.id} user={user} />;
			})}
		</section>
	);
};

export default List;
