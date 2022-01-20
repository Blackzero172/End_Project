const mongoose = require("mongoose");

const User = mongoose.model("User", {
	name: {
		type: String,
		required: true,
	},
	cash: {
		type: Number,
		default: 0,
		min: 0,
	},
	credit: {
		type: Number,
		default: 0,
		min: 0,
	},
});
module.exports = User;
