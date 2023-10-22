import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	userName: {
		type: String,
		required: true,
	},
	userLogin: {
		type: String,
		required: true,
	},
	userPassword: {
		type: String,
		required: true,
	},
});

export const User = mongoose.model("User", userSchema);
