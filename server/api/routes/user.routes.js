const express = require("express");
const {
	getUsers,
	getUser,
	updateUser,
	postUser,
	deleteUser,
	getReact,
} = require("../controllers/user.controllers");

const userRouter = express.Router();

userRouter.get("/", getReact);
userRouter.get("/users/:id", getUser);
userRouter.get("/users", getUsers);
userRouter.post("/users", postUser);
// userRouter.put("/users/:id", updateUser);
// userRouter.delete("/users", deleteUser);

module.exports = userRouter;
