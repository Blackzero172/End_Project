import moment from "moment";
import api from "../../api/api";

import { Route, useRouteMatch, useHistory } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import CustomLink from "../../components/CustomLink/CustomLink.components";
import WeekCalendar from "../../components/WeekCalendar/WeekCalendar.components";
import UserCard from "../../components/UserCard/UserCard.components";
import ConfirmActionMenu from "../../components/ConfirmActionMenu/ConfirmActionMenu.components";

import { getWeekDays } from "../../utils/utils";

import "./Dashboard.styles.css";
import CreateUserPage from "../CreateUserPage/CreateUserPage.pages";

const Dashboard = ({ setLoading, loggedInUser, inputRefs, onCreateUser, onEditUser }) => {
	const [users, setUsers] = useState([]);
	const [selectedUser, selectUser] = useState({});
	const confirmMenuRef = useRef();
	const errorTextRef = useRef();
	const { path, url } = useRouteMatch();
	const history = useHistory();

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
			await api.delete("/users", { data: { email: selectedUser.email } });
			toggleConfirm(false);
			await getUsers();
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
	const setupEdit = (user = {}) => {
		selectUser(user);
	};
	const onConfirmCreate = async () => {
		const message = await onCreateUser();
		await getUsers();
		if (!message) {
			history.push("/dashboard/manage");
		} else {
			errorTextRef.current.innerText = message;
			errorTextRef.current.classList.remove("hidden");
			setTimeout(() => {
				errorTextRef.current.classList.add("hidden");
			}, 2000);
		}
	};
	const onConfirmEdit = async (email) => {
		const message = await onEditUser(email);
		await getUsers();
		if (!message) {
			history.push("/dashboard/manage");
		} else {
			errorTextRef.current.innerText = message.includes("Id") ? "Invalid ID Number" : message;
			errorTextRef.current.classList.remove("hidden");
			setTimeout(() => {
				errorTextRef.current.classList.add("hidden");
			}, 2000);
		}
	};
	useEffect(() => {
		getUsers();
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
					<CustomLink text="Schedule" path={url} onClick={setupEdit} classes="dash" />
				</li>
				{loggedInUser.accessLevel === "Manager" && (
					<li>
						<CustomLink text="Manage" path={`${url}/manage`} onClick={setupEdit} classes="dash" />
					</li>
				)}
			</ul>
			<div className="main-content flex-items flex-column">
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
						<CustomLink
							text="Add User"
							path={`${url}/create`}
							classes="add-btn flex-content dash"
							onClick={setupEdit}
						/>
						<div className="users-container">
							{users.map((user) => {
								if (user.IdNumber !== loggedInUser.IdNumber)
									return <UserCard user={user} key={user._id} onDelete={toggleConfirm} onEdit={setupEdit} />;
								else {
									return <></>;
								}
							})}
						</div>
					</div>
				</Route>
				<Route path={`${path}/create`}>
					<CreateUserPage inputRefs={inputRefs} onCreateUser={onConfirmCreate} errorTextRef={errorTextRef} />
				</Route>
				<Route path={`${path}/edit`}>
					<CreateUserPage
						inputRefs={inputRefs}
						onCreateUser={onConfirmCreate}
						selectedUser={selectedUser}
						onEditUser={onConfirmEdit}
						errorTextRef={errorTextRef}
					/>
				</Route>
			</div>
		</div>
	);
};

export default Dashboard;
