const express = require("express");
const auth = require("../middleware/auth");
const checkPermissions = require("../middleware/checkPermissions");
const {
	postUser,
	login,
	logout,
	postShift,
	removeShift,
	getAllUsers,
	editUser,
} = require("../controllers/user.controllers");

const UserRouter = express.Router();

UserRouter.get("/users", [auth, checkPermissions], getAllUsers);
UserRouter.put("/users", [auth, checkPermissions], editUser);
UserRouter.post("/users/login", login);
UserRouter.post("/users/signup", auth, postUser);
UserRouter.post("/users/logout", auth, logout);
UserRouter.post("/users/shifts", [auth, checkPermissions], postShift);
UserRouter.delete("/users/shifts", auth, removeShift);

module.exports = UserRouter;
