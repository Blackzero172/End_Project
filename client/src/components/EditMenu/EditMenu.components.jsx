import "./EditMenu.styles.css";
import Property from "../Property/Property.components";
import CustomButton from "../CustomButton/CustomButton.components";
import ActionMenu from "../ActionMenu/ActionMenu.components";
import ConfirmCancelMenu from "../ConfirmCancelMenu/ConfirmCancelMenu.components";
import { doAction, onNumberInputChange, displayErrorMessage } from "../../utils/utils";
import { useRef } from "react";
import CustomInput from "../CustomInput/CustomInput.components";
let timerID;
const EditMenu = ({
	user,
	setAction,
	currentAction,
	data,
	getData,
	setLoading,
	targetUser,
	setTargetUser,
	setUser,
	logout,
}) => {
	let loading = false;
	const errorTextRef = useRef();
	const nameInputRef = useRef();
	const cashInputRef = useRef();
	const creditInputRef = useRef();
	const onConfirmAction = async (amount) => {
		if (!loading) {
			try {
				const id = user._id;
				if (amount === "" || amount === 0)
					return (timerID = displayErrorMessage(errorTextRef, "Amount can't be 0 or empty", timerID));
				if (timerID) clearTimeout(timerID);
				errorTextRef.current.innerText = "";
				setLoading(true);
				if (currentAction === "delete") {
					setUser();
				}
				await doAction(id, currentAction, { amount: amount, targetID: targetUser._id });
				await getData();
			} catch (e) {
				console.error(e);
				if (e.response.data.includes("validation"))
					timerID = displayErrorMessage(errorTextRef, "There's not enough money in the account", timerID);
				if (e.response.status === 500)
					timerID = displayErrorMessage(
						errorTextRef,
						"Something went wrong,Please try again later.",
						timerID
					);
			} finally {
				loading = false;
				setLoading(false);
			}
		}
	};
	const onCancelAction = () => {
		setAction("");
	};
	const onConfirmCreate = async () => {
		const [nameInput, cashInput, creditInput] = [
			nameInputRef.current,
			cashInputRef.current,
			creditInputRef.current,
		];
		if (nameInput.value.length > 2 && !loading) {
			loading = true;
			setLoading(true);
			try {
				if (timerID) clearTimeout(timerID);
				const user = await doAction("", "create", {
					name: nameInput.value,
					cash: cashInput.value !== "" ? cashInput.value : 0,
					credit: creditInput.value !== "" ? creditInput.value : 0,
				});
				await getData();
				setUser(user.data);
			} catch (e) {
				console.error(e.response.data);
				timerID = displayErrorMessage(errorTextRef, e.response.data, timerID);
			} finally {
				loading = false;
				setLoading(false);
			}
		} else {
			console.error("Empty");
			timerID = displayErrorMessage(errorTextRef, "Name Input is empty", timerID);
		}
	};

	const onAddClick = (e) => {
		setAction("add");
	};
	if (!user.name && currentAction === "") {
		return (
			<div className="right-menu">
				<CustomButton text="Add User" type="button" onClick={onAddClick} />
				<CustomButton text="Logout" type="button" classes="logout-btn" onClick={logout} />
			</div>
		);
	} else if (currentAction === "add") {
		return (
			<div className="add-menu">
				<CustomButton text="Logout" type="button" classes="logout-btn" onClick={logout} />
				<label style={{ fontSize: "2rem", marginBottom: "3rem" }}>New User</label>
				<CustomInput label="Name" required placeHolder="Enter name..." inputRef={nameInputRef} />
				<CustomInput
					label="Cash (Optional)"
					placeHolder="Enter starting cash..."
					onChange={onNumberInputChange}
					inputRef={cashInputRef}
				/>
				<CustomInput
					label="Credit (Optional)"
					placeHolder="Enter starting credit..."
					onChange={onNumberInputChange}
					inputRef={creditInputRef}
				/>
				<ConfirmCancelMenu onCancel={onCancelAction} onConfirm={onConfirmCreate} />
				<p ref={errorTextRef} className="error-message"></p>
			</div>
		);
	} else {
		return (
			<div className="right-menu">
				<CustomButton text="Logout" type="button" classes="logout-btn" onClick={logout} />

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
				<ActionMenu
					action={currentAction}
					data={data}
					onConfirm={onConfirmAction}
					selectUser={setTargetUser}
					onCancel={onCancelAction}
				/>
				<p ref={errorTextRef} className="error-message"></p>
			</div>
		);
	}
};
export default EditMenu;
