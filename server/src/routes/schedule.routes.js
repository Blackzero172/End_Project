const express = require("express");
const auth = require("../middleware/auth");
const checkPermissions = require("../middleware/checkPermissions");

const ScheduleRouter = express.Router();

const { getSchedule, postSchedule, putSchedule } = require("../controllers/schedule.controllers");

ScheduleRouter.get("/schedule", auth, getSchedule);

ScheduleRouter.post("/schedule", auth, postSchedule);

ScheduleRouter.put("/schedule", [auth, checkPermissions], putSchedule);

module.exports = ScheduleRouter;
