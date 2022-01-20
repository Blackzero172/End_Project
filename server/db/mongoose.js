const mongoose = require("mongoose");
require("dotenv").config();
const dbURL = process.env.MONGO_URL;
mongoose.connect(dbURL, { useNewUrlParser: true }, (err, client) => {
	if (err) console.log(err);
});
