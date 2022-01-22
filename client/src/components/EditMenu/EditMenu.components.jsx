import "./EditMenu.styles.css";
import Property from "../Property/Property.components";
import CustomButton from "../CustomButton/CustomButton.components";
import ActionMenu from "../Popup/ActionMenu.components";
import { doAction } from "../../utils/utils";
import { useRef } from "react";
let timerID;
const EditMenu = ({ user, setAction, currentAction, data, getData, setLoading }) => {
	let loading = false;
	const errorText = useRef();
	console.log(errorText);
	const onConfirm = async (amount) => {
		if (!loading) {
			try {
				if (timerID) clearTimeout(timerID);
				errorText.current.innerText = "";
				setLoading(true);
				await doAction(user._id, currentAction, amount);
				getData();
			} catch (e) {
				console.error(e.response);
				if (e.response.data.includes("validation"))
					errorText.current.innerText = "Not Enough Cash in the Account";
				timerID = setTimeout(() => {
					errorText.current.innerText = "";
				}, 2000);
			} finally {
				loading = false;
				setLoading(false);
			}
		}
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
				<p ref={errorText} className="error-message"></p>
			</div>
		);
	}
};
export default EditMenu;
