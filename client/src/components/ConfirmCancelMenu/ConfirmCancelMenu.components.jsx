import CustomInput from "../CustomInput/CustomInput.components";
import CustomButton from "../CustomButton/CustomButton.components";
const ConfirmCancel = ({ onCancel, onConfirm, inputRef }) => {
	return (
		<div className="buttons-container">
			<CustomButton
				text="Confirm"
				type="button"
				onClick={(e) => {
					if (typeof inputRef === "object") onConfirm(+inputRef.current.value);
					else onConfirm();
				}}
			/>
			<CustomButton text="Cancel" type="button" onClick={onCancel} />
		</div>
	);
};
export default ConfirmCancel;
