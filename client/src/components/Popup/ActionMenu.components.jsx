import { capFirstLetter, onNumberInputChange } from "../../utils/utils";
import { useRef } from "react";
import CustomInput from "../CustomInput/CustomInput.components";
import SearchBar from "../SearchBar/SearchBar.components";
import ConfirmCancelMenu from "../ConfirmCancelMenu/ConfirmCancelMenu.components";
import "./ActionMenu.styles.css";
const ActionMenu = ({ action, data, onConfirm, selectUser, onCancel }) => {
	const inputRef = useRef();

	if (action === "") {
		return <div></div>;
	} else if (action === "transfer") {
		return (
			<div className="action-menu">
				<label>{capFirstLetter(action)}</label>
				<CustomInput
					label="Amount"
					placeHolder="Enter Amount..."
					type="text"
					inputRef={inputRef}
					onChange={onNumberInputChange}
					required
				/>
				<SearchBar label="Receiver" data={data} selectUser={selectUser} />
				<ConfirmCancelMenu onCancel={onCancel} onConfirm={onConfirm} inputRef={inputRef} />
			</div>
		);
	} else if (action === "delete") {
		return (
			<div>
				<div className="action-menu">
					<label>Are you sure you want to delete this user?</label>
					<ConfirmCancelMenu onCancel={onCancel} onConfirm={onConfirm} />
				</div>
			</div>
		);
	} else {
		return (
			<div className="action-menu">
				<label>{capFirstLetter(action)}</label>
				<CustomInput
					label="Amount"
					placeHolder="Enter Amount..."
					type="text"
					inputRef={inputRef}
					onChange={onNumberInputChange}
					required
				/>
				<ConfirmCancelMenu onCancel={onCancel} onConfirm={onConfirm} inputRef={inputRef} />
			</div>
		);
	}
};
export default ActionMenu;
