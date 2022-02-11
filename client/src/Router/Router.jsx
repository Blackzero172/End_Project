import { Switch, Route, Redirect } from "react-router-dom";
import LoginPage from "../pages/LoginPage/LoginPage.pages";
import Dashboard from "../pages/Dashboard/Dashboard.pages";
import HomePage from "../pages/HomePage/HomePage.pages";
import Navbar from "../components/Navbar/Navbar.components";
import SignupPage from "../pages/SignupPage/SignupPage.pages";
import Profile from "../pages/Profile/Profile.pages";
const Router = ({ inputRefs, onLogin, onSignup, onLogout, isLoggedIn, loggedInUser, setLoading }) => {
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
				<Route path="/dashboard">
					{isLoggedIn ? <Dashboard setLoading={setLoading} /> : <Redirect to="/" />}
				</Route>
				<Route path="/signup">
					{isLoggedIn ? (
						<Redirect to="/dashboard" />
					) : (
						<SignupPage inputRefs={inputRefs} onSignup={onSignup} />
					)}
				</Route>
				<Route path="/profile">
					{isLoggedIn ? <Profile loggedInUser={loggedInUser} /> : <Redirect to="/" />}
				</Route>
			</Switch>
		</>
	);
};
export default Router;
