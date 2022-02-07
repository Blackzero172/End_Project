import { Switch, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage/LoginPage.pages";
import Dashboard from "../pages/Dashboard/Dashboard.pages";
import HomePage from "../pages/HomePage/HomePage.pages";
import Navbar from "../components/Navbar/Navbar.components";
import SignupPage from "../pages/SignupPage/SignupPage.pages";
const Router = ({ inputRefs, onLogin }) => {
	return (
		<>
			<Navbar />
			<Switch>
				<Route path="/" exact>
					<HomePage />
				</Route>
				<Route path="/login">
					<LoginPage inputRefs={inputRefs} onLogin={onLogin} />
				</Route>
				<Route path="/dashboard">
					<Dashboard />
				</Route>
				<Route path="/signup">
					<SignupPage />
				</Route>
			</Switch>
		</>
	);
};
export default Router;
