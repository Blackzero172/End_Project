const express = require("express");
const { getUsers, getUser, putUser, postUser, deleteUser } = require("../controllers/user.controllers");

const userRouter = express.Router();

userRouter.get("/users/:id", getUser);
userRouter.get("/users", getUsers);
userRouter.post("/users", postUser);
userRouter.put("/users/:id", putUser);
// userRouter.delete("/users", deleteUser);

module.exports = userRouter;
