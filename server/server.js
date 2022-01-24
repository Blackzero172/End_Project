require("dotenv").config();
const express = require("express");
require("./db/mongoose");
const { getReact } = require("./api/controllers/utils/utils");
const cors = require("cors");
const port = process.env.PORT || 5555;
const server = express();
const accountRouter = require("./api/routes/account.routes");
const userRouter = require("./api/routes/user.routes");
server.use(cors());
server.use(express.json());
server.use("/api", accountRouter);
server.use("/api", userRouter);
server.use(express.static(getReact()));
server.listen(port, () => {
	console.log(`Server is up and listening on ${port}`);
});
