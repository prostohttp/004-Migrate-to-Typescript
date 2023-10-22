import { Request, Response } from "express";
import Comment from "../model/Comment";

export const addHandler = async (req: Request, res: Response) => {
	const { userId, name, comment } = req.query;
	try {
		const newComment = new Comment({
			userId,
			name,
			comment,
		});
		await newComment.save();
	} catch (error: Error | any) {
		console.log(error);
	}

	res.json("comment added");
};

export const getAllHandler = async (req: Request, res: Response) => {
	const { id } = req.params;
	const comments = await Comment.find({ userId: id });
	res.json(comments);
};

export const deleteHandler = async (req: Request, res: Response) => {
	const { id } = req.params;
	await Comment.deleteMany({ userId: id });
	res.json("comment deleted");
};
