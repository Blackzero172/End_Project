import "./SignupPage.styles.css";
import CustomInput from "../../components/CustomInput/CustomInput.components";
import CustomButton from "../../components/CustomButton/CustomButton.components";
import CustomLink from "../../components/CustomLink/CustomLink.components";
const SignupPage = ({ onSignup, inputRefs, errorTextRef }) => {
	const { nameRef, emailRef, passRef } = inputRefs;
	const handleFormSubmit = (e) => {
		e.preventDefault();
		onSignup();
	};
	return (
		<form className="signup-page" onSubmit={handleFormSubmit}>
			<div className="background"></div>
			<div className="window">
				<h2>Signup</h2>
				<CustomInput label="Name" placeHolder="Enter name..." inputRef={nameRef} required />
				<CustomInput label="Email" placeHolder="Enter email..." inputRef={emailRef} required />
				<CustomInput
					type="password"
					label="Password"
					placeHolder="Enter password..."
					inputRef={passRef}
					required
				/>
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
