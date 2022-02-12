const express = require("express");
const UserRouter = require("./routes/user.routes");
const ScheduleRouter = require("./routes/schedule.routes");
const path = require("path");
const apiRouter = express.Router();

apiRouter.use("/", UserRouter);
apiRouter.use("/", ScheduleRouter);
module.exports = apiRouter;
