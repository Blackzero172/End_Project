import "./SignupPage.styles.css";
import CustomInput from "../../components/CustomInput/CustomInput.components";
import CustomButton from "../../components/CustomButton/CustomButton.components";
const SignupPage = ({ onClick, inputRefs, errorTextRef }) => {
	const { nameRef, emailRef, passRef } = inputRefs;
	return (
		<form className="signup-page" autoComplete="off">
			<div className="window">
				<h2>Signup</h2>
				<CustomInput label="Name" placeHolder="Enter name..." inputRef={nameRef} />
				<CustomInput label="Email" placeHolder="Enter email..." inputRef={emailRef} />
				<CustomInput type="password" label="Password" placeHolder="Enter password..." inputRef={passRef} />
				<CustomButton text="Signup" type="button" onClick={onClick} />
				<p ref={errorTextRef} className="error-message"></p>
			</div>
		</form>
	);
};
export default SignupPage;
