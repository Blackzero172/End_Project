import Property from "../Property/Property.components";
import "./ShiftContainer.styles.css";
const ShiftContainer = ({ shift }) => {
	const { shiftDate: date, shiftType: type } = shift;
	return (
		<div className="shift flex-content">
			<div className="shift-info-container flex-items flex-column">
				<Property label="Date: " text={date} />
				<Property label="Type: " text={type} />
			</div>
			<div className="btns-container">
				<p>Delete</p>
				<p>Edit</p>
			</div>
		</div>
	);
};
export default ShiftContainer;
