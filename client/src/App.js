import "./App.css";
import "./utils/utils.css";
import Router from "./Router/Router";
import Spinner from "./components/Spinner/Spinner.components";
import { BrowserRouter } from "react-router-dom";
import api from "./api/api";
import { useEffect, useRef, useState } from "react";
function App() {
	const [loggedInUser, setUser] = useState({});
	const firstNameRef = useRef();
	const lastNameRef = useRef();
	const idNumberRef = useRef();
	const birthDateRef = useRef();
	const emailRef = useRef();
	const passRef = useRef();
	const spinnerRef = useRef();
	const inputRefs = {
		firstNameRef,
		lastNameRef,
		idNumberRef,
		birthDateRef,
		emailRef,
		passRef,
	};
	const setLoading = () => {
		spinnerRef.current.classList.toggle("hidden");
	};
	const onLogin = async () => {
		setLoading();
		const [emailInput, passInput] = [emailRef.current, passRef.current];
		let credentials;
		if (emailInput) {
			credentials = { email: emailInput.value, password: passInput.value };
		}
		try {
			const res = await api.post("/users/login", credentials);
			setUser(res.data.user);
		} catch (e) {
			console.error(e.response.data);
		} finally {
			setLoading();
		}
	};
	useEffect(() => {
		onLogin();
	}, []);
	const onSignup = async () => {
		setLoading();
		const [firstNameInput, lastNameInput, idNumberInput, birthDateInput, emailInput, passInput] = [
			firstNameRef.current,
			lastNameRef.current,
			idNumberRef.current,
			birthDateRef.current,
			emailRef.current,
			passRef.current,
		];
		const credentials = {
			firstName: firstNameInput.value,
			lastName: lastNameInput.value,
			IdNumber: idNumberInput.value,
			birthDate: birthDateInput.value,
			email: emailInput.value,
			password: passInput.value,
			createdAt: new Date(),
		};
		try {
			const res = await api.post("/users/signup", credentials);
			setUser(res.data.user);
		} catch (e) {
			console.error(e.response.data);
		} finally {
			setLoading();
		}
	};
	const onLogout = async () => {
		setLoading();
		try {
			const res = await api.post("/users/logout");
			console.log(res);
			setUser({});
		} catch (e) {
			console.error(e.response.data);
		} finally {
			setLoading();
		}
	};
	return (
		<BrowserRouter>
			<Router
				inputRefs={inputRefs}
				onLogin={onLogin}
				onSignup={onSignup}
				isLoggedIn={loggedInUser.hasOwnProperty("firstName")}
				loggedInUser={loggedInUser}
				onLogout={onLogout}
			/>
			<Spinner spinnerRef={spinnerRef} />
		</BrowserRouter>
	);
}

export default App;
