const express = require("express");
const Schedule = require("../models/schedule");
const app = express();
app.use(express.json());

const getSchedule = async (req, res) => {
	try {
		console.log(req.body);
		const schedule = await Schedule.findOne({ startDate: req.body.startDate });
		if (!schedule) return res.status(404).send("Schedule not Found!");
		res.send(schedule);
	} catch (e) {
		res.status(500).send(e.message);
		console.log(e);
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
		const { weekDay, morningWorkers = [], middleWorkers = [], eveningWorkers = [] } = req.body;
		const schedule = await Schedule.findOne({ startDate: req.body.startDate });
		schedule.days[weekDay] = schedule.days[weekDay] || {};
		const weekDayObj = schedule.days[weekDay];
		weekDayObj.morningWorkers.push(...morningWorkers);
		weekDayObj.middleWorkers.push(...middleWorkers);
		weekDayObj.eveningWorkers.push(...eveningWorkers);
		await schedule.save();
		res.send(schedule);
	} catch (e) {
		res.status(500).send(e.message);
	}
};
module.exports = { getSchedule, postSchedule, putSchedule };
