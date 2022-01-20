const express = require("express");
const { getData, addUser, deleteUser, withdraw, deposit, setCredit, transfer } = require("./utils/utils");
const app = express();
app.use(express.json());

const getUsers = async (req, res) => {
	try {
		const users = await getData();
		if (!users[0]) {
			return res.status(404).send("No users found");
		}
		res.send(users);
	} catch (e) {
		res.status(500).send(e.message);
		console.log(e);
	}
};
const getUser = async (req, res) => {
	try {
		const user = await getData(req.params.id);
		if (!user) {
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
		if (e.message.includes("E11000")) return res.status(400).send("User already exists");
		res.status(500).send(e);
	}
};
const removeUser = async (req, res) => {
	const { id } = req.params;
	try {
		const user = await deleteUser(id);
		if (!user) {
			return res.status(404).send("No users found");
		}
		res.send(user);
	} catch (e) {
		res.status(500).send(e.message);
	}
};
const doAction = async (req, res) => {
	const { id, action } = req.params;
	const amount = req.body.amount;
	let actionFunction;
	switch (action) {
		case "withdraw":
			actionFunction = withdraw;
			break;
		case "deposit":
			actionFunction = deposit;
			break;
		case "transfer":
			actionFunction = transfer;
			break;
		case "setCredit":
			actionFunction = setCredit;
			break;
	}

	try {
		const targetID = req.body.targetID;
		let users = [];
		if (!targetID) {
			users = await actionFunction(id, amount);
		} else {
			users = await actionFunction(id, targetID, amount);
		}
		if (!users[0]) {
			return res.status(404).send("User not found");
		}
		res.send(users);
	} catch (e) {
		if (e.message.includes("validation") || e.message.includes("Not")) return res.status(400).send(e.message);
		res.status(500).send(e.message);
	}
};
module.exports = { getUsers, getUser, postUser, doAction, removeUser };
