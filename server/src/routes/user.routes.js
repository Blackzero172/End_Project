const express = require("express");
const auth = require("../middleware/auth");
const { postUser, login, logout } = require("../controllers/user.controllers");

const UserRouter = express.Router();

UserRouter.post("/users/login", login);
UserRouter.post("/users/signup", auth, postUser);
UserRouter.post("/users/logout", auth, logout);

module.exports = UserRouter;
