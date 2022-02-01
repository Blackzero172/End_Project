const User = require("../../models/user");
const path = require("path");

const getReact = () => {
	return path.resolve(__dirname, "../../../../client/build");
};

const addUser = async (user) => {
	const newUser = new User(user);
	return newUser;
};

module.exports = {
	getReact,
	addUser,
};
