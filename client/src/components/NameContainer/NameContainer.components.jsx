import CustomButton from "../CustomButton/CustomButton.components";
import "./NameContainer.styles.css";
const NameContainer = ({ user, onDelete, shiftType }) => {
	return (
		<div className="name-container flex-items">
			<p>{`${user.firstName} ${user.lastName}`}</p>
			<CustomButton
				text="X"
				onClick={() => {
					onDelete(user.email, shiftType);
				}}
			/>
		</div>
	);
};
export default NameContainer;
