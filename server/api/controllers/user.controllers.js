const express = require("express");
const { getData, addUser, editUser } = require("./utils/utils");
const app = express();
app.use(express.json());

const getUsers = async (req, res) => {
	try {
		const users = await getData();
		if (!user[0]) {
			return res.status(404).send("No users found");
		}
		res.send(users);
	} catch (e) {
		res.status(500).send(e.message);
	}
};
const getUser = async (req, res) => {
	try {
		const user = await getData(req.params.id);
		if (!user[0]) {
			return res.status(404).send("No users found");
		}
		res.send(user);
	} catch (e) {
		res.status(500).send(e.message);
	}
};
const postUser = async (req, res) => {
	try {
		const user = await addUser(req.body);
		await user.save();
		res.status(201).send(user);
	} catch (e) {
		if (e.message.includes("E11000")) res.status(400).send("User already exists");
		res.status(500).send(e.message);
	}
};
const putUser = async (req, res) => {
	try {
		const updatedUser = await editUser(req.params.id, req.body);
		res.send(updatedUser);
	} catch (e) {
		res.status(500).send(e.message);
	}
};
module.exports = { getUsers, getUser, postUser };
