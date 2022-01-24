const express = require("express");
const auth = require("../../middleware/auth");
const { postUser, login, logout } = require("../controllers/user.controllers");

const userRouter = express.Router();

userRouter.post("/users/login", login);
userRouter.post("/users/signup", auth, postUser);
userRouter.post("/users/logout", auth, logout);

module.exports = userRouter;
