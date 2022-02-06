const User = require("../../models/user");
const path = require("path");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const getReact = () => {
	return path.resolve(__dirname, "../../../../client/build");
};

const getUsers = async (email) => {
	if (email) {
		if (validator.isEmail(email)) return User.find({ email });
		else throw new Error("Email is invalid");
	} else return User.find({});
};
const addUser = async (user) => {
	const newUser = new User(user);
	return newUser;
};

const verifyToken = async (token) => {
	if (jwt.verify(token, process.env.SECRET_KEY)) {
		user = await User.findByToken(token);
		if (!user) throw new Error("Token has expired");
		return { message: "Logged in!", user, genToken: token };
	} else {
		throw new Error("Token has expired");
	}
};

module.exports = {
	getReact,
	addUser,
	getUsers,
	verifyToken,
};
