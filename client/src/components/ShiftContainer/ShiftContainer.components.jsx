import Property from "../Property/Property.components";
import "./ShiftContainer.styles.css";
import CustomButton from "../CustomButton/CustomButton.components";
const ShiftContainer = ({ shift, accessLevel }) => {
	const { shiftDate: date, shiftType: type } = shift;
	return (
		<div className="shift flex-content">
			<div className="shift-info-container flex-items flex-column">
				<Property label="Date: " text={date} />
				<Property label="Type: " text={type} />
			</div>
			{accessLevel === "Manager" && (
				<div className="btns-container flex-content flex-column">
					<CustomButton>
						<i className="fas fa-times"></i>
					</CustomButton>
					<CustomButton>
						<i className="fas fa-edit"></i>
					</CustomButton>
				</div>
			)}
		</div>
	);
};
export default ShiftContainer;
