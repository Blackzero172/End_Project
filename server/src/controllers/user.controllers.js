const express = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { addUser, getUsers } = require("./utils/utils");
const res = require("express/lib/response");
const app = express();
app.use(express.json());

const getAllUsers = async (req, res) => {
	try {
		const users = await getUsers();
		res.send(users);
	} catch (e) {
		res.status(500).send(e.message);
	}
};
const getProfile = (req, res) => {
	const user = req.user;
	res.send(user);
};
const editUser = async (req, res) => {
	try {
		const { userID, name, email, accessLevel } = req.body;
		const user = User.findById(userID);
		user.name = name;
		user.email = email;
		user.accessLevel = accessLevel;
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
	const { email, password, token } = req.body;
	let user;
	try {
		if (token) {
			if (jwt.verify(token, process.env.SECRET_KEY)) {
				user = await User.findByToken(token);
				if (!user) throw new Error("Token has expired");
				return res.send({ message: "Logged in!", user, genToken: token });
			} else {
				throw new Error("Token has expired");
			}
		}
		user = await User.findByCredentials(email, password);
		const genToken = await user.generateToken();
		res.send({ message: "Logged in!", user, genToken: genToken });
	} catch (e) {
		if (e.message.includes("expired")) {
			const user = await User.findByToken(token);
			if (user) {
				user.tokens = user.tokens.filter((currentToken) => currentToken.token !== token);
				await user.save();
			}
		}
		res.status(400).send(e.message);
	}
};

const logout = async (req, res) => {
	try {
		const { user, token } = req;
		user.tokens = user.tokens.filter((currentToken) => currentToken.token !== token);
		await user.save();
		res.send("Logged out!");
	} catch (e) {
		res.status(500).send(e.message);
	}
};

const postShift = async (req, res) => {
	try {
		const { shiftDate, shiftType } = req.body;
		const user = req.user;
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
		res.status(201).send({ user, genToken });
	} catch (e) {
		if (e.message.includes("E11000")) return res.status(400).send("User already exists");
		res.status(500).send(e.message);
	}
};

const removeShift = async (req, res) => {
	try {
		const user = req.user;
		const { shiftID } = req.body;
		user.shifts = user.shifts.filter((currentShift) => currentShift._id.toString() !== shiftID);
		await user.save();
		res.send("Deleted Shift");
	} catch (e) {
		res.status(500).send(e.message);
	}
};

const removeUser = async (req, res) => {
	try {
		const { userID } = req.body;
		const user = await User.findByIdAndDelete(userID);
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
