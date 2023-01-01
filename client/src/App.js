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
	const accessRef = useRef();
	const spinnerRef = useRef();
	const inputRefs = {
		firstNameRef,
		lastNameRef,
		idNumberRef,
		birthDateRef,
		emailRef,
		passRef,
		accessRef,
	};

	const setLoading = (isShown) => {
		if (isShown) spinnerRef.current.classList.remove("hidden");
		else if (!isShown) spinnerRef.current?.classList.add("hidden");
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
			return e.response.data;
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		onLogin();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const onSignup = async () => {
		setLoading(true);
		const [firstNameInput, lastNameInput, idNumberInput, birthDateInput, emailInput, passInput, accessInput] =
			[
				firstNameRef.current,
				lastNameRef.current,
				idNumberRef.current,
				birthDateRef.current,
				emailRef.current,
				passRef.current,
				accessRef.current,
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
		if (accessInput) {
			credentials.accessLevel = accessInput.checked ? "Manager" : "User";
		}
		try {
			const res = await api.post("/users/signup", credentials);
			if (!loggedInUser.hasOwnProperty("email")) setUser(res.data.user);
		} catch (e) {
			if (e.response.data.includes("Id")) return "Invalid ID Number";
			else return e.response.data;
		} finally {
			setLoading(false);
		}
	};

	const onEditUser = async (email) => {
		setLoading(true);
		const [firstNameInput, lastNameInput, idNumberInput, birthDateInput, emailInput, passInput, accessInput] =
			[
				firstNameRef.current,
				lastNameRef.current,
				idNumberRef.current,
				birthDateRef.current,
				emailRef.current,
				passRef.current,
				accessRef.current,
			];

		const credentials = {
			userEmail: email,
			newFirstName: firstNameInput.value,
			newLastName: lastNameInput.value,
			newIdNumber: idNumberInput.value,
			newBirthDate: birthDateInput.value,
			newEmail: emailInput.value,
			newAccessLevel: accessInput.checked ? "Manager" : "User" || "User",
		};
		if (passInput.value !== "") {
			credentials.newPassword = passInput.value;
		}
		try {
			await api.put("/users", credentials);
		} catch (e) {
			return e.response.data;
		} finally {
			setLoading(false);
		}
	};

	const onEditProfile = async () => {
		setLoading(true);
		const [firstNameInput, lastNameInput, idNumberInput, birthDateInput, emailInput, passInput] = [
			firstNameRef.current,
			lastNameRef.current,
			idNumberRef.current,
			birthDateRef.current,
			emailRef.current,
			passRef.current,
			accessRef.current,
		];

		const credentials = {
			newFirstName: firstNameInput.value,
			newLastName: lastNameInput.value,
			newIdNumber: idNumberInput.value,
			newBirthDate: birthDateInput.value,
			newEmail: emailInput.value,
		};
		if (passInput.value !== "") {
			credentials.newPassword = passInput.value;
		}
		try {
			await api.put("/users/me", credentials);
			const res = await api.get("/users/me");
			const user = res.data;
			setUser(user);
		} catch (e) {
			return e.response.data;
		} finally {
			setLoading(false);
		}
	};

	const onLogout = async () => {
		setLoading(true);
		try {
			await api.post("/users/logout");
			setUser({});
		} catch (e) {
			console.error(e.response.data);
		} finally {
			setLoading(false);
		}
	};
	const getProfile = async () => {
		const user = await api.get("/users/me");
		setUser(user.data);
	};
	return (
		<BrowserRouter>
			<Router
				inputRefs={inputRefs}
				onLogin={onLogin}
				onSignup={onSignup}
				isLoggedIn={loggedInUser?.hasOwnProperty("firstName") || false}
				loggedInUser={loggedInUser}
				onLogout={onLogout}
				setLoading={setLoading}
				onEditUser={onEditUser}
				onEditProfile={onEditProfile}
				getProfile={getProfile}
			/>
			<Spinner spinnerRef={spinnerRef} />
		</BrowserRouter>
	);
}

export default App;
