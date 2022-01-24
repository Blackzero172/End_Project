const Account = require("../../../models/account");
const path = require("path");
const { default: api } = require("../../../../client/src/api/api");
const getReact = () => {
	return path.resolve(__dirname, "../../../../client/build");
};
const getData = async (id) => {
	let accounts;
	if (!id) {
		accounts = await Account.find({});
	} else {
		accounts = await Account.findById(id);
	}
	return accounts;
};
const addAccount = async (account) => {
	const newAccount = new Account(account);
	return newAccount;
};
const addUser = async (user) => {
	const newUser = new User(user);
	return newUser;
};
const loginRequest = async (email, password, token) => {
	if (token) {
		const user = await api.post("/users/login", { token });
		return user;
	} else {
	}
};
const editAccount = async (id, newData) => {
	const account = await Account.findByIdAndUpdate(id, newData, { new: true, runValidators: true });
	return account;
};
const withdraw = async (id, amountToWithdraw) => {
	const account = await Account.findById(id);
	account.cash -= amountToWithdraw;
	await account.save();
	return account;
};
const deposit = async (id, amountToDeposit) => {
	const account = await Account.findById(id);
	account.cash += amountToDeposit;
	await account.save();
	return account;
};
const setCredit = async (id, newCredit) => {
	const account = await Account.findById(id);
	account.credit = newCredit;
	await account.save();
	return account;
};
const checkCashAndCredit = ({ cash, credit }, amount) => {
	if (cash + credit < amount) {
		throw new Error("Not enough cash");
	} else if (cash < amount) {
		amount -= cash;
		cash = 0;
		credit -= amount;
	} else {
		cash -= amount;
	}
	return { cash, credit };
};
const transfer = async (id, targetID, amountToTransfer) => {
	const account = await Account.findById(id);
	const validate = checkCashAndCredit(user, amountToTransfer);
	account.cash = validate.cash;
	account.credit = validate.credit;
	await account.save();
	const targetAccount = await Account.findById(targetID);
	targetAccount.cash += amountToTransfer;
	await targetAccount.save();
	return [account, targetAccount];
};
const deleteAccount = async (id) => {
	const user = await Account.findByIdAndDelete(id);
	return user;
};
module.exports = {
	getData,
	addAccount,
	editAccount,
	getReact,
	withdraw,
	deposit,
	setCredit,
	transfer,
	deleteAccount,
	addUser,
};
