const jwt = require("jsonwebtoken");
const { verifyToken } = require("../controllers/utils/utils");
const User = require("../models/user");

const auth = async (req, res, next) => {
	try {
		const { token } = req.cookies;
		const secretKey = req.body.secretKey;
		if (secretKey === process.env.SECRET_KEY) return next();
		const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
		const user = await User.findOne({ _id: decodedToken._id, "tokens.token": token });
		if (!user) throw new Error();
		req.user = user;
		req.token = token;
		next();
	} catch (e) {
		res.status(401).send("Please Authenticate");
	}
};

module.exports = auth;
