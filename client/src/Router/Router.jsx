import { Switch, Route, Redirect } from "react-router-dom";
import LoginPage from "../pages/LoginPage/LoginPage.pages";
import Dashboard from "../pages/Dashboard/Dashboard.pages";
import HomePage from "../pages/HomePage/HomePage.pages";
import Navbar from "../components/Navbar/Navbar.components";
import SignupPage from "../pages/SignupPage/SignupPage.pages";
import Profile from "../pages/Profile/Profile.pages";
const Router = ({ inputRefs, onLogin, onSignup, onLogout, isLoggedIn, loggedInUser }) => {
	return (
		<>
			{isLoggedIn && <Redirect to="/dashboard" />}
			<Navbar isLoggedIn={isLoggedIn} username={isLoggedIn && loggedInUser.name} onLogout={onLogout} />
			<Switch>
				<Route path="/" exact>
					<HomePage isLoggedIn={isLoggedIn} />
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
				<Route path="/profile">
					<Profile loggedInUser={loggedInUser} />
				</Route>
			</Switch>
		</>
	);
};
export default Router;
