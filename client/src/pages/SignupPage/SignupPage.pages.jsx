import "./SignupPage.styles.css";
import CustomInput from "../../components/CustomInput/CustomInput.components";
import CustomButton from "../../components/CustomButton/CustomButton.components";
import CustomLink from "../../components/CustomLink/CustomLink.components";
import { onNumberInputChange } from "../../utils/utils";
const SignupPage = ({ onSignup, inputRefs, errorTextRef }) => {
	const { firstNameRef, lastNameRef, idNumberRef, birthDateRef, emailRef, passRef } = inputRefs;
	const handleFormSubmit = (e) => {
		e.preventDefault();
		onSignup();
	};
	return (
		<form className="signup-page flex-both flex-column" onSubmit={handleFormSubmit}>
			<div className="background"></div>
			<div className="window flex-both flex-column">
				<h2>Signup</h2>
				<div className="inputs-container">
					<div className="name-inputs">
						<CustomInput
							label="First Name"
							placeHolder="Enter first name..."
							inputRef={firstNameRef}
							required
						/>
						<CustomInput label="Last Name" placeHolder="Enter last name..." inputRef={lastNameRef} required />
					</div>
					<div className="id-birthdate-inputs">
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
					</div>
					<div className="email-password-inputs">
						<CustomInput label="Email" placeHolder="Enter email..." inputRef={emailRef} required />
						<CustomInput
							type="password"
							label="Password"
							placeHolder="Enter password..."
							inputRef={passRef}
							required
						/>
					</div>
				</div>
				<CustomButton text="Signup" type="submit" />
				<p>
					Already have an account? <CustomLink text="Login " path="/login" />
				</p>
				<p ref={errorTextRef} className="error-message"></p>
			</div>
		</form>
	);
};
export default SignupPage;
