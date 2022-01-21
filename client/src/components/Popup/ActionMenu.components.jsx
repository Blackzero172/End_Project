import "./ActionMenu.styles.css";
import CustomInput from "../CustomInput/CustomInput.components";
import CustomButton from "../CustomButton/CustomButton.components";
import { capFirstLetter } from "../../utils/utils";
const ActionMenu = ({ children, action }) => {
	if (action === "") {
		return <div></div>;
	} else if (action === "transfer") {
		return (
			<div className="action-menu">
				<label>{capFirstLetter(action)}</label>
				<CustomInput label="Amount" placeHolder="Enter Amount..." />
				<div className="buttons-container">
					<CustomButton text="Confirm" type="button" />
					<CustomButton text="Cancel" type="button" />
				</div>
			</div>
		);
	} else if (action === "delete") {
		return <div></div>;
	} else {
		<div className="action-menu">
			<label>{capFirstLetter(action)}</label>
			<CustomInput label="Amount" placeHolder="Enter Amount..." />
			<div className="buttons-container">
				<CustomButton text="Confirm" type="button" />
				<CustomButton text="Cancel" type="button" />
			</div>
		</div>;
	}
};
export default ActionMenu;
