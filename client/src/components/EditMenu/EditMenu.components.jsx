import "./EditMenu.styles.css";
import Property from "../Property/Property.components";
const EditMenu = ({ user }) => {
	if (!user.name) {
		return <div className="right-menu"></div>;
	} else {
		return (
			<div className="right-menu">
				<Property label="Name" text={user.name} />
				<Property label="Cash" text={user.cash} />
				<Property label="Credit" text={user.credit} />
			</div>
		);
	}
};
export default EditMenu;
