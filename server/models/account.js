const mongoose = require("mongoose");

const Account = mongoose.model("Account", {
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
module.exports = Account;
