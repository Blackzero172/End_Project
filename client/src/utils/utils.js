import api from "../api/api";

const getUsers = async () => {
	const users = await api.get("/users");
	return users;
};

export { getUsers };
