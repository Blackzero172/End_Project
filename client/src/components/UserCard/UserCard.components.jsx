import "./UserCard.styles.css";
const UserCard = ({ userid, onClick, user }) => {
	return (
		<div onClick={onClick} userid={userid} className="user">
			<label>Name:</label>
			<p>{user.name}</p>
			<label>Cash:</label>
			<p>{user.cash}</p>
			<label>Credit:</label>
			<p>{user.credit}</p>
		</div>
	);
};
export default UserCard;
