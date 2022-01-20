const mongoose = require("mongoose");
const dbURL = "mongodb+srv://ali:123123123@bankapi.jqsj6.mongodb.net/bankAPI?retryWrites=true&w=majority";

mongoose.connect(dbURL, { useNewUrlParser: true }, (err, client) => {
	if (err) console.log(err);
});
