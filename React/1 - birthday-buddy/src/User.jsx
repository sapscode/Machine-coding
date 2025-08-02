const User = ({ user }) => {
	return (
		<div className="person" key={user.id}>
			<img src={user.image} />
			<div>
				<h4>{user.name}</h4>
				<p>{user.age}</p>
			</div>
		</div>
	);
};

export default User;
