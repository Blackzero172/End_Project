import "./UserCard.styles.css";
const UserCard = ({ userid, onClick, user }) => {
	return (
		<div onClick={onClick} userid={userid} className="user">
			<label>Name:</label>
			<p>{user.name}</p>
			<label>Cash:</label>
			<p>{user.cash}&#8362;</p>
			<label>Credit:</label>
			<p>{user.credit}&#8362;</p>
		</div>
	);
};
export default UserCard;
