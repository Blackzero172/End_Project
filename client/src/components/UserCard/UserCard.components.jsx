import CustomButton from "../CustomButton/CustomButton.components";
import CustomLink from "../CustomLink/CustomLink.components";
import Property from "../Property/Property.components";
import "./UserCard.styles.css";
const UserCard = ({ user, onDelete, onEdit }) => {
	return (
		<div className="user-card">
			<Property label="Name: " text={`${user.firstName} ${user.lastName}`} />
			<Property label="ID Number: " text={user.IdNumber} />
			<Property label="Access Level: " text={<span>{user.accessLevel}</span>} />
			<div className="btns-container flex-content flex-column">
				<CustomButton
					onClick={() => {
						onDelete(true, user);
					}}
				>
					<i className="fas fa-times"></i>
				</CustomButton>
				<CustomLink
					classes="button"
					path="/dashboard/edit"
					onClick={() => {
						onEdit(user);
					}}
				>
					<i className="fas fa-edit"></i>
				</CustomLink>
			</div>
		</div>
	);
};
export default UserCard;
