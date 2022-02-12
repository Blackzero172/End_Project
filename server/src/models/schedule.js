const mongoose = require("mongoose");
const Schedule = mongoose.model("Schedule", {
	startDate: {
		type: Date,
		required: true,
		unique: true,
	},
	endDate: {
		type: Date,
		required: true,
		unique: true,
	},
	days: [
		{
			morningWorkers: [
				{
					type: mongoose.ObjectId,
					required: true,
					unique: true,
				},
			],
			middleWorkers: [
				{
					type: mongoose.ObjectId,
					required: true,
					unique: true,
				},
			],
			eveningWorkers: [
				{
					type: mongoose.ObjectId,
					required: true,
					unique: true,
				},
			],
		},
	],
});
module.exports = Schedule;
