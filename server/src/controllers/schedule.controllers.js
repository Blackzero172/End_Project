const express = require("express");
const Schedule = require("../models/schedule");
const app = express();
const moment = require("moment");
const User = require("../models/user");
app.use(express.json());

const getSchedule = async (req, res) => {
	try {
		const schedule = await Schedule.findOne({ startDate: req.body.startDate });
		if (!schedule) return res.status(404).send("Schedule not Found!");
		schedule.days;
		res.send(schedule);
	} catch (e) {
		res.status(500).send(e.message);
	}
};
const postSchedule = async (req, res) => {
	try {
		const schedule = new Schedule(req.body);
		await schedule.save();
		res.status(201).send(schedule);
	} catch (e) {
		res.status(500).send(e.message);
	}
};
const putSchedule = async (req, res) => {
	try {
		const { weekDay, morningWorkers = [], middleWorkers = [], eveningWorkers = [], users = [] } = req.body;
		const schedule = await Schedule.findOne({ startDate: req.body.startDate });
		schedule.days[weekDay] = schedule.days[weekDay] || {
			date: moment(schedule.startDate).add(weekDay, "d").toString(),
		};
		const weekDayObj = schedule.days[weekDay];

		weekDayObj.morningWorkers = morningWorkers;
		weekDayObj.middleWorkers = middleWorkers;
		weekDayObj.eveningWorkers = eveningWorkers;
		users.forEach(async (user) => {
			const dbUser = await User.findOne({ email: user.email });
			dbUser.shifts = dbUser.shifts.filter(
				(currentShift) => currentShift.shiftDate !== schedule.days[weekDay].date.toDateString()
			);
			await dbUser.save();
		});
		weekDayObj.morningWorkers.forEach(async (worker) => {
			try {
				const user = await User.findOne({ email: worker });
				await user.addShift(schedule.days[weekDay].date.toDateString(), "Morning");
			} catch (e) {
				console.error(e);
			}
		});
		weekDayObj.middleWorkers.forEach(async (worker) => {
			try {
				const user = await User.findOne({ email: worker });
				await user.addShift(schedule.days[weekDay].date.toDateString(), "Middle");
			} catch (e) {
				console.error(e);
			}
		});
		weekDayObj.eveningWorkers.forEach(async (worker) => {
			try {
				const user = await User.findOne({ email: worker });
				await user.addShift(schedule.days[weekDay].date.toDateString(), "Evening");
			} catch (e) {
				console.error(e);
			}
		});
		await schedule.save();
		res.send(schedule);
	} catch (e) {
		res.status(500).send(e.message);
	}
};
module.exports = { getSchedule, postSchedule, putSchedule };
