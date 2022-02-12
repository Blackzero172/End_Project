import "./SignupPage.styles.css";
import CustomInput from "../../components/CustomInput/CustomInput.components";
import CustomButton from "../../components/CustomButton/CustomButton.components";
import CustomLink from "../../components/CustomLink/CustomLink.components";
import { onNumberInputChange } from "../../utils/utils";
import { useRef } from "react";
const SignupPage = ({ onSignup, inputRefs }) => {
	const errorTextRef = useRef();

	const { firstNameRef, lastNameRef, idNumberRef, birthDateRef, emailRef, passRef } = inputRefs;

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		const message = await onSignup();
		if (message) {
			errorTextRef.current.innerText = message;
			errorTextRef.current.classList.remove("hidden");
			setTimeout(() => {
				errorTextRef.current.classList.add("hidden");
			}, 2000);
		}
	};

	return (
		<form className="signup-page flex-both flex-column" onSubmit={handleFormSubmit}>
			<div className="background"></div>
			<div className="window flex-both flex-column">
				<p ref={errorTextRef} className="error-message hidden">
					Texting
				</p>
				<h2>Signup</h2>
				<div className="inputs-grid">
					<CustomInput
						label="First Name"
						placeHolder="Enter first name..."
						inputRef={firstNameRef}
						required
						autocomplete="firstName"
					/>
					<CustomInput
						label="Last Name"
						placeHolder="Enter last name..."
						inputRef={lastNameRef}
						required
						autocomplete="lastName"
					/>

					<CustomInput
						label="ID Number"
						placeHolder="Enter ID number..."
						inputRef={idNumberRef}
						required
						onChange={onNumberInputChange}
						autocomplete="IdNumber"
					/>
					<CustomInput
						label="Date of Birth"
						placeHolder="Enter Date of Birth"
						inputRef={birthDateRef}
						required
						type="Date"
						autocomplete="birthDate"
					/>

					<CustomInput label="Email" placeHolder="Enter email..." inputRef={emailRef} required />
					<CustomInput
						type="password"
						label="Password"
						placeHolder="Enter password..."
						inputRef={passRef}
						required
						autocomplete="password"
					/>
				</div>
				<CustomButton text="Signup" type="submit" />
			</div>
			<p>
				Already have an account? <CustomLink text="Login " path="/login" />
			</p>
		</form>
	);
};
export default SignupPage;
