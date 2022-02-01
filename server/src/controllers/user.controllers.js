const express = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { addUser } = require("./utils/utils");
const app = express();
app.use(express.json());

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
				user.tokens = user.tokens.filter((filToken) => filToken.token !== token);
				await user.save();
			}
		}
		res.status(400).send(e.message);
	}
};

const logout = async (req, res) => {
	try {
		req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token);
		await req.user.save();
		res.send("Logged out!");
	} catch (e) {
		res.status(500).send(e.message);
	}
};

module.exports = { postUser, login, logout };
