import { Switch, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage/LoginPage.pages";
import Dashboard from "../pages/Dashboard/Dashboard.pages";
import HomePage from "../pages/HomePage/HomePage.pages";
import Navbar from "../components/Navbar/Navbar.components";

const Router = () => {
	return (
		<>
			<Navbar />
			<Switch>
				<Route path="/" exact>
					<HomePage />
				</Route>
				<Route path="/login">
					<LoginPage />
				</Route>
				<Route path="/dashboard">
					<Dashboard />
				</Route>
			</Switch>
		</>
	);
};
export default Router;
