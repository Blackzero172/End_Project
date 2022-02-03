const checkPermissions = (req, res, next) => {
	const requester = req.user;
	if (requester.accessLevel === "User")
		return res.status(401).send("Your access level is too low, please consult your Supervisor!");
	next();
};

module.exports = checkPermissions;
