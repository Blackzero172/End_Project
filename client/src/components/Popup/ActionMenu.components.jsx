import "./ActionMenu.styles.css";
import CustomInput from "../CustomInput/CustomInput.components";
import CustomButton from "../CustomButton/CustomButton.components";
import SearchBar from "../SearchBar/SearchBar.components";
import { capFirstLetter } from "../../utils/utils";
const ActionMenu = ({ action, data }) => {
	if (action === "") {
		return <div></div>;
	} else if (action === "transfer") {
		return (
			<div className="action-menu">
				<label>{capFirstLetter(action)}</label>
				<CustomInput label="Amount" placeHolder="Enter Amount..." type="number" />
				<SearchBar label="Receiver" data={data} />
				<div className="buttons-container">
					<CustomButton text="Confirm" type="button" />
					<CustomButton text="Cancel" type="button" />
				</div>
			</div>
		);
	} else if (action === "delete") {
		return <div></div>;
	} else {
		return (
			<div className="action-menu">
				<label>{capFirstLetter(action)}</label>
				<CustomInput label="Amount" placeHolder="Enter Amount..." type="number" />
				<div className="buttons-container">
					<CustomButton text="Confirm" type="button" />
					<CustomButton text="Cancel" type="button" />
				</div>
			</div>
		);
	}
};
export default ActionMenu;
