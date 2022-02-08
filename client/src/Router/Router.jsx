import { Switch, Route, Redirect } from "react-router-dom";
import LoginPage from "../pages/LoginPage/LoginPage.pages";
import Dashboard from "../pages/Dashboard/Dashboard.pages";
import HomePage from "../pages/HomePage/HomePage.pages";
import Navbar from "../components/Navbar/Navbar.components";
import SignupPage from "../pages/SignupPage/SignupPage.pages";
const Router = ({ inputRefs, onLogin, onSignup, onLogout, loggedIn, username }) => {
	return (
		<>
			{loggedIn && <Redirect to="/dashboard" />}
			<Navbar loggedIn={loggedIn} username={username} onLogout={onLogout} />
			<Switch>
				<Route path="/" exact>
					<HomePage loggedIn={loggedIn} />
				</Route>
				<Route path="/login">
					<LoginPage inputRefs={inputRefs} onLogin={onLogin} />
				</Route>
				<Route path="/dashboard">
					<Dashboard />
				</Route>
				<Route path="/signup">
					<SignupPage inputRefs={inputRefs} onSignup={onSignup} />
				</Route>
			</Switch>
		</>
	);
};
export default Router;
