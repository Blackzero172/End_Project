import "./ActionMenu.styles.css";
import CustomInput from "../CustomInput/CustomInput.components";
import CustomButton from "../CustomButton/CustomButton.components";
import SearchBar from "../SearchBar/SearchBar.components";
import { capFirstLetter } from "../../utils/utils";
import { useRef } from "react";
const ActionMenu = ({ action, data, onConfirm }) => {
	const inputRef = useRef();
	const onNumberInputChange = (e) => {
		const regex = /[\d]+/g;
		const newArr = e.target.value.split("").filter((x) => x.match(regex));
		e.target.value = newArr.join("");
	};
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
				/>
				<SearchBar label="Receiver" data={data} />
				<div className="buttons-container">
					<CustomButton
						text="Confirm"
						type="button"
						onClick={(e) => {
							onConfirm(inputRef.current.value);
						}}
					/>
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
				<CustomInput
					label="Amount"
					placeHolder="Enter Amount..."
					type="text"
					inputRef={inputRef}
					onChange={onNumberInputChange}
				/>
				<div className="buttons-container">
					<CustomButton
						text="Confirm"
						type="button"
						onClick={(e) => {
							onConfirm(+inputRef.current.value);
						}}
					/>
					<CustomButton text="Cancel" type="button" />
				</div>
			</div>
		);
	}
};
export default ActionMenu;
