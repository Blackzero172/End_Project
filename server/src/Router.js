const express = require("express");
const UserRouter = require("./routes/user.routes");

const apiRouter = express.Router();

apiRouter.use("/", UserRouter);

module.exports = apiRouter;
