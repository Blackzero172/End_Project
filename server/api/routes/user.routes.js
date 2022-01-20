const express = require("express");
const { getUsers, getUser, postUser, doAction, removeUser } = require("../controllers/user.controllers");

const userRouter = express.Router();

userRouter.get("/users/:id", getUser);
userRouter.get("/users", getUsers);
userRouter.post("/users", postUser);
userRouter.put("/users/:action/:id", doAction);
userRouter.delete("/users/:id", removeUser);

module.exports = userRouter;
