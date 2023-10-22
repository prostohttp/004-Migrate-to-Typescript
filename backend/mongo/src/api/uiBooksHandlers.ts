import { Request, Response } from "express";
import Book from "../model/Book";

export const getAllHandler = async (req: Request, res: Response) => {
	try {
		const books = await Book.find().select("-__v");
		res.json(books);
	} catch (error) {
		res.status(500).json(error);
	}
};

export const getHandler = async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		const book = await Book.findById(id).select("-__v");
		if (book) {
			res.json(book);
		} else {
			res.status(404).json({ message: "book not found" });
		}
	} catch (error: Error | any) {
		res.status(500).json(error.message);
	}
};

export const addHandler = async (req: Request, res: Response) => {
	const {
		id,
		title,
		description,
		authors,
		favorite,
		fileName,
		filecover,
		filebook,
		originalNameFileCover,
		originalNameFileBook,
	} = req.body;
	const book = new Book({
		id,
		title,
		description,
		authors,
		favorite,
		filecover,
		filebook,
		fileName,
		originalNameFileCover,
		originalNameFileBook,
	});
	try {
		await book.save();
		res.status(201).json(book);
	} catch (error: Error | any) {
		res.status(500).json(error.message);
	}
};

export const deleteHandler = async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		await Book.findByIdAndDelete(id);
		res.status(200).json({ message: "ok" });
	} catch (error: Error | any) {
		res.status(500).json(error.message);
	}
};

export const updateHandler = async (req: Request, res: Response) => {
	const { id } = req.params;
	const {
		title,
		description,
		authors,
		favorite,
		fileName,
		filecover,
		filebook,
		originalNameFileCover,
		originalNameFileBook,
	} = req.body;

	const book = {
		title,
		description,
		authors,
		favorite,
		filecover,
		fileName,
		filebook,
		originalNameFileCover,
		originalNameFileBook,
	};
	try {
		await Book.findByIdAndUpdate(id, book);
		res.redirect(`/api/books/${id}`);
	} catch (error: Error | any) {
		res.status(500).json(error.message);
	}
};

export const createHandler = (req: Request, res: Response) => {};
