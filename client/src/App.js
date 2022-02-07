import "./App.css";
import Router from "./Router/Router";
import Spinner from "./components/Spinner/Spinner.components";
import { BrowserRouter } from "react-router-dom";
import api from "./api/api";
import { useRef } from "react";
function App() {
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
		const [emailInput, passInput] = [emailRef.current, passRef.current];
		const credentials = { email: emailInput.value, password: passInput.value };
		try {
			console.log(credentials);
			const user = await api.post("/users/login", credentials);
			console.log(user);
		} catch (e) {
			console.error(e.response.data);
		}
	};
	return (
		<BrowserRouter>
			<Router inputRefs={inputRefs} onLogin={onLogin} />
			<Spinner spinnerRef={spinnerRef} />
		</BrowserRouter>
	);
}

export default App;
