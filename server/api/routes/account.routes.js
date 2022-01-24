const express = require("express");
const {
	getAccounts,
	getAccount,
	postAccount,
	doAction,
	removeAccount,
} = require("../controllers/account.controllers");

const accountRouter = express.Router();

accountRouter.get("/accounts/:id", getAccount);
accountRouter.get("/accounts", getAccounts);
accountRouter.post("/accounts", postAccount);
accountRouter.put("/accounts/:action/:id", doAction);
accountRouter.delete("/accounts/:id", removeAccount);

module.exports = accountRouter;
