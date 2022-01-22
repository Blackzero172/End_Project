import "./EditMenu.styles.css";
import Property from "../Property/Property.components";
import CustomButton from "../CustomButton/CustomButton.components";
import ActionMenu from "../Popup/ActionMenu.components";
import { doAction } from "../../utils/utils";

const EditMenu = ({ user, setAction, currentAction, data, getData, setLoading }) => {
	let Loading = false;
	const onConfirm = async (amount) => {
		setLoading();
		await doAction(user._id, currentAction, amount);
		getData();
	};
	if (!user.name) {
		return (
			<div className="right-menu">
				<CustomButton text="Add User" type="button" />
			</div>
		);
	} else {
		return (
			<div className="right-menu">
				<div className="labels">
					<Property label="Name" text={user.name} />
					<Property label="Cash" text={user.cash} />
					<Property label="Credit" text={user.credit} />
				</div>
				<div className="buttons-container">
					<CustomButton text="Withdraw" type="button" action="withdraw" onClick={setAction} />
					<CustomButton text="Deposit" type="button" action="deposit" onClick={setAction} />
					<CustomButton text="Transfer" type="button" action="transfer" onClick={setAction} />
					<CustomButton text="Set new credit" type="button" action="credit" onClick={setAction} />
					<CustomButton text="Delete" type="button" action="delete" onClick={setAction} />
				</div>
				<ActionMenu action={currentAction} data={data} onConfirm={onConfirm} />
			</div>
		);
	}
};
export default EditMenu;
