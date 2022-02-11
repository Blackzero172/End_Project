import CustomButton from "../CustomButton/CustomButton.components";
import "./UserCard.styles.css";
const UserCard = ({ user, onDelete, onEdit }) => {
	return (
		<div className="user-card">
			<p>Name: {`${user.firstName} ${user.lastName}`}</p>
			<p>ID Number: {user.IdNumber}</p>
			<div className="btns-container flex-content flex-column">
				<CustomButton
					onClick={() => {
						onDelete(true, user);
					}}
				>
					<i className="fas fa-times"></i>
				</CustomButton>
				<CustomButton
					onClick={() => {
						onEdit(true, user);
					}}
				>
					<i className="fas fa-edit"></i>
				</CustomButton>
			</div>
		</div>
	);
};
export default UserCard;
