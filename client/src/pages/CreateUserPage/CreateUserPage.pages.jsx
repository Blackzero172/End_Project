import moment from "moment";

import CustomButton from "../../components/CustomButton/CustomButton.components";
import CustomInput from "../../components/CustomInput/CustomInput.components";
import CustomLink from "../../components/CustomLink/CustomLink.components";

import { onNumberInputChange } from "../../utils/utils";
import { useRouteMatch } from "react-router-dom";

import "./CreateUserPage.styles.css";

const CreateUserPage = ({ onCreateUser, inputRefs, errorTextRef, selectedUser, onEditUser }) => {
	const { firstNameRef, lastNameRef, idNumberRef, birthDateRef, emailRef, passRef, accessRef } = inputRefs;

	const { firstName, lastName, IdNumber, birthDate, email, accessLevel } = selectedUser || {};

	const { path } = useRouteMatch();

	let formattedBirthDate = moment(birthDate).format("YYYY-MM-DD");
	if (!birthDate) {
		formattedBirthDate = "";
	}

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		await onCreateUser();
		await onEditUser(selectedUser.email);
	};

	return (
		<form className="create-user-page flex-both flex-column" onSubmit={handleFormSubmit}>
			<div className="window flex-both flex-column">
				<p ref={errorTextRef} className="error-message hidden">
					Texting
				</p>
				<h2>{selectedUser ? "Edit" : "Create"} User</h2>
				<div className="inputs-grid">
					<CustomInput
						label="First Name"
						placeHolder="Enter first name..."
						inputRef={firstNameRef}
						required
						value={firstName}
					/>
					<CustomInput
						label="Last Name"
						placeHolder="Enter last name..."
						inputRef={lastNameRef}
						required
						value={lastName}
					/>

					<CustomInput
						label="ID Number"
						placeHolder="Enter ID number..."
						inputRef={idNumberRef}
						required
						onChange={onNumberInputChange}
						value={IdNumber}
					/>
					<CustomInput
						label="Date of Birth"
						placeHolder="Enter Date of Birth"
						inputRef={birthDateRef}
						required
						type="Date"
						value={formattedBirthDate}
					/>

					<CustomInput
						label="Email"
						placeHolder="Enter email..."
						inputRef={emailRef}
						required
						value={email}
					/>

					<CustomInput
						type="password"
						label="Password"
						placeHolder="Enter password..."
						inputRef={passRef}
						required={selectedUser ? false : true}
					/>
				</div>
				{!path.includes("profile") && (
					<CustomInput
						type="checkbox"
						label="Is Manager"
						inputRef={accessRef}
						checked={accessLevel === "Manager"}
					/>
				)}
				<div className="btns-container">
					<CustomButton text={`${selectedUser ? "Edit" : "Create"} User`} type="submit" />
					<CustomLink text="Cancel" path="/dashboard/manage" classes="dash" />
				</div>
			</div>
		</form>
	);
};
export default CreateUserPage;
