import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
	userId: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true,
	},
	comment: {
		type: String,
		required: true,
	},
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
