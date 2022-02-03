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
	removeUser,
	editProfile,
	getProfile,
} = require("../controllers/user.controllers");

const UserRouter = express.Router();

UserRouter.get("/users", [auth, checkPermissions], getAllUsers);
UserRouter.get("/users/me", auth, getProfile);

UserRouter.post("/users/login", login);
UserRouter.post("/users/signup", auth, postUser);
UserRouter.post("/users/logout", auth, logout);
UserRouter.post("/users/shifts", [auth, checkPermissions], postShift);

UserRouter.put("/users", [auth, checkPermissions], editUser);
UserRouter.put("/users/me", auth, editProfile);

UserRouter.delete("/users", [auth, checkPermissions], removeUser);
UserRouter.delete("/users/shifts", [auth, checkPermissions], removeShift);

module.exports = UserRouter;
