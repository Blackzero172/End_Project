const express = require("express");
const {
	getData,
	addAccount,
	deleteAccount,
	withdraw,
	deposit,
	setCredit,
	transfer,
} = require("./utils/utils");
const app = express();
app.use(express.json());

const getAccounts = async (req, res) => {
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
const getAccount = async (req, res) => {
	try {
		const account = await getData(req.params.id);
		if (!user) {
			return res.status(404).send("No users found");
		}
		res.send(account);
	} catch (e) {
		res.status(500).send(e.message);
	}
};
const postAccount = async (req, res) => {
	try {
		const account = await addAccount(req.body);
		await account.save();
		res.status(201).send(account);
	} catch (e) {
		if (e.message.includes("E11000")) return res.status(400).send("Account already exists");
		res.status(500).send(e);
	}
};
const removeAccount = async (req, res) => {
	const { id } = req.params;
	try {
		const account = await deleteAccount(id);
		if (!account) {
			return res.status(404).send("No users found");
		}
		res.send(account);
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
		case "credit":
			actionFunction = setCredit;
			break;
	}

	try {
		const targetID = req.body.targetID;
		let accounts = [];
		if (!targetID) {
			accounts = await actionFunction(id, amount);
		} else {
			accounts = await actionFunction(id, targetID, amount);
		}
		res.send(accounts);
	} catch (e) {
		if (e.message.includes("validation") || e.message.includes("Not")) return res.status(400).send(e.message);
		else if (e.message.includes("null")) return res.status(404).send("Account not found");
		res.status(500).send(e.message);
	}
};
module.exports = { getAccounts, getAccount, postAccount, doAction, removeAccount };
