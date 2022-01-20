const mongoose = require("mongoose");
const validator = require("validator");

const User = mongoose.model("User", {
	name: {
		type: String,
		required: true,
	},
	Id: {
		type: Number,
		required: true,
		unique: true,
	},
	cash: {
		type: Number,
		default: 0,
	},
	credit: {
		type: Number,
		default: 0,
	},
});
module.exports = User;
