import "./UserCard.styles.css";
const UserCard = ({ user }) => {
	return (
		<div>
			<p>Name:{user.firstName + user.lastName}</p>
		</div>
	);
};
export default UserCard;
