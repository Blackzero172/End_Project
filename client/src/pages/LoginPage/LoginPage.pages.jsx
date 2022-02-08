import "./LoginPage.styles.css";
import CustomInput from "../../components/CustomInput/CustomInput.components";
import CustomButton from "../../components/CustomButton/CustomButton.components";
import { useRef } from "react";
import CustomLink from "../../components/CustomLink/CustomLink.components";
const LoginPage = ({ onLogin, inputRefs, errorTextRef }) => {
	const { emailRef, passRef } = inputRefs;
	const formRef = useRef();
	const handleFormSubmit = (e) => {
		e.preventDefault();
		onLogin();
	};
	return (
		<form className="login-page" onSubmit={handleFormSubmit} ref={formRef}>
			<div className="background"></div>
			<div className="window">
				<h2>Login</h2>
				<CustomInput
					label="Email"
					placeHolder="Enter email..."
					inputRef={emailRef}
					required
					autocomplete="email"
				/>
				<CustomInput
					type="password"
					label="Password"
					placeHolder="Enter password..."
					inputRef={passRef}
					required
					autocomplete="password"
				/>
				<CustomButton text="Login" type="submit" />
				<p>
					Don't have an account? <CustomLink text="Signup" path="/signup" />
				</p>
				<p ref={errorTextRef} className="error-message"></p>
			</div>
		</form>
	);
};
export default LoginPage;
