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
			<Navbar
				isLoggedIn={isLoggedIn}
				username={isLoggedIn && `${loggedInUser.firstName} ${loggedInUser.lastName}`}
				onLogout={onLogout}
			/>
			<Switch>
				<Route path="/" exact>
					<HomePage isLoggedIn={isLoggedIn} />
				</Route>
				<Route path="/login">
					{isLoggedIn ? <Redirect to="/dashboard" /> : <LoginPage inputRefs={inputRefs} onLogin={onLogin} />}
				</Route>
				<Route path="/dashboard">{isLoggedIn ? <Dashboard /> : <Redirect to="/" />}</Route>
				<Route path="/signup">
					<SignupPage inputRefs={inputRefs} onSignup={onSignup} />
				</Route>
				<Route path="/profile">
					{isLoggedIn ? <Profile loggedInUser={loggedInUser} /> : <Redirect to="/" />}
				</Route>
			</Switch>
		</>
	);
};
export default Router;
