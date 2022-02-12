const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const shiftSchema = mongoose.Schema({
	shiftDate: {
		type: String,
		required: true,
	},
	shiftType: {
		type: String,
		required: true,
	},
	owner: {
		type: mongoose.ObjectId,
		required: true,
	},
});

const userSchema = mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	birthDate: {
		type: Date,
		required: true,
	},
	IdNumber: {
		type: String,
		required: true,
		validate(val) {
			if (!validator.isIdentityCard(val, "he-IL")) {
				throw new Error("Invalid ID number");
			}
		},
		unique: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
		validate(val) {
			if (!validator.isEmail(val)) throw new Error("Invalid Email");
		},
	},
	password: {
		type: String,
		required: true,
	},
	accessLevel: {
		type: String,
		default: "User",
	},
	shifts: [shiftSchema],
	tokens: [
		{
			token: {
				type: String,
				required: true,
			},
		},
	],
	createdAt: {
		type: Date,
		required: true,
	},
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

userSchema.methods.addShift = async function (shiftDate, shiftType) {
	const user = this;
	const shift = {
		shiftDate,
		shiftType,
		owner: user._id,
	};
	user.shifts.forEach((currentShift) => {
		if (currentShift.shiftDate === shift.shiftDate && currentShift.shiftType === shift.shiftType)
			throw new Error("Shift Already Exists!");
	});
	user.shifts = user.shifts.concat(shift);
	await user.save();
	return shift;
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
