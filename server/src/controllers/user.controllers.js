const express = require("express");
const User = require("../models/user");
const { addUser, getUsers, verifyToken } = require("./utils/utils");
const app = express();
app.use(express.json());

const getAllUsers = async (req, res) => {
	try {
		const { email } = req.body;
		const users = await getUsers(email);
		if (users.length < 1) return res.status(404).send("No Users Found");
		res.send(users);
	} catch (e) {
		if (e.message.includes("invalid")) return res.status(400).send(e.message);
		res.status(500).send(e.message);
	}
};
const getProfile = (req, res) => {
	const user = req.user;
	res.send(user);
};
const editUser = async (req, res) => {
	try {
		const { userEmail, newName, newEmail, newAccessLevel } = req.body;
		const user = await User.findOne({ email: userEmail });
		user.name = newName;
		user.email = newEmail;
		user.accessLevel = newAccessLevel;
		await user.save();
		res.send(user);
	} catch (e) {
		res.status(500).send(e.message);
	}
};
const editProfile = async (req, res) => {
	const user = req.user;
	const { name = user.name, email = user.email, password = user.password } = req.body;
	user.name = name;
	user.email = email;
	user.password = password;
	await user.save();
	res.send(user);
};
const login = async (req, res) => {
	const { email, password } = req.body;
	const { token } = req.cookies;
	let user;
	try {
		if (token) {
			return res.send(await verifyToken(token));
		}
		user = await User.findByCredentials(email, password);
		const genToken = await user.generateToken();
		res.cookie("token", genToken, {
			sameSite: "lax",
		});
		res.send({ message: "Logged in!", user });
	} catch (e) {
		if (e.message.includes("expired")) {
			const user = await User.findByToken(token);
			if (user) {
				user.tokens = user.tokens.filter((currentToken) => currentToken.token !== token);
				await user.save();
				res.clearCookie();
			}
		}
		res.status(500).send(e.message);
	}
};

const logout = async (req, res) => {
	try {
		const { user, token } = req;
		user.tokens = user.tokens.filter((currentToken) => currentToken.token !== token);
		await user.save();
		res.clearCookie("token");
		res.send("Logged out!");
	} catch (e) {
		res.status(500).send(e.message);
	}
};

const postShift = async (req, res) => {
	try {
		const { shiftDate, shiftType, userEmail } = req.body;
		const user = await User.findOne({ email: userEmail });
		const shift = await user.addShift(shiftDate, shiftType);
		res.status(201).send({ user, shift });
	} catch (e) {
		if (e.message.includes("validation")) return res.status(400).send(e.message);
		res.status(500).send(e.message);
	}
};

const postUser = async (req, res) => {
	try {
		const user = await addUser(req.body);
		const genToken = await user.generateToken();
		res.cookie("token", genToken, {
			sameSite: "lax",
		});
		res.status(201).send({ user, genToken });
	} catch (e) {
		if (e.message.includes("E11000")) return res.status(400).send("User already exists");
		res.status(500).send(e.message);
	}
};

const removeShift = async (req, res) => {
	try {
		const { shiftID, userEmail } = req.body;
		const user = await User.findOne({ email: userEmail });
		user.shifts = user.shifts.filter((currentShift) => currentShift._id.toString() !== shiftID);
		await user.save();
		res.send("Deleted Shift");
	} catch (e) {
		res.status(500).send(e.message);
	}
};

const removeUser = async (req, res) => {
	try {
		const { userEmail } = req.body;
		const user = await User.findOneAndDelete({ email: userEmail });
		res.send(`Deleted User ${user.name} `);
	} catch (e) {
		res.status(500).send(e.message);
	}
};
module.exports = {
	getAllUsers,
	postUser,
	login,
	logout,
	postShift,
	removeShift,
	editUser,
	removeUser,
	editProfile,
	getProfile,
};
