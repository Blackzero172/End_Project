const express = require("express");
const UserRouter = require("./routes/user.routes");
const path = require("path");
const apiRouter = express.Router();

apiRouter.use("/", UserRouter);
//To Return my React App on Refresh
apiRouter.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});
module.exports = apiRouter;
