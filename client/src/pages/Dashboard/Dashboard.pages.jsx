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
import EditDayPage from "../EditDayPage/EditDayPage.pages";
import CustomButton from "../../components/CustomButton/CustomButton.components";

const Dashboard = ({ setLoading, loggedInUser, inputRefs, onCreateUser, onEditUser, getProfile }) => {
	const [users, setUsers] = useState([]);
	const [schedule, setSchedule] = useState({});
	const [selectedUser, selectUser] = useState({});
	const [selectedDay, selectDay] = useState({});
	const [weekNumber, setWeek] = useState(0);
	const confirmMenuRef = useRef();
	const errorTextRef = useRef();
	const editMenuRef = useRef();
	const { path, url } = useRouteMatch();
	const history = useHistory();

	const today = moment(weekNumber, "ww");
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
	const getSchedule = async () => {
		try {
			setLoading(true);
			const res = await api.post("/schedule/get", {
				startDate: moment(weekNumber, "w").startOf("week").toString(),
			});
			setSchedule(res.data);
		} catch (e) {
			if (e.response.status === 404) {
				const days = [];
				for (let i = 0; i < 7; i++) {
					days.push({ date: moment(weekNumber, "w").add(i, "d").toString() });
				}
				const res = await api.post("/schedule", {
					startDate: moment(weekNumber, "w").startOf("week").toString(),
					endDate: moment(weekNumber, "w").endOf("week").toString(),
					days,
				});
				const schedule = res.data;
				setSchedule(schedule);
			} else console.error(e.response);
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
	const editDay = async (day) => {
		await selectDay(schedule.days[day]);
		editMenuRef.current.classList.remove("hidden");
	};
	const hideEditDay = () => {
		selectDay({});
		editMenuRef.current.classList.add("hidden");
	};
	const onConfirmEditDay = async (day) => {
		setLoading(true);
		try {
			const { morningWorkers, middleWorkers, eveningWorkers } = day;
			const req = {
				startDate: schedule.startDate,
				weekDay: schedule.days.indexOf(selectedDay),
				morningWorkers,
				middleWorkers,
				eveningWorkers,
				users,
			};
			const res = await api.put("/schedule", req);
			setSchedule(res.data);
			getProfile();
			hideEditDay();
		} catch (e) {
			console.error(e.response);
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		try {
			getUsers();
			getSchedule();
			setWeek(moment().week());
		} catch (e) {
			console.error(e.response);
		} // eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	useEffect(() => {
		try {
			getSchedule();
		} catch (e) {
			console.error(e.response);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [weekNumber]);
	return (
		<div className="dashboard">
			<ConfirmActionMenu
				action="Delete"
				menuRef={confirmMenuRef}
				onConfirm={onDelete}
				onCancel={toggleConfirm}
			/>

			<EditDayPage
				users={users}
				day={selectedDay}
				menuRef={editMenuRef}
				onCancel={hideEditDay}
				onConfirm={onConfirmEditDay}
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
						<CustomButton
							onClick={() => {
								setWeek(weekNumber - 1);
							}}
							classes="alt flex-content flex-items minus-btn"
						>
							<i className="fas fa-chevron-left"></i>
						</CustomButton>
						{formattedDate}
						<CustomButton
							onClick={() => {
								setWeek(weekNumber + 1);
							}}
							classes="alt flex-content flex-items plus-btn"
						>
							<i className="fas fa-chevron-right"></i>
						</CustomButton>
					</div>
					<WeekCalendar weekDays={weekDays} schedule={schedule} onClick={editDay} users={users} />
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
