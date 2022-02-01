const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const shiftSchema = mongoose.Schema({
	date: {
		type: String,
		required: true,
	},
	shiftType: {
		type: String,
		required: true,
	},
});

const userSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
	},
	password: {
		type: String,
		required: true,
	},
	accessLevel: {
		type: Number,
		default: 1,
	},
	shifts: [
		{
			shift: shiftSchema,
		},
	],
	tokens: [
		{
			token: {
				type: String,
				required: true,
			},
		},
	],
});

userSchema.pre("save", async function (next) {
	const user = this;
	if (user.isModified("password")) user.password = await bcrypt.hash(user.password, 8);
	next();
});

userSchema.statics.findByCredentials = async (email, password) => {
	const user = await User.findOne({ email });
	if (!user) throw new Error("Unable to login");
	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) throw new Error("Unable to login");
	return user;
};

userSchema.statics.findByToken = async (token) => {
	return await User.findOne({ "tokens.token": token });
};

userSchema.methods.generateToken = async function () {
	const user = this;
	const token = jwt.sign({ _id: user._id.toString() }, process.env.SECRET_KEY, { expiresIn: "1d" });
	user.tokens = user.tokens.concat({ token });
	await user.save();
	return token;
};

userSchema.methods.toJSON = function () {
	const user = this;
	const userObject = user.toObject();

	delete userObject.password;
	delete userObject.tokens;
	delete userObject._id;
	delete userObject.__v;
	return userObject;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
