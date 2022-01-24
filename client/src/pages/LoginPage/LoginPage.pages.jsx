import "./LoginPage.styles.css";
import CustomInput from "../../components/CustomInput/CustomInput.components";
import CustomButton from "../../components/CustomButton/CustomButton.components";
const LoginPage = ({ onClick, emailRef, passRef, errorTextRef }) => {
	return (
		<form className="login-page" autoComplete="off">
			<CustomInput label="Email" placeHolder="Enter email..." inputRef={emailRef} />
			<CustomInput type="password" label="Password" placeHolder="Enter password..." inputRef={passRef} />
			<CustomButton text="Login" type="button" onClick={onClick} />
			<p ref={errorTextRef} className="error-message"></p>
		</form>
	);
};
export default LoginPage;
