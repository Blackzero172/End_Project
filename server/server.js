require("dotenv").config();
const express = require("express");
require("./db/mongoose");
const path = require("path");
const { getReact } = require("./api/controllers/utils/utils");
const cors = require("cors");
const User = require("./models/user");
const port = process.env.PORT || 5555;
const server = express();
const router = require("./api/routes/user.routes");
server.use(cors());
server.use(express.json());
server.use("/api", router);
server.use(express.static(getReact()));
server.listen(port, () => {
	console.log(`Server is up and listening on ${port}`);
});
