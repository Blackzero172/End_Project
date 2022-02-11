import moment from "moment";
import api from "../../api/api";

import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import CustomButton from "../../components/CustomButton/CustomButton.components";
import CustomLink from "../../components/CustomLink/CustomLink.components";
import WeekCalendar from "../../components/WeekCalendar/WeekCalendar.components";
import UserCard from "../../components/UserCard/UserCard.components";
import ConfirmActionMenu from "../../components/ConfirmActionMenu/ConfirmActionMenu.components";

import { getWeekDays } from "../../utils/utils";

import "./Dashboard.styles.css";
import CreateUserPage from "../CreateUserPage/CreateUserPage.pages";

const Dashboard = ({ setLoading, loggedInUser, inputRefs, onCreateUser }) => {
	const [users, setUsers] = useState([]);
	const [selectedUser, selectUser] = useState({});
	const [isEditing, setEdit] = useState(false);
	const confirmMenuRef = useRef();
	const { path, url } = useRouteMatch();

	const today = moment();
	const formattedDate = today.format("MMMM YYYY");
	const weekDays = getWeekDays(today);

	const getUsers = async () => {
		try {
			setLoading(true);
			const res = await api.get("/users");
			const users = res.data;
			setUsers(users);
		} catch (e) {
			console.error(e.response);
		} finally {
			setLoading(false);
		}
	};
	const onDelete = async () => {
		try {
			setLoading(true);
			const res = await api.delete("/users", { data: { email: selectedUser.email } });
			getUsers();
		} catch (e) {
			console.error(e.response);
		}
	};
	const toggleConfirm = (isShown, user) => {
		if (isShown) {
			selectUser(user);
			confirmMenuRef.current.classList.remove("hidden");
		} else if (!isShown) {
			selectUser({});
			confirmMenuRef.current.classList.add("hidden");
		}
	};
	const setupEdit = (isEdit = false, user = {}) => {
		selectUser(user);
		setEdit(isEdit);
	};
	useEffect(() => {
		getUsers();
	}, []);

	return (
		<div className="dashboard">
			<ConfirmActionMenu
				action="Delete"
				menuRef={confirmMenuRef}
				onConfirm={onDelete}
				onCancel={toggleConfirm}
			/>
			<ul className="side-menu">
				<li>
					<CustomLink text="Schedule" path={url} />
				</li>
				<li>
					<CustomLink text="Manage" path={`${url}/manage`} />
				</li>
			</ul>
			<div className="main-content flex-items flex-column">
				{isEditing && <Redirect to={`${url}/create`} />}
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
						<CustomLink text="Add User" path={`${url}/create`} classes="add-btn flex-content" />
						<div className="users-container">
							{users.map((user) => {
								if (user.IdNumber !== loggedInUser.IdNumber)
									return <UserCard user={user} onDelete={toggleConfirm} onEdit={setupEdit} />;
							})}
						</div>
					</div>
				</Route>
				<Route path={`${url}/create`}>
					<CreateUserPage inputRefs={inputRefs} onCreateUser={onCreateUser} />
				</Route>
			</div>
		</div>
	);
};

export default Dashboard;
