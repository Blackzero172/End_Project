import "./LoginPage.styles.css";
import CustomInput from "../../components/CustomInput/CustomInput.components";
import CustomButton from "../../components/CustomButton/CustomButton.components";
import { useRef } from "react";
import CustomLink from "../../components/CustomLink/CustomLink.components";
const LoginPage = ({ onLogin, inputRefs }) => {
	const { emailRef, passRef } = inputRefs;
	const errorTextRef = useRef();
	const formRef = useRef();
	const handleFormSubmit = async (e) => {
		e.preventDefault();
		const message = await onLogin();
		console.log(errorTextRef);
		if (message) {
			errorTextRef.current.innerText = message;
			errorTextRef.current.classList.remove("hidden");
			setTimeout(() => {
				errorTextRef.current.classList.add("hidden");
			}, 2000);
		}
	};
	return (
		<form className="login-page flex-both flex-column" onSubmit={handleFormSubmit} ref={formRef}>
			<div className="background"></div>
			<div className="window flex-both flex-column">
				<p ref={errorTextRef} className="error-message hidden"></p>
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
			</div>
			<p>
				Don't have an account? <CustomLink text="Signup" path="/signup" />
			</p>
		</form>
	);
};
export default LoginPage;
