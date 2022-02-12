const express = require("express");
const UserRouter = require("./routes/user.routes");
const ScheduleRouter = require("./routes/schedule.routes");
const path = require("path");
const apiRouter = express.Router();

apiRouter.use("/", UserRouter);
apiRouter.use("/", ScheduleRouter);
//To Return my React App on Refresh

module.exports = apiRouter;
