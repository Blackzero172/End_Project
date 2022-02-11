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
	const setLoading = (isShown) => {
		if (isShown) spinnerRef.current.classList.remove("hidden");
		else if (!isShown) spinnerRef.current.classList.add("hidden");
	};
	const onLogin = async () => {
		setLoading(true);
		const [emailInput, passInput] = [emailRef.current, passRef.current];
		let credentials;
		if (emailInput) {
			credentials = { email: emailInput.value, password: passInput.value };
		}
		try {
			const res = await api.post("/users/login", credentials);
			const user = res.data.user;
			setUser(user);
		} catch (e) {
			console.error(e.response.data);
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		onLogin();
	}, []);
	const onSignup = async () => {
		setLoading(true);
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
			setLoading(false);
		}
	};
	const onLogout = async () => {
		setLoading(true);
		try {
			const res = await api.post("/users/logout");
			console.log(res);
			setUser({});
		} catch (e) {
			console.error(e.response.data);
		} finally {
			setLoading(false);
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
				setLoading={setLoading}
			/>
			<Spinner spinnerRef={spinnerRef} />
		</BrowserRouter>
	);
}

export default App;
