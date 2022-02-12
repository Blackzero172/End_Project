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
const getSchedule = async (req, res) => {
	try {
		const morningWorkers = await User.find({ "shifts.shift.shiftType": "Morning" });
		const middleWorkers = await User.find({ "shifts.shift.shiftType": "Middle" });
		const eveningWorkers = await User.find({ "shifts.shift.shiftType": "Evening" });
		res.send({ morningWorkers, middleWorkers, eveningWorkers });
	} catch (e) {
		res.status(500).send(e.message);
	}
};
const editUser = async (req, res) => {
	try {
		const {
			userEmail,
			newFirstName,
			newLastName,
			newEmail,
			newAccessLevel,
			newPassword,
			newBirthDate,
			newIdNumber,
		} = req.body;
		const user = await User.findOne({ email: userEmail });
		if (!user) return res.status(404).send("User not found");
		user.firstName = newFirstName;
		user.lastName = newLastName;
		user.email = newEmail;
		user.birthDate = newBirthDate;
		user.IdNumber = newIdNumber;
		if (newPassword !== "" && newPassword) {
			console.log("Changed Password");
			user.password = newPassword;
		}
		user.accessLevel = newAccessLevel;
		await user.save();
		res.send(user);
	} catch (e) {
		res.status(500).send("NOPE");
	}
};
const editProfile = async (req, res) => {
	const user = req.user;
	const { newFirstName, newLastName, newEmail, newPassword, newBirthDate, newIdNumber } = req.body;
	user.firstName = newFirstName;
	user.lastName = newLastName;
	user.email = newEmail;
	user.birthDate = newBirthDate;
	user.IdNumber = newIdNumber;
	if (newPassword !== "" && newPassword) {
		console.log("Changed Password");
		user.password = newPassword;
	}
	await user.save();
	res.send(user);
};
const login = async (req, res) => {
	const { email, password } = req.body;
	const { token } = req.cookies;
	let user;
	try {
		if (token) {
			const verify = await verifyToken(token);
			return res.send(verify);
		}
		user = await User.findByCredentials(email, password);
		const genToken = await user.generateToken();
		res.cookie("token", genToken, {
			httpOnly: true,
			sameSite: "lax",
		});
		res.send({ message: "Logged in!", user });
	} catch (e) {
		if (e.message.includes("expired")) {
			res.clearCookie("token");
			const user = await User.findByToken(token);
			if (user) {
				user.tokens = user.tokens.filter((currentToken) => currentToken.token !== token);
				await user.save();
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
		const { token } = req.cookies;
		const user = await addUser(req.body);
		const genToken = await user.generateToken();
		if (!token) {
			res.cookie("token", genToken, {
				sameSite: "lax",
			});
			res.status(201).send({ user, genToken });
		} else res.status(201).send({ user });
	} catch (e) {
		console.log(e.message);
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
		// const { email } = req.body;
		const { email } = req.body;
		console.log(req.header("Content-Type"));
		console.log(req.body);
		const user = await User.findOneAndDelete({ email });
		if (!user) return res.status(404).send("User doesn't Exist!");
		res.send(`Deleted User`);
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
	getSchedule,
};
