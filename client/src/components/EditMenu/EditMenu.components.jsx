import "./EditMenu.styles.css";
import Property from "../Property/Property.components";
import CustomButton from "../CustomButton/CustomButton.components";
const EditMenu = ({ user }) => {
	if (!user.name) {
		return <div className="right-menu"></div>;
	} else {
		return (
			<div className="right-menu">
				<div className="labels">
					<Property label="Name" text={user.name} />
					<Property label="Cash" text={user.cash} />
					<Property label="Credit" text={user.credit} />
				</div>
				<div className="buttons-container">
					<CustomButton text="Withdraw" type="button" />
					<CustomButton text="Deposit" type="button" />
					<CustomButton text="Transfer" type="button" />
					<CustomButton text="Set new credit" type="button" />
					<CustomButton text="Delete" type="button" />
				</div>
			</div>
		);
	}
};
export default EditMenu;
