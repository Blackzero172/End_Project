import moment from "moment";
import api from "../../api/api";

import { Route, Switch, useRouteMatch } from "react-router-dom";
import { useEffect, useState } from "react";

import CustomButton from "../../components/CustomButton/CustomButton.components";
import CustomLink from "../../components/CustomLink/CustomLink.components";
import WeekCalendar from "../../components/WeekCalendar/WeekCalendar.components";
import UserCard from "../../components/UserCard/UserCard.components";

import { getWeekDays } from "../../utils/utils";

import "./Dashboard.styles.css";
import axios from "axios";

const Dashboard = ({ setLoading }) => {
	const [users, setUsers] = useState([]);
	const { path, url } = useRouteMatch();

	const today = moment();
	const formattedDate = today.format("MMMM YYYY");
	const weekDays = getWeekDays(today);

	const getUsers = async () => {
		try {
			setLoading();
			const res = await api.get("/users");
			const users = res.data;
			setUsers(users);
		} catch (e) {
			console.error(e.response);
		} finally {
			setLoading();
		}
	};
	const onDelete = async (user) => {
		try {
			const res = await api.delete("/users", { data: { email: user.email } });
			console.log(res);
		} catch (e) {
			console.error(e.response);
		}
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
						<div className="manage-users flex-items flex-column">
							<CustomButton text="Add User" classes="add-btn" />
							<div className="users-container">
								{users.map((user) => {
									return <UserCard user={user} onDelete={onDelete} />;
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
