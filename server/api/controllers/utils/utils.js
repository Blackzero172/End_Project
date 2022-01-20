const User = require("../../../models/user");

const getData = async (id) => {
	let users;
	if (!id) {
		users = await User.find({});
	} else {
		users = await User.find({ Id: id });
	}
	return users;
};
const addUser = async (user) => {
	const newUser = new User(user);
	return newUser;
};
const editUser = async (id, newData) => {
	const user = await User.findByIdAndUpdate(id, newData, { new: true, runValidators: true });
	return user;
};
module.exports = { getData, addUser, editUser };
