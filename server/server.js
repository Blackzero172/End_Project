require("dotenv").config();
require("./src/db/mongoose");

const { getReact } = require("./src/controllers/utils/utils");
const express = require("express");
const cors = require("cors");
const Router = require("./src/Router");

const port = process.env.PORT || 5555;
const server = express();

server.use(cors());
server.use(express.json());
server.use("/api", Router);
server.use(express.static(getReact()));

server.listen(port, () => {
	console.log(`Server is up and listening on ${port}`);
});
