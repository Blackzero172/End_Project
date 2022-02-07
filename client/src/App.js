import "./App.css";
import Router from "./Router/Router";
import Spinner from "./components/Spinner/Spinner.components";
import { BrowserRouter } from "react-router-dom";
import api from "./api/api";
import { useEffect, useRef, useState } from "react";
function App() {
	const [loggedInUser, setUser] = useState({});
	const nameRef = useRef();
	const emailRef = useRef();
	const passRef = useRef();
	const spinnerRef = useRef();
	const inputRefs = {
		nameRef,
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
		const [nameInput, emailInput, passInput] = [nameRef.current, emailRef.current, passRef.current];
		const credentials = { name: nameInput.value, email: emailInput.value, password: passInput.value };
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
				loggedIn={loggedInUser.hasOwnProperty("name")}
				username={loggedInUser.name}
				onLogout={onLogout}
			/>
			<Spinner spinnerRef={spinnerRef} />
		</BrowserRouter>
	);
}

export default App;
