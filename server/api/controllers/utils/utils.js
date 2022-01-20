const User = require("../../../models/user");
const path = require("path");
const getReact = () => {
	return path.resolve(__dirname, "../../../../client/build");
};
const getData = async (id) => {
	let users;
	if (!id) {
		users = await User.find({});
	} else {
		users = await User.findById(id);
	}
	return users;
};
const addUser = async (user) => {
	const newUser = new User(user);
	return newUser;
};
const editUser = async (id, newData) => {
	const user = await User.findByIdAndUpdate(id, newData, { new: true, runValidators: true });
	return user;
};
const withdraw = async (id, amountToWithdraw) => {
	const user = await User.findById(id);
	user.cash -= amountToWithdraw;
	await user.save();
	return user;
};
const deposit = async (id, amountToDeposit) => {
	const user = await User.findById(id);
	user.cash += amountToDeposit;
	await user.save();
	return user;
};
const setCredit = async (id, newCredit) => {
	const user = await User.findById(id);
	user.credit = newCredit;
	await user.save();
	return user;
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
	const user = await User.findById(id);
	const validate = checkCashAndCredit(user, amountToTransfer);
	user.cash = validate.cash;
	user.credit = validate.credit;
	await user.save();
	const targetUser = await User.findById(targetID);
	targetUser.cash += amountToTransfer;
	await targetUser.save();
	return [user, targetUser];
};
const deleteUser = async (id) => {
	const user = await User.findByIdAndDelete(id);
	return user;
};
module.exports = { getData, addUser, editUser, getReact, withdraw, deposit, setCredit, transfer, deleteUser };
