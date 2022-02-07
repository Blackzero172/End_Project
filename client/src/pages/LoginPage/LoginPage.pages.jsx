import "./LoginPage.styles.css";
import CustomInput from "../../components/CustomInput/CustomInput.components";
import CustomButton from "../../components/CustomButton/CustomButton.components";
const LoginPage = ({ onLogin, inputRefs, errorTextRef }) => {
	const { emailRef, passRef } = inputRefs;
	return (
		<form className="login-page" autoComplete="off">
			<div className="window">
				<h2>Login</h2>
				<CustomInput label="Email" placeHolder="Enter email..." inputRef={emailRef} />
				<CustomInput type="password" label="Password" placeHolder="Enter password..." inputRef={passRef} />
				<CustomButton text="Login" type="button" onClick={onLogin} />
				<p ref={errorTextRef} className="error-message"></p>
			</div>
		</form>
	);
};
export default LoginPage;
