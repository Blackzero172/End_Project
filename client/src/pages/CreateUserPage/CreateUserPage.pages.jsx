import CustomButton from "../../components/CustomButton/CustomButton.components";
import CustomInput from "../../components/CustomInput/CustomInput.components";

import { onNumberInputChange } from "../../utils/utils";

import "./CreateUserPage.styles.css";

const CreateUserPage = ({ onCreateUser, inputRefs, errorTextRef, selectedUser }) => {
	const { firstNameRef, lastNameRef, idNumberRef, birthDateRef, emailRef, passRef } = inputRefs;
	const handleFormSubmit = (e) => {
		e.preventDefault();
		onCreateUser();
	};
	return (
		<form className="create-user-page flex-both flex-column" onSubmit={handleFormSubmit}>
			<div className="window flex-both flex-column">
				<h2>{selectedUser ? "Edit" : "Create"} User</h2>
				<div className="inputs-grid">
					<CustomInput
						label="First Name"
						placeHolder="Enter first name..."
						inputRef={firstNameRef}
						required
					/>
					<CustomInput label="Last Name" placeHolder="Enter last name..." inputRef={lastNameRef} required />

					<CustomInput
						label="ID Number"
						placeHolder="Enter ID number..."
						inputRef={idNumberRef}
						required
						onChange={onNumberInputChange}
					/>
					<CustomInput
						label="Date of Birth"
						placeHolder="Enter Date of Birth"
						inputRef={birthDateRef}
						required
						type="Date"
					/>

					<CustomInput label="Email" placeHolder="Enter email..." inputRef={emailRef} required />
					<CustomInput
						type="password"
						label="Password"
						placeHolder="Enter password..."
						inputRef={passRef}
						required
					/>
				</div>
				<CustomButton text="Create User" type="submit" />
				<p ref={errorTextRef} className="error-message"></p>
			</div>
		</form>
	);
};
export default CreateUserPage;
