import api from "../api/api";

const getUsers = async () => {
	const users = await api.get("/users");
	return users;
};
const sortArray = (isAsc, arr, prop) => {
	if (isAsc) arr.sort((a, b) => a[prop] - b[prop]);
	else arr.sort((a, b) => b[prop] - a[prop]);
	return arr;
};
export { getUsers, sortArray };
