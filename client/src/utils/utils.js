import api from "../api/api";
import moment from "moment";
const getUsers = async () => {
	const users = await api.get("/users");
	return users;
};
const sortArray = (isAsc, arr, prop) => {
	const arrCopy = [...arr];
	if (!isAsc) arrCopy.sort((a, b) => b[prop] - a[prop]);
	else arrCopy.sort((a, b) => a[prop] - b[prop]);
	return arrCopy;
};
const capFirstLetter = (string) => {
	return string && string[0].toUpperCase() + string.substring(1);
};
const selectItem = (ref, id) => {
	const refChildren = Array.from(ref.current.children);
	let correctId;
	refChildren.forEach((child) => {
		if (child.getAttribute("userid") !== id) child.classList.remove("selected");
		else {
			correctId = child.getAttribute("userid");
			child.classList.add("selected");
		}
	});
	return correctId;
};
const searchArray = (arr, query) => {
	const newArr = arr.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()));
	return newArr;
};
const doAction = async (id, action, body) => {
	if (action !== "delete" && action !== "create") {
		await api.put(`/accounts/${action}/${id}`, body);
	} else if (action === "delete") {
		await api.delete(`/accounts/${id}`);
	} else {
		const user = await api.post("/accounts", body);
		return user;
	}
};
const onNumberInputChange = (e) => {
	const regex = /[\d]+/g;
	const newArr = e.target.value.split("").filter((x) => x.match(regex));
	e.target.value = newArr.join("");
};
const loginRequest = async (email, password) => {
	const user = await api.post("/users/login", { email, password });
	return user;
};
const logoutRequest = async (token) => {
	const res = await api.post("/users/logout");
	return res;
};
const displayErrorMessage = (ref, message, id) => {
	ref.current.innerText = message;
	id = setTimeout(() => {
		ref.current.innerText = "";
	}, 3000);
	return id;
};
const getWeekDays = (date) => {
	const end = date.endOf("week").toString();
	const currentWeekDay = moment(date.startOf("week").toString());
	const weekDays = [];
	while (currentWeekDay.isBefore(end)) {
		weekDays.push(currentWeekDay.format("dddd D/MM"));
		currentWeekDay.add(1, "d");
	}
	return weekDays;
};
const getDayHours = (date) => {
	const currentHour = moment(date.hour(7));
	const end = date.hour(24).toString();
	const dayHours = [];
	while (currentHour.isBefore(end)) {
		dayHours.push(currentHour.format("hh A"));
		currentHour.add(1, "h");
	}
	return dayHours;
};
export {
	getUsers,
	sortArray,
	capFirstLetter,
	selectItem,
	searchArray,
	doAction,
	onNumberInputChange,
	loginRequest,
	displayErrorMessage,
	logoutRequest,
	getWeekDays,
	getDayHours,
};
