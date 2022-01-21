import "./UserCard.styles.css";
const UserCard = ({ userid, onClick, user }) => {
	return (
		<div onClick={onClick} userid={userid} className="user">
			<p>Name: {user.name}</p>
			<p>Cash: {user.cash}</p>
			<p>Credit: {user.credit}</p>
		</div>
	);
};
export default UserCard;
