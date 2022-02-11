import "./Dashboard.styles.css";
import CustomButton from "../../components/CustomButton/CustomButton.components";
import CustomLink from "../../components/CustomLink/CustomLink.components";
import moment from "moment";
import { getWeekDays } from "../../utils/utils";
import WeekCalendar from "../../components/WeekCalendar/WeekCalendar.components";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/api";
const Dashboard = ({ setLoading }) => {
	const today = moment();
	const formattedDate = today.format("MMMM YYYY");
	const weekDays = getWeekDays(today);
	const { path, url } = useRouteMatch();
	const [users, setUsers] = useState([]);
	const getUsers = async () => {
		const res = await api.get("/users");
		const users = res.data;
		setUsers(users);
	};
	useEffect(() => {
		getUsers();
	}, []);
	return (
		<div className="dashboard">
			<ul className="side-menu">
				<li>
					<CustomLink text="Schedule" path={url} />
				</li>
				<li>
					<CustomLink text="Manage" path={`${url}/manage`} />
				</li>
			</ul>
			<div className="main-content flex-items flex-column">
				<Switch>
					<Route path={path} exact>
						<div className="month-selector flex-content">
							<i className="fas fa-chevron-left"></i>
							{formattedDate}
							<i className="fas fa-chevron-right"></i>
						</div>
						<WeekCalendar weekDays={weekDays} />
					</Route>
					<Route path={`${path}/manage`}>
						<div className="manage-users">
							<CustomButton text="Add User" />
							<div className="users-container">
								{users.map((user) => {
									return <p>{user.firstName}</p>;
								})}
							</div>
						</div>
					</Route>
				</Switch>
			</div>
		</div>
	);
};
export default Dashboard;
