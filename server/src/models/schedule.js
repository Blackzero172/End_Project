const mongoose = require("mongoose");
const validator = require("validator");
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
			date: {
				type: Date,
				required: true,
				unique: true,
			},
			morningWorkers: [
				{
					type: String,
					required: true,
					validate(val) {
						if (!validator.isEmail(val)) throw new Error("Invalid Email");
					},
				},
			],
			middleWorkers: [
				{
					type: String,
					required: true,
					validate(val) {
						if (!validator.isEmail(val)) throw new Error("Invalid Email");
					},
				},
			],
			eveningWorkers: [
				{
					type: String,
					required: true,
					validate(val) {
						if (!validator.isEmail(val)) throw new Error("Invalid Email");
					},
				},
			],
		},
	],
});
module.exports = Schedule;
