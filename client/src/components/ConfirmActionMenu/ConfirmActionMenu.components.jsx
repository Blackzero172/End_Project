import CustomButton from "../CustomButton/CustomButton.components";
import "./ConfirmActionMenu.styles.css";
const ConfirmActionMenu = ({ onConfirm, onCancel, action, menuRef }) => {
	return (
		<div className="confirm-menu flex-both hidden" ref={menuRef}>
			<div className="window flex-both flex-column">
				<p>
					Are you sure you want to <span className="action-text">{action}</span> this user
				</p>
				<div className="btns-container">
					<CustomButton onClick={onConfirm} text="Confirm" />
					<CustomButton
						onClick={() => {
							onCancel(false);
						}}
						text="Cancel"
					/>
				</div>
			</div>
		</div>
	);
};
export default ConfirmActionMenu;
